/* 347_promise_microtasks.js

=====================================================
Promises and Microtasks in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Promises are objects representing the eventual completion or failure 
  of an asynchronous operation, and their `.then`/`.catch` callbacks 
  are executed as microtasks after the current call stack is empty."

Key Points to Highlight:
- Promise states: pending, fulfilled, rejected
- `.then()` and `.catch()` schedule microtasks
- Microtasks execute before macrotasks (e.g., setTimeout)
- Ensures predictable async execution order

Examples:

console.log('Start');

Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));

setTimeout(() => console.log('Timeout'), 0);

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout

Code Explanation:
- Synchronous logs: 'Start' and 'End'
- Promise callbacks go to microtask queue → executed before macrotask (setTimeout)
- Demonstrates microtask priority

Real-Life Analogy:
- Promises = VIP tickets for a queue, processed before general attendees (macrotasks)

Example / Usage:

async function asyncTask() {
  console.log('Async start');
  await Promise.resolve();
  console.log('Async end');
}

console.log('Script start');
asyncTask();
console.log('Script end');

// Output:
// Script start
// Async start
// Script end
// Async end

Follow-Up Interview Questions:
- Q1: Difference between microtasks and macrotasks?
  A1: Microtasks run immediately after current stack; macrotasks run later.
- Q2: Are all asynchronous operations microtasks?
  A2: No, only Promises, process.nextTick, and MutationObserver.
- Q3: Can multiple Promises execute in parallel?
  A3: Yes, using Promise.all().
- Q4: How does async/await relate to microtasks?
  A4: Awaited Promises resume execution in microtask queue.
- Q5: Why are Promises preferred over callbacks?
  A5: Cleaner syntax, better error handling, and predictable execution order.
*/
