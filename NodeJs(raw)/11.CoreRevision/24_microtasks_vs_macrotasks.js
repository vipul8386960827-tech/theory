/* 7_microtasks_vs_macrotasks.js

=====================================================
Microtasks vs Macrotasks
=====================================================

Definition (What I should say in the interview):
- "Macrotasks are the callbacks that live in the event loop phases - timers, I/O callbacks,
   setImmediate, close events. Microtasks are higher-priority callbacks: in Node there are two
   microtask queues, the **process.nextTick queue** and the **Promise queue** (also
   queueMicrotask). After every single macrotask callback, Node **fully drains** the microtask
   queues - nextTick first, then Promises - before running the next macrotask."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Type        | Examples                                         | When it runs                   |
|-------------|--------------------------------------------------|--------------------------------|
| Microtask   | process.nextTick, Promise.then/catch/finally,    | after current callback, before |
|             | await continuation, queueMicrotask               | the next macrotask             |
| Macrotask   | setTimeout, setInterval, setImmediate, I/O,      | in its event loop phase        |
|             | socket close                                     |                                |

-----------------------------------------------------
Example
-----------------------------------------------------
setTimeout(() => {
  console.log('timeout 1');
  Promise.resolve().then(() => console.log('  micro inside timeout 1'));
}, 0);

setTimeout(() => console.log('timeout 2'), 0);

Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));

// Output (Node 11+):
// nextTick
// promise
// timeout 1
//   micro inside timeout 1
// timeout 2

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Microtasks added while draining are also run in the same drain -> an infinite chain of
  microtasks starves the event loop completely.
- await always resumes as a microtask, even if the awaited value is not a Promise.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Macrotasks are customers in the main queue; microtasks are "quick follow-ups" the cashier
  finishes for the current customer before calling the next one.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which runs first, nextTick or Promise.then?
A1: nextTick. Node drains the nextTick queue before the Promise microtask queue.

Q2: Is setImmediate a microtask?
A2: No, it is a macrotask in the check phase.

Q3: Can microtasks run in the middle of synchronous code?
A3: No. They only run once the call stack is empty.
*/
