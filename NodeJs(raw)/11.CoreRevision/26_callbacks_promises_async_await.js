/* 9_callbacks_promises_async_await.js

=====================================================
Callbacks vs Promises vs async/await
=====================================================

Definition (What I should say in the interview):
- "These are three ways to handle async results in Node, and they evolved in that order.
   **Callbacks** are functions passed in and called later, usually error-first. **Promises**
   represent a future value and let me chain and handle errors in one place. **async/await** is
   syntax on top of Promises that makes async code read like sync code with normal try/catch.
   In new code I use async/await, and I wrap older callback APIs with util.promisify."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect          | Callbacks             | Promises               | async/await             |
|-----------------|-----------------------|------------------------|-------------------------|
| Readability     | nests quickly         | flat chains            | looks synchronous       |
| Error handling  | if (err) in each step | one .catch()           | try/catch               |
| Parallelism     | manual counters       | Promise.all            | await Promise.all       |
| Return value    | none                  | a Promise              | always a Promise        |

-----------------------------------------------------
Example (same task, three styles)
-----------------------------------------------------
const fs = require('fs');
const fsp = require('fs/promises');

// 1. Callback
fs.readFile(__filename, 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log('callback:', data.length);
});

// 2. Promise
fsp.readFile(__filename, 'utf8')
  .then((data) => console.log('promise:', data.length))
  .catch(console.error);

// 3. async/await
async function main() {
  try {
    const data = await fsp.readFile(__filename, 'utf8');
    console.log('await:', data.length);
  } catch (err) {
    console.error(err);
  }
}
main();

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- async/await is NOT faster; it is the same Promise machinery.
- Mixing styles (calling a callback from inside .then) leads to double-calls and lost errors.
- Forgetting await means you get a pending Promise instead of the value.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does an async function return if I return 5?
A1: A Promise resolved with 5.

Q2: Are callbacks still used in Node?
A2: Yes - event listeners, streams, and many older libraries. Events are a natural fit for callbacks.

Q3: How do you handle errors in await without try/catch everywhere?
A3: Use a central error handler (e.g. Express error middleware / wrapper) or .catch on the call.
*/
