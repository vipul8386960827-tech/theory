/*
==========================================================================================
QUESTION 9: Modifying a let loop variable inside the loop body
Topic: Scope and Closures   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i));
  i++;
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
3
5

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
With `let`, each iteration has its own binding of i. At the end of an iteration, the
CURRENT value of that iteration's i is copied into a new binding for the next iteration,
and THEN the update expression (i++) runs on the new binding.

Iteration 1: i = 0. Schedule a callback that closes over THIS binding.
             Body does i++ -> this binding becomes 1.
             Copy 1 into next binding, then update i++ -> 2.
Iteration 2: i = 2 (2 < 5). Schedule callback on this binding. Body i++ -> 3.
             Copy 3, update -> 4.
Iteration 3: i = 4 (4 < 5). Schedule callback. Body i++ -> 5.
             Copy 5, update -> 6. 6 < 5 is false -> loop ends.

When the callbacks run, each reads the final value of ITS OWN binding: 1, 3, 5.
(The callbacks see the value after the body's i++ because they read the variable later,
not the value at scheduling time.)

KEY RULE: Per-iteration let bindings are still mutable variables; closures see the binding's latest value, and the loop copies the value forward between iterations.
COMMON MISTAKE: Answering "0 2 4" (assuming the value is captured at scheduling time) or "6 6 6" (treating it like var).
*/
