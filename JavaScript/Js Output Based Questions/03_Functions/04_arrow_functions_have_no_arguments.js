/*
==========================================================================================
QUESTION 4: Arrow functions and the arguments object
Topic: Functions   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function outer() {
  const inner = () => {
    return arguments[0];
  };
  return inner("inner arg");
}

console.log(outer("outer arg"));

const arrowSum = (...nums) => nums.reduce((s, n) => s + n, 0);
console.log(arrowSum(1, 2, 3));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
outer arg
6

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Arrow functions do NOT have their own `arguments` object (just like they have no own
   `this`). If you mention `arguments` inside an arrow function, it is resolved
   lexically - from the nearest enclosing regular function.
2. outer("outer arg") -> outer's arguments = ["outer arg"].
3. inner("inner arg") is called, but inside inner, `arguments` refers to OUTER's
   arguments object -> arguments[0] is "outer arg".
4. The modern way to collect arguments in an arrow function is a rest parameter:
   arrowSum(1, 2, 3) -> nums = [1, 2, 3] -> 6.

KEY RULE: Arrow functions have no own arguments (or this); they borrow them from the enclosing function scope.
COMMON MISTAKE: Answering "inner arg".
FOLLOW-UP: An arrow function at the top level of a browser script using `arguments` -> "ReferenceError: arguments is not defined".
*/
