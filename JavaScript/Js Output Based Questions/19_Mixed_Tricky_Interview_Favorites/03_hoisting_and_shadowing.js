/*
==========================================================================================
QUESTION 3: Hoisting + scope shadowing + TDZ
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(typeof baz);
var baz = 1;
function baz() {}
console.log(typeof baz);

var x = 1;
function foo() {
  console.log(x);
  if (false) {
    var x = 2;
  }
  return x;
}
console.log(foo());

let y = 'outer';
function bar() {
  try {
    console.log(typeof y);
  } catch (e) {
    console.log(e.name);
  }
  let y = 'inner';
  return y;
}
console.log(bar());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
function
number
undefined
undefined
ReferenceError
inner

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Part 1 - var vs function with the same name:
1. During hoisting, function declarations are hoisted WITH their body, and they win over
   a `var` of the same name (the var declaration is just ignored, it doesn't reset it).
   So at the first line baz is the function -> 'function'.
2. Then the line `baz = 1` executes (the assignment part of var baz = 1) -> 'number'.

Part 2 - var inside a block that never runs:
3. `var x` inside foo is hoisted to the top of foo, even though the if (false) block
   never executes. So foo has its own local x = undefined that SHADOWS the global x.
4. console.log(x) -> undefined; return x -> undefined.

Part 3 - let and the Temporal Dead Zone:
5. `let y` inside bar is also hoisted to the top of bar, but it stays uninitialised
   until its declaration line (the TDZ). It shadows the outer y for the WHOLE function.
6. Even typeof throws for a variable in the TDZ -> ReferenceError (caught and logged).
7. After `let y = 'inner'`, bar returns 'inner'.

KEY RULE: Declarations are hoisted to the top of their scope (functions fully, var as
undefined, let/const into the TDZ). A local declaration anywhere in the scope shadows
the outer variable everywhere in that scope.
COMMON MISTAKE: Answering 1 for foo() (the if(false) var still shadows), or 'string' for
typeof y inside bar.
*/
