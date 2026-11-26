/* 33_why_nodejs_is_fast.js

=====================================================
Why Node.js Is Fast
=====================================================

Definition (What I should say in the interview):
- "Node is fast mainly for **I/O-bound** workloads. First, the **V8 engine** compiles JavaScript
   to optimized machine code with JIT compilation. Second, **non-blocking I/O with the event
   loop** means the thread never sits idle waiting for the DB or network, so one process handles
   many concurrent requests. Third, there is **no thread-per-request overhead** - no context
   switching and less memory per connection. But Node is not fast for CPU-heavy work, because
   that blocks the single main thread."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **V8 JIT** -> Ignition interpreter + TurboFan optimizing compiler -> machine code.
2. **Non-blocking I/O** -> waiting time is used for other requests.
3. **Event loop** -> lightweight scheduling, no thread per connection.
4. **libuv** -> efficient OS-level async (epoll, kqueue, IOCP) written in C.
5. **Streams and Buffers** -> handle large data in chunks with low memory.
6. **Core in C/C++** -> http parser (llhttp), crypto (OpenSSL), zlib are native code.

-----------------------------------------------------
Example (concurrency, not raw speed)
-----------------------------------------------------
const start = Date.now();
const fakeDbCall = (id) => new Promise((r) => setTimeout(() => r(id), 1000));

(async () => {
  // 100 "DB calls" of 1s each run concurrently -> about 1s total, not 100s
  await Promise.all(Array.from({ length: 100 }, (_, i) => fakeDbCall(i)));
  console.log('Total:', Date.now() - start, 'ms');   // about 1000 ms
})();

// Counter example: CPU work blocks everything
// for (let i = 0; i < 5e9; i++) {}   // no other request is served during this loop

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- "Fast" here means high throughput and low latency under many concurrent I/O operations,
  not that JavaScript computes faster than C++ or Go.
- For CPU work -> worker_threads, child processes, or move it to another service.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is Node faster than Java?
A1: For I/O-heavy concurrency it can be comparable or better per resource; for CPU-heavy
    computation Java is usually faster thanks to multi-threading and its mature JIT.

Q2: What can make a Node app slow?
A2: Blocking the event loop (sync fs, big JSON.parse, heavy loops, bad regex), memory leaks,
    N+1 DB queries, and a saturated thread pool.

Q3: How do you check if the event loop is blocked?
A3: Measure event loop lag (perf_hooks.monitorEventLoopDelay), use clinic.js or --prof.
*/
