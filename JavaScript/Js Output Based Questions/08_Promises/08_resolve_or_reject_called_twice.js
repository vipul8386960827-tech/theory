/*
==========================================================================================
QUESTION 8: Calling resolve / reject more than once
Topic: Promises   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const p = new Promise((resolve, reject) => {
  resolve("first");
  resolve("second");
  reject(new Error("third"));
  console.log("executor keeps running");
});

p.then((v) => console.log("p then:", v)).catch((e) => console.log("p catch:", e.message));

const q = new Promise((resolve) => {
  resolve("ok");
  throw new Error("thrown after resolve");
});

q.then((v) => console.log("q then:", v)).catch((e) => console.log("q catch:", e.message));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
executor keeps running
p then: first
q then: ok

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A promise can settle only ONCE. pending -> fulfilled or pending -> rejected, and after that
its state and value are locked. Later calls to resolve/reject are silently ignored.

Step | Action                                        | Call Stack | Microtask Queue  | Macrotask Queue
-----|-----------------------------------------------|------------|------------------|----------------
 1   | executor of p: resolve("first") -> p is       | executor   | -                | -
     |   fulfilled("first")                          |            |                  |
 2   | resolve("second"), reject(...) -> ignored     | executor   | -                | -
 3   | prints "executor keeps running" (resolve is   | executor   | -                | -
     |   not a return)                               |            |                  |
 4   | p.then(...) -> queued                         | global     | p-then           | -
 5   | executor of q: resolve("ok"), then throws.    | executor   | p-then           | -
     |   The constructor catches the error and calls |            |                  |
     |   reject() - but q is already settled, so the |            |                  |
     |   error is swallowed                          |            |                  |
 6   | q.then(...) -> queued                         | global     | p-then, q-then   | -
 7   | run p-then: prints "p then: first"            | p-then     | q-then, ...      | -
 8   | run q-then: prints "q then: ok"; both .catch  | q-then     | -                | -
     |   handlers are skipped (nothing rejected)     |            |                  |

KEY RULE: The first resolve/reject wins. A throw inside the executor only matters if the
          promise is still pending.
COMMON MISTAKE: Expecting "second", or expecting the catch to run because of reject() or the
          thrown error.
*/
