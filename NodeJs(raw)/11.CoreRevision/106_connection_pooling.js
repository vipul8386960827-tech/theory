/* 8_connection_pooling.js

=====================================================
Connection Pooling
=====================================================

Definition (What I should say in the interview):
- "A connection pool is a **set of open database connections that are reused** instead of
   opening a new connection for every request. Opening a TCP connection with TLS and auth is
   expensive, so the driver keeps connections ready and lends one to each operation. With
   Mongoose I call mongoose.connect() **once at startup**, and the MongoDB driver manages the
   pool automatically; I can tune it with maxPoolSize and minPoolSize."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Node driver default maxPoolSize is 100 (drivers 4.x and later; older 3.x driver used 5).
2. minPoolSize (default 0) keeps some connections warm.
3. If all connections are busy, operations wait in a queue (waitQueueTimeoutMS).
4. The pool is per MongoClient (per mongoose connection) and per Node process.
   With PM2 cluster of 4 processes x 100 = up to 400 connections to the DB.
5. SQL drivers (pg Pool, mysql2 createPool) work the same way, but defaults are smaller
   (pg Pool default max is 10).

-----------------------------------------------------
Example
-----------------------------------------------------
// MongoDB / Mongoose
await mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 50,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
});

// PostgreSQL
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.PG_URL, max: 20, idleTimeoutMillis: 30000 });
const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Calling mongoose.connect() inside a route handler -> new pool per request, connection storm.
- In serverless (Lambda/Vercel) not caching the connection in a global variable between
  invocations -> exhausts Atlas connection limits.
- With pg, using pool.connect() for a client and forgetting client.release() -> pool leak.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is a bigger pool always better?
A1: No. The DB server has limits on connections and CPU; too many connections cause
    contention. Size it based on load testing and the number of app instances.

Q2: Does one slow query block others?
A2: It holds one connection while running; others use the remaining pool connections. Only
    when the pool is exhausted do operations start waiting.
*/
