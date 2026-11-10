/*
==========================================================================================
QUESTION 4: Timers with different delays
Topic: Event Loop   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

setTimeout(() => console.log("A - 100ms"), 100);
setTimeout(() => console.log("B - 0ms"), 0);
setTimeout(() => console.log("C - 50ms"), 50);
setTimeout(() => console.log("D - no delay argument"));
console.log("E - sync");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
E - sync
B - 0ms
D - no delay argument
C - 50ms
A - 100ms

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A timer callback is only added to the macrotask queue when its delay has EXPIRED. The order
in which setTimeout was called does not matter - the expiry time does. Timers that expire at
the same time run in the order they were scheduled. Omitting the delay means 0.

Time  | Action                                      | Call Stack | Microtask Queue | Macrotask Queue
------|---------------------------------------------|------------|-----------------|----------------
0ms   | register A(100), B(0), C(50), D(0) timers   | global     | -               | -
0ms   | prints "E - sync"                           | global     | -               | -
~0ms  | B and D expire -> queued in call order      | -          | -               | B, D
~0ms  | run B, then D                               | B / D      | -               | -
~50ms | C expires -> queued and run                 | C          | -               | -
~100ms| A expires -> queued and run                 | A          | -               | -

KEY RULE: The delay is a MINIMUM wait, not an exact time. Shorter delay runs first; equal
          delays keep their scheduling order.
COMMON MISTAKE: Printing in source order (A, B, C, D) or thinking setTimeout without a delay
          is somehow faster than setTimeout(..., 0).
FOLLOW-UP: Browsers clamp nested timers (nesting level >= 5) to a minimum of 4ms, and
          inactive tabs throttle timers to ~1s, which is why delays are never exact.
*/
