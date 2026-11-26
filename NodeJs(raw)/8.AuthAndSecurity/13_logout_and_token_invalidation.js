/* 13_logout_and_token_invalidation.js

=====================================================
Logout and Token Invalidation
=====================================================

Definition (What I should say in the interview):
- "With sessions, logout is easy: delete the session on the server. With JWTs it is harder,
   because the token is **stateless** and stays valid until it expires - deleting it on the
   client does not make it invalid. So in practice I keep access tokens **short-lived**,
   delete the refresh token from the DB and clear the cookie on logout, and for immediate
   revocation I use a **denylist** in Redis keyed by the token's jti, or a tokenVersion field."

-----------------------------------------------------
Strategies
-----------------------------------------------------
1. Short access token expiry (5-15 min) -> limits the damage window.
2. Delete / revoke refresh token in DB on logout -> no new access tokens.
3. **Denylist**: store jti in Redis with TTL = remaining token lifetime; check on each request.
4. **tokenVersion** / passwordChangedAt on the user: token issued before that -> rejected.
   Useful for "logout from all devices" and after password change.
5. Rotating the signing key logs out EVERYONE (emergency only).

-----------------------------------------------------
Example
-----------------------------------------------------
const { randomUUID } = require('crypto');

// when signing
const token = jwt.sign({ sub: user.id, ver: user.tokenVersion }, secret,
  { expiresIn: '15m', jwtid: randomUUID() });

app.post('/api/auth/logout', authenticate, async (req, res) => {
  const ttl = req.user.exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) await redis.set(`deny:${req.user.jti}`, '1', { EX: ttl });
  await RefreshToken.deleteOne({ tokenHash: sha256(req.cookies.refreshToken || '') });
  res.clearCookie('refreshToken', { path: '/api/auth' });
  res.sendStatus(204);
});

// inside authenticate(), after jwt.verify
if (await redis.exists(`deny:${payload.jti}`)) return res.sendStatus(401);

// logout all devices
await User.updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } });
// in middleware: if (payload.ver !== user.tokenVersion) -> 401

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- A denylist adds state back, but it is small (only revoked, not-yet-expired tokens) and fast.
- Without any server-side check, "logout" with JWT is only a client-side action.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Denylist vs allowlist?
A1: Denylist stores revoked tokens (small). Allowlist stores all valid tokens - basically
    sessions again, but gives full control.

Q2: User changes password - what about existing tokens?
A2: Compare token iat with passwordChangedAt (or bump tokenVersion) and reject older tokens.

Q3: Why TTL on the denylist key?
A3: After the token expires, jwt.verify rejects it anyway, so the entry is not needed.
*/
