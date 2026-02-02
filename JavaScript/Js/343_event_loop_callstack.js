/* 343_event_loop_callstack.js

=====================================================
Event Loop & Call Stack in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The event loop is a mechanism that allows JavaScript (single-threaded) 
  to perform non-blocking operations by offloading tasks to the browser/Node APIs 
  and executing callbacks from the task queue."
- "The call stack is a LIFO data structure that keeps track of function calls 
  currently being executed."

Key Points to Highlight:
- JavaScript is single-threaded
- Call stack holds executing functions
- Asynchronous tasks (timers, promises, I/O) go to task/microtask queues
- Event loop continuously checks if call stack is empty, then pushes queued tasks

Examples:

console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise callback');
});

console.log('End');

// Output:
// Start
// End
// Promise callback
// Timeout callback

Code Explanation:
- "Start" logs first → pushed to call stack and executed
- "End" logs next
- Promise callback goes to microtask queue → executed after stack is empty
- setTimeout callback goes to macrotask queue → executed after microtasks

Real-Life Analogy:
- Call stack = stack of plates (last added is first removed)
- Event loop = waiter checking if plates stack is empty to process queued orders

Example / Usage:

function first() {
  console.log('first');
}
function second() {
  setTimeout(() => console.log('second'), 0);
}
function third() {
  console.log('third');
}

first();
second();
third();

// Output:
// first
// third
// second

Follow-Up Interview Questions:
- Q1: Difference between macrotask and microtask queues?
  A1: Microtasks (Promises, process.nextTick) have higher priority than macrotasks (setTimeout).
- Q2: Can JavaScript run multiple functions simultaneously?
  A2: No, it's single-threaded; async tasks give illusion of concurrency.
- Q3: How does async/await work with event loop?
  A3: Await pauses async function; resolves as a microtask.
- Q4: Why is understanding event loop important?
  A4: Helps debug async behavior, prevent race conditions, improve performance.
- Q5: Can blocking code affect event loop?
  A5: Yes, synchronous blocking code halts execution and delays async callbacks.
*/
