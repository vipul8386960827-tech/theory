/*
==========================================================================================
QUESTION 10: Multiple function declarations mixed with a var function expression
Topic: Hoisting and TDZ   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function foo() {
  console.log("A");
}

foo();

var foo = function () {
  console.log("B");
};

foo();

function foo() {
  console.log("C");
}

foo();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
C
B
B

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Creation phase (top to bottom):
  1. function foo -> "A" is stored in foo.
  2. var foo -> foo already exists, var declaration is ignored (no reset to undefined).
  3. function foo -> "C" REPLACES the previous function. Last declaration wins.
  So before any line runs, foo = function logging "C".

Execution phase:
  1. The first declaration line does nothing at run time.
  2. foo() -> "C".
  3. `foo = function () { console.log("B") }` - the var assignment runs now.
  4. foo() -> "B".
  5. The second declaration line also does nothing at run time.
  6. foo() -> "B".

KEY RULE: All function declarations are processed before execution (the last one with the same name wins); function expressions are assigned only when their line executes.
COMMON MISTAKE: Answering "A, B, C" (reading top to bottom) or "C, B, C" (thinking the second declaration re-applies at run time).
*/
