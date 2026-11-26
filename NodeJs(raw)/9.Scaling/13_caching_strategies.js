/* 13_caching_strategies.js

=====================================================
Caching Strategies
=====================================================

Definition (What I should say in the interview):
- "Caching means **storing the result of an expensive operation** so the next request can get
   it faster, without hitting the database or an external API again. The most common pattern
   I use is **cache-aside**: check the cache first, if it's a miss read from the DB and store it
   with a **TTL**. Caching can happen at many layers - browser/CDN via HTTP headers, in-memory
   in the process, or a shared cache like **Redis**. The hard part is **invalidation**, so I
   always decide how stale the data is allowed to be."

-----------------------------------------------------
Strategies
-----------------------------------------------------
| Pattern        | How it works                                       | Trade-off                 |
|----------------|----------------------------------------------------|---------------------------|
| Cache-aside    | App reads cache, on miss loads DB and fills cache  | Simple; first read slow   |
| Read-through   | Cache layer itself loads from DB on miss           | Needs cache library       |
| Write-through  | Write to cache and DB together                     | Fresh data; slower writes |
| Write-behind   | Write to cache, flush to DB later                  | Fast; risk of data loss   |
| TTL expiry     | Entry auto-expires after N seconds                 | Can serve stale data      |

-----------------------------------------------------
Where to cache
-----------------------------------------------------
1. **HTTP / CDN** -> Cache-Control, ETag for static files and public GET responses.
2. **In-process** (Map, lru-cache) -> fastest, but per instance and lost on restart.
3. **Distributed** (Redis) -> shared by all instances, survives app restarts.
4. **DB level** -> query cache, materialized views.

-----------------------------------------------------
Example (cache-aside with Redis)
-----------------------------------------------------
async function getProduct(id) {
  const key = `product:${id}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);              // cache hit

  const product = await Product.findById(id);         // cache miss -> DB
  if (product) await redis.set(key, JSON.stringify(product), { EX: 300 });  // 5 min TTL
  return product;
}

async function updateProduct(id, data) {
  const p = await Product.findByIdAndUpdate(id, data, { new: true });
  await redis.del(`product:${id}`);                   // invalidate on write
  return p;
}

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- **Cache stampede**: a hot key expires and 1000 requests hit the DB together -> use a lock,
  request coalescing, or add random jitter to TTLs.
- Caching user-specific data under a shared key -> data leak between users.
- Unbounded in-memory cache (plain object) -> memory leak. Use LRU with a max size.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why delete the key on update instead of setting the new value?
A1: Deleting is simpler and avoids race conditions where an older write overwrites a newer one.

Q2: What would you NOT cache?
A2: Highly changing data like stock balances or payment status, and anything with strict consistency.
*/
