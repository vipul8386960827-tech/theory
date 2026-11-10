/*
==========================================================================================
QUESTION 1: The arguments object vs declared parameters
Topic: Functions   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function demo(a, b) {
  console.log(arguments.length);
  console.log(demo.length);
  console.log(b);
  console.log(arguments[2]);
  console.log(Array.isArray(arguments));
}

demo(1, 2, 3);
demo(1);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
2
2
3
false
1
2
undefined
undefined
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
- `arguments` is an array-LIKE object holding every value actually passed in the call,
  regardless of how many parameters the function declares.
- `demo.length` is the number of DECLARED parameters (2) - it never depends on the call.

Call demo(1, 2, 3):
  arguments.length -> 3, demo.length -> 2, b -> 2, arguments[2] -> 3 (the extra argument
  is still reachable through arguments), Array.isArray(arguments) -> false.

Call demo(1):
  arguments.length -> 1, demo.length -> 2, b -> undefined (missing argument),
  arguments[2] -> undefined, Array.isArray -> false.

arguments has indexes and a length, but no array methods like map/forEach. Convert it
with Array.from(arguments) or [...arguments], or use rest parameters (...args) instead.

KEY RULE: arguments.length = number of arguments passed; fn.length = number of declared parameters (before any default/rest).
COMMON MISTAKE: Saying arguments is an array, or confusing arguments.length with fn.length.
*/
