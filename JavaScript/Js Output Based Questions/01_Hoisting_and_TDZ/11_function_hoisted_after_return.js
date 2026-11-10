/*
==========================================================================================
QUESTION 11: A function declared after `return` still shadows the outer variable
Topic: Hoisting and TDZ   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

var a = 1;

function b() {
  a = 10;
  return;
  function a() {}
}

b();
console.log(a);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Global: a = 1, function b is hoisted.
2. b() is called. Creation phase of b: the declaration `function a() {}` is hoisted to
   the top of b, even though it appears after `return` (hoisting happens before any
   code runs, so unreachable position does not matter). This creates a LOCAL variable
   `a` inside b:
       function b() {
         var a = function a() {};   // local!
         a = 10;
         return;
       }
3. `a = 10` assigns to the LOCAL a (found first in the scope chain). The global a
   is untouched.
4. return. Back in global scope, a is still 1 -> prints 1.

KEY RULE: Function declarations are hoisted to the top of their enclosing function regardless of where they appear (even after return), creating a local binding.
COMMON MISTAKE: Answering 10 - assuming `a = 10` updates the global because no `var a` is visible inside b.
FOLLOW-UP: Remove `function a() {}`? -> 10 (the assignment then goes to the global a).
*/
