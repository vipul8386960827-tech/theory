/* 21_too_many_db_connections.js

=====================================================
Scenario: Too Many DB Connections Under Load
=====================================================

The Question (how the interviewer asks it):
- "When traffic goes up, the API starts failing with 'too many connections'
  or 'connection timed out' errors from the database. What is wrong and how
  do you fix it?"

What the interviewer is checking:
- Do you understand connection pooling?
- Do you know to connect ONCE at startup and reuse the pool?
- Can you calculate total connections (instances x pool size)?
- Do you know the serverless (Lambda / Vercel) caveat?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Check the code: the most common bug is calling mongoose.connect() (or
   new Pool() / new MongoClient()) inside a route handler, so every request
   opens a new connection and never closes it.
2. Fix: connect once when the app starts, export the connection, reuse it.
   The driver keeps a pool of sockets and shares them between requests.
3. Do the math: total = number of instances x maxPoolSize. 20 pods x pool
   100 = 2,000 connections. The DB has a limit (Postgres default
   max_connections = 100, Atlas tier limits). Tune maxPoolSize to fit.
4. Set timeouts so requests fail fast instead of hanging:
   serverSelectionTimeoutMS, waitQueueTimeoutMS, socketTimeoutMS.
5. Connection timeouts can also mean the pool is busy because queries are
   slow. Fix slow queries and N+1 (files 16, 17) - each slow query holds a
   connection longer.
6. Serverless: each function instance has its own pool. Cache the
   connection in a global variable outside the handler, use a small
   maxPoolSize, and for Postgres use a pooler (PgBouncer, RDS Proxy).
7. Monitor: connection count in Atlas / pg_stat_activity, pool wait time,
   and close the pool on SIGTERM for clean shutdown.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: new connection on every request
app.get("/users", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);   // opens again and again
  res.json(await User.find().lean());
});

// GOOD: db.js - connect once at startup, reuse the pool
import mongoose from "mongoose";
export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 20,                 // default is 100 per client
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,  // fail fast if DB is unreachable
    waitQueueTimeoutMS: 5000,        // max wait for a free connection
  });
}
// server.js
await connectDB();
app.listen(3000);
process.on("SIGTERM", async () => { await mongoose.disconnect(); process.exit(0); });

// SERVERLESS: cache across warm invocations
let cached = globalThis._mongoose;
export async function getDB() {
  if (!cached) {
    cached = globalThis._mongoose = mongoose.connect(process.env.MONGO_URI,
      { maxPoolSize: 5 });
  }
  return cached;                     // reuse same promise / connection
}

// PostgreSQL: create ONE pool, use pool.query() (auto release)
// const pool = new pg.Pool({ max: 10 });
// const client = await pool.connect(); try {...} finally { client.release(); }

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Usually the app opens a new connection per request instead of using a
  pool. I connect once at startup and reuse the driver's pool. Then I check
  the math: instances times maxPoolSize must stay under the DB limit, so I
  tune maxPoolSize and add timeouts. I also fix slow queries because they
  hold connections longer. In serverless I cache the connection globally
  and use a proxy like PgBouncer or RDS Proxy for SQL."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Just increase max_connections on the database" - each connection uses
  memory on the DB server; it hides the real bug.
- Setting a huge pool (1000) "to be safe" in every instance.
- In pg, forgetting client.release() after pool.connect() - pool leaks.
- Not knowing that autoscaling multiplies the connection count.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is a connection pool?
A1: A set of open, reusable DB connections. A request borrows one, runs the
    query, and gives it back. It avoids the cost of TCP + TLS + auth on
    every request and limits load on the DB.

Q2: Is a bigger pool always faster?
A2: No. After a point the DB spends time switching between connections and
    gets slower. A moderate pool plus fast queries is better.

Q3: How do you know if the problem is pool size or slow queries?
A3: Look at pool wait time and query duration. If queries are fast but
    requests wait for a connection, the pool is too small. If queries are
    slow, fix queries and indexes first.
*/
