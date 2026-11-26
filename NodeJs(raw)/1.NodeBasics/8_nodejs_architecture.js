/* 8_nodejs_architecture.js

=====================================================
Node.js Architecture
=====================================================

Definition (What I should say in the interview):
- "Node.js has a **single-threaded event loop architecture**. Our JavaScript runs on one main
   thread in **V8**. When we do I/O (file, DB, network), Node hands it off to **libuv**, which
   uses the OS async mechanisms or its **thread pool**. When the work is done, the callback is
   queued and the **event loop** runs it on the main thread. So the main thread never waits."

-----------------------------------------------------
Main Components
-----------------------------------------------------
1. **V8 engine**      -> executes JavaScript, manages memory/garbage collection.
2. **libuv**          -> C library: event loop, async I/O, thread pool (default 4 threads).
3. **Node.js bindings** -> C++ glue connecting JS APIs (fs, http) to libuv/OS.
4. **Node.js APIs**   -> fs, http, crypto, stream, etc. (the JS layer we use).
5. **Event queue / callback queues** -> where completed tasks wait to run.

-----------------------------------------------------
Request Flow
-----------------------------------------------------
Client request
   -> Event loop receives it on the main thread
   -> Non-blocking work (DB/file/network) handed to libuv
        -> network I/O: OS (epoll/kqueue/IOCP)
        -> file system, crypto, zlib, dns.lookup: libuv thread pool
   -> Main thread is free to take the next request
   -> When I/O finishes, the callback is queued
   -> Event loop executes the callback -> response sent

-----------------------------------------------------
Diagram (simplified)
-----------------------------------------------------
  [Requests] -> [Event Loop (1 JS thread)] -> [libuv]
                       ^                        |-- OS async (network)
                       |                        |-- Thread pool (fs, crypto)
                       +------ callbacks -------+

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: If Node is single-threaded, who does the I/O?
A1: libuv - via the OS kernel for network I/O, and its thread pool for file/crypto work.

Q2: What is the default thread pool size?
A2: 4, configurable with the UV_THREADPOOL_SIZE environment variable.

Q3: What happens if a callback does heavy CPU work?
A3: It blocks the event loop; no other callback or request can run until it finishes.
*/
