/* 12_httponly_secure_samesite_cookies.js

=====================================================
HttpOnly, Secure and SameSite Cookies
=====================================================

Definition (What I should say in the interview):
- "These are cookie attributes that harden auth cookies. **HttpOnly** means JavaScript cannot
   read the cookie via document.cookie, which protects it from XSS theft. **Secure** means the
   browser only sends it over HTTPS. **SameSite** controls whether the cookie is sent on
   cross-site requests: Strict never, Lax only on top-level GET navigations, and None always -
   None requires Secure. Lax is the default in modern browsers and gives good CSRF protection."

-----------------------------------------------------
Attributes
-----------------------------------------------------
| Attribute       | What it does                                              |
|-----------------|-----------------------------------------------------------|
| HttpOnly        | Hidden from JS (document.cookie)                          |
| Secure          | Sent only over HTTPS                                      |
| SameSite=Strict | Never sent on cross-site requests (even clicking a link)  |
| SameSite=Lax    | Sent on top-level GET navigation, not on cross-site POST  |
| SameSite=None   | Always sent (needs Secure) - for real cross-site setups   |
| Max-Age/Expires | Lifetime; without it -> session cookie (gone on close)    |
| Path / Domain   | Limit where the cookie is sent                            |
| __Host- prefix  | Forces Secure, Path=/, no Domain -> cannot be overwritten |

-----------------------------------------------------
Example
-----------------------------------------------------
res.cookie('__Host-refresh', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,      // Express uses ms
});

// signed cookie -> detects tampering (not encryption)
app.use(require('cookie-parser')(process.env.COOKIE_SECRET));
res.cookie('prefs', 'dark', { signed: true });
req.signedCookies.prefs;

// logout: options must match to clear it
res.clearCookie('__Host-refresh', { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- "Site" (SameSite) is not the same as "origin" (CORS): api.example.com and app.example.com
  are same-site but cross-origin.
- Local dev on http://localhost -> secure: true cookies may not be set in some setups, so
  toggle it by NODE_ENV.
- Frontend and API on totally different domains -> need SameSite=None; Secure + CSRF tokens.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does SameSite=Lax fully stop CSRF?
A1: Mostly, but not for state-changing GET routes or same-site subdomains. Keep GETs safe and
    add CSRF tokens for sensitive actions.

Q2: Why is my cookie not being set from the API?
A2: Usually missing credentials: 'include' on the client, missing CORS credentials: true, or
    SameSite=None without Secure.
*/
