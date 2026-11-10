/*
==========================================================================================
QUESTION 3: await a plain value vs await a thenable
Topic: Async / Await   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

async function test() {
  console.log(1);
  const a = await 10;
  console.log(a);
  const b = await {
    then(resolve) {
      resolve(20);
    },
  };
  console.log(b);
}

test();

Promise.resolve()
  .then(() => console.log("then 1"))
  .then(() => console.log("then 2"))
  .then(() => console.log("then 3"));

console.log(2);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
2
10
then 1
then 2
20
then 3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`await v` does roughly `Promise.resolve(v).then(resume)`:
  - await 10           -> Promise.resolve(10) is already fulfilled -> resume in 1 tick.
  - await <native promise> -> same, 1 tick.
  - await <thenable>   -> Promise.resolve(thenable) creates a NEW pending promise and queues a
                          job that calls thenable.then(...). That costs 1 extra tick, so the
                          function resumes after 2 ticks.

Tick | Run (Call Stack)                                  | Microtask Queue after       | Macrotask Queue
-----|---------------------------------------------------|-----------------------------|----------------
 0   | test(): prints 1; await 10 -> resume queued       | test#1                      | -
 0   | chain built -> then1 queued; prints 2             | test#1, then1               | -
 1   | test#1: prints 10; await thenable -> queue a job  | then1, callThenable         | -
     |   that will call thenable.then(resolve, reject)   |                             |
 1   | then1: prints "then 1" -> then2 queued            | callThenable, then2         | -
 2   | callThenable: thenable.then(resolve) runs,        | then2, test#2               | -
     |   resolve(20) -> the awaited promise fulfills ->  |                             |
     |   resume of test queued                           |                             |
 2   | then2: prints "then 2" -> then3 queued            | test#2, then3               | -
 3   | test#2: prints 20                                 | then3                       | -
 3   | then3: prints "then 3"                            | -                           | -

KEY RULE: await on a non-promise value resumes after one microtask; await on a custom
          thenable needs one extra tick because its .then must be called first (as a job).
COMMON MISTAKE: Printing 10 before 2 (await never resumes synchronously) or printing 20
          right after "then 1".
*/
