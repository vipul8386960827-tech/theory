/*
==========================================================================================
QUESTION 8: indexOf vs includes with NaN
Topic: Arrays   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const arr = [1, NaN, 3];

console.log(arr.indexOf(NaN));
console.log(arr.includes(NaN));
console.log(arr.findIndex(Number.isNaN));
console.log([0].includes(-0), [-0].indexOf(0));
console.log([1, , 3].includes(undefined));
console.log([1, , 3].indexOf(undefined));
console.log(["1", 2].includes(1));
console.log([{ a: 1 }].includes({ a: 1 }));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
-1
true
1
true 0
true
-1
false
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
indexOf uses STRICT EQUALITY (===).
includes uses SameValueZero: like ===, but NaN is considered equal to NaN.

arr.indexOf(NaN)  -> NaN === NaN is false for every element -> -1
arr.includes(NaN) -> SameValueZero(NaN, NaN) is true -> true
arr.findIndex(Number.isNaN)
  -> runs a predicate on each element; Number.isNaN(NaN) is true at index 1 -> 1

[0].includes(-0) -> SameValueZero treats +0 and -0 as equal -> true
[-0].indexOf(0)  -> -0 === 0 is true -> 0

[1, , 3].includes(undefined)
  includes reads every index 0..length-1, so the hole reads as undefined -> true
[1, , 3].indexOf(undefined)
  indexOf SKIPS holes (it only checks existing indexes) -> -1

["1", 2].includes(1)  -> no type coercion: "1" is not 1 -> false
[{ a: 1 }].includes({ a: 1 }) -> objects are compared by reference -> false

KEY RULE: Use includes (or findIndex with Number.isNaN) to search for NaN; indexOf can never find NaN. Neither does type coercion or deep object comparison.
COMMON MISTAKE: Assuming includes is just "indexOf !== -1"; they differ for NaN and for holes.
FOLLOW-UP: What about new Set([NaN, NaN]).size?  1 -- Set also uses SameValueZero.
*/
