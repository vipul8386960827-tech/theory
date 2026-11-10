/*
==========================================================================================
QUESTION 4: Function and var with the same name
Topic: Hoisting and TDZ   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(typeof foo);

var foo = "hello";

function foo() {
  return "I am a function";
}

console.log(typeof foo);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
function
string

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Creation phase (both declarations are hoisted):
  - `function foo` is hoisted with its body -> foo = <function>.
  - `var foo` is also hoisted, but a var declaration NEVER overwrites an existing
    binding with undefined. Since `foo` already exists (the function), the var
    declaration is simply ignored at this stage.
  So when execution starts, foo is the function.

Execution phase:
  1. typeof foo -> "function".
  2. `foo = "hello"` - the assignment part of the var line runs now and replaces the
     function with a string.
  3. The function declaration line does nothing at run time (it was already handled).
  4. typeof foo -> "string".

KEY RULE: During hoisting, function declarations win over var declarations; but a later var ASSIGNMENT at run time overwrites the function.
COMMON MISTAKE: Answering "undefined" first (thinking var hoisting resets foo) or "function" twice (forgetting the assignment runs).
FOLLOW-UP: If you call `foo()` after the assignment you get "TypeError: foo is not a function".
*/
