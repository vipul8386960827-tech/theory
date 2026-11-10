/*
==========================================================================================
QUESTION 1: var in a for loop with setTimeout
Topic: Scope and Closures   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
3
3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. `var i` is function/global scoped - there is only ONE `i` shared by every iteration.
2. The loop runs synchronously and very fast:
     i = 0 -> schedule callback #1
     i = 1 -> schedule callback #2
     i = 2 -> schedule callback #3
     i = 3 -> condition 3 < 3 is false, loop ends.
   The callbacks are NOT executed yet - they wait in the timer queue.
3. After ~1 second the callbacks run. Each one is a closure that references the same
   variable `i` (not a copy of its value at scheduling time). That variable is now 3.
4. So each callback prints 3.

KEY RULE: Closures capture variables (references), not values; with var there is only one loop variable for all iterations.
COMMON MISTAKE: Answering "0 1 2" - assuming each callback remembers the value of i at the time it was scheduled.
FOLLOW-UP: How to fix? Use `let i` (new binding per iteration), wrap the body in an IIFE that takes i as a parameter, or pass i as the third argument of setTimeout.
*/
