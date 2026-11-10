/*
==========================================================================================
QUESTION 3: Function declaration vs function expression hoisting
Topic: Hoisting and TDZ   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(typeof sayHi);
console.log(typeof sayBye);

sayHi();
sayBye();

function sayHi() {
  console.log("Hi");
}

var sayBye = function () {
  console.log("Bye");
};

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
function
undefined
Hi
TypeError: sayBye is not a function

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Creation phase:
  - `function sayHi() {...}` is a function DECLARATION. It is hoisted completely:
    the name AND the function body are stored in memory.
  - `var sayBye = function () {...}` is a function EXPRESSION assigned to a var.
    Only `var sayBye` is hoisted and set to `undefined`. The function itself is created
    only when the assignment line executes.

Execution phase:
  1. typeof sayHi  -> "function"
  2. typeof sayBye -> "undefined" (the var exists but holds undefined)
  3. sayHi()       -> prints "Hi"
  4. sayBye()      -> we try to call `undefined` -> TypeError: sayBye is not a function.
     Execution stops here.

KEY RULE: Function declarations are hoisted with their body; function expressions behave like the variable they are assigned to.
COMMON MISTAKE: Expecting "Bye" to print (treating the expression like a declaration) or expecting a ReferenceError (it is a TypeError because sayBye exists but is undefined).
FOLLOW-UP: What if it were `let sayBye = function () {...}`? -> line 2 itself throws "ReferenceError: Cannot access 'sayBye' before initialization" (typeof does not protect you in the TDZ), so only "function" prints before the error.
*/
