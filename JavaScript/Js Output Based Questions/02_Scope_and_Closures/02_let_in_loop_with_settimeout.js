/*
==========================================================================================
QUESTION 2: let in a for loop with setTimeout
Topic: Scope and Closures   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

console.log("loop finished");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
loop finished
0
1
2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. With `let` in a for-loop header, the engine creates a NEW binding of `i` for every
   iteration, copying the previous value into it before the increment step.
2. The loop runs synchronously:
     iteration 1: its own i = 0 -> callback #1 closes over THIS i
     iteration 2: its own i = 1 -> callback #2 closes over this i
     iteration 3: its own i = 2 -> callback #3 closes over this i
3. "loop finished" prints first because setTimeout callbacks are asynchronous - they
   run only after the current script finishes and the timer expires.
4. Each callback prints the i of its own iteration: 0, 1, 2.

KEY RULE: `let` in a for loop creates a fresh block-scoped binding per iteration, so each closure gets its own copy.
COMMON MISTAKE: Printing "loop finished" last, or answering "3 3 3" by confusing it with var.
*/
