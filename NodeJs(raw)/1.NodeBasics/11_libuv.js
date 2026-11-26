/* 11_libuv.js

=====================================================
libuv
=====================================================

Definition (What I should say in the interview):
- "libuv is a **C library** that gives Node.js its **event loop and asynchronous I/O**. It
   abstracts the operating system's async mechanisms (epoll on Linux, kqueue on macOS, IOCP on
   Windows) and also provides a **thread pool** (default 4 threads) for operations that the OS
   cannot do asynchronously, like file system operations, crypto, zlib and dns.lookup."

-----------------------------------------------------
What libuv provides
-----------------------------------------------------
1. **Event loop** (timers, poll, check, close phases).
2. **Async network I/O** using OS kernel mechanisms -> no threads needed.
3. **Thread pool** -> fs, crypto (pbkdf2, scrypt), zlib, dns.lookup.
4. Timers, child processes, signals, TTY, pipes.
5. Cross-platform abstraction -> same Node code works on Linux, macOS, Windows.

-----------------------------------------------------
Example (thread pool in action)
-----------------------------------------------------
const crypto = require('crypto');
const start = Date.now();

for (let i = 1; i <= 5; i++) {
  crypto.pbkdf2('pass', 'salt', 100000, 64, 'sha512', () => {
    console.log(`Hash ${i}:`, Date.now() - start, 'ms');
  });
}
// First 4 finish together (4 threads); the 5th takes about twice as long.
// Set UV_THREADPOOL_SIZE=5 and all 5 finish together.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does network I/O use the thread pool?
A1: No. Network I/O uses the OS async APIs directly. The thread pool is for fs, crypto, zlib, dns.lookup.

Q2: How do you change the thread pool size?
A2: Set the UV_THREADPOOL_SIZE environment variable (max 1024) before the pool is first used.

Q3: Relation between V8 and libuv?
A3: V8 executes the JavaScript; libuv handles the event loop and async I/O. Node binds them together.
*/
