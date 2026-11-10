/*
==========================================================================================
QUESTION 5: Promise.all - order, non-promises, fail-fast, empty array
Topic: Promises   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const p1 = Promise.resolve(1);
const p2 = 2; // not a promise
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 100));
const p4 = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("p4 failed")), 50)
);

Promise.all([p1, p2, p3]).then((values) =>
  console.log("all 1:", JSON.stringify(values))
);

Promise.all([p1, p3, p4])
  .then((values) => console.log("all 2:", JSON.stringify(values)))
  .catch((err) => console.log("all 2 error:", err.message));

Promise.all([]).then((values) => console.log("empty:", JSON.stringify(values)));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
empty: []
all 2 error: p4 failed
all 1: [1,2,3]

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Promise.all rules:
  - Non-promise values (like 2) are treated as Promise.resolve(value).
  - It fulfills with an array of values in the INPUT order (not completion order), once ALL
    inputs are fulfilled.
  - It rejects as soon as ANY input rejects (fail-fast) with that reason.
  - Promise.all([]) fulfills immediately with [].

Time   | Action                                       | Call Stack | Microtask Queue      | Macrotask Queue
-------|----------------------------------------------|------------|----------------------|----------------
0ms    | timers for p3 (100ms) and p4 (50ms) started  | global     | -                    | -
0ms    | Promise.all([]) is ALREADY fulfilled with [] | global     | empty-then, (internal| -
       |   -> its .then is queued right away; all 1   |            |  jobs for all 1/2)   |
       |   and all 2 are still waiting on p3/p4       |            |                      |
0ms    | microtasks: prints "empty: []"               | then cb    | -                    | -
50ms   | p4 timer: reject -> all 2 rejects at once    | timer cb   | all2-catch           | -
       |   (does NOT wait for p3)                     |            |                      |
50ms   | prints "all 2 error: p4 failed"              | catch cb   | -                    | -
100ms  | p3 timer: resolve(3) -> all 1 now complete   | timer cb   | all1-then            | -
100ms  | prints "all 1: [1,2,3]"                      | then cb    | -                    | -

KEY RULE: Promise.all = "all succeed or first failure"; results keep the input order.
COMMON MISTAKE: Thinking all 2 waits 100ms for p3 before rejecting, or that Promise.all([])
          never resolves (that is Promise.race([]), which stays pending forever).
FOLLOW-UP: p3 still resolves at 100ms even after all 2 has rejected - Promise.all does not
          cancel the other promises.
*/
