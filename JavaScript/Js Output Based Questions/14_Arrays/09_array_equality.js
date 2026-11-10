/*
==========================================================================================
QUESTION 9: Comparing arrays
Topic: Arrays   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log([1, 2, 3] == [1, 2, 3]);
console.log([1, 2, 3] === [1, 2, 3]);
console.log([1, 2, 3] == "1,2,3");
console.log([] == "");
console.log([0] == false);
console.log(JSON.stringify([1, 2]) === JSON.stringify([1, 2]));
console.log([1, 2] < [1, 3]);
console.log([10] < [9]);

const a = [1, 2];
const b = a;
b.push(3);
console.log(a == b, a.length);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
false
false
true
true
true
true
true
true
true 3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Two arrays are compared by REFERENCE. Two separate literals are two separate objects.
  [1, 2, 3] == [1, 2, 3]   -> false
  [1, 2, 3] === [1, 2, 3]  -> false

Array vs primitive with == -> the array is converted with ToPrimitive (join(",")):
  [1, 2, 3] == "1,2,3" -> "1,2,3" == "1,2,3" -> true
  [] == ""             -> "" == "" -> true
  [0] == false         -> false -> 0; [0] -> "0" -> 0; 0 == 0 -> true

JSON.stringify([1, 2]) === JSON.stringify([1, 2])
  Comparing two strings "[1,2]" -> true (a quick value comparison for simple data).

Relational operators on arrays -> both become strings and are compared as strings:
  [1, 2] < [1, 3] -> "1,2" < "1,3" -> true
  [10] < [9]      -> "10" < "9" -> "1" < "9" -> true (NOT numeric!)

const b = a; b.push(3)
  b references the same array -> a == b is true and a.length is 3.

KEY RULE: == and === on arrays compare identity. To compare contents, compare element by element (or JSON.stringify for simple, ordered data).
COMMON MISTAKE: Answering true for [1, 2, 3] == [1, 2, 3].
FOLLOW-UP: Write a quick shallow-equality check.  a.length === b.length && a.every((v, i) => Object.is(v, b[i])).
*/
