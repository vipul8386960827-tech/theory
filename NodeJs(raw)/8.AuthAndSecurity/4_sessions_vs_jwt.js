/* 4_sessions_vs_jwt.js

=====================================================
Sessions vs JWT
=====================================================

Definition (What I should say in the interview):
- "With **sessions**, the server stores the session data (in memory, Redis or a DB) and the
   client only gets a random session id in a cookie. With **JWT**, the user data is inside a
   signed token held by the client, so the server does not need to store anything. Sessions are
   easy to revoke but need shared storage when you scale; JWTs scale easily but are hard to
   revoke before they expire. For a classic server-rendered app I would pick sessions, for
   APIs consumed by mobile apps or multiple services, JWT."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect          | Sessions                          | JWT                                 |
|-----------------|-----------------------------------|-------------------------------------|
| State           | Stateful (server stores data)     | Stateless (data in token)           |
| Client holds    | Random session id (cookie)        | Signed token (header or cookie)     |
| Revocation      | Easy - delete session             | Hard - wait for expiry / denylist   |
| Scaling         | Needs shared store (Redis)        | Any instance can verify             |
| Size            | Small cookie                      | Bigger, sent on every request       |
| Cross-domain    | Harder (cookie-based)             | Easy via Authorization header       |
| Typical use     | Server-rendered web apps          | SPAs, mobile, microservices         |

-----------------------------------------------------
Example (express-session with Redis)
-----------------------------------------------------
const session = require('express-session');
const { RedisStore } = require('connect-redis');

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 1000 },
}));

app.post('/login', async (req, res) => {
  // ...verify credentials...
  req.session.regenerate(() => {         // new id after login -> prevents session fixation
    req.session.userId = user.id;
    res.json({ ok: true });
  });
});

app.post('/logout', (req, res) => req.session.destroy(() => res.clearCookie('connect.sid').end()));

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- In-memory session store (default MemoryStore) leaks memory and breaks with multiple
  instances -> use Redis in production.
- Many real systems are hybrid: short JWT access token + stateful refresh token in DB.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Are JWTs more secure than sessions?
A1: Not by default. Both are secure if implemented well; JWT trades easy revocation for scalability.

Q2: What is session fixation?
A2: Attacker forces a known session id on the victim before login. Fix: regenerate the id on login.

Q3: Do sessions need CSRF protection?
A3: Yes, because the cookie is sent automatically by the browser. Use SameSite and CSRF tokens.
*/
