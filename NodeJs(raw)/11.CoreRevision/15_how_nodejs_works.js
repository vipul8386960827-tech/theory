/* 32_how_nodejs_works.js

=====================================================
How Node.js Works
=====================================================

Definition (What I should say in the interview):
- "Node runs my JavaScript on a **single main thread** using V8. When the code calls something
   slow like a DB query or file read, Node hands it off - network I/O goes to the OS async APIs,
   and things like fs and crypto go to the **libuv thread pool**. The main thread moves on to
   the next task. When the operation finishes, its callback is queued, and the **event loop**
   picks it up and runs it on the main thread once the call stack is empty."

-----------------------------------------------------
Step-by-Step Flow
-----------------------------------------------------
1. Request arrives -> JS handler runs on the call stack (main thread).
2. Handler starts async work (db.query, fs.readFile, fetch).
3. Work is delegated: OS kernel (epoll/kqueue/IOCP) for network, thread pool for fs/crypto.
4. Main thread is free -> handles other requests meanwhile.
5. Work completes -> callback placed in the right queue.
6. Event loop (when stack is empty) runs the callback -> response is sent.
7. Microtasks (process.nextTick, then Promise callbacks) run after each callback,
   before the loop moves on.

-----------------------------------------------------
Event Loop Phases (simplified)
-----------------------------------------------------
timers (setTimeout/setInterval) -> pending callbacks -> poll (I/O) -> check (setImmediate)
-> close callbacks -> repeat while there is pending work

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');

console.log('start');

setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));

fs.readFile(__filename, () => {
  setTimeout(() => console.log('io-timeout'), 0);
  setImmediate(() => console.log('io-immediate'));   // ALWAYS before io-timeout
});

console.log('end');
// start, end, nextTick, promise, then timeout/immediate in either order
// (not deterministic in the main module), and inside the I/O callback
// setImmediate is guaranteed to run before setTimeout(0).

-----------------------------------------------------
Analogy
-----------------------------------------------------
A single waiter (main thread) takes orders and passes them to the kitchen (OS/thread pool).
He doesn't wait at the kitchen; he serves other tables and delivers food when it's ready.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens if a callback runs a heavy loop?
A1: The main thread is blocked, so the event loop can't process anything else - all requests wait.

Q2: Who runs the callback - the thread pool or the main thread?
A2: The thread pool only does the work; the JS callback always runs on the main thread.

Q3: When does a Node process exit?
A3: When the event loop has no more pending work (no timers, sockets, or handles), or on process.exit().
*/
