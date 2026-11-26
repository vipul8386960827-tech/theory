/* 8_promise_error_not_caught_by_try_catch.js

=====================================================
Scenario: try/catch does not catch an async error
=====================================================

The Question (how the interviewer asks it):
- "We wrapped our code in try/catch, but the app still shows 'Uncaught' or
  'Unhandled promise rejection' in the console. The catch block never runs.
  Why, and how do you fix it?"

What the interviewer is checking:
- Do you know try/catch only catches sync errors and awaited promises?
- Can you spot a missing await or missing return?
- Do you know a setTimeout callback runs later, outside the try block?
- Do you know global handlers: unhandledrejection, window.onerror,
  process.on("unhandledRejection")?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain: try/catch works on the current call stack. It catches errors
   thrown now, or rejections of a promise that I await inside the try.
2. Case 1, missing await: the promise rejects later, after the try block
   has already finished. Fix: add await (or return the promise).
3. Case 2, missing return in a .then chain or helper: the caller cannot
   see the promise, so it cannot catch it. Fix: return the promise.
4. Case 3, setTimeout: the callback runs later on an empty stack. The outer
   try is gone. Fix: put try/catch inside the callback, or wrap the timer
   in a promise and await it.
5. As a safety net I add a global unhandledrejection listener to log
   errors (Sentry etc.), but I still fix the real cause.
6. I enable the ESLint rules no-floating-promises (typescript-eslint) and
   require-await to find these bugs early.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY 1: missing await
async function save() {
  try {
    saveToApi(); // returns a rejected promise later
  } catch (e) {
    console.log("never runs");
  }
}

// BUGGY 2: error inside setTimeout
try {
  setTimeout(() => { throw new Error("boom"); }, 0);
} catch (e) {
  console.log("never runs"); // try already finished
}

// FIXED 1
async function saveFixed() {
  try {
    await saveToApi();
  } catch (e) {
    showError(e);
  }
}

// FIXED 2: turn the timer into a promise and await it
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function later() {
  try {
    await wait(0);
    throw new Error("boom");
  } catch (e) {
    showError(e); // now it is caught
  }
}

// Safety net (browser). In Node: process.on("unhandledRejection", ...)
window.addEventListener("unhandledrejection", (event) => {
  logToMonitoring(event.reason);
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "try/catch only catches errors that happen while the try block is
  running, or promises that I await inside it. If I forget await or return,
  the promise rejects after the try is finished. A setTimeout callback also
  runs later, so the outer try cannot see it. I fix it by awaiting or
  returning the promise, or by putting try/catch inside the callback. I also
  add an unhandledrejection handler for logging."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "return promise" vs "return await promise" inside try: without await,
  the catch in this function does not run for that rejection.
- Adding .catch() on one promise but not returning it from a .then, which
  breaks the chain.
- Using the global handler as the main fix and hiding real bugs.
- Swallowing errors with an empty catch {}.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens to an unhandled rejection in Node?
A1: Since Node 15 the default is to throw, so the process crashes with a
    non-zero exit code. In browsers it is logged in the console and fires
    the unhandledrejection event.

Q2: Does an error inside a .then callback get caught by .catch later?
A2: Yes. A throw inside .then turns the returned promise into a rejected
    one, and the next .catch in the chain receives it.

Q3: How do you catch errors in event handlers or React components?
A3: Event handlers need their own try/catch (or await inside them). React
    error boundaries catch errors during rendering only, not in event
    handlers or async code.
*/
