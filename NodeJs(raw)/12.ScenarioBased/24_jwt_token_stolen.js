/* 24_jwt_token_stolen.js

=====================================================
Scenario: A User's JWT Was Stolen
=====================================================

The Question (how the interviewer asks it):
- "An attacker steals a user's JWT. What can they do, how do you limit
   the damage, and how would you design auth so this hurts less?"

What the interviewer is checking:
- Do you know a JWT is a bearer token: whoever has it IS the user until it expires
- Do you know JWTs are stateless, so you cannot simply "delete" one
- Short-lived access token + refresh token rotation design
- Safe storage (httpOnly cookie vs localStorage) and revocation

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify first: how was it stolen (XSS, logs, leaked device)? Is it an
   access token or a refresh token? How long is its expiry?
2. Explain the risk: the server only checks the signature and expiry, so the
   attacker can call the API as that user until the token expires.
3. Immediate response: revoke the user's sessions. I delete their refresh
   tokens in the DB, and put the stolen token's "jti" (token id) in a Redis
   denylist with a TTL equal to the token's remaining lifetime.
4. Design 1 - short-lived access tokens (5-15 minutes). A stolen token is
   useful only for a short time.
5. Design 2 - refresh token rotation. Each refresh gives a NEW refresh token
   and invalidates the old one. If an old refresh token is used again, that
   means theft -> I revoke the whole token family and force login.
6. Design 3 - storage. Store tokens in httpOnly, Secure, SameSite cookies so
   JavaScript (and XSS) cannot read them. Do not use localStorage.
7. Design 4 - reduce the attack surface: fix XSS (CSP, escaping), never log
   tokens, always use HTTPS, and add a "log out from all devices" button.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');

function issueTokens(res, user) {
  const accessToken = jwt.sign(
    { sub: user.id, jti: crypto.randomUUID() },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }                         // short-lived
  );
  const refreshToken = crypto.randomBytes(32).toString('hex');
  // store only a HASH of the refresh token in DB (userId, family, expiresAt)
  const opts = { httpOnly: true, secure: true, sameSite: 'strict' };
  res.cookie('access', accessToken, { ...opts, maxAge: 10 * 60 * 1000 });
  res.cookie('refresh', refreshToken, { ...opts, path: '/auth/refresh' });
}

// Auth middleware with denylist check
async function protect(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies.access, process.env.JWT_SECRET);
    if (await redis.get(`deny:${payload.jti}`)) {
      return res.status(401).json({ message: 'Token revoked' });
    }
    req.user = { id: payload.sub };
    next();
  } catch {
    res.status(401).json({ message: 'Not authenticated' });
  }
}

// Revoke: block until it would expire anyway
async function revoke(payload) {
  const ttl = payload.exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) await redis.set(`deny:${payload.jti}`, '1', { EX: ttl });
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "A JWT is a bearer token, so whoever has it can act as the user until it
   expires. To limit damage I keep access tokens short, around 10 minutes,
   and use refresh tokens with rotation and reuse detection. I store tokens
   in httpOnly, Secure, SameSite cookies so XSS cannot read them. If a token
   is stolen, I revoke the user's refresh tokens and add the access token's
   jti to a Redis denylist until it expires."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Just delete the token on the client" - the attacker still has a copy.
- Access tokens that last 30 days with no refresh or revocation strategy.
- Storing tokens in localStorage and saying "it's fine because of HTTPS".
- Putting sensitive data (password, card info) in the JWT payload. The
  payload is only base64, not encrypted.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Doesn't a denylist make JWT stateful again?
A1: Yes, a little. But the list is small (only revoked tokens, and only
    until they expire) and Redis lookups are fast. It is a fair trade-off.

Q2: If tokens are in cookies, what new attack must you handle?
A2: CSRF. Use SameSite=strict or lax, and a CSRF token for unsafe methods if
    needed. Also check the Origin header on state-changing requests.

Q3: What is refresh token reuse detection?
A3: Each refresh token can be used once. If an already-used token comes
    back, either the user or the attacker has a stolen copy, so I revoke the
    whole token family and the user must log in again.
*/
