/*
==========================================================================================
QUESTION 10: When does the state actually change?
Topic: Promises   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

let state = "pending";

const p = new Promise((resolve) => {
  setTimeout(() => resolve("done"), 0);
});

p.then(() => {
  state = "fulfilled";
});

console.log("1:", state);

Promise.resolve().then(() => console.log("2:", state));

setTimeout(() => console.log("3:", state), 0);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1: pending
2: pending
3: fulfilled

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`p` is resolved inside a timer, so its .then callback cannot run until that timer fires.
Two timers with the same delay fire in the order they were created, and the microtask queue
is drained after EACH macrotask.

Names: T-res = timer that calls resolve, T-log = timer that logs "3",
       M-state = p.then callback, M-log = callback that logs "2".

Step | Action                                         | Call Stack | Microtask Queue | Macrotask Queue
-----|------------------------------------------------|------------|-----------------|----------------
 1   | executor: setTimeout(T-res)                    | global     | -               | T-res
 2   | p.then(M-state) -> p pending, just registered  | global     | -               | T-res
 3   | prints "1: pending"                            | global     | -               | T-res
 4   | Promise.resolve().then(M-log)                  | global     | M-log           | T-res
 5   | setTimeout(T-log)                              | global     | M-log           | T-res, T-log
 6   | drain: M-log prints "2: pending"               | M-log      | -               | T-res, T-log
 7   | T-res: resolve("done") -> M-state queued       | T-res      | M-state         | T-log
 8   | drain: M-state sets state = "fulfilled"        | M-state    | -               | T-log
 9   | T-log: prints "3: fulfilled"                   | T-log      | -               | -

KEY RULE: A promise's .then runs only after the promise settles; if it settles inside a
          macrotask, the callback runs in the microtask checkpoint right after that macrotask.
COMMON MISTAKE: Answering "3: pending" (forgetting microtasks run between the two timers) or
          "2: fulfilled" (thinking p is already resolved).
*/
