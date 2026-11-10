/*
==========================================================================================
QUESTION 11: Completion order vs result order with async map
Topic: Async / Await   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const task = (id, ms) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("finished", id);
      resolve(id * 10);
    }, ms)
  );

(async () => {
  console.log("start");
  const results = await Promise.all(
    [[1, 300], [2, 100], [3, 200]].map(async ([id, ms]) => {
      console.log("started", id);
      return task(id, ms);
    })
  );
  console.log("results:", results.join(","));
})();

console.log("sync end");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
start
started 1
started 2
started 3
sync end
finished 2
finished 3
finished 1
results: 10,20,30

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
.map calls the async callback for every element synchronously. Each callback runs up to its
first await (here there is none - it just starts a timer and returns), so all three
"started" lines print immediately and all three timers start at ~0ms.

Time   | Action                                           | Call Stack | Microtask Queue | Macrotask Queue (timers)
-------|--------------------------------------------------|------------|-----------------|-------------------------
0ms    | IIFE: prints "start"                             | IIFE       | -               | -
0ms    | map: "started 1/2/3", timers 300/100/200 started | callbacks  | adoption jobs   | t1, t2, t3 pending
0ms    | IIFE awaits Promise.all -> pauses                | global     | ...             | ...
0ms    | prints "sync end"                                | global     | ...             | ...
100ms  | t2 fires: "finished 2"                           | t2         | -               | t1, t3 pending
200ms  | t3 fires: "finished 3"                           | t3         | -               | t1 pending
300ms  | t1 fires: "finished 1" -> all fulfilled          | t1         | resume IIFE     | -
300ms  | IIFE: results in INPUT order -> 10,20,30         | IIFE       | -               | -

KEY RULE: Promise.all runs things in parallel; completion order follows the timing, but the
          result array always follows the input order.
COMMON MISTAKE: Answering "results: 20,30,10", or putting "sync end" before "start" (the IIFE
          body runs synchronously until its first await).
*/
