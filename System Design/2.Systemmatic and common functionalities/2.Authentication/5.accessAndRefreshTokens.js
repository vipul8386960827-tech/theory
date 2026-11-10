/*
ACCESS TOKEN AND REFRESH TOKEN

Why do we need two tokens?
If we use only one token there is a tradeoff. If it lives long (say 7 days) and it gets
stolen, the attacker has access for 7 days. If it lives short (say 15 min), the user has
to log in again every 15 minutes, which is a bad experience. So we split it into two tokens.

1. Access token
   - Short lived, around 5 to 15 minutes.
   - Sent with every request to the backend so the backend knows who the user is.
   - Usually a JWT (signed by the server) containing userId, role, and expiry (exp).
   - The backend verifies the signature, so it doesn't need to hit the DB on every request.
   - Because it's short lived, if it gets stolen the damage window is small.

2. Refresh token
   - Long lived, around 7 to 30 days.
   - Used for ONLY one thing: getting a new access token when the old one expires.
   - It is NOT sent with normal API requests, only to the refresh endpoint.
   - The server stores it (hashed) in the DB, so it can be revoked. This is how
     logout, "logout from all devices", and banning a user actually work.

------------------------------------------------------------------------------------------
WHERE TO STORE THEM

Both go in HttpOnly cookies, set by the server (our server action or route handler).
   - HttpOnly  -> JavaScript can't read them, so XSS can't steal them.
   - Secure    -> sent only over HTTPS.
   - SameSite  -> "lax" or "strict", protects against CSRF.
   - Path      -> for the refresh token we can set path="/api/auth/refresh" so the browser
                  sends it only to the refresh endpoint and not with every request.

Don't store them in localStorage. Any script on the page (including an XSS payload) can read
localStorage.

------------------------------------------------------------------------------------------
THE FLOW

1. Login
   User submits email/password -> server action calls the auth API -> API returns
   accessToken + refreshToken -> we set both as HttpOnly cookies -> redirect to dashboard.

2. Normal request
   Browser sends the access token cookie automatically -> proxy (middleware) / server
   component / API verifies it -> valid -> return data.

3. Access token expired
   Verification fails with "expired" -> call the refresh endpoint with the refresh token ->
   server checks the refresh token against the DB -> valid -> issue a NEW access token AND
   a NEW refresh token (rotation) -> set both cookies again -> retry the original request.
   The user never notices anything; this is called silent refresh.

4. Refresh token expired / revoked
   The refresh fails -> clear the cookies -> redirect to the login page.

5. Logout
   Delete the refresh token from the DB AND clear both cookies. Just clearing cookies is not
   enough, because a copied refresh token would still work until it expires.

------------------------------------------------------------------------------------------
REFRESH TOKEN ROTATION AND REUSE DETECTION (important interview point)

Every time a refresh token is used, we invalidate it and give a new one. So each refresh
token is single-use.
If someone stole a refresh token and both the attacker and the real user try to use it,
the second use will be of an already-used token. The server sees this "reuse" and treats it
as theft -> revokes the whole token family (all sessions from that login) -> both have to
log in again. The attacker loses access.

------------------------------------------------------------------------------------------
NEXT.JS SPECIFIC DETAIL

Server components can READ cookies but can't SET them. So the refresh (which sets new
cookies) has to happen in:
   - the proxy (middleware), before the page renders, or
   - a route handler (app/api/auth/refresh/route.js), or
   - a server action.
A common pattern: the proxy checks the access token's exp. If it's expired or about to
expire, it calls the refresh endpoint, sets the new cookies on the response, and lets the
request continue.

Rough sketch of the refresh route handler:

// app/api/auth/refresh/route.js
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return Response.json({ error: "No session" }, { status: 401 });

  const res = await fetch(`${process.env.AUTH_API}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return Response.json({ error: "Session expired" }, { status: 401 });
  }

  const { accessToken, refreshToken: newRefreshToken } = await res.json();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 15,
  });
  cookieStore.set("refreshToken", newRefreshToken, {
    httpOnly: true, secure: true, sameSite: "strict",
    path: "/api/auth/refresh", maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true });
}

------------------------------------------------------------------------------------------
EDGE CASE: MULTIPLE REQUESTS AT THE SAME TIME

If the page fires 5 API calls and the access token has expired, all 5 get a 401 and all 5
try to refresh. With rotation, the first refresh succeeds and the other 4 use an already-
used refresh token, which looks like reuse/theft and logs the user out.

   5 calls -> all get 401 -> all 5 call /refresh with the SAME refresh token
   -> 1st succeeds (token rotated) -> other 4 send an already-used token
   -> server sees "reuse" -> assumes theft -> revokes everything -> user logged out

Solution 1: Single in-flight refresh promise (main answer)
Keep one shared refreshPromise. The first 401 creates it. Every other 401 that comes in
while it's running awaits the SAME promise instead of starting a new refresh.

let refreshPromise = null; // shared across all requests

function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/auth/refresh", { method: "POST", credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Session expired");
      })
      .finally(() => {
        refreshPromise = null; // reset so a future expiry can refresh again
      });
  }
  return refreshPromise; // 2nd-5th callers get the SAME promise
}

async function apiFetch(url, options = {}, retried = false) {
  const res = await fetch(url, { ...options, credentials: "include" });

  if (res.status === 401 && !retried) {
    try {
      await refreshAccessToken();              // only 1 network call for all 5
      return apiFetch(url, options, true);     // retry once with the new cookie
    } catch {
      window.location.href = "/login";         // refresh failed -> logout
      throw new Error("Logged out");
    }
  }
  return res;
}

How it plays out:
   call1 401 -> refreshPromise is null   -> starts refresh --+
   call2 401 -> refreshPromise exists    -> waits -----------+
   call3 401 -> waits ---------------------------------------+  only ONE /refresh request
   call4 401 -> waits ---------------------------------------+
   call5 401 -> waits ---------------------------------------+
   refresh done -> all 5 retry with the new access token

Key points:
   - The "retried" flag stops an infinite loop if the retry also returns 401.
   - "finally" resets the promise, so the next expiry (15 min later) can refresh again.
   - With axios it's the same idea inside a response interceptor. Some versions use a
     "failed request queue" array instead of a shared promise, but the concept is the same.

Solution 2: Proactive refresh (avoid the 401 in the first place)
Read the token's exp and refresh about 1 minute BEFORE it expires (timer, or check before
each request). Requests then rarely hit an expired token. Still keep Solution 1 as backup.
In Next.js, the proxy (middleware) can check exp and refresh if it expires within ~1 min.

Solution 3: Multiple tabs
The shared promise only works inside ONE tab. With 3 tabs open, each tab has its own
refreshPromise, so the race can happen again. Fixes:
   - Web Locks API: navigator.locks.request("token-refresh", async () => {...}) lets only
     one tab refresh at a time. The other tabs wait, then see the token is already fresh
     and skip their refresh.
   - BroadcastChannel: the tab that refreshed tells the others "token refreshed", and they
     just retry.

Solution 4: Server-side grace period (the safety net)
Sometimes the client can't coordinate (e.g. Next.js middleware running parallel requests
on different serverless instances). So make the server tolerant: if an old refresh token
is reused within a few seconds (say 10-30s) of being rotated, treat it as a race, not
theft, and return the same new tokens instead of revoking the family. Auth0 calls this a
"reuse interval". Reuse after that window is still treated as theft.

Interview one-liner:
"Deduplicate the refresh: keep a single in-flight refresh promise so concurrent 401s wait
on it and then retry. Add proactive refresh before expiry, use Web Locks across tabs, and
give the server a short reuse grace window so legitimate races don't trigger theft
detection."

------------------------------------------------------------------------------------------
QUICK INTERVIEW ANSWERS

Q: Why not just a long lived access token?
A: It can't be revoked easily (JWTs are verified without a DB lookup), so a stolen one
   works until it expires. A short access token + revocable refresh token gives both
   security and good UX.

Q: Why is the access token a JWT but the refresh token checked in the DB?
A: The access token is checked on every request, so it needs to be fast (no DB). The
   refresh token is used rarely, so a DB lookup is fine, and the lookup is what lets us
   revoke it.

Q: What happens when the user changes their password?
A: Revoke all refresh tokens for that user. Existing access tokens die within ~15 minutes
   on their own.
*/
