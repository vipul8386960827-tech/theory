/*
==========================================================================================
QUESTION 1: var hoisting basics
Topic: Hoisting and TDZ   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(a);
var a = 10;
console.log(a);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
10

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
JavaScript runs code in two phases:

1. Creation (memory) phase: the engine scans the scope and registers every `var`
   declaration, initializing it to `undefined`. Only the DECLARATION is hoisted,
   not the assignment `= 10`.

   So conceptually the code becomes:
       var a;            // a = undefined
       console.log(a);
       a = 10;
       console.log(a);

2. Execution phase:
   - Line 1: `a` exists but holds `undefined` -> prints "undefined".
   - Line 2: the assignment runs, a = 10.
   - Line 3: prints 10.

KEY RULE: `var` declarations are hoisted and initialized with `undefined`; assignments stay where they are.
COMMON MISTAKE: Answering "ReferenceError" (that would happen with let/const or an undeclared variable) or "10" (thinking the value is hoisted too).
FOLLOW-UP: What if `var a = 10;` is removed entirely? -> "ReferenceError: a is not defined", because there is no declaration at all.
*/
