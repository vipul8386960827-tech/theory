/* 22_performance_optimization_tips.js

=====================================================
Node.js Performance Optimization Tips
=====================================================

Definition (What I should say in the interview):
- "For Node performance, my first rule is **don't block the event loop**, because one slow
   synchronous operation delays every other request. Then I **measure before optimizing** -
   using profiling, APM tools or load tests - since most of the time the bottleneck is the
   **database or external calls**, not JavaScript. Common wins are adding indexes, caching,
   running independent async calls in parallel, streaming large data, compression, connection
   pooling, and using all CPU cores with cluster or more instances."

-----------------------------------------------------
Key Tips
-----------------------------------------------------
1. **Avoid sync APIs** in request handlers (readFileSync, crypto.pbkdf2Sync, big JSON.parse).
2. **Parallelize** independent awaits with Promise.all instead of awaiting one by one.
3. **DB**: indexes, select only needed fields, pagination, avoid N+1 queries, connection pool.
4. **Cache** hot data in Redis; set HTTP cache headers for static/public responses.
5. **Streams** for large files/exports instead of loading everything into memory.
6. **Compression** (gzip/brotli) - ideally at Nginx/CDN.
7. **Offload CPU work** to worker threads or background jobs.
8. **Use all cores**: PM2 cluster mode or multiple container replicas.
9. Faster libraries where it matters: pino instead of console.log-heavy logging, fastify.
10. Keep Node updated - newer V8 versions are faster.

-----------------------------------------------------
Example
-----------------------------------------------------
// Slow: sequential, about 300ms total
const user = await getUser(id);         // 100ms
const orders = await getOrders(id);     // 100ms
const recs = await getRecs(id);         // 100ms

// Fast: parallel, about 100ms total
const [user2, orders2, recs2] = await Promise.all([getUser(id), getOrders(id), getRecs(id)]);

// Stream a big CSV instead of building it in memory
const { pipeline } = require('stream/promises');
app.get('/export', async (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  await pipeline(Order.find().cursor(), toCsvTransform(), res);
});

// Measuring
// node --inspect app.js          -> Chrome DevTools CPU/heap profiling
// node --prof app.js             -> V8 profiler
// npx autocannon -c 100 -d 20 http://localhost:3000/api   -> load test
// clinic doctor -- node app.js   -> detect event loop blocking / I/O issues

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Optimizing JS code while the real issue is a missing DB index.
- Memory leaks (global arrays, unremoved listeners, unbounded caches) slow down GC over time.
- Monitor event loop lag (perf_hooks.monitorEventLoopDelay) in production.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: An API is slow - how do you investigate?
A1: Check APM/logs for which step is slow (DB, external API, CPU), reproduce with a load test,
    profile, then fix the biggest bottleneck first.

Q2: How do you detect a memory leak?
A2: Watch heap growth over time, take heap snapshots with --inspect and compare them.

Q3: Does setting NODE_ENV=production matter?
A3: Yes. Express and many libraries skip debug work and enable caching (e.g. view caching).
*/
