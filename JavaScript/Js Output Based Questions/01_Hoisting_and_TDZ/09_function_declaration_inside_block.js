/*
==========================================================================================
QUESTION 9: Function declaration inside an if block (non-strict mode)
Topic: Hoisting and TDZ   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

console.log(typeof greet);

if (true) {
  console.log(typeof greet);
  function greet() {
    return "hi";
  }
}

console.log(typeof greet);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
function
function

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Function declarations inside blocks have special legacy ("Annex B") semantics in
non-strict code. The engine effectively creates TWO bindings:
  a) a `var`-like binding `greet` in the enclosing function/script scope, initialized
     to undefined during the outer creation phase;
  b) a block-scoped `greet` inside the block, which is hoisted to the top of the block
     WITH its body as soon as the block is entered.
When execution reaches the declaration line inside the block, the current block value
is copied to the outer var-like binding.

Step by step:
  1. Outside, before the block: only the var-like binding exists -> "undefined".
  2. Entering the block: the block-level greet is created with its body immediately,
     so even before the declaration line -> "function".
  3. After the declaration line ran, the outer binding received the function -> "function".

If the `if` condition were false, the block never runs, so the outer `greet` stays
undefined and the last log would print "undefined".

KEY RULE: In sloppy mode a function declared in a block is hoisted to the top of the block with its body, and only declared (as undefined) in the outer scope until the block executes.
COMMON MISTAKE: Answering "function" three times, treating it like a top-level function declaration, or throwing a ReferenceError for the first line.
FOLLOW-UP: With "use strict" at the top? -> "undefined", "function", "undefined" - in strict mode block functions are purely block-scoped (and the last typeof gives undefined because greet is not declared outside).
*/
