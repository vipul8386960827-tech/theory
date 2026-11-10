/*
==========================================================================================
QUESTION 7: Block scope - var leaks, let does not
Topic: Scope and Closures   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function run() {
  if (true) {
    var x = 5;
    let y = 10;
    const z = 15;
  }
  console.log(x);
  console.log(typeof z);
  console.log(y);
}

run();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
5
undefined
ReferenceError: y is not defined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. `var x` ignores blocks - it is scoped to the whole function run(). After the if
   block, x is still accessible -> 5.
2. `let y` and `const z` are BLOCK scoped - they only exist inside the `{ }` of the if.
   Outside the block they are simply not declared.
3. `typeof z` -> z is undeclared in this scope, and typeof on an undeclared identifier
   returns "undefined" without throwing.
4. `console.log(y)` -> y is undeclared here -> ReferenceError: y is not defined.
   (Note: "is not defined", not "before initialization" - there is no binding at all
   in this scope, so this is not a TDZ error.)

KEY RULE: var is function-scoped; let and const are block-scoped.
COMMON MISTAKE: Expecting "10" for y, or expecting `typeof z` to throw.
*/
