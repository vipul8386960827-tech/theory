/*
==========================================================================================
QUESTION 10: Async function that returns a promise (the "async1 end" trap)
Topic: Async / Await   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
  return Promise.resolve("x"); // returns a promise, not a plain value
}

console.log("script start");

setTimeout(() => console.log("setTimeout"), 0);

async1();

new Promise((resolve) => {
  console.log("promise1");
  resolve();
})
  .then(() => console.log("promise2"))
  .then(() => console.log("promise3"))
  .then(() => console.log("promise4"));

console.log("script end");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
script start
async1 start
async2
promise1
script end
promise2
promise3
async1 end
promise4
setTimeout

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Compare with the classic version (07_Event_Loop/11) where async2 returns nothing: there
"async1 end" prints BEFORE "promise2". Here async2 returns a PROMISE. An async function's
own promise (call it P2) has to ADOPT the returned promise X, which takes 2 extra ticks, and
async1's await can only resume after P2 is fulfilled.

Tick | Run (Call Stack)                                    | Microtask Queue after             | Macrotask Queue
-----|-----------------------------------------------------|-----------------------------------|----------------
 0   | sync: "script start", timer T queued,               | adoptJob(P2<-X), promise2         | T
     |   "async1 start", "async2" (async2 returns X ->     |                                   |
     |   P2 must adopt X -> adoptJob queued),              |                                   |
     |   async1 awaits PENDING P2 (nothing queued),        |                                   |
     |   "promise1", promise2 queued, "script end"         |                                   |
 1   | adoptJob: X.then(resolveP2) -> X already fulfilled  | promise2, resolveP2               | T
     |   -> resolveP2 queued                               |                                   |
 1   | promise2: prints "promise2" -> promise3 queued      | resolveP2, promise3               | T
 2   | resolveP2: P2 fulfilled -> async1's resume queued   | promise3, async1-resume           | T
 2   | promise3: prints "promise3" -> promise4 queued      | async1-resume, promise4           | T
 3   | async1 resumes: prints "async1 end"                 | promise4                          | T
 3   | promise4: prints "promise4"                         | -                                 | T
 4   | macrotask: prints "setTimeout"                      | -                                 | -

KEY RULE: `return somePromise` from an async function (or from .then) delays whoever is
          waiting on it by 2 extra microtask ticks.
COMMON MISTAKE: Giving the classic answer (async1 end before promise2). The only change is
          `return Promise.resolve(...)` in async2, and that moves "async1 end" two places later.
FOLLOW-UP: If async2 did `return await Promise.resolve("x")`, it awaits a native promise
          (1 tick) and returns a plain value, so "async1 end" would print after "promise2"
          but before "promise3".
*/
