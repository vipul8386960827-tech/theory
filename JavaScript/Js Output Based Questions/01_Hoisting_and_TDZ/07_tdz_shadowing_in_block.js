/*
==========================================================================================
QUESTION 7: TDZ when a block shadows an outer let
Topic: Hoisting and TDZ   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

let value = "outer";

{
  console.log(value);
  let value = "inner";
  console.log(value);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
ReferenceError: Cannot access 'value' before initialization

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. The outer `value` is initialized to "outer".
2. Entering the block `{ ... }` creates a new block scope. Its creation step hoists
   the inner `let value` into the block - uninitialized (TDZ starts here).
3. `console.log(value)`: identifier lookup starts in the innermost scope. It finds the
   block's own `value` binding immediately, so the lookup STOPS there - it never falls
   back to the outer "outer" value. That binding is in the TDZ -> ReferenceError.
4. Execution stops; nothing else prints.

KEY RULE: Scope resolution is decided by where the binding is declared, not by whether it is initialized yet - an inner let shadows the outer one for the WHOLE block, including the lines above it.
COMMON MISTAKE: Answering "outer" then "inner", assuming the outer variable is visible until the inner one is declared.
FOLLOW-UP: Remove `let` from the inner line (`value = "inner"`)? -> "outer", "inner" and the outer variable is reassigned.
*/
