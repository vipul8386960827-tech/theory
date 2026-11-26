/* 1_event_loop_in_node.js

=====================================================
Event Loop in Node.js
=====================================================

Definition (What I should say in the interview):
- "The event loop is the mechanism that lets Node.js handle many operations concurrently on a
   **single JavaScript thread**. Node runs my synchronous code first, hands slow work like I/O
   and timers off to libuv and the OS, and when that work finishes the callback is queued. The
   event loop keeps checking those queues and pushes callbacks onto the call stack **only when
   the stack is empty**. That is why Node can serve thousands of connections without a thread per request."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. JavaScript runs on **one main thread** -> one call stack.
2. The event loop is implemented by **libuv**, not by V8.
3. It runs in **phases** (timers, poll, check, ...) - covered in the phases file.
4. Between callbacks, Node drains the **microtask queues** (process.nextTick, then Promises).
5. The process exits when there is nothing left for the loop to wait on.

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');

console.log('1. start');

setTimeout(() => console.log('4. timer'), 0);

fs.readFile(__filename, () => console.log('5. file read done'));

Promise.resolve().then(() => console.log('3. promise'));

console.log('2. end of sync code');

// Output:
// 1. start
// 2. end of sync code
// 3. promise
// 4. timer            } these two depend on how fast the disk read finishes,
// 5. file read done   } so their order is NOT guaranteed (I/O timing varies)

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Saying "Node is single-threaded" and stopping there. JS execution is single-threaded, but
  libuv uses a thread pool and the OS kernel does async network I/O in the background.
- If sync code runs for a long time, the loop is stuck and NO callback can run.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- A single waiter in a restaurant: takes an order, gives it to the kitchen (libuv/OS), and serves
  other tables instead of standing at the kitchen door. When food is ready, he delivers it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Who implements the event loop - V8 or Node?
A1: libuv. V8 only executes JavaScript and manages the call stack and heap.

Q2: When does the event loop start?
A2: After the main module's synchronous code finishes executing.

Q3: What happens if a callback throws inside the loop?
A3: If not caught, it becomes an uncaughtException and by default the process crashes.
*/
