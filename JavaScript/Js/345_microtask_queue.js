/* 345_microtask_queue.js

=====================================================
Microtask Queue in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The microtask queue is a special queue in JavaScript where microtasks 
  like Promise callbacks and process.nextTick are scheduled to run after the 
  current execution context completes, but before the next macrotask."

Key Points to Highlight:
- Microtasks run after the current stack is empty
- Higher priority than macrotasks (setTimeout, setInterval)
- Ensures Promise callbacks execute before rendering or macrotasks
- Helps maintain predictable async behavior

Examples:

console.log('Start');

Promise.resolve().then(() => {
  console.log('Promise 1');
}).then(() => {
  console.log('Promise 2');
});

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout

Code Explanation:
- 'Start' and 'End' execute synchronously
- Promise.then callbacks go to microtask queue
- Microtasks execute before macrotask (setTimeout)

Real-Life Analogy:
- Microtasks = VIP queue in a bank processed before regular queue (macrotasks)
- Ensures urgent tasks (Promises) execute before less urgent tasks (timeouts)

Example / Usage:

async function asyncFunc() {
  console.log('Async start');
  await Promise.resolve();
  console.log('Async end');
}

console.log('Script start');
asyncFunc();
console.log('Script end');

// Output:
// Script start
// Async start
// Script end
// Async end

Follow-Up Interview Questions:
- Q1: Difference between microtask and macrotask queues?
  A1: Microtasks execute immediately after current stack; macrotasks execute later.
- Q2: Are all asynchronous tasks microtasks?
  A2: No, only Promises, process.nextTick, and MutationObserver are microtasks.
- Q3: Can microtasks cause starvation of macrotasks?
  A3: Yes, too many microtasks can delay macrotasks.
- Q4: How does async/await relate to microtasks?
  A4: Awaited expressions resume in microtask queue after resolution.
- Q5: Why is understanding microtask queue important?
  A5: Helps predict execution order and avoid unexpected async behavior.
*/
