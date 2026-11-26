/* 3_libuv_thread_pool.js

=====================================================
libuv Thread Pool
=====================================================

Definition (What I should say in the interview):
- "Even though my JavaScript runs on one thread, libuv keeps a **pool of worker threads**,
   4 by default, for work the OS cannot do asynchronously in a portable way. File system calls,
   some crypto functions like pbkdf2 and scrypt, zlib compression and dns.lookup run there.
   When a worker finishes, the result is queued and the callback runs back on the main thread.
   Network sockets do NOT use this pool."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Default size: **4 threads**, configurable via UV_THREADPOOL_SIZE (max 1024).
2. The pool is **shared** by all thread-pool operations in the process.
3. Callbacks never run on the worker thread; they run on the main JS thread.
4. If all 4 threads are busy, new tasks wait in a queue -> hidden latency.

-----------------------------------------------------
Example (pool saturation with fs + crypto)
-----------------------------------------------------
const crypto = require('crypto');
const fs = require('fs');
const start = Date.now();

for (let i = 1; i <= 4; i++) {
  crypto.pbkdf2('pw', 'salt', 200000, 64, 'sha512', () =>
    console.log(`hash ${i}`, Date.now() - start, 'ms'));
}

fs.readFile(__filename, () =>
  console.log('file read', Date.now() - start, 'ms'));

// The tiny file read usually finishes only AFTER a hash frees a thread,
// because all 4 workers are busy hashing.

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Thinking http requests or database sockets are slowed by the pool. They use epoll/kqueue/IOCP.
- Heavy crypto in request handlers can make unrelated fs operations slow - a real production issue.
- For your own CPU-heavy JS code, the pool is not used; use worker_threads instead.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- 4 cashiers at a bank. If 4 people have long transactions, a person who only needs 10 seconds
  still waits in line.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is the thread pool the same as worker_threads?
A1: No. The libuv pool is internal for native operations; worker_threads run your own JS in separate V8 isolates.

Q2: Does fs.readFileSync use the thread pool?
A2: No, it runs directly on the main thread and blocks it.

Q3: How would you notice pool saturation?
A3: fs or crypto latency grows under load while the main thread itself is not busy.
*/
