/* 346_macrotask_queue.js

=====================================================
Macrotask Queue in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The macrotask queue is a queue where tasks like setTimeout, setInterval, 
  setImmediate, and I/O callbacks are scheduled to run after the current 
  execution stack is empty and all microtasks are processed."

Key Points to Highlight:
- Executes after microtasks
- Includes timers, network requests, and other async events
- Helps manage asynchronous operations in a predictable order
- Event loop processes macrotasks one at a time

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
- 'Start' and 'End' run synchronously
- Promise callback goes to microtask queue → executes first
- setTimeout callback goes to macrotask queue → executes after microtasks

Real-Life Analogy:
- Macrotasks = regular customer queue in a bank, processed after VIP queue (microtasks) is done

Example / Usage:

function logMessages() {
  console.log('Message 1');
  setTimeout(() => console.log('Message 2'), 0);
  Promise.resolve().then(() => console.log('Message 3'));
  console.log('Message 4');
}
logMessages();

// Output:
// Message 1
// Message 4
// Message 3
// Message 2

Follow-Up Interview Questions:
- Q1: Difference between macrotasks and microtasks?
  A1: Microtasks have higher priority; macrotasks execute later.
- Q2: What tasks are considered macrotasks?
  A2: setTimeout, setInterval, I/O, UI rendering, setImmediate.
- Q3: Can macrotasks starve microtasks?
  A3: No, microtasks always execute before next macrotask.
- Q4: How does event loop handle macrotasks?
  A4: Picks one macrotask after stack is empty and microtasks are processed.
- Q5: Why understanding macrotasks is important?
  A5: To predict async execution order and avoid race conditions.
*/
