/*
==========================================================================================
QUESTION 8: Accidental global from chained assignment
Topic: Scope and Closures   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

function init() {
  let a = (b = 5);
}

init();

console.log(typeof a);
console.log(typeof b);
console.log(b);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
number
5

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`let a = b = 5;` is NOT "declare a and b". Assignment is right-associative, so it is:
       b = 5;        // b is NOT declared anywhere!
       let a = b;    // only a is declared, locally

1. `b = 5`: the engine looks up b through the scope chain and finds nothing. In
   non-strict mode, assigning to an undeclared identifier silently creates a property
   on the global object -> b becomes a global variable.
2. `let a` is local to init() and disappears when init returns.
3. Outside: typeof a -> a is undeclared -> "undefined".
   typeof b -> "number", and b -> 5.

KEY RULE: In `let a = b = 5`, only `a` is declared; `b` becomes an implicit global in sloppy mode.
COMMON MISTAKE: Thinking both are local (answering "undefined undefined") or that `let` applies to both names.
FOLLOW-UP: With "use strict" inside init? -> "ReferenceError: b is not defined" when init() runs, because strict mode forbids implicit globals.
*/
