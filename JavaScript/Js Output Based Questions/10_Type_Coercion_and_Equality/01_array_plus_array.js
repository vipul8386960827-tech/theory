/*
==========================================================================================
QUESTION 1: Adding two empty arrays
Topic: Type Coercion and Equality   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(JSON.stringify([] + []));
console.log(typeof ([] + []));
console.log([1, 2] + [3, 4]);
console.log(typeof ([1, 2] + [3, 4]));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
""
string
1,23,4
string

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The binary + operator works like this:
  1. Convert BOTH operands with ToPrimitive (hint "default").
  2. If EITHER primitive is a string -> string concatenation.
  3. Otherwise -> ToNumber on both and add numerically.

[] + []
  - ToPrimitive([]): arrays are objects. valueOf() returns the array itself (not a
    primitive), so the engine falls back to toString() -> [].join(",") -> "".
  - So it becomes "" + "" -> "" (an empty string).
  - JSON.stringify("") prints the quotes so we can actually SEE the empty string: "".
  - typeof "" -> "string".

[1, 2] + [3, 4]
  - ToPrimitive([1, 2])  -> "1,2"
  - ToPrimitive([3, 4])  -> "3,4"
  - "1,2" + "3,4"        -> "1,23,4"   (plain string concatenation, NOT array merging)

KEY RULE: + with objects/arrays first converts them to primitives (valueOf, then toString). An array's toString is join(","), so arrays almost always turn into strings and + becomes concatenation.
COMMON MISTAKE: Answering [] (an empty array), 0, or [1, 2, 3, 4]. The + operator never merges arrays; use [...a, ...b] or a.concat(b) for that.
FOLLOW-UP: What is [] - []?  Answer: 0. The - operator always uses ToNumber: "" -> 0, so 0 - 0 = 0.
*/
