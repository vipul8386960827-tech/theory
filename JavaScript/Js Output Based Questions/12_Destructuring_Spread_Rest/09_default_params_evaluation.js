/*
==========================================================================================
QUESTION 9: When are default parameter values evaluated?
Topic: Destructuring, Spread and Rest   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function build(a, b = a * 2, c = a + b) {
  return JSON.stringify([a, b, c]);
}
console.log(build(1));
console.log(build(1, undefined, 10));
console.log(build(1, null));

let n = 0;
function next(x = ++n) {
  return x;
}
console.log(next(), next(), next(10), next());

function listAppend(item, list = []) {
  list.push(item);
  return list.length;
}
console.log(listAppend("a"), listAppend("b"));

try {
  (function (x = y, y = 1) {})();
} catch (e) {
  console.log(e.name + ": " + e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[1,2,3]
[1,2,10]
[1,null,1]
1 2 10 3
1 1
ReferenceError: Cannot access 'y' before initialization

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Default values are expressions evaluated AT CALL TIME, left to right, and only when the
argument is undefined. Later defaults can use earlier parameters.

build(1)               -> a = 1, b = 1 * 2 = 2, c = 1 + 2 = 3 -> [1,2,3]
build(1, undefined, 10)-> undefined triggers b's default (2); c = 10 is given -> [1,2,10]
build(1, null)         -> b = null (no default!), c = 1 + null = 1 -> [1,null,1]

next(x = ++n)
  next()   -> default runs: ++n -> 1
  next()   -> runs again: 2
  next(10) -> argument given, default NOT evaluated -> 10 (n stays 2)
  next()   -> 3

listAppend(item, list = [])
  A NEW array is created on every call (unlike Python, where a default list is created
  once and shared). So both calls return 1.

(function (x = y, y = 1) {})()
  Parameters are initialised left to right, like let declarations. When x's default
  runs, y is still in its temporal dead zone -> ReferenceError.

KEY RULE: Default parameter expressions are re-evaluated on every call where the argument is undefined, left to right, and can only safely refer to EARLIER parameters.
COMMON MISTAKE: Saying listAppend returns 1 then 2 (the Python behaviour), or that defaults are evaluated once at definition time.
FOLLOW-UP: What does next(undefined) return after the code above?  4 -- passing undefined explicitly still triggers the default.
*/
