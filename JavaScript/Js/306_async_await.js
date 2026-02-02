/* 306_async_await.js

=====================================================
Async/Await in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Async/Await is syntax in JavaScript to handle asynchronous operations 
  more easily, making asynchronous code look and behave like synchronous code."

Key Points to Highlight:
- `async` function always returns a Promise
- `await` pauses execution until the Promise resolves
- Makes code more readable than chained Promises
- Can be used with try/catch for error handling
- Must be used inside `async` functions

Examples:

// Using async/await
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

// Equivalent with Promises
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

Code Explanation:
- `async` marks function as asynchronous
- `await` pauses function until Promise resolves, returning resolved value
- Errors are caught using try/catch

Real-Life Analogy:
- Like ordering food: you wait for delivery (`await`) but the kitchen (async function) continues its process in the background

Example / Usage:

async function getNumber() {
  const number = await Promise.resolve(42);
  console.log(number); // 42
}
getNumber();

Follow-Up Interview Questions:
- Q1: Can `await` be used outside async function?
  A1: No, it must be inside an async function.
- Q2: Difference between async/await and Promises?
  A2: Async/await is syntactic sugar over Promises; easier to read.
- Q3: What happens if awaited Promise rejects?
  A3: Throws an error; can be caught using try/catch.
- Q4: Can multiple await run in parallel?
  A4: Yes, using Promise.all([...]).
- Q5: Does async function block main thread?
  A5: No, it’s non-blocking; only pauses within async function.
*/
