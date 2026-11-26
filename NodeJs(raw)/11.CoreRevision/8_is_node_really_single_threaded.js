/* 13_is_node_really_single_threaded.js

=====================================================
Is Node.js Really Single-Threaded? (Trick Question)
=====================================================

Definition (What I should say in the interview):
- "Not entirely. **JavaScript execution** in Node is single-threaded - there is one main thread
   running the event loop and our code. But Node.js as a whole is **multi-threaded**: libuv has
   a **thread pool** (default 4 threads) for fs, crypto, zlib and dns.lookup, and V8 uses
   background threads for garbage collection and compilation. We can also create threads
   ourselves using **worker_threads**."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Our JS code -> **1 main thread** (event loop).
2. libuv thread pool -> **4 threads by default** (UV_THREADPOOL_SIZE).
3. V8 -> background threads for **GC and JIT compilation**.
4. worker_threads -> extra JS threads, each with its own V8 isolate and event loop.
5. Network I/O -> handled by the OS kernel, no extra threads needed.

-----------------------------------------------------
Proof (check thread count)
-----------------------------------------------------
// Run: node -e "setInterval(()=>{}, 1000)"
// Linux:   ps -o nlwp <pid>      -> shows ~7+ threads, not 1
// Windows: Task Manager -> Details -> Threads column

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Saying "Node.js is single-threaded, period." Interviewers ask this specifically to see if
  you know about libuv's thread pool and worker threads.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which operations use the thread pool?
A1: fs (most operations), crypto (pbkdf2, scrypt, randomBytes), zlib, dns.lookup.

Q2: Then why do we say Node is single-threaded?
A2: Because our application code (JS) runs on one thread - we never deal with threads
    unless we use worker_threads.
*/
