/* 2_async_error_handling.js

=====================================================
Async Error Handling (Callbacks, Promises, Async/Await)
=====================================================

Definition (What I should say in the interview):
- "In Node there are **three async styles** and each handles errors differently. Callbacks
   pass the error as the first argument, promises use **.catch()**, and async/await lets me use a
   normal **try/catch** around await. The key rule is that every async chain must end in some
   error handler, otherwise I get an unhandled rejection which crashes the process in modern
   Node. For parallel work I choose between Promise.all and Promise.allSettled based on
   whether one failure should fail everything."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Callback -> if (err) return handle(err).
2. Promise -> .then(...).catch(handle) - one catch at the end covers the whole chain.
3. async/await -> try { await x() } catch (err) { ... } finally { cleanup }.
4. Promise.all -> rejects on the FIRST failure (fail-fast).
5. Promise.allSettled -> never rejects, gives status of each promise.

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs/promises');

async function loadUserData(userId) {
  try {
    const raw = await fs.readFile(`users/${userId}.json`, 'utf8');
    return JSON.parse(raw);                 // JSON errors are caught too
  } catch (err) {
    if (err.code === 'ENOENT') return null; // expected case -> handle
    throw err;                              // unexpected -> rethrow to caller
  } finally {
    console.log('loadUserData finished');
  }
}

// Parallel calls where partial failure is ok
async function loadDashboard() {
  const results = await Promise.allSettled([
    fetch('https://api.example.com/orders'),
    fetch('https://api.example.com/stats'),
  ]);
  results.forEach((r) => {
    if (r.status === 'rejected') console.error('Failed:', r.reason.message);
  });
}

loadUserData(1).then(console.log).catch(console.error);

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Forgetting "await" inside try -> the promise rejects later and try/catch does NOT catch it.
  e.g. try { return fetchData() } -> should be "return await fetchData()" if you want to catch here.
- forEach with async callbacks does not wait and errors are not caught -> use for...of or Promise.all.
- Swallowing errors with an empty catch {} hides real bugs.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between "return promise" and "return await promise" inside try/catch?
A1: With "return await" the rejection is caught by the local catch block. Without await the
    function returns the pending promise and the rejection goes to the caller instead.

Q2: When would you use Promise.allSettled over Promise.all?
A2: When the tasks are independent, like loading widgets on a dashboard - one failure should not
    throw away the other results.

Q3: Can one .catch() handle errors from multiple .then() calls?
A3: Yes, a rejection skips all following .then() handlers until it reaches the nearest .catch().
*/
