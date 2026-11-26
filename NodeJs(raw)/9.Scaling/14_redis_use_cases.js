/* 14_redis_use_cases.js

=====================================================
Redis Use Cases in Node.js
=====================================================

Definition (What I should say in the interview):
- "Redis is an **in-memory key-value data store**, so reads and writes are very fast, usually
   under a millisecond. In Node projects I mostly use it as a **cache**, a **session store**, for
   **rate limiting**, and as the backend for **job queues** like BullMQ. It also has **pub/sub**,
   which is how Socket.io instances share events. Because it's external to the app, all Node
   instances can share the same state, which is exactly what we need when scaling out."

-----------------------------------------------------
Common Use Cases
-----------------------------------------------------
| Use case          | Redis feature            | Example                                 |
|-------------------|--------------------------|-----------------------------------------|
| Caching           | GET / SET with EX        | Product details, API responses          |
| Sessions          | Keys with TTL            | connect-redis for express-session       |
| Rate limiting     | INCR + EXPIRE            | 100 requests per minute per IP          |
| Job queues        | Lists / Streams          | BullMQ email and image jobs             |
| Pub/Sub           | PUBLISH / SUBSCRIBE      | Socket.io adapter, cache invalidation   |
| Leaderboards      | Sorted sets (ZADD)       | Top 10 scores                           |
| Distributed lock  | SET key val NX PX        | Only one instance runs a cron job       |
| Counters          | INCR                     | Page views, likes                       |

-----------------------------------------------------
Example (rate limiter + lock)
-----------------------------------------------------
const { createClient } = require('redis');
const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// Fixed-window rate limit middleware
async function rateLimit(req, res, next) {
  const key = `rl:${req.ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60);       // window = 60 seconds
  if (count > 100) return res.status(429).send('Too many requests');
  next();
}

// Simple distributed lock for a scheduled job
const gotLock = await redis.set('lock:daily-report', process.pid, { NX: true, PX: 60000 });
if (gotLock) await generateDailyReport();             // only one instance runs it

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Treating Redis as the primary database without persistence (RDB/AOF) -> data lost on restart.
- Using KEYS * in production -> blocks Redis (it is single-threaded for commands). Use SCAN.
- Not setting TTLs -> memory fills up; configure maxmemory and an eviction policy.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is Redis fast?
A1: Data lives in RAM, simple data structures, and a single-threaded command loop with no locks.

Q2: Redis vs in-memory Map in Node?
A2: A Map is faster but per process and lost on restart. Redis is shared across all instances.

Q3: What is an eviction policy?
A3: What Redis removes when memory is full, e.g. allkeys-lru removes least recently used keys.
*/
