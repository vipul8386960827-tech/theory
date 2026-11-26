/* 21_csrf.js

=====================================================
CSRF (Cross-Site Request Forgery)
=====================================================

Definition (What I should say in the interview):
- "CSRF is when a malicious site makes the user's browser send a request to our site, and the
   browser **automatically attaches our cookies**, so the request runs as the logged-in user -
   for example, a hidden form that posts to /transfer. The attacker cannot read the response,
   but the action still happens. It only matters when auth is cookie-based. Defenses are
   **SameSite** cookies, **CSRF tokens** (synchronizer or double-submit), checking the Origin
   header, and never changing state with GET requests."

-----------------------------------------------------
Flow (attack)
-----------------------------------------------------
1. User logs into bank.com -> session cookie stored.
2. User visits evil.com, which contains an auto-submitting form to bank.com/transfer.
3. Browser sends POST with bank.com cookies -> server thinks it is the user.

-----------------------------------------------------
XSS vs CSRF
-----------------------------------------------------
| Aspect          | XSS                              | CSRF                              |
|-----------------|----------------------------------|-----------------------------------|
| Attacker runs   | Script on OUR site               | Request FROM another site         |
| Can read data?  | Yes                              | No, only triggers actions         |
| Relies on       | Unescaped input                  | Automatic cookie sending          |
| Main defense    | Escaping, CSP                    | SameSite, CSRF tokens             |

-----------------------------------------------------
Example (double-submit token + Origin check)
-----------------------------------------------------
const crypto = require('crypto');

// issue a CSRF token in a readable (NOT HttpOnly) cookie
app.get('/api/csrf-token', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.cookie('csrfToken', token, { secure: true, sameSite: 'strict' });
  res.json({ csrfToken: token });
});

// frontend sends it back in a header: X-CSRF-Token
function csrfProtect(req, res, next) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const origin = req.get('origin');
  if (origin && origin !== process.env.APP_ORIGIN) return res.sendStatus(403);
  const header = req.get('x-csrf-token');
  if (!header || header !== req.cookies.csrfToken) return res.sendStatus(403);
  next();
}
app.use(csrfProtect);
// libraries: csrf-csrf, csrf-sync (the old csurf package is deprecated)

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Tokens sent only in the Authorization header (not cookies) are not vulnerable to CSRF,
  because the browser does not attach them automatically.
- Production double-submit should sign the token (HMAC tied to the session) so a subdomain
  cannot plant its own cookie value.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does a CSRF token work?
A1: The attacker's site cannot read our cookies or responses, so it cannot know the token to
    put in the header.

Q2: Does CORS prevent CSRF?
A2: No. CORS stops reading responses; simple form POSTs are still sent.
*/
