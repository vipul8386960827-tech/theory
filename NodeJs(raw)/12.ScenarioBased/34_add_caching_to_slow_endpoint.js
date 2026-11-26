/* 34_add_caching_to_slow_endpoint.js

=====================================================
Scenario: Add caching to a slow, read-heavy endpoint
=====================================================

The Question (how the interviewer asks it):
- "GET /products/:id is called thousands of times per minute and takes
   800ms because of a heavy DB query. Data changes rarely. How would you
   make it fast?"

What the interviewer is checking:
- Do you know the cache-aside pattern with Redis?
- Do you think about TTL and invalidation (stale data)?
- Do you know cache stampede and how to avoid it?
- Do you know what should NOT be cached?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Measure first. Maybe a missing index fixes it. Caching should not hide a
   bad query that is easy to fix.
2. Use cache-aside: read from Redis first. On a miss, read from the DB, save
   the result in Redis with a TTL, and return it.
3. Choose a TTL based on how stale data may be (e.g. 5-10 minutes for a
   product page). TTL is the safety net if invalidation is missed.
4. Invalidate on write: when a product is updated or deleted, delete its
   cache key, so the next read loads fresh data.
5. Handle cache stampede: when a hot key expires, many requests hit the DB
   at the same time. Fixes: share one in-flight promise per key, a Redis
   lock, or add random jitter to TTLs so keys do not expire together.
6. Make the cache optional: if Redis fails, log it and fall back to the DB.
   The app must not crash because the cache is down.
7. Do not cache: user-specific private data under a shared key, fast-changing
   data like stock counts at checkout or balances, and error responses.
8. Also consider HTTP caching (Cache-Control, ETag) and a CDN for public data.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const { createClient } = require('redis');
const redis = createClient({ url: process.env.REDIS_URL });
redis.connect().catch(console.error);

const inFlight = new Map();   // stampede protection inside one process

async function getProduct(id) {
  const key = `product:${id}`;
  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);              // cache hit
  } catch (err) { console.warn('Redis read failed', err.message); }

  if (inFlight.has(key)) return inFlight.get(key);      // reuse same DB call

  const promise = (async () => {
    const product = await db.products.findById(id);      // slow query
    if (product) {
      const ttl = 600 + Math.floor(Math.random() * 60);  // TTL + jitter
      redis.set(key, JSON.stringify(product), { EX: ttl }).catch(() => {});
    }
    return product;
  })().finally(() => inFlight.delete(key));

  inFlight.set(key, promise);
  return promise;
}

app.get('/products/:id', async (req, res) => {
  const product = await getProduct(req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

app.put('/products/:id', async (req, res) => {
  const updated = await db.products.update(req.params.id, req.body);
  await redis.del(`product:${req.params.id}`);           // invalidate on write
  res.json(updated);
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "First I check if a simple fix like an index solves it. If not, I use
   cache-aside with Redis: check the cache, on a miss query the DB and store
   the result with a TTL. On every update or delete I remove the key, so
   users do not see stale data for long. For hot keys I protect against
   cache stampede with request coalescing or a lock and TTL jitter. And if
   Redis is down, the app falls back to the database."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Caching without a TTL and without invalidation - stale data forever.
- Caching user-specific data under a shared key (one user sees another
  user's data - a security bug).
- Using a plain in-memory object as cache with many servers: each server has
  different data and memory grows without limit.
- Letting the app crash when Redis is unavailable.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why delete the cache key on update instead of updating it?
A1: Delete is simpler and safer. With two concurrent writes, "set" can leave
    old data in the cache. The next read will load fresh data anyway.

Q2: In-memory cache (lru-cache) vs Redis?
A2: In-memory is fastest but per-process, lost on restart and not shared.
    Redis is shared by all servers. Some apps use both (small L1 + Redis L2).

Q3: How do you know the cache is working?
A3: Track the hit ratio, latency before/after, and Redis memory and
    evictions. A low hit ratio means bad keys or a TTL that is too short.
*/
