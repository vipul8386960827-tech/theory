/*
==========================================================================================
QUESTION 8: Destructuring in function parameters
Topic: Destructuring, Spread and Rest   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function add({ a = 1, b = 2 } = {}) {
  return a + b;
}
console.log(add());
console.log(add({ a: 5 }));
console.log(add({ b: null }));

function greet({ name }) {
  return "Hi " + name;
}
console.log(greet({}));

try {
  console.log(greet());
} catch (e) {
  console.log(e.name + ": " + e.message);
}

function point([x, y] = [0, 0]) {
  return x + "," + y;
}
console.log(point(), point([3]));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
7
1
Hi undefined
TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.
0,0 3,undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
function add({ a = 1, b = 2 } = {})
  There are TWO layers of defaults:
   - "= {}" is the default for the WHOLE parameter (used when nothing is passed)
   - "a = 1", "b = 2" are defaults for individual properties

  add()          -> param undefined -> uses {} -> a = 1, b = 2 -> 3
  add({ a: 5 })  -> a = 5, b defaults to 2 -> 7
  add({ b: null })-> a = 1; b is null (NOT undefined) so no default -> 1 + null
                   -> 1 + 0 = 1

function greet({ name })   (no default for the parameter)
  greet({})  -> name is undefined -> "Hi undefined"
  greet()    -> the parameter is undefined and the engine tries to destructure it
             -> TypeError (V8 message shown; other browsers word it differently)

function point([x, y] = [0, 0])
  point()     -> default array [0, 0] -> "0,0"
  point([3])  -> the default is NOT used (an array was passed); y is undefined
              -> "3,undefined"

KEY RULE: Destructured parameters should get a fallback "= {}" (or "= []"), otherwise calling the function with no argument throws. Per-property defaults trigger only on undefined.
COMMON MISTAKE: Expecting add({ b: null }) to be 3, or greet() to return "Hi undefined".
FOLLOW-UP: What is add.length?  0 -- a parameter with a default value is not counted in Function.length.
*/
