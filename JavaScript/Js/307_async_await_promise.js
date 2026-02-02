/* 307_async_await_promise.js

=====================================================
Async/Await with Promises in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Async/Await is syntactic sugar over Promises that allows writing asynchronous code 
  in a synchronous style, improving readability and error handling."

Key Points to Highlight:
- `async` functions always return a Promise
- `await` pauses execution until the Promise resolves or rejects
- Errors can be handled with try/catch
- Makes Promise chains simpler and more readable
- Supports sequential and parallel execution

Examples:

// Sequential execution
async function fetchSequential() {
  try {
    const response1 = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data1 = await response1.json();
    console.log('Data 1:', data1);

    const response2 = await fetch('https://jsonplaceholder.typicode.com/todos/2');
    const data2 = await response2.json();
    console.log('Data 2:', data2);
  } catch (err) {
    console.error('Error:', err);
  }
}
fetchSequential();

// Parallel execution
async function fetchParallel() {
  try {
    const [res1, res2] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos/1'),
      fetch('https://jsonplaceholder.typicode.com/todos/2')
    ]);
    const data1 = await res1.json();
    const data2 = await res2.json();
    console.log('Data 1:', data1);
    console.log('Data 2:', data2);
  } catch (err) {
    console.error('Error:', err);
  }
}
fetchParallel();

Code Explanation:
- `async` marks the function asynchronous
- `await` pauses execution until the Promise resolves
- Sequential execution waits for each Promise one by one
- `Promise.all` allows running multiple Promises in parallel

Real-Life Analogy:
- Sequential = waiting for one delivery before ordering the next
- Parallel = ordering multiple deliveries at the same time

Example / Usage:

async function getNumber() {
  const num = await Promise.resolve(42);
  console.log(num); // 42
}
getNumber();

Follow-Up Interview Questions:
- Q1: Difference between async/await and Promise chaining?
  A1: Async/await improves readability; behavior is similar under the hood.
- Q2: Can you run multiple awaits in parallel?
  A2: Yes, with `Promise.all`.
- Q3: What happens if an awaited Promise rejects?
  A3: Throws an error; can be caught using try/catch.
- Q4: Can `await` be used outside async function?
  A4: No, only inside async functions (except top-level in modules).
- Q5: Why use async/await over callbacks?
  A5: Cleaner syntax, better error handling, and avoids callback hell.
*/
