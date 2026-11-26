/* 18_what_is_a_callback.js

=====================================================
What is a Callback?
=====================================================

Definition (What I should say in the interview):
- "A callback is simply a **function passed as an argument to another function**, which that
   function calls later - either immediately (sync) or when some work completes (async). Node's
   core APIs traditionally use the **error-first callback** convention: the first argument is an
   error or null, and the following arguments are the result. That convention is what lets tools
   like util.promisify convert callback APIs into Promises."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Functions are first-class in JS, so they can be passed around.
2. Sync callbacks: array.map, forEach, sort comparator.
3. Async callbacks: fs.readFile, setTimeout, event listeners.
4. Error-first: (err, result) => { if (err) ... }.
5. A callback should be called **exactly once**, and consistently either always sync or always async.

-----------------------------------------------------
Example (writing your own error-first API)
-----------------------------------------------------
function divide(a, b, cb) {
  setImmediate(() => {                       // keep it always async
    if (b === 0) return cb(new Error('Cannot divide by zero'));
    cb(null, a / b);
  });
}

divide(10, 2, (err, result) => {
  if (err) return console.error(err.message);
  console.log('Result:', result);            // Result: 5
});

divide(1, 0, (err) => {
  if (err) console.error(err.message);       // Cannot divide by zero
});

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Forgetting "return" before cb(err) -> code continues and calls the callback twice.
- Throwing inside an async callback - try/catch around the outer call cannot catch it.
- "Zalgo": calling the callback sometimes sync and sometimes async, which makes order unpredictable.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is the error the first argument?
A1: It forces the caller to think about errors first, and gives one consistent signature across all APIs.

Q2: Is every callback asynchronous?
A2: No. array.map callbacks run synchronously; only callbacks scheduled by async APIs run later.

Q3: What is a higher-order function?
A3: A function that takes a function as argument or returns one - functions that accept callbacks are higher-order.
*/
