/*
==========================================================================================
QUESTION 12: flat(), typeof [] and [,].length
Topic: Arrays   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const nested = [1, [2, [3, [4]]]];
console.log(JSON.stringify(nested.flat()));
console.log(JSON.stringify(nested.flat(2)));
console.log(JSON.stringify(nested.flat(Infinity)));
console.log(JSON.stringify([1, , 3].flat()));

console.log(typeof [], Array.isArray([]));

console.log([,].length);
console.log([, ,].length);
console.log([1, 2, ].length);
console.log([, 1].length);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[1,2,[3,[4]]]
[1,2,3,[4]]
[1,2,3,4]
[1,3]
object true
1
2
2
2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
flat(depth = 1) returns a NEW array with sub-arrays concatenated up to depth levels.

nested.flat()          -> default depth 1: [1, 2, [3, [4]]]
nested.flat(2)         -> [1, 2, 3, [4]]
nested.flat(Infinity)  -> flattens completely: [1, 2, 3, 4]
[1, , 3].flat()        -> flat also REMOVES holes -> [1, 3]

typeof []  -> "object" (arrays are objects). Array.isArray([]) -> true.
  Use Array.isArray to detect arrays, not typeof.

Trailing commas in array literals:
  A SINGLE trailing comma is ignored, but every other comma creates a slot.
  [,]     -> one hole, the trailing comma is ignored -> length 1
  [, ,]   -> a hole, a hole, trailing comma ignored  -> length 2
  [1, 2, ] -> trailing comma ignored                 -> length 2
  [, 1]   -> a hole at index 0, then 1                -> length 2

KEY RULE: flat defaults to depth 1 and drops holes. In array literals, the last trailing comma doesn't add an element, but every comma before it does.
COMMON MISTAKE: Expecting flat() to fully flatten by default, or saying [,].length is 0 or 2.
FOLLOW-UP: What does [[1, 2], [3]].flatMap(x => x) give?  [1, 2, 3] -- flatMap is map followed by flat(1).
*/
