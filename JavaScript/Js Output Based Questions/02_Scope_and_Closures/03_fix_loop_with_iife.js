/*
==========================================================================================
QUESTION 3: Fixing the var loop with an IIFE
Topic: Scope and Closures   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log("j =", j, "| i =", i);
    }, 0);
  })(i);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
j = 0 | i = 3
j = 1 | i = 3
j = 2 | i = 3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Each iteration immediately invokes a function (IIFE) and passes the CURRENT value of
   i as the argument `j`.
2. Every IIFE call creates a new function scope with its own parameter `j`:
     call 1: j = 0, call 2: j = 1, call 3: j = 2
3. The setTimeout callback created inside each IIFE closes over that call's `j`
   AND over the single shared global/function-level `i`.
4. When the callbacks finally run, the loop has finished, so the shared i is 3, while
   each j kept its own value.

KEY RULE: A new function call = a new scope. Passing the loop variable into an IIFE "freezes" its current value in a parameter that each closure owns.
COMMON MISTAKE: Thinking the IIFE also fixes `i` - it does not; only the copied parameter j is per-iteration.
*/
