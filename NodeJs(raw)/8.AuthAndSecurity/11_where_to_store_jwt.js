/* 11_where_to_store_jwt.js

=====================================================
Where to Store a JWT (Client Side)
=====================================================

Definition (What I should say in the interview):
- "There are mainly three options: localStorage, an HttpOnly cookie, or memory. localStorage
   is easy but any JavaScript on the page can read it, so a single **XSS** bug leaks the token.
   An **HttpOnly cookie** cannot be read by JavaScript, so it protects against token theft via
   XSS, but because the browser sends cookies automatically, I then need **CSRF** protection
   with SameSite and/or CSRF tokens. My preferred setup is access token in memory and refresh
   token in an HttpOnly, Secure, SameSite cookie."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Storage          | XSS can steal? | CSRF risk? | Survives reload? | Notes                     |
|------------------|----------------|------------|------------------|---------------------------|
| localStorage     | Yes            | No         | Yes              | Simple, most exposed      |
| sessionStorage   | Yes            | No         | Per tab          | Same XSS issue            |
| HttpOnly cookie  | No (can't read)| Yes        | Yes              | Needs SameSite/CSRF token |
| Memory (JS var)  | Harder         | No         | No               | Refresh via cookie        |

-----------------------------------------------------
Example (server sets cookie, client never touches it)
-----------------------------------------------------
// server
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000,
});

// auth middleware reads cookie OR header (supports web + mobile)
const cookieParser = require('cookie-parser');
app.use(cookieParser());

function getToken(req) {
  if (req.cookies?.accessToken) return req.cookies.accessToken;
  const h = req.headers.authorization;
  return h?.startsWith('Bearer ') ? h.slice(7) : null;
}

// client
fetch('https://api.example.com/me', { credentials: 'include' });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- HttpOnly does not stop XSS itself: the attacker's script can still send requests AS the
  user from that page. It only stops them from stealing the token and using it elsewhere.
- Mobile apps do not have the browser cookie/XSS model -> use secure OS storage
  (Keychain / Keystore) and the Authorization header.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is localStorage always wrong?
A1: Not always - many apps use it with a strong CSP and short tokens - but it is the riskiest option.

Q2: If tokens are in cookies, do I still need CORS config?
A2: Yes, for cross-origin SPAs: credentials: true and an explicit origin on the server.
*/
