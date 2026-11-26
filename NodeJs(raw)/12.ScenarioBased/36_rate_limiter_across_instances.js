/* 36_rate_limiter_across_instances.js

=====================================================
Scenario: Rate limiter that works across multiple instances
=====================================================

The Question (how the interviewer asks it):
- "Design a rate limiter for our public API: 100 requests per minute per
   API key. We run 6 instances. How do you build it?"

What the interviewer is checking:
- Do you know the algorithms: fixed window, sliding window, token bucket?
- Do you know why in-memory counters fail with many instances?
- Can you implement it with Redis atomically (INCR + EXPIRE)?
- Do you return correct HTTP: 429, Retry-After, RateLimit headers?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify: limit per what (IP, user, API key)? Which endpoints? Are there
   stricter limits for login or OTP endpoints?
2. Explain why memory fails: each instance counts alone, so with 6 instances
   a client can get 6 x 100 requests. Counters must be shared -> Redis.
3. Choose the algorithm:
   | Algorithm      | Idea                         | Trade-off                 |
   |----------------|------------------------------|---------------------------|
   | Fixed window   | counter per minute           | simple; burst at the edge |
   | Sliding window | count requests in last 60s   | fair; more memory/work    |
   | Token bucket   | tokens refill at fixed rate  | allows small bursts       |
4. Start simple: fixed window with Redis INCR + EXPIRE. INCR is atomic, so
   two instances never lose a count.
5. Return 429 Too Many Requests with Retry-After, plus RateLimit-Limit /
   RateLimit-Remaining headers so clients can back off.
6. Decide failure mode: if Redis is down, usually "fail open" (allow) for
   normal APIs, but "fail closed" for sensitive ones like login.
7. In real projects I would use express-rate-limit with rate-limit-redis,
   or limit at the API gateway / Nginx / Cloudflare level as well.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// Fixed window rate limiter shared by all instances via Redis
function rateLimit({ limit = 100, windowSec = 60 } = {}) {
  return async (req, res, next) => {
    const id = req.get('x-api-key') || req.ip;
    const window = Math.floor(Date.now() / 1000 / windowSec);
    const key = `rl:${id}:${window}`;

    try {
      const results = await redis.multi()
        .incr(key)
        .expire(key, windowSec)        // key cleans itself up
        .exec();
      const count = Number(results[0]);

      const resetIn = windowSec - (Math.floor(Date.now() / 1000) % windowSec);
      res.set('RateLimit-Limit', String(limit));
      res.set('RateLimit-Remaining', String(Math.max(0, limit - count)));
      res.set('RateLimit-Reset', String(resetIn));

      if (count > limit) {
        res.set('Retry-After', String(resetIn));
        return res.status(429).json({ error: 'Too many requests' });
      }
      next();
    } catch (err) {
      console.error('Rate limiter error', err.message);
      next();                          // fail open if Redis is down
    }
  };
}

app.use('/api', rateLimit({ limit: 100, windowSec: 60 }));

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "In-memory counters do not work with multiple instances, because each one
   counts separately, so I keep counters in Redis. The simplest approach is
   a fixed window: INCR a key like rl:<apiKey>:<minute> and set EXPIRE, which
   is atomic and shared. If bursts at window edges are a problem I use a
   sliding window with a sorted set or a token bucket in a Lua script. When
   the limit is reached I return 429 with Retry-After and RateLimit headers."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using an in-memory Map with many instances.
- Doing GET then SET instead of atomic INCR (race condition, lost counts).
- Returning 500 or 403 instead of 429, and no Retry-After header.
- Limiting by IP only behind a proxy without `trust proxy` - every user has
  the load balancer's IP.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the problem with fixed window?
A1: A client can send 100 requests at 12:00:59 and 100 more at 12:01:00, so
    200 in two seconds. Sliding window or token bucket smooths this.

Q2: How would you build a sliding window log in Redis?
A2: Use a sorted set per client: ZADD the timestamp, ZREMRANGEBYSCORE old
    entries, ZCARD to count - all in a MULTI or Lua script to stay atomic.

Q3: Where else can rate limiting happen?
A3: At the edge: API gateway, Nginx limit_req, Cloudflare/WAF. Edge limits
    stop abuse before it reaches Node; app limits can use user/plan info.
*/
