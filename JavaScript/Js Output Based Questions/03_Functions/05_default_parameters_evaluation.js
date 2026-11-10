/*
==========================================================================================
QUESTION 5: When and how default parameters are evaluated
Topic: Functions   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

let x = 1;

function f(a = x, b = a + 1) {
  let x = 10;
  console.log(a, b);
}

f();
x = 7;
f();
f(5);
f(undefined, 3);
f(null);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1 2
7 8
5 6
7 3
null 1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Rules at play:
  - Default expressions are evaluated at CALL time, every time, left to right.
  - A default is used only when the argument is `undefined` (missing or passed
    explicitly as undefined). `null` is a real value and does NOT trigger the default.
  - Later defaults can use earlier parameters (b = a + 1).
  - Defaults are evaluated in their own parameter scope, which sits OUTSIDE the
    function body. So `x` in `a = x` refers to the outer x, never to the body's
    `let x = 10`.

Walkthrough:
  f()             -> a = outer x = 1, b = 1 + 1 = 2        -> "1 2"
  x = 7           -> outer x changes
  f()             -> defaults re-evaluated: a = 7, b = 8   -> "7 8"
  f(5)            -> a = 5 (no default), b = 5 + 1 = 6     -> "5 6"
  f(undefined, 3) -> undefined triggers a's default -> 7; b = 3 -> "7 3"
  f(null)         -> a = null (null does NOT trigger the default);
                     b is missing -> b = null + 1 = 1 (null converts to 0) -> "null 1"

KEY RULE: Defaults are evaluated lazily at each call, only for undefined arguments, in a parameter scope that sits between the outer scope and the function body.
COMMON MISTAKE: Expecting null to trigger the default, expecting the default to be "remembered" from the first call (1 instead of 7), or expecting x to be the body's 10.
*/
