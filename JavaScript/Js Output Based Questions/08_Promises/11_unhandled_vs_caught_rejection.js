/*
==========================================================================================
QUESTION 11: Where is a rejection actually caught?
Topic: Promises   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const p = Promise.reject(new Error("oops"));

p.catch((e) => console.log("catch A:", e.message));

p.then(
  () => console.log("then B"),
  (e) => console.log("onRejected B:", e.message)
);

p.then(() => console.log("then C")).catch((e) => console.log("catch C:", e.message));

Promise.resolve("value")
  .then(
    (v) => {
      throw new Error("thrown in success handler");
    },
    (e) => console.log("onRejected D - never runs")
  )
  .catch((e) => console.log("catch D:", e.message));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
catch A: oops
onRejected B: oops
catch C: oops
catch D: thrown in success handler

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Every .then/.catch creates a NEW promise. A rejection must be handled on EACH branch that
receives it; handling it on one branch does not handle it for the others.

Tick | Run (Call Stack)                                      | Microtask Queue after
-----|-------------------------------------------------------|-------------------------------
 0   | p is already rejected; handlers A, B, (C's then),     | A, B, C-then, D-then
     |   D-then are queued in attach order                   |
 1   | A: catch handler -> prints "catch A: oops"            | B, C-then, D-then
 1   | B: then's 2nd argument (onRejected) -> prints         | C-then, D-then
     |   "onRejected B: oops"                                |
 1   | C-then: no onRejected -> passes rejection on to the   | D-then, C-catch
     |   promise it returned -> C-catch queued               |
 1   | D-then: success handler throws -> returned promise    | C-catch, D-catch
     |   rejected. The onRejected in the SAME .then never    |
     |   sees this error                                     |
 2   | C-catch prints "catch C: oops"                        | D-catch
 2   | D-catch prints "catch D: thrown in success handler"   | -
(Macrotask Queue: empty throughout)

Why "catch C" prints after "onRejected B": C's catch is one link further down its chain, so
it needs one more tick.

KEY RULE: `.then(success, onRejected)` does NOT catch errors thrown by `success`; a trailing
          `.catch()` does. Each branch of a promise needs its own rejection handler.
COMMON MISTAKE: Thinking "onRejected D" catches the error thrown in its sibling success
          handler.
FOLLOW-UP: If we wrote `p.then(() => console.log("then C"));` with NO .catch, that new
          promise would reject with nobody handling it -> the browser console shows
          "Uncaught (in promise) Error: oops" even though p itself has handlers.
*/
