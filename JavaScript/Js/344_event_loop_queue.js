/* 344_event_loop_queue.js

=====================================================
Event Loop and Task Queue in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The event loop is a mechanism that manages execution of multiple chunks 
  of code, handling asynchronous operations by using a task queue to process callbacks 
  once the call stack is empty."

Key Points to Highlight:
- JavaScript is single-threaded
- Call stack executes synchronous code
- Asynchronous callbacks go to:
  - Macrotask queue: setTimeout, setInterval, I/O events
  - Microtask queue: Promises, process.nextTick
- Event loop continuously checks if call stack is empty, then processes queued tasks

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
- Synchronous code executes first: 'Start', 'End'
- Promise goes to microtask queue → executes before macrotask
- setTimeout goes to macrotask queue → executes after microtasks

Real-Life Analogy:
- Call stack = cashier processing current orders
- Task queue = customers waiting in line
- Event loop = manager calling next customer when cashier is free

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
- Q1: Difference between macrotasks and microtasks?
  A1: Microtasks execute before macrotasks, even if scheduled later.
- Q2: Does event loop run forever?
  A2: Yes, continuously monitors call stack and task queues.
- Q3: How does async/await interact with event loop?
  A3: Await pauses async function; continuation added to microtask queue.
- Q4: Can blocking code affect event loop?
  A4: Yes, synchronous blocking code delays execution of all queued tasks.
- Q5: How to prioritize tasks in event loop?
  A5: Microtasks have higher priority than macrotasks by design.
*/
