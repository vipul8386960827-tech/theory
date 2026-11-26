/* 16_sync_vs_async_programming.js

=====================================================
Synchronous vs Asynchronous Programming
=====================================================

Definition (What I should say in the interview):
- "In synchronous programming, statements run one after another and each one must finish before
   the next starts. In asynchronous programming, I start a task and **continue with other work**,
   and the result is handled later through a callback, Promise or event. Node is built around the
   async model because most server work is waiting on I/O - databases, APIs, files - and waiting
   synchronously would waste the single thread."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect             | Synchronous                     | Asynchronous                       |
|--------------------|---------------------------------|------------------------------------|
| Flow               | top to bottom, step by step     | start now, finish later            |
| Readability        | very easy                       | needs callbacks/Promises/await     |
| Throughput         | low for I/O-heavy work          | high, thread is never idle-waiting |
| Error handling     | try/catch                       | callback err, .catch, try/await    |
| Debugging          | simple stack traces             | harder (async stack traces help)   |

-----------------------------------------------------
Example (timing difference)
-----------------------------------------------------
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function asyncVersion() {
  console.time('async');
  await Promise.all([delay(1000), delay(1000), delay(1000)]);  // waits overlap
  console.timeEnd('async');                                     // ~1000ms
}

function syncVersion() {
  console.time('sync');
  for (let i = 0; i < 3; i++) {
    const end = Date.now() + 1000;
    while (Date.now() < end) {}                                 // busy wait, blocks
  }
  console.timeEnd('sync');                                      // ~3000ms
}

syncVersion();
asyncVersion();

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Async does not mean multi-threaded; the waiting happens in the OS/libuv, the JS still runs on
  one thread.
- Sync is fine for scripts, build tools and startup code where simplicity matters more.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Sync: standing at the washing machine until it finishes. Async: start the machine, cook dinner,
  and come back when it beeps.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is await making the code synchronous?
A1: It only pauses that async function; the thread is free to run other callbacks meanwhile.

Q2: Why is async harder to debug?
A2: The callback runs later from the event loop, so the original call stack is gone; Node adds async stack traces to help.

Q3: Can a sync function call an async one and get its value?
A3: Not directly; it gets a Promise and must use .then or become async itself.
*/
