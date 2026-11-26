/* 3_access_and_refresh_tokens.js

=====================================================
Access Tokens and Refresh Tokens
=====================================================

Definition (What I should say in the interview):
- "An **access token** is a short-lived token, like 15 minutes, that is sent with every API
   request. A **refresh token** is long-lived, like 7 days, and is used only to get a new
   access token when the old one expires. This way, if an access token leaks, the damage window
   is small, and the user still does not have to log in again every 15 minutes. I store the
   refresh token in an HttpOnly cookie and keep a record of it on the server so it can be revoked."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Access token: short expiry, sent on every request, usually not stored in DB.
2. Refresh token: long expiry, sent only to /refresh, stored (hashed) in DB -> revocable.
3. Use **different secrets** for access and refresh tokens.
4. **Refresh token rotation**: every refresh issues a NEW refresh token and invalidates the old.
5. **Reuse detection**: if an old (already used) refresh token shows up -> likely stolen ->
   revoke the whole token family and force re-login.

-----------------------------------------------------
Flow
-----------------------------------------------------
1. Login -> server returns accessToken (body) + refreshToken (HttpOnly cookie, path /api/auth).
2. API calls use accessToken until it expires -> 401.
3. Client calls POST /api/auth/refresh -> cookie sent automatically.
4. Server verifies refresh token + checks it exists in DB -> rotates -> returns new pair.

-----------------------------------------------------
Example (refresh endpoint with rotation)
-----------------------------------------------------
app.post('/api/auth/refresh', async (req, res) => {
  const old = req.cookies.refreshToken;
  if (!old) return res.sendStatus(401);

  let payload;
  try { payload = jwt.verify(old, process.env.REFRESH_SECRET); }
  catch { return res.sendStatus(401); }

  const stored = await RefreshToken.findOne({ tokenHash: sha256(old) });
  if (!stored) {                                   // reuse of a rotated token
    await RefreshToken.deleteMany({ userId: payload.sub });
    return res.sendStatus(401);
  }
  await stored.deleteOne();                        // invalidate old one

  const accessToken = jwt.sign({ sub: payload.sub }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: payload.sub }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  await RefreshToken.create({ userId: payload.sub, tokenHash: sha256(refreshToken) });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, secure: true, sameSite: 'strict', path: '/api/auth', maxAge: 7 * 24 * 3600 * 1000,
  });
  res.json({ accessToken });
});

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not just use one long-lived access token?
A1: A stolen token would be valid for days and you cannot revoke a stateless JWT easily.

Q2: Why store the refresh token hashed?
A2: Same reason as passwords - if the DB leaks, the raw tokens cannot be used directly.

Q3: Where should the frontend keep the access token?
A3: In memory (JS variable / state). On page reload, call /refresh to get a new one.
*/
