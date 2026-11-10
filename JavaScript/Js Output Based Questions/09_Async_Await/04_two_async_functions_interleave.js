/*
==========================================================================================
QUESTION 4: Two async functions interleaving
Topic: Async / Await   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

async function a() {
  console.log("a1");
  await null;
  console.log("a2");
  await null;
  console.log("a3");
}

async function b() {
  console.log("b1");
  await null;
  console.log("b2");
  await null;
  console.log("b3");
}

a();
b();
console.log("sync");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
a1
b1
sync
a2
b2
a3
b3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Each `await` splits a function into pieces. Each piece after an await is a microtask that
is queued only when the previous piece reaches that await. The two functions therefore take
turns, like two promise chains.

Step | Action                                          | Call Stack | Microtask Queue | Macrotask Queue
-----|-------------------------------------------------|------------|-----------------|----------------
 1   | a(): prints "a1", await -> pauses               | a          | a-part2         | -
 2   | b(): prints "b1", await -> pauses               | b          | a-part2, b-part2| -
 3   | prints "sync"                                   | global     | a-part2, b-part2| -
 4   | a-part2: prints "a2", await -> a-part3 queued   | a          | b-part2, a-part3| -
 5   | b-part2: prints "b2", await -> b-part3 queued   | b          | a-part3, b-part3| -
 6   | a-part3: prints "a3"                            | a          | b-part3         | -
 7   | b-part3: prints "b3"                            | b          | -               | -

KEY RULE: An async function does not "run to completion" in the background - every await
          puts its continuation at the BACK of the microtask queue.
COMMON MISTAKE: Answering a1 a2 a3 b1 b2 b3 (thinking a() finishes before b() starts) or
          putting "sync" first.
*/
