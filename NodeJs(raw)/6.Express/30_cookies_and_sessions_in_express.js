/* 30_cookies_and_sessions_in_express.js

=====================================================
Cookies and Sessions in Express
=====================================================

Definition (What I should say in the interview):
- "A **cookie** is a small piece of data the server asks the browser to store and send back
   on every request to that domain. A **session** keeps user data on the **server side** (in
   memory, Redis or a DB), and only a session ID is stored in a cookie. In Express we set
   cookies with res.cookie(), read them with cookie-parser via req.cookies, and use
   express-session for sessions. For security I set httpOnly, secure and sameSite flags."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect          | Cookie                     | Session                            |
|-----------------|----------------------------|------------------------------------|
| Stored where    | Browser                    | Server (store), ID in cookie       |
| Size            | ~4 KB                      | Limited by store                   |
| Security        | Visible to client          | Data hidden from client            |
| Scaling         | No server state            | Needs shared store (Redis)         |

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));           // enables signed cookies
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 3600000 },
  // store: new RedisStore({ client: redisClient })        // default MemoryStore is NOT for prod
}));

app.post('/login', (req, res) => {
  req.session.userId = 42;                                  // stored on server
  res.cookie('theme', 'dark', { maxAge: 7 * 24 * 3600 * 1000 });
  res.json({ message: 'Logged in' });
});

app.get('/me', (req, res) => {
  if (!req.session.userId) return res.sendStatus(401);
  res.json({ userId: req.session.userId, theme: req.cookies.theme });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.sendStatus(204);
  });
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- httpOnly -> JS can't read it (XSS protection); secure -> HTTPS only; sameSite -> CSRF protection.
- Signed cookies (res.cookie(name, val, { signed: true })) detect tampering, but are not encrypted.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Sessions vs JWT?
A1: Sessions are stateful and easy to revoke; JWTs are stateless and scale easily but are hard to revoke before expiry.

Q2: Why does MemoryStore warn in production?
A2: It leaks memory and isn't shared across instances; use Redis or a DB store.
*/
