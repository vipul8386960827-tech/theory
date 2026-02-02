/* 348_async_functions.js

=====================================================
Async Functions in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Async functions are functions declared with the `async` keyword 
  that always return a Promise and allow the use of `await` 
  to pause execution until asynchronous operations complete."

Key Points to Highlight:
- Always return a Promise, even if returning a non-Promise value
- `await` can only be used inside async functions
- Makes asynchronous code look synchronous and easier to read
- Errors can be handled using try/catch
- Supports sequential and parallel execution with `await` and `Promise.all`

Examples:

// Async function returning a value
async function getValue() {
  return 42; // actually returns Promise.resolve(42)
}
getValue().then(console.log); // 42

// Using await
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();

Code Explanation:
- `async` marks the function as asynchronous
- `await` pauses execution until the Promise resolves
- Execution continues asynchronously without blocking main thread

Real-Life Analogy:
- Like ordering at a restaurant: you place your order (async function) and wait (`await`) for food without blocking the kitchen (main thread)

Example / Usage:

async function calculateSum() {
  const a = await Promise.resolve(10);
  const b = await Promise.resolve(20);
  console.log(a + b); // 30
}
calculateSum();

Follow-Up Interview Questions:
- Q1: Can async functions be used as constructors?
  A1: No, async functions cannot be used with `new`.
- Q2: What happens if async function throws an error?
  A2: Returns a rejected Promise; can be caught with `.catch` or try/catch.
- Q3: Can multiple awaits run in parallel?
  A3: Yes, with `Promise.all([await1, await2])`.
- Q4: Difference between async function and normal function returning Promise?
  A4: Async functions have cleaner syntax and allow `await` usage.
- Q5: Are async functions blocking the main thread?
  A5: No, execution pauses only within async function; main thread remains non-blocked.
*/
