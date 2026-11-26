/* 33_thread_pool_operations.js

=====================================================
Which Operations Use the Thread Pool?
=====================================================

Definition (What I should say in the interview):
- "Only a specific set of operations goes to the libuv thread pool - the ones the OS cannot do
   asynchronously in a portable way, or that are CPU-heavy native work. That is almost all
   **fs** async APIs, **dns.lookup**, async **crypto** like pbkdf2, scrypt, randomBytes,
   randomFill and generateKeyPair, and async **zlib** compression. Network operations like http,
   TCP, UDP and dns.resolve do **not** use the pool; they use the OS event notification
   mechanisms. Knowing this helps me explain why a crypto-heavy endpoint can slow down file reads."

-----------------------------------------------------
Uses the Thread Pool vs Does Not
-----------------------------------------------------
| Uses thread pool                        | Does NOT use thread pool                  |
|-----------------------------------------|-------------------------------------------|
| fs.readFile, writeFile, stat, readdir.. | http / https / net / dgram sockets         |
| fs.promises.* and fs streams            | dns.resolve*, dns.promises.resolve (c-ares)|
| dns.lookup (getaddrinfo)                | timers (setTimeout, setImmediate)          |
| crypto.pbkdf2, scrypt, randomBytes(cb)  | child_process, pipes, signals              |
| crypto.randomFill, generateKeyPair      | fs.watch (OS notifications)                |
| zlib.gzip / deflate (async)             | *Sync versions (run on main thread)        |
| C++ addons that queue work to the pool  | your own JS code (runs on main thread)     |

-----------------------------------------------------
Example (proving network does not use the pool)
-----------------------------------------------------
const crypto = require('crypto');
const https = require('https');
const start = Date.now();

for (let i = 0; i < 4; i++) {
  crypto.pbkdf2('pw', 'salt', 300000, 64, 'sha512', () =>
    console.log('hash', Date.now() - start, 'ms'));
}

https.get('https://example.com', (res) => {
  res.resume();
  res.on('end', () => console.log('https done', Date.now() - start, 'ms'));
});
// The https request is not stuck behind the 4 hashes (only its dns.lookup step briefly needs a thread).

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- http.get uses dns.lookup by default, so hostname resolution CAN wait on a busy pool.
- Sync crypto (pbkdf2Sync, randomBytes without callback) blocks the main thread instead.
- The pool is shared, so one slow type of task delays all others.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why do file operations need threads but sockets do not?
A1: OS readiness APIs like epoll do not support regular files, so libuv uses blocking calls on worker threads.

Q2: Does bcrypt use the thread pool?
A2: The native bcrypt package runs hashing in the pool; bcryptjs is pure JS and runs on the main thread.

Q3: Does JSON.parse use the thread pool?
A3: No, it is synchronous V8 work on the main thread.
*/
