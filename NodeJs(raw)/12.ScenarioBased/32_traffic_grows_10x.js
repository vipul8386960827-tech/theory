/* 32_traffic_grows_10x.js

=====================================================
Scenario: Traffic will grow 10x next month
=====================================================

The Question (how the interviewer asks it):
- "Marketing is launching a big campaign. Traffic will grow 10x next month.
   How do you prepare our Node.js app?"

What the interviewer is checking:
- Do you measure first, or do you guess?
- Do you understand stateless servers and horizontal scaling?
- Do you know that the database is often the real bottleneck?
- Do you validate the plan with load testing before the launch?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Measure first. I check current numbers: requests per second, p95/p99
   latency, CPU, memory, event loop lag, DB query times. I find the slowest
   and most-called endpoints with APM (Datadog, New Relic) or logs.
2. Make servers stateless. No sessions, uploads or caches kept in process
   memory. Sessions go to Redis, files go to S3. Then any server can handle
   any request.
3. Use all CPU cores. One Node process uses one core for JS. I run one
   process per core with PM2 cluster mode (or node:cluster), or more
   containers in Kubernetes.
4. Scale horizontally behind a load balancer (Nginx, AWS ALB). Add
   auto-scaling based on CPU or request count, and a /health endpoint.
5. Protect the database. Add indexes for slow queries, use a connection
   pool with a sane size, add read replicas for read-heavy traffic. Remember:
   10 app servers x 20 pool connections = 200 DB connections.
6. Add caching. Redis for hot data, CDN for static files and public pages.
7. Move slow work out of the request. Emails, PDFs, image processing go to
   a queue (BullMQ) and background workers.
8. Load test with k6 or autocannon at 10x+ traffic on a staging copy, fix
   what breaks first, repeat. Add rate limiting and alerts before launch day.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// ecosystem.config.js - PM2 cluster mode: one process per CPU core
module.exports = {
  apps: [{
    name: 'api',
    script: './server.js',
    instances: 'max',          // one worker per core
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    env: { NODE_ENV: 'production' },
  }],
};

// server.js - stateless app with a health check
const express = require('express');
const app = express();

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// BAD:  const sessions = {};  -> lost on restart, not shared between servers
// GOOD: store sessions/cache in Redis (see file 33 and 34)

const server = app.listen(process.env.PORT || 3000);

// Graceful shutdown so the load balancer can drain traffic during deploys
process.on('SIGTERM', () => server.close(() => process.exit(0)));

// Load test (k6 / autocannon):
//   npx autocannon -c 200 -d 30 http://staging.example.com/api/products

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "First I measure: current RPS, latency, CPU, memory and slow DB queries,
   so I know the real bottleneck. Then I make the app stateless by moving
   sessions and files out of memory, run one process per core with PM2 or
   containers, and scale horizontally behind a load balancer with
   auto-scaling. I protect the database with indexes, pooling, read replicas
   and Redis caching, and move heavy work to queues. Finally I load test at
   more than 10x on staging before the launch."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Just buy a bigger server." Vertical scaling has limits and one server is
  a single point of failure.
- Adding servers without making the app stateless (sessions break, see 33).
- Forgetting the database. More app servers can overload the DB faster.
- No load testing - hoping it works on launch day.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is one Node process not enough on an 8-core machine?
A1: JavaScript runs on one main thread, so one process uses about one core
    for JS. Cluster/PM2 runs several processes to use all cores.

Q2: What metrics tell you a Node process is overloaded?
A2: High event loop lag, CPU near 100%, rising p99 latency, growing memory,
    and many requests waiting for DB connections from the pool.

Q3: How do you avoid too many DB connections when you scale out?
A3: Keep the pool size small per process, calculate the total
    (instances x pool size), and use a pooler like PgBouncer or RDS Proxy.
*/
