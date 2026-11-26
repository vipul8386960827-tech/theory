/* 12_why_try_catch_fails_with_callbacks.js

=====================================================
Why try/catch Fails with Callbacks
=====================================================

Definition (What I should say in the interview):
- "try/catch only catches errors thrown **while the try block is on the call stack**. With
   callbacks, the async function just registers the callback and returns immediately, so the try
   block is already finished. When the callback runs later from the event loop, it runs on a
   **new call stack**, and any error thrown there is outside the try/catch - it becomes an
   uncaughtException. That is why callbacks pass errors as an argument, and why async/await is
   nicer: await pauses the function so try/catch still wraps the result."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. try/catch is synchronous - it works on the current call stack only.
2. fs.readFile, setTimeout, etc. return immediately -> try block exits.
3. The callback runs later in a different event loop tick -> different stack.
4. Fix -> handle the error inside the callback, or use promises + await.

-----------------------------------------------------
Example (the problem)
-----------------------------------------------------
const fs = require('fs');

try {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;          // thrown LATER, on a new stack
    JSON.parse(data);
  });
} catch (e) {
  console.log('Caught?', e);     // never runs
}
// -> process crashes with uncaughtException

-----------------------------------------------------
Example (the fixes)
-----------------------------------------------------
// Fix 1: handle inside the callback
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) return console.error('Read failed:', err.message);
  try {
    console.log(JSON.parse(data)); // sync work inside callback -> its own try/catch
  } catch (parseErr) {
    console.error('Bad JSON:', parseErr.message);
  }
});

// Fix 2: promises + await
const fsp = require('fs/promises');
(async () => {
  try {
    const data = await fsp.readFile('data.json', 'utf8');
    console.log(JSON.parse(data));
  } catch (err) {
    console.error('Caught properly:', err.message); // works
  }
})();

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does await make try/catch work again?
A1: await suspends the async function and resumes it inside the same try block when the promise
    settles. A rejection is re-thrown at the await point, so the catch sees it.

Q2: Same issue with setTimeout?
A2: Yes - try { setTimeout(() => { throw err }) } catch {} does not catch it.

Q3: Same issue with event listeners?
A3: Yes, errors thrown in an emitter listener happen when the event fires, not where on() was called.
*/
