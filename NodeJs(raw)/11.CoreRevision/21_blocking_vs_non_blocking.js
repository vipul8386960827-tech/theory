/* 4_blocking_vs_non_blocking.js

=====================================================
Blocking vs Non-Blocking Code
=====================================================

Definition (What I should say in the interview):
- "Blocking code means the main thread cannot do anything else until that operation finishes,
   for example fs.readFileSync, a big JSON.parse or a long loop. Non-blocking code starts the
   operation and returns immediately, and the result comes back later via a callback or Promise.
   In Node, blocking is costly because **one blocked thread means every user waits**, so in
   servers I always prefer the async APIs."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect            | Blocking                        | Non-Blocking                   |
|-------------------|---------------------------------|--------------------------------|
| Returns           | after the work is done          | immediately                    |
| Main thread       | stuck                           | free for other requests        |
| Examples          | readFileSync, execSync, loops   | readFile, fs.promises, fetch   |
| Error handling    | try/catch                       | callback err / .catch / await  |
| Good for          | startup config, CLI scripts     | servers, request handlers      |

-----------------------------------------------------
Example (impact on a server)
-----------------------------------------------------
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/sync') {
    const data = fs.readFileSync(__filename);       // every other request waits
    return res.end(`sync ${data.length}`);
  }
  fs.readFile(__filename, (err, data) => {          // other requests keep flowing
    if (err) { res.statusCode = 500; return res.end('error'); }
    res.end(`async ${data.length}`);
  });
}).listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- CPU work is ALWAYS blocking in JS, even inside an async function. "async" does not move code
  to another thread.
- Blocking is not always "wrong" - require() itself is synchronous, and sync fs at startup is fine.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is an async function non-blocking automatically?
A1: No. Its synchronous part (until the first await) runs immediately and blocks like normal code.

Q2: How can you make CPU-heavy work non-blocking?
A2: Move it to worker_threads, a child process, or split it into chunks with setImmediate.

Q3: Why is require() sync and that is OK?
A3: Modules are loaded once at startup and cached, so it does not affect request handling.
*/
