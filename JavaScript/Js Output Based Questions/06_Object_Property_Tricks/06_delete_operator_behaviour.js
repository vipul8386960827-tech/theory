/*
==========================================================================================
QUESTION 6: What does `delete` actually delete?
Topic: Object Property Tricks   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

var a = 1;
b = 2; // no declaration keyword -> implicit global
const obj = { x: 1 };
const arr = [10, 20, 30];

console.log(delete a);
console.log(delete b);
console.log(typeof b);
console.log(delete obj.x);
console.log(delete obj.doesNotExist);
console.log(delete Math.PI);
console.log(delete arr[1]);
console.log(arr.length);
console.log(arr[1]);
console.log(1 in arr);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
false
true
undefined
true
true
false
true
3
undefined
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`delete` removes a PROPERTY from an object. It returns false only when the property exists
and is non-configurable (in non-strict mode); otherwise it returns true.

  delete a              -> false. Variables declared with var/let/const/function cannot be
                           deleted (a global `var` becomes a NON-configurable property of
                           window).
  delete b              -> true. `b = 2` without a keyword creates a normal, configurable
                           property on the global object, so it can be deleted.
  typeof b              -> "undefined" (b is gone; typeof does not throw for undeclared names)
  delete obj.x          -> true, property removed.
  delete obj.doesNotExist -> true! Deleting something that does not exist is "successful".
  delete Math.PI        -> false, built-in constant is non-configurable.
  delete arr[1]         -> true, but it only removes the element, leaving a HOLE.
  arr.length            -> still 3. delete never re-indexes or shrinks an array.
  arr[1]                -> undefined (reading a hole)
  1 in arr              -> false, index 1 no longer exists (it is a hole, not "undefined").

KEY RULE: delete works on object properties, not variables; on arrays it leaves holes - use
          splice() to actually remove elements.
COMMON MISTAKE: Expecting arr.length to be 2, or expecting delete on a non-existing property
          to return false.
FOLLOW-UP: In "use strict", `delete a` is a SyntaxError (deleting an unqualified identifier),
          and `delete Math.PI` throws a TypeError.
*/
