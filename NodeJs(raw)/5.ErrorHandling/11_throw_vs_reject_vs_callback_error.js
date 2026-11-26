/* 11_throw_vs_reject_vs_callback_error.js

=====================================================
throw vs reject vs callback(err)
=====================================================

Definition (What I should say in the interview):
- "These are three ways to signal an error, and the right one depends on the function style.
   **throw** is for synchronous code and is caught by try/catch. **reject** (or throw inside an
   async function) is for promise-based code and is caught by .catch() or try/catch with await.
   **callback(err)** is for callback-style APIs. The main rule is to be consistent: one function
   should report errors in only one way, otherwise callers cannot handle them reliably."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Mechanism      | Function style     | Caller handles with            |
|----------------|--------------------|--------------------------------|
| throw          | Sync               | try/catch                      |
| reject / throw | Promise / async fn | .catch() or try/catch + await  |
| callback(err)  | Callback-based     | if (err) inside the callback   |

- Inside an async function, "throw" automatically becomes a rejected promise.
- Inside a new Promise executor, a sync throw also becomes a rejection,
  but a throw inside a setTimeout inside the executor does NOT.

-----------------------------------------------------
Example
-----------------------------------------------------
// 1. Sync -> throw
function parseAge(value) {
  const age = Number(value);
  if (Number.isNaN(age)) throw new TypeError('Age must be a number');
  return age;
}

// 2. Promise -> reject
function wait(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) return reject(new RangeError('ms must be >= 0'));
    setTimeout(resolve, ms);
  });
}

// 3. async function -> throw = reject
async function getUser(id) {
  if (!id) throw new Error('id required'); // returns a rejected promise
  return { id };
}

// 4. Callback -> cb(err)
function readSettings(cb) {
  require('fs').readFile('settings.json', 'utf8', (err, data) => {
    if (err) return cb(err);
    cb(null, data);
  });
}

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Mixing styles: a callback function that sometimes throws synchronously and sometimes calls cb(err).
- Throwing inside a setTimeout in a Promise executor -> becomes uncaughtException, not a rejection.
- reject() without return -> code after it still runs.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is "throw" inside an async function the same as Promise.reject?
A1: Yes, the async function returns a promise rejected with that error.

Q2: Does reject() stop the executor function?
A2: No, it only settles the promise. Code after it still runs, so I write "return reject(err)".

Q3: Can you reject with a non-Error value?
A3: Technically yes, but you lose the stack trace and instanceof checks. Always use Error objects.
*/
