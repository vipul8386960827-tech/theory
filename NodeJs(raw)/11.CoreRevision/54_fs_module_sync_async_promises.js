/* 1_fs_module_sync_async_promises.js

=====================================================
fs Module - Sync vs Callback vs Promises
=====================================================

Definition (What I should say in the interview):
- "The fs module lets Node work with the file system. It gives three styles of the same API:
   **synchronous** (readFileSync) which blocks the thread, **callback-based** (readFile) which
   runs on the libuv thread pool and calls back with (err, data), and **promise-based**
   (require('fs/promises')) which I use with async/await. In application code I use the
   promises API; Sync methods only at startup or in CLI scripts."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Sync -> blocks the event loop, throws errors, use try/catch.
2. Callback -> error-first callback (err, result), non-blocking.
3. Promises -> fs/promises (or fs.promises), returns Promise, clean with async/await.
4. Async fs operations run on the libuv thread pool (default 4 threads).

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');
const fsp = require('fs/promises');

// 1. Sync
try {
  const a = fs.readFileSync('a.txt', 'utf8');
  console.log('sync:', a);
} catch (err) { console.error(err.code); }

// 2. Callback
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) return console.error(err.code);
  console.log('callback:', data);
});

// 3. Promises
async function main() {
  try {
    const data = await fsp.readFile('a.txt', 'utf8');
    console.log('promise:', data);
  } catch (err) { console.error(err.code); }   // e.g. ENOENT
}
main();

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Style    | Blocks loop? | Error handling     | Best for                 |
|----------|--------------|--------------------|--------------------------|
| Sync     | Yes          | try/catch          | startup config, scripts  |
| Callback | No           | if (err) in cb     | legacy code              |
| Promises | No           | try/catch + await  | modern app code          |

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Using readFileSync inside an Express route -> every request blocks all other users.
- Forgetting encoding -> you get a Buffer instead of a string.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Are fs promises faster than callbacks?
A1: Not really; both use the thread pool. Promises are about readability and error handling.

Q2: How do you convert a callback API to promises?
A2: util.promisify(fs.readFile), but for fs just use fs/promises directly.

Q3: Why does fs need a thread pool when network I/O does not?
A3: Most OSes do not offer a portable async file API, so libuv runs file ops on worker threads.
*/
