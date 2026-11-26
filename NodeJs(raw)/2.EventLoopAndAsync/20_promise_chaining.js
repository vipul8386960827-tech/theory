/* 20_promise_chaining.js

=====================================================
Promise Chaining
=====================================================

Definition (What I should say in the interview):
- "Promise chaining works because **every .then() returns a new Promise**. Whatever I return
   from a .then callback becomes the value for the next .then - if I return a plain value it is
   passed along, and if I return a Promise the chain waits for it. If any step throws or rejects,
   control jumps to the nearest .catch. This lets me write sequential async steps in a flat,
   readable way with one error handler."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. .then(fn) returns a new Promise resolved with fn's return value.
2. Returning a Promise -> next .then waits for it.
3. Forgetting to return -> next .then gets undefined and does not wait.
4. Errors skip the following .then calls until a .catch.
5. .catch also returns a Promise, so the chain can continue (recovery).

-----------------------------------------------------
Example
-----------------------------------------------------
const getUser = (id) => Promise.resolve({ id, name: 'Asha' });
const getOrders = (user) => Promise.resolve([{ id: 1, total: 250 }]);

getUser(7)
  .then((user) => {
    console.log('user:', user.name);
    return getOrders(user);                  // return the Promise!
  })
  .then((orders) => orders.reduce((s, o) => s + o.total, 0))   // plain value
  .then((total) => {
    console.log('total:', total);
    throw new Error('payment service down');
  })
  .then(() => console.log('skipped'))
  .catch((err) => {
    console.log('caught:', err.message);
    return 'fallback';                       // recover
  })
  .then((v) => console.log('continues with', v));

// Output:
// user: Asha
// total: 250
// caught: payment service down
// continues with fallback

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Nesting .then inside .then (recreates callback hell).
- Missing "return" inside a .then -> race conditions and swallowed errors.
- Putting .catch in the middle and expecting it to stop the chain - it recovers instead.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between .then(success, fail) and .then(success).catch(fail)?
A1: With the second form, errors thrown inside success are also caught; with the first they are not.

Q2: What does .finally receive?
A2: No arguments, and it passes the original value or error through unchanged (unless it throws).

Q3: How do you pass data from step 1 to step 3?
A3: Use async/await with local variables, or return an object carrying both values.
*/
