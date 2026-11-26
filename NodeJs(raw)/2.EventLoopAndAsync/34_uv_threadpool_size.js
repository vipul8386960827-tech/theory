/* 34_uv_threadpool_size.js

=====================================================
UV_THREADPOOL_SIZE
=====================================================

Definition (What I should say in the interview):
- "UV_THREADPOOL_SIZE is an environment variable that controls how many threads libuv creates
   for its thread pool. The default is **4** and the maximum is **1024**. It has to be set
   **before the pool is first used**, and the safest way is outside the code, like
   UV_THREADPOOL_SIZE=16 node app.js. I would increase it when the app does a lot of concurrent
   fs, crypto or dns.lookup work and I see those operations queueing, but not blindly, because
   more threads than CPU cores mostly adds context switching for CPU-heavy tasks."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Default 4, max 1024.
2. The pool is created lazily on first use; size cannot change after that.
3. Set via env: UV_THREADPOOL_SIZE=8 node app.js (Linux/macOS) or set in Docker/PM2 config.
4. Setting process.env.UV_THREADPOOL_SIZE at the very top of the entry file works on Linux in
   most cases, but is not reliable on Windows -> prefer setting it outside the process.
5. Good guideline: for CPU-bound pool work (crypto), about the number of cores; for slow
   fs on network disks, it can be higher.

-----------------------------------------------------
Example
-----------------------------------------------------
// run:  node 34_uv_threadpool_size.js
// then: UV_THREADPOOL_SIZE=8 node 34_uv_threadpool_size.js
const crypto = require('crypto');
const os = require('os');
const start = Date.now();

console.log('cores:', os.availableParallelism(), 'pool:', process.env.UV_THREADPOOL_SIZE || 4);

for (let i = 1; i <= 8; i++) {
  crypto.pbkdf2('pw', 'salt', 200000, 64, 'sha512', () =>
    console.log(`task ${i}:`, Date.now() - start, 'ms'));
}
// pool 4 -> results come in two waves (4 + 4)
// pool 8 -> all 8 finish around the same time (if you have 8 cores)

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Thinking a bigger pool makes HTTP requests faster. Network I/O does not use the pool.
- Setting it to 1024 "just in case" - each thread uses memory and CPU contention gets worse.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is the pool size per process or per machine?
A1: Per process. With cluster mode and 4 workers, each worker has its own pool.

Q2: How did you decide to change it (real scenario)?
A2: Measured latency of fs/crypto under load; if tasks were queueing and CPU was free, increased it and load-tested again.

Q3: What is the alternative for heavy CPU work?
A3: worker_threads or a separate service, instead of only growing the libuv pool.
*/
