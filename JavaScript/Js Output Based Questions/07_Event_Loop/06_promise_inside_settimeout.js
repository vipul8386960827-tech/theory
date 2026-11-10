/*
==========================================================================================
QUESTION 6: Promise inside setTimeout (and vice versa)
Topic: Event Loop   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise inside timeout 1"));
}, 0);

setTimeout(() => {
  console.log("timeout 2");
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => console.log("timeout inside promise 1"), 0);
});

console.log("sync");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
sync
promise 1
timeout 1
promise inside timeout 1
timeout 2
timeout inside promise 1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Names: T1 = timeout 1, T2 = timeout 2, P1 = promise 1, PT1 = promise inside timeout 1,
       TP1 = timeout inside promise 1.

Step | Action                                         | Call Stack | Microtask Queue | Macrotask Queue
-----|------------------------------------------------|------------|-----------------|----------------
 1   | setTimeout(T1), setTimeout(T2)                 | global     | -               | T1, T2
 2   | .then(P1)                                      | global     | P1              | T1, T2
 3   | prints "sync"                                  | global     | P1              | T1, T2
 4   | run P1: prints "promise 1", schedules TP1      | P1         | -               | T1, T2, TP1
 5   | run T1: prints "timeout 1", queues PT1         | T1         | PT1             | T2, TP1
 6   | after EVERY macrotask the microtask queue is   | PT1        | -               | T2, TP1
     |   drained -> prints "promise inside timeout 1" |            |                 |
 7   | run T2: prints "timeout 2"                     | T2         | -               | TP1
 8   | run TP1: prints "timeout inside promise 1"     | TP1        | -               | -

The important step is 6: the microtask PT1 runs BEFORE timeout 2, because the event loop
drains the microtask queue after each single macrotask, not after all timers.

KEY RULE: One macrotask -> drain ALL microtasks -> next macrotask.
COMMON MISTAKE: Printing "timeout 2" before "promise inside timeout 1" (thinking all ready
          timers run as a batch first). Very old Node versions (< 11) did that; browsers and
          modern Node do not.
*/
