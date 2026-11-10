/*
==========================================================================================
QUESTION 10: Currying - fixed arity and "infinite" sum
Topic: Functions   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const add = (a) => (b) => (c) => a + b + c;

console.log(add(1)(2)(3));
console.log(typeof add(1)(2));

function sum(a) {
  return function (b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}

console.log(sum(1)(2)(3)(4)());
console.log(sum(5)());

const addTen = add(10);
const addTenFive = addTen(5);
console.log(addTenFive(1), addTenFive(100));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
6
function
10
5
16 115

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Currying = turning f(a, b, c) into f(a)(b)(c): each call takes one argument and
returns a new function that remembers previous arguments via closures.

1. add(1) -> fn remembering a=1; (2) -> fn remembering b=2; (3) -> 1 + 2 + 3 = 6.
2. add(1)(2) is still waiting for c -> it is a function -> "function".
3. sum(1)(2)(3)(4)():
     sum(1)   returns fn with a=1
     (2)      -> b defined -> sum(3)
     (3)      -> sum(6)
     (4)      -> sum(10)
     ()       -> b is undefined -> return a = 10
4. sum(5)() -> 5.
5. Partial application reuse: addTenFive closes over a=10, b=5. Each call supplies c:
   16 and 115. The intermediate functions can be reused because closures are not
   consumed by calling them.

KEY RULE: Each curried call returns a closure that stores its argument; the final call (with all arguments, or an empty call as terminator) computes the result.
COMMON MISTAKE: Expecting sum(1)(2)(3)(4) without the final () to print 10 - it is still a function.
*/
