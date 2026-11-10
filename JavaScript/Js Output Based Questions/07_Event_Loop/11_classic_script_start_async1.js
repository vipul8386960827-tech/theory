/*
==========================================================================================
QUESTION 11: The classic "script start / async1" question
Topic: Event Loop   |   Difficulty: Hard
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
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

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
async1 end
promise2
setTimeout

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Two facts to know:
  - An async function runs SYNCHRONOUSLY until its first `await`.
  - `await x` evaluates x synchronously, then pauses the function; the rest of the function
    ("continuation") is resumed later as a MICROTASK once x is resolved.

Step | Action                                         | Call Stack       | Microtask Queue          | Macrotask Queue
-----|------------------------------------------------|------------------|--------------------------|----------------
 1   | prints "script start"                          | global           | -                        | -
 2   | setTimeout -> T                                | global           | -                        | T
 3   | async1(): prints "async1 start"                | async1           | -                        | T
 4   | await async2(): async2 runs NOW, prints        | async1, async2   | -                        | T
     |   "async2", returns an already-fulfilled       |                  |                          |
     |   promise                                      |                  |                          |
 5   | await on fulfilled promise -> continuation     | global           | async1-rest              | T
     |   queued; async1 pauses and returns            |                  |                          |
 6   | new Promise: executor prints "promise1",       | global           | async1-rest, promise2    | T
     |   resolve() -> .then(promise2) queued          |                  |                          |
 7   | prints "script end"                            | global           | async1-rest, promise2    | T
 8   | run async1-rest: prints "async1 end"           | async1           | promise2                 | T
 9   | run promise2: prints "promise2"                | then cb          | -                        | T
10   | macrotask: prints "setTimeout"                 | T                | -                        | -

KEY RULE: Code before the first await is synchronous; code after an await is a microtask.
COMMON MISTAKE: Printing "async1 end" right after "async2" (await always pauses, even when
          the value is ready), or putting "promise2" before "async1 end".
FOLLOW-UP: If async2 were `async function async2() { console.log("async2"); return
          Promise.resolve(); }`, returning a promise from an async function costs 2 extra
          ticks and "async1 end" would print AFTER "promise2" (see 09_Async_Await).
*/
