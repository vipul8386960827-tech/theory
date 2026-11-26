/* 8_rate_limiting_and_helmet.js

=====================================================
Rate Limiting and Helmet
=====================================================

Definition (What I should say in the interview):
- "**Rate limiting** restricts how many requests a client can make in a time window, which
   protects against brute-force login attempts, credential stuffing and simple abuse/DoS. In
   Express I use express-rate-limit, with a strict limit on auth routes. **Helmet** is a
   middleware that sets security-related HTTP headers, like Content-Security-Policy,
   Strict-Transport-Security and X-Content-Type-Options, and removes X-Powered-By. Both are
   cheap, one-line defenses I add to every Express app."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Rate limit by IP (default) or by user id / email for login routes.
2. Return **429 Too Many Requests** with a Retry-After header.
3. Behind a proxy/load balancer set app.set('trust proxy', 1), otherwise every user shares
   the proxy IP.
4. Default store is in memory -> with multiple instances use a Redis store.
5. Helmet headers: CSP (limits script sources, XSS defense), HSTS (force HTTPS),
   X-Frame-Options / frame-ancestors (clickjacking), nosniff, Referrer-Policy.

-----------------------------------------------------
Example
-----------------------------------------------------
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.set('trust proxy', 1);
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,      // 15 minutes
  limit: 100,                     // 100 requests per IP per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,   // count only failed attempts
  message: { message: 'Too many login attempts, try again later' },
});

app.use('/api', apiLimiter);
app.post('/api/auth/login', loginLimiter, login);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Rate limiting in the app is not real DDoS protection; that is handled at the edge (CDN, WAF,
  Nginx). It is mainly for abuse and brute force.
- Helmet's default CSP can break inline scripts or CDNs -> configure directives explicitly.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why limit by email on login and not only IP?
A1: Attackers rotate IPs. Limiting per account stops targeted brute force (but be careful
    not to let attackers lock out real users permanently).

Q2: What does HSTS do?
A2: Tells the browser to use only HTTPS for the domain for a period, preventing downgrade attacks.
*/
