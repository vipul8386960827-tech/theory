/*
==========================================================================================
QUESTION 5: Hoisting inside a function shadows the outer variable
Topic: Hoisting and TDZ   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

var x = 1;

function test() {
  console.log(x);
  var x = 2;
  console.log(x);
}

test();
console.log(x);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
2
1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Global creation phase: `var x` and `function test` are hoisted. Then x = 1.
2. test() is called -> a new function execution context is created.
   Its creation phase hoists the LOCAL `var x` to the top of test, set to undefined:
       function test() {
         var x;           // local x = undefined - shadows the global x
         console.log(x);
         x = 2;
         console.log(x);
       }
3. First console.log looks up `x` - it is found in the local scope (value undefined),
   so the scope chain never reaches the global x = 1 -> prints "undefined".
4. Local x = 2 -> prints 2.
5. test() returns; the global x was never touched -> prints 1.

KEY RULE: A `var` anywhere inside a function is hoisted to the top of THAT function and shadows outer variables for the whole function body.
COMMON MISTAKE: Answering "1, 2, 1" - thinking the first log reads the global x because the local one is "declared later".
FOLLOW-UP: Change the inner `var x = 2` to `let x = 2`? -> first log throws "ReferenceError: Cannot access 'x' before initialization".
*/
