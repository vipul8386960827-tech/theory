/*
==========================================================================================
QUESTION 7: Promise.race vs Promise.any
Topic: Promises   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const settleAfter = (value, ms, shouldFail) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (shouldFail ? reject(new Error(value)) : resolve(value)), ms)
  );

Promise.race([settleAfter("slow", 100), settleAfter("fast-fail", 50, true)])
  .then((v) => console.log("race:", v))
  .catch((e) => console.log("race error:", e.message));

Promise.any([settleAfter("slow", 100), settleAfter("fast-fail", 50, true)])
  .then((v) => console.log("any:", v))
  .catch((e) => console.log("any error:", e.message));

Promise.any([Promise.reject(new Error("x")), Promise.reject(new Error("y"))]).catch((e) =>
  console.log(e.name, e.errors.map((err) => err.message).join(","))
);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
AggregateError x,y
race error: fast-fail
any: slow

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
  Promise.race -> settles like the FIRST input to settle, success OR failure.
  Promise.any  -> fulfills with the FIRST input to FULFILL; ignores rejections. Rejects only
                  if ALL inputs reject, with an AggregateError whose .errors array holds every
                  reason (in input order).

Time   | Action                                         | Call Stack | Microtask Queue  | Macrotask Queue
-------|------------------------------------------------|------------|------------------|-----------------
0ms    | 4 timers started (two 100ms, two 50ms)         | global     | -                | -
0ms    | third call: both inputs already rejected ->    | global     | internal jobs    | -
       |   Promise.any rejects with AggregateError      |            |                  |
0ms    | microtasks: prints "AggregateError x,y"        | catch cb   | -                | -
50ms   | race's "fast-fail" rejects first ->            | timer      | race catch       | -
       |   race rejects -> prints "race error: ..."     |            |                  |
50ms   | any's "fast-fail" rejects -> any IGNORES it,   | timer      | -                | -
       |   still waiting for a success                  |            |                  |
100ms  | "slow" fulfills -> race already settled, so    | timer      | any then         | -
       |   ignored; any fulfills -> prints "any: slow"  |            |                  |

KEY RULE: race = first to SETTLE; any = first to SUCCEED (AggregateError if none do).
COMMON MISTAKE: Saying race gives "slow" (it does not skip rejections) or that any rejects
          with "fast-fail".
FOLLOW-UP: Promise.race([]) stays pending forever; Promise.any([]) rejects immediately with
          an AggregateError.
*/
