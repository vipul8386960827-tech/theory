/* 26_brute_force_login_attempts.js

=====================================================
Scenario: Brute Force Attack on the Login Endpoint
=====================================================

The Question (how the interviewer asks it):
- "In the logs you see thousands of failed login attempts per minute on
   /login. Someone is guessing passwords. How do you stop it?"

What the interviewer is checking:
- Rate limiting, and why it must be per IP AND per account
- Shared store (Redis) when you run many server instances
- Lockout / exponential backoff without letting attackers lock out real users
- Extra defenses: CAPTCHA, generic errors, slow hashing, MFA

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify first: is it one IP or many IPs (distributed)? One account or
   many accounts (credential stuffing)? Do we run behind a proxy/load balancer?
2. Rate limit per IP on /login (for example 10 attempts per 15 minutes).
   Behind a proxy I set app.set('trust proxy', 1) so req.ip is the real IP.
3. Rate limit per account (email) too, because attackers rotate IPs.
   For example, after 5 failures, add a delay that grows each time.
4. Use Redis as the store, so all server instances share the same counters.
   The default memory store does not work with multiple instances.
5. Prefer backoff or temporary lockout (15 min) instead of a permanent lock,
   otherwise an attacker can lock out any real user on purpose.
6. After a few failures, show a CAPTCHA. Return the same generic message
   "Invalid email or password" so attackers cannot find valid emails.
7. Defense in depth: bcrypt/argon2 for passwords (slow on purpose), MFA,
   breached-password checks, alerting, and a WAF/Cloudflare at the edge.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');

app.set('trust proxy', 1);                   // behind one proxy / load balancer

const loginIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,                                 // 10 tries per IP per 15 min
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: new RedisStore({ sendCommand: (...args) => redis.sendCommand(args) }),
  message: { message: 'Too many attempts, try again later' },
});

app.post('/login', loginIpLimiter, async (req, res) => {
  const email = String(req.body.email || '').toLowerCase();
  const key = `login-fail:${email}`;

  const fails = Number(await redis.get(key)) || 0;
  if (fails >= 5) {
    return res.status(429).json({ message: 'Too many attempts, try again later' });
  }

  const user = await User.findOne({ email }).select('+password');
  const ok = user && (await bcrypt.compare(req.body.password, user.password));

  if (!ok) {
    await redis.multi().incr(key).expire(key, 15 * 60).exec();
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  await redis.del(key);                      // reset on success
  issueTokens(res, user);
  res.json({ message: 'Logged in' });
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I add rate limiting on the login route, both per IP and per account,
   because attackers can rotate IPs. The counters live in Redis so they work
   across all instances. After several failures I add a growing delay or a
   short lockout and a CAPTCHA, and I always return a generic 'invalid email
   or password' message. Passwords are hashed with bcrypt, and I recommend
   MFA and edge protection like a WAF."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Only per-IP limiting - a botnet with 10,000 IPs passes easily.
- Using the in-memory store with several instances or a cluster.
- Permanent account lockout, which becomes a denial-of-service tool.
- Different errors like "user not found" vs "wrong password" (user enumeration).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is 'trust proxy' important here?
A1: Behind a load balancer, req.ip is the proxy's IP, so all users share one
    limit. With trust proxy, Express reads X-Forwarded-For. Set it to the
    exact number of proxies, not "true", or clients can fake their IP.

Q2: What is credential stuffing and how is it different?
A2: Attackers use leaked email/password pairs from other sites, one try per
    account. Per-account limits help less; MFA, breached-password checks and
    bot detection help more.

Q3: Why does bcrypt help against brute force?
A3: It is slow on purpose (cost factor), so even if the hash DB leaks,
    offline guessing is very expensive. It also adds a salt per password.
*/
