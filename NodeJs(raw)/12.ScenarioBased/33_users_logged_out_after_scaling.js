/* 33_users_logged_out_after_scaling.js

=====================================================
Scenario: Users logged out after adding a second server
=====================================================

The Question (how the interviewer asks it):
- "Everything worked with one server. After we added a second server behind
   the load balancer, users randomly get logged out or lose their cart.
   What is happening and how do you fix it?"

What the interviewer is checking:
- Do you understand that in-memory state is not shared between servers?
- Do you know the fix: a shared session store like Redis?
- Can you explain sticky sessions and their trade-offs?
- Do you know stateless auth (JWT) as an alternative?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Find the cause. express-session uses MemoryStore by default. The session
   lives in the memory of server A. When the load balancer sends the next
   request to server B, B does not know the session, so the user looks
   logged out.
2. Confirm it: check the session config, and check logs to see the same
   user hitting different instances before the "logout".
3. Real fix: move sessions to a shared store, usually Redis (connect-redis).
   Now every server reads the same session data.
4. Make sure all servers use the same session secret, and set cookie
   options: httpOnly, secure, sameSite, maxAge.
5. Mention sticky sessions: the load balancer always sends a user to the
   same server. Quick fix, but load is uneven and sessions are still lost
   when that server restarts or crashes. I use it only as a temporary step.
6. Alternative: JWT (stateless tokens). No server storage, any server can
   verify. But logout/revoke is harder, so use short-lived access tokens
   plus refresh tokens.
7. Check other in-memory state too: caches, rate limit counters, uploaded
   files on local disk. They have the same problem.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const express = require('express');
const session = require('express-session');
const { RedisStore } = require('connect-redis');   // connect-redis v7+
const { createClient } = require('redis');

const app = express();
app.set('trust proxy', 1);                // behind a load balancer (HTTPS)

// BAD: default MemoryStore - each server has its own sessions
// app.use(session({ secret: 'x', resave: false, saveUninitialized: false }));

// GOOD: shared Redis store - every server sees the same sessions
const redisClient = createClient({ url: process.env.REDIS_URL });
await redisClient.connect();              // ESM / top-level await (or wrap in async fn)

app.use(session({
  store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
  secret: process.env.SESSION_SECRET,     // SAME secret on all servers
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,          // 1 day
  },
}));

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "The sessions are stored in the memory of each server, which is the
   default MemoryStore. When the load balancer sends a user to the other
   server, that server has no session, so the user looks logged out. The
   proper fix is a shared session store like Redis, with the same secret on
   all servers. Sticky sessions can hide the problem, but load becomes uneven
   and sessions still die with the server. Another option is stateless JWT
   auth, with short-lived tokens and refresh tokens."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Saying "just use sticky sessions" as the final solution.
- Not knowing that MemoryStore is the default and is not for production
  (it also leaks memory).
- Different SESSION_SECRET values per server, so cookies fail verification.
- Saying JWT has "no downsides" - revocation and token theft are real issues.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens if Redis goes down?
A1: Nobody can log in or read sessions. Use a managed Redis with
    replication/failover (e.g. ElastiCache), and monitor it.

Q2: How do you log out a user when using JWT?
A2: Keep access tokens short (5-15 minutes), store refresh tokens in the DB
    or Redis and delete them on logout, or keep a denylist of token ids.

Q3: Where should a browser store the token?
A3: Prefer an httpOnly, secure cookie so JavaScript cannot read it (protects
    from XSS). Then add CSRF protection, e.g. sameSite cookies or CSRF tokens.
*/
