/*
==========================================================================================
QUESTION 2: Code after await vs synchronous code
Topic: Async / Await   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

async function foo() {
  console.log("foo start");
  await null;
  console.log("foo end");
}

console.log("script start");
foo();
console.log("script end");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
script start
foo start
script end
foo end

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
An async function runs synchronously like any normal function UNTIL it hits `await`.
At the await, the function is paused, it immediately returns a pending promise to the caller,
and the rest of the function is scheduled as a microtask.

Step | Action                                     | Call Stack  | Microtask Queue | Macrotask Queue
-----|--------------------------------------------|-------------|-----------------|----------------
 1   | prints "script start"                      | global      | -               | -
 2   | foo() called: prints "foo start"           | global, foo | -               | -
 3   | await null -> foo pauses; its continuation | global      | foo-rest        | -
     |   is queued; foo returns a pending promise |             |                 |
 4   | prints "script end"                        | global      | foo-rest        | -
 5   | stack empty -> foo resumes: "foo end"      | foo         | -               | -

KEY RULE: `await` ALWAYS yields, even for a value that is not a promise (like null). Code
          after it runs as a microtask, after the current synchronous code.
COMMON MISTAKE: Answering script start, foo start, foo end, script end (thinking await null
          is instant because there is nothing to wait for).
*/
