/* 27_queuemicrotask.js

=====================================================
queueMicrotask
=====================================================

Definition (What I should say in the interview):
- "queueMicrotask(fn) is a standard web API, also global in Node, that schedules fn on the **same
   microtask queue that Promise callbacks use**. So it runs after the current synchronous code
   and after process.nextTick callbacks, but before any timers or I/O. It is the cleaner choice
   when I need microtask timing without creating a Promise, and unlike process.nextTick it also
   works in browsers, so it is better for code shared between both."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature           | process.nextTick      | queueMicrotask            | Promise.resolve().then |
|-------------------|-----------------------|---------------------------|------------------------|
| Queue             | nextTick queue        | promise microtask queue   | promise microtask queue|
| Priority (Node)   | first                 | after nextTick            | same as queueMicrotask |
| Standard          | Node only             | Web standard              | Web standard           |
| Error behavior    | uncaughtException     | uncaughtException         | rejected Promise       |
| Creates a Promise | no                    | no                        | yes                    |

-----------------------------------------------------
Example
-----------------------------------------------------
setTimeout(() => console.log('5. timeout'), 0);

Promise.resolve().then(() => console.log('3. promise'));
queueMicrotask(() => console.log('4. queueMicrotask'));
process.nextTick(() => console.log('2. nextTick'));

console.log('1. sync');

// Output:
// 1. sync
// 2. nextTick
// 3. promise
// 4. queueMicrotask         (FIFO with the promise callback - same queue)
// 5. timeout

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- An error thrown inside a queueMicrotask callback is NOT turned into a rejection; it goes to
  process 'uncaughtException' and will crash the process if unhandled.
- Like any microtask, recursively queuing microtasks starves the event loop.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When would you use queueMicrotask over nextTick?
A1: For cross-platform code or when I want promise-level timing without nextTick's higher priority.

Q2: Is queueMicrotask faster than Promise.resolve().then?
A2: Slightly lighter because no Promise object is created, but the timing is the same.

Q3: Can you pass arguments to queueMicrotask?
A3: No, only a function; use a closure to capture values.
*/
