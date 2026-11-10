/*
==========================================================================================
QUESTION 1: setTimeout(0) vs Promise.then
Topic: Event Loop   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
start
end
promise
timeout

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The event loop algorithm (browser):
  1. Run the current script (synchronous code) until the call stack is empty.
  2. Run ALL microtasks (promise callbacks, queueMicrotask, await continuations).
  3. Render if needed, then take ONE macrotask (setTimeout, setInterval, events...) and go
     back to step 2.

Step | Action                                  | Call Stack     | Microtask Queue | Macrotask Queue
-----|-----------------------------------------|----------------|-----------------|----------------
 1   | console.log("start") -> prints "start"  | global         | -               | -
 2   | setTimeout(cb, 0) -> timer cb queued    | global         | -               | timeout
 3   | Promise.resolve().then(cb)              | global         | promise         | timeout
     |   promise is already resolved, so the   |                |                 |
     |   callback goes straight to microtasks  |                |                 |
 4   | console.log("end") -> prints "end"      | global         | promise         | timeout
 5   | script finished, stack empty            | -              | promise         | timeout
 6   | drain microtasks -> prints "promise"    | promise cb     | -               | timeout
 7   | take next macrotask -> prints "timeout" | timeout cb     | -               | -

KEY RULE: Synchronous code -> all microtasks -> one macrotask. Promise callbacks always run
          before a setTimeout(0) scheduled in the same turn.
COMMON MISTAKE: Thinking setTimeout(..., 0) runs "immediately" or before the promise because
          it was written first.
*/
