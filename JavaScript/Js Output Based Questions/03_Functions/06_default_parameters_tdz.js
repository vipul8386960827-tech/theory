/*
==========================================================================================
QUESTION 6: TDZ inside default parameters
Topic: Functions   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function f(a = b, b = 2) {
  console.log(a, b);
}

f(1);
f(1, 5);
f();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1 2
1 5
ReferenceError: Cannot access 'b' before initialization

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Parameters behave like `let` declarations that are initialized left to right. While
parameter `a` is being initialized, parameter `b` exists but is still in its TDZ.

1. f(1): a = 1 is passed, so a's default (`b`) is never evaluated. Then b is missing
   -> b = 2. -> "1 2"
2. f(1, 5): no defaults needed -> "1 5"
3. f(): a is undefined -> evaluate the default `b`. But b is the NEXT parameter and has
   not been initialized yet -> ReferenceError (TDZ). Nothing prints for this call.

KEY RULE: A default parameter can refer to parameters on its LEFT, never to those on its right (they are in the TDZ).
COMMON MISTAKE: Answering "undefined 2" for f() (treating parameters like var) or "2 2".
FOLLOW-UP: `function g(a = a) {}; g();` -> also "ReferenceError: Cannot access 'a' before initialization".
*/
