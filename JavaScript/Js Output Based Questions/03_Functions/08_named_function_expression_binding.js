/*
==========================================================================================
QUESTION 8: Named function expression - name binding scope and immutability
Topic: Functions   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

var foo = function bar() {
  bar = 42;
  return typeof bar;
};

console.log(foo());
console.log(typeof bar);
console.log(foo.name);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
function
undefined
bar

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
For a NAMED function expression like `function bar() {...}` assigned to foo:
  - The name `bar` is bound only INSIDE the function's own scope (a special scope
    between the function body and the outer scope). It is not created in the outer
    scope.
  - That inner `bar` binding is read-only (immutable).

1. foo() runs. `bar = 42` tries to assign to the read-only name binding. In non-strict
   mode this assignment silently fails (no error, no change). bar is still the function
   -> typeof bar -> "function".
2. Outside, `bar` was never declared -> typeof bar -> "undefined".
3. The function's name property is its declared name -> "bar".

KEY RULE: A named function expression's name is visible only inside the function and cannot be reassigned there.
COMMON MISTAKE: Answering "number" (thinking bar = 42 works) or thinking bar is accessible globally.
FOLLOW-UP: Add "use strict" inside the function? -> foo() throws "TypeError: Assignment to constant variable."
FOLLOW-UP 2: If the function declared `var bar = 42;` inside its body, typeof bar would be "number" - a real local variable shadows the name binding.
*/
