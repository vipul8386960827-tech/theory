/* 12_single_threaded_model.js

=====================================================
Single-Threaded Model in Node.js
=====================================================

Definition (What I should say in the interview):
- "Node.js runs our JavaScript on a **single main thread** using an **event loop**. It doesn't
   create a new thread per request like traditional servers. Instead, slow I/O is delegated to
   the system/libuv, and the main thread keeps processing other requests. This makes Node very
   memory efficient and good at handling many concurrent connections."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **One call stack**, one thread executing JS at a time.
2. **No thread-per-request** -> no thread creation cost, no locks, no race conditions in JS code.
3. I/O work is **delegated**; callbacks come back via the event loop.
4. Trade-off: **CPU-heavy work blocks everything**.

-----------------------------------------------------
Traditional (multi-threaded) vs Node
-----------------------------------------------------
Traditional (e.g. Apache + PHP):
  Request 1 -> Thread 1 (waits for DB...)
  Request 2 -> Thread 2 (waits for DB...)   -> many threads, lots of memory, idle waiting

Node.js:
  Request 1 -> start DB query -> move on
  Request 2 -> start DB query -> move on
  DB results come back -> event loop runs callbacks -> responses sent

-----------------------------------------------------
Why single-threaded? (Design reasons)
-----------------------------------------------------
- Simpler programming model (no deadlocks / shared-memory bugs).
- Most web work is I/O waiting, not computation - one thread is enough if it never waits.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is Node.js completely single-threaded?
A1: No - only JS execution is. libuv's thread pool and V8's background threads (GC, compilation)
    use other threads.

Q2: How do you use multiple CPU cores?
A2: cluster module / PM2 (multiple processes), or worker_threads for CPU-heavy tasks.
*/
