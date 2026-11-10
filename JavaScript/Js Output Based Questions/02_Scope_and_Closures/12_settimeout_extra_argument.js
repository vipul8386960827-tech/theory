/*
==========================================================================================
QUESTION 12: var loop + setTimeout third argument
Topic: Scope and Closures   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

for (var i = 0; i < 3; i++) {
  setTimeout(
    function (j) {
      console.log(j, i);
    },
    0,
    i
  );
}

console.log("after loop, i =", i);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
after loop, i = 3
0 3
1 3
2 3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. setTimeout(callback, delay, arg1, ...) forwards the extra arguments to the callback
   when it runs. The extra argument `i` is EVALUATED at the moment setTimeout is called,
   so its current value (0, then 1, then 2) is stored with each timer.
2. var i is a single shared variable; after the loop it equals 3. Because var is not
   block scoped, it is still accessible after the loop -> "after loop, i = 3" (printed
   first, since timers run after the synchronous code).
3. Each callback receives its stored value as parameter j (0, 1, 2), but reads the
   shared `i` through its closure -> 3 every time.

KEY RULE: Arguments are evaluated (copied) at call time; closure variables are read at execution time.
COMMON MISTAKE: Answering "0 0, 1 1, 2 2" or putting "after loop" last.
*/
