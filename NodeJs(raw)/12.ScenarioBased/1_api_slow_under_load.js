/* 1_api_slow_under_load.js

=====================================================
Scenario: API Is Fast Alone, Slow Under Load
=====================================================

The Question (how the interviewer asks it):
- "Your API responds in 50ms when you test it, but when traffic increases it becomes slow
   (2-3 seconds) for everyone. How do you find and fix the cause?"

What the interviewer is checking:
- Do you MEASURE first, or do you guess?
- Do you know the common bottlenecks: blocking the event loop, DB pool / slow queries,
  slow external calls, missing caching, single process on a multi-core machine.
- Do you know tools: load testing (autocannon/k6), APM, clinic.js, --inspect, DB slow logs.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify: which endpoints are slow - all of them, or only some? When did it start (after a
   deploy, or only at peak traffic)? Is CPU, memory, or the DB at 100%?
2. Reproduce locally with a load test, e.g. `npx autocannon -c 100 -d 20 http://localhost:3000/api`
   and compare p50 / p95 / p99 latency, not only the average.
3. Check the process: CPU usage and event loop lag (perf_hooks.monitorEventLoopDelay or APM).
   High CPU + high lag = something is blocking the event loop (sync code, big JSON, crypto).
   Use `clinic doctor` / `clinic flame` or `node --inspect` CPU profile to find the function.
4. Low CPU but slow responses = the app is WAITING. Usually the DB: slow queries (missing
   index), or the connection pool is too small so requests queue for a connection.
   Check DB slow query log, EXPLAIN, and pool stats.
5. Check external calls (other services) with timing logs or APM traces; add timeouts.
6. Fix the real cause: add indexes, fix N+1 queries, tune pool size, cache hot data in Redis,
   move CPU work to worker threads, paginate large responses, enable compression at the proxy.
7. Scale out: use all CPU cores (cluster / PM2 / multiple containers) behind a load balancer.
8. Verify with the same load test, and add monitoring + alerts on p95 latency.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: sync work + N+1 queries + no cache
app.get('/products', async (req, res) => {
  const products = await db.query('SELECT * FROM products');          // no limit
  for (const p of products) {
    p.reviews = await db.query('SELECT * FROM reviews WHERE product_id = $1', [p.id]); // N+1
  }
  res.send(JSON.stringify(products, null, 2));                         // big sync stringify
});

// GOOD: pagination, one query, cache, sane pool
const pool = new Pool({ max: 20 });                 // pg pool sized for your DB
app.get('/products', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const key = `products:${page}`;
  const cached = await redis.get(key);
  if (cached) return res.type('json').send(cached);

  const { rows } = await pool.query(
    `SELECT p.id, p.name, COUNT(r.id) AS review_count
       FROM products p LEFT JOIN reviews r ON r.product_id = p.id
      GROUP BY p.id ORDER BY p.id LIMIT 50 OFFSET $1`, [(page - 1) * 50]);

  const body = JSON.stringify(rows);
  await redis.set(key, body, { EX: 60 });           // cache for 60 seconds
  res.type('json').send(body);
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "First I measure instead of guessing: I reproduce the load with autocannon or k6 and look
   at p95 latency, CPU, event loop lag and DB metrics. If CPU and event loop lag are high,
   something is blocking the event loop, so I profile with clinic.js or --inspect. If CPU is
   low, the app is waiting - usually slow queries or a small connection pool - so I check the
   DB slow log and pool. Then I fix the root cause with indexes, caching, pagination or worker
   threads, scale across cores, and confirm with the same load test."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Just add more servers" without finding the bottleneck first.
- Only looking at average latency instead of p95/p99.
- Not knowing the difference between CPU-bound (blocking) and I/O-bound (waiting) slowness.
- Caching everything without thinking about invalidation and stale data.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you know if the event loop is blocked?
A1: Measure event loop delay with perf_hooks.monitorEventLoopDelay() or an APM. If the delay
    is tens or hundreds of ms, sync code is blocking. A CPU profile shows which function.

Q2: Can a bigger DB connection pool always fix it?
A2: No. A pool too big can overload the database. Size it based on DB capacity and the number
    of app instances (instances x pool size must stay under the DB max connections).

Q3: Why is p99 more important than average?
A3: Averages hide slow requests. If p99 is 3s, 1 in 100 users waits 3s - and with many calls
    per page, most users hit at least one slow request.
*/
