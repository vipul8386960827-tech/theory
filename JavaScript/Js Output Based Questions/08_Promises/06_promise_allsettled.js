/*
==========================================================================================
QUESTION 6: Promise.allSettled
Topic: Promises   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

Promise.allSettled([
  Promise.resolve("a"),
  Promise.reject(new Error("b")),
  "c",
  new Promise((resolve) => setTimeout(() => resolve("d"), 10)),
]).then((results) => {
  results.forEach((r) => {
    console.log(r.status, r.status === "fulfilled" ? r.value : r.reason.message);
  });
  console.log(Object.keys(results[0]).join(","), "|", Object.keys(results[1]).join(","));
});

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
fulfilled a
rejected b
fulfilled c
fulfilled d
status,value | status,reason

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Promise.allSettled NEVER rejects (for an iterable of inputs). It waits until every input has
settled - fulfilled OR rejected - and then fulfills with an array of result objects in input
order:
   { status: "fulfilled", value: ... }   or   { status: "rejected", reason: ... }

Time  | Action                                         | Call Stack | Microtask Queue | Macrotask Queue
------|------------------------------------------------|------------|-----------------|----------------
0ms   | "a" fulfilled, "b" rejected, "c" wrapped as    | global     | internal jobs   | -
      |   Promise.resolve("c"); 4th is pending (timer) |            |                 |
0ms   | internal jobs record results for a, b, c       | -          | -               | -
      |   (the rejection of b is HANDLED by            |            |                 |
      |    allSettled, so no "Uncaught" error)         |            |                 |
10ms  | timer resolves "d" -> last result recorded     | timer cb   | then cb         | -
10ms  | .then prints the 4 results in INPUT order      | then cb    | -               | -

KEY RULE: allSettled always fulfills; check `status` to tell successes from failures.
          Fulfilled objects have `value`, rejected objects have `reason`.
COMMON MISTAKE: Expecting the .then to be skipped because one promise rejected (that is
          Promise.all's behaviour), or looking for `value` on a rejected result.
*/
