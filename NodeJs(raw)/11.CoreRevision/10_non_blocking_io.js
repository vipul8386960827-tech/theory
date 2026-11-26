/* 15_non_blocking_io.js

=====================================================
Non-Blocking I/O
=====================================================

Definition (What I should say in the interview):
- "Non-blocking I/O means when Node starts an I/O operation, like reading a file or querying a
   database, it **doesn't wait** for the result. It continues executing other code, and the
   result is delivered later through a **callback, Promise, or event**. Blocking I/O would stop
   the thread until the operation finishes."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. I/O = file system, network, database, etc. (slow compared to CPU).
2. **Blocking** -> thread waits (e.g. fs.readFileSync).
3. **Non-blocking** -> thread continues; result comes later (fs.readFile, fs.promises).
4. Most Node APIs are non-blocking by default; *Sync versions exist for scripts/startup.

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');

// Blocking
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
console.log('After read');          // waits until file is read

// Non-blocking
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);                // runs later
});
console.log('After read');          // runs FIRST

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Use *Sync methods only at startup (loading config) or in CLI scripts, never in request handlers.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Non-blocking vs asynchronous?
A1: Closely related: non-blocking = the call returns immediately; asynchronous = the result is
    delivered later (callback/promise). In Node they usually go together.

Q2: Is async/await blocking?
A2: No. await pauses only that async function; the event loop keeps running other work.
*/
