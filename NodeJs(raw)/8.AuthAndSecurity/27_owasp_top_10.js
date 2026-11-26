/* 27_owasp_top_10.js

=====================================================
OWASP Top 10 (2021)
=====================================================

Definition (What I should say in the interview):
- "The OWASP Top 10 is a standard awareness list of the most critical web application security
   risks, published by the Open Web Application Security Project. The current widely used
   version is 2021, and number one is **Broken Access Control**, followed by Cryptographic
   Failures and Injection. I use it as a checklist when building or reviewing a Node API - for
   each item I know the typical Node mistake and the fix."

-----------------------------------------------------
The List (2021) with Node.js examples
-----------------------------------------------------
| #   | Risk                                   | Node/Express example -> fix                                |
|-----|----------------------------------------|-----------------------------------------------------------|
| A01 | Broken Access Control                  | Missing ownership check (IDOR) -> authZ middleware + owner |
| A02 | Cryptographic Failures                 | MD5 passwords, no HTTPS -> bcrypt/argon2, TLS, AES-GCM     |
| A03 | Injection (incl. XSS)                  | String SQL, {"$gt": ""} -> parameterize, validate types    |
| A04 | Insecure Design                        | No rate limit on OTP/reset -> threat model, limits         |
| A05 | Security Misconfiguration              | Stack traces in prod, open CORS -> helmet, NODE_ENV        |
| A06 | Vulnerable and Outdated Components     | Old npm packages -> npm audit, Dependabot, lockfile        |
| A07 | Identification and Authentication Fail.| Weak passwords, no brute-force limit -> 2FA, rate limit    |
| A08 | Software and Data Integrity Failures   | Unverified webhooks, unsafe deserialization -> HMAC verify |
| A09 | Security Logging and Monitoring Fail.  | No login-failure logs -> structured logs + alerts          |
| A10 | Server-Side Request Forgery (SSRF)     | fetch(req.body.url) to 169.254.169.254 -> URL allowlist    |

-----------------------------------------------------
Example (two quick fixes)
-----------------------------------------------------
// A05: do not leak internals in production errors
app.use((err, req, res, next) => {
  logger.error({ err, path: req.path });
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    message: isProd && !err.isOperational ? 'Something went wrong' : err.message,
  });
});

// A10: SSRF - only allow known hosts
const ALLOWED_HOSTS = new Set(['api.partner.com']);
const target = new URL(req.body.imageUrl);
if (target.protocol !== 'https:' || !ALLOWED_HOSTS.has(target.hostname)) {
  return res.status(400).json({ message: 'URL not allowed' });
}

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- 2021 changes vs 2017: Broken Access Control moved to #1; XSS merged into Injection; new
  categories Insecure Design, Integrity Failures and SSRF.
- OWASP also has a separate **API Security Top 10** (e.g. BOLA, mass assignment), useful for
  REST backends.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which item is most common in Node APIs?
A1: Broken Access Control - routes that check login but not whether the user owns the resource.

Q2: How do you handle A06 in a Node project?
A2: Run npm audit in CI, use Dependabot/Renovate, commit package-lock.json, remove unused deps.
*/
