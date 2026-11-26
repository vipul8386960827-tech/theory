/* 31_key_features_of_nodejs.js

=====================================================
Key Features of Node.js
=====================================================

Definition (What I should say in the interview):
- "The key features of Node are: it runs JavaScript on the server using the **V8 engine**, it
   uses a **single-threaded event loop with non-blocking I/O**, and it's **event-driven**. That
   makes it very efficient for I/O-heavy apps like REST APIs and real-time systems. It also has
   built-in modules like fs, http and crypto, supports streams, is cross-platform, and has the
   huge **npm ecosystem**."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Asynchronous and non-blocking** -> I/O does not block the main thread.
2. **Event-driven** -> EventEmitter, callbacks, promises.
3. **Single-threaded event loop** + libuv thread pool for fs/crypto/zlib/dns.lookup.
4. **Fast execution** -> V8 compiles JS to machine code (JIT).
5. **Streams** -> process large data in chunks (files, HTTP bodies).
6. **Rich core modules** -> http, fs, path, os, crypto, events, stream, child_process.
7. **npm** -> largest package registry in the world.
8. **Cross-platform** -> Windows, Linux, macOS.
9. **Scalable** -> cluster, worker_threads, horizontal scaling with containers.
10. **Modern built-ins** -> fetch, test runner, --watch, --env-file.

-----------------------------------------------------
Example (several features in one snippet)
-----------------------------------------------------
const http = require('http');
const fs = require('fs');
const { EventEmitter } = require('events');

const events = new EventEmitter();
events.on('request', (url) => console.log('Request to', url));   // event-driven

http.createServer((req, res) => {
  events.emit('request', req.url);
  fs.createReadStream(__filename).pipe(res);   // stream + non-blocking I/O
}).listen(3000, () => console.log('Listening on 3000'));

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- "Single-threaded" refers to JS execution; libuv and V8 still use background threads.
- Features are great for I/O-bound work; CPU-heavy tasks need worker_threads.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which feature matters most for scalability?
A1: Non-blocking I/O with the event loop - one process can serve many concurrent connections.

Q2: Why are streams important?
A2: They keep memory usage low by processing data piece by piece instead of loading it all.

Q3: Is Node a framework?
A3: No, it's a runtime. Express, NestJS and Fastify are frameworks built on top of it.
*/
