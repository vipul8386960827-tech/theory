/*
==========================================================================================
QUESTION 10: Comparing arrays and objects with == and ===
Topic: Type Coercion and Equality   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const a = [1, 2];
const b = [1, 2];
const c = a;

console.log(a == b);
console.log(a === c);
console.log(a == "1,2");
console.log({} == "[object Object]");
console.log([1] == true);
console.log([2] == true);
console.log([[]] == 0);
console.log([null] == "");
console.log([1, 2] < [1, 3]);
console.log([10] < [9]);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
false
true
true
true
true
false
true
true
true
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Object vs object (==, ===): compares REFERENCES, never contents.
  a == b   -> two different arrays -> false
  a === c  -> c points to the same array as a -> true

Object vs primitive (==): ToPrimitive(object) then compare.
  a == "1,2"            -> "1,2" == "1,2" -> true
  {} == "[object Object]" -> "[object Object]" == "[object Object]" -> true
  [1] == true           -> true -> 1; [1] -> "1" -> 1; 1 == 1 -> true
  [2] == true           -> true -> 1; [2] -> "2" -> 2; 2 == 1 -> false
  [[]] == 0             -> [[]].toString() = [].toString() = "" -> 0 == 0 -> true
  [null] == ""          -> join treats null/undefined as "" -> "" == "" -> true

Object vs object with < (relational):
  Both operands are converted with ToPrimitive. If BOTH results are strings, they are
  compared as strings (character by character), not as numbers.
  [1, 2] < [1, 3] -> "1,2" < "1,3" -> "2" < "3" -> true
  [10] < [9]      -> "10" < "9"    -> "1" < "9" -> true   (lexicographic!)

KEY RULE: == / === between two objects checks identity. Relational comparison of two arrays turns into a STRING comparison.
COMMON MISTAKE: Saying [2] == true is true because [2] is truthy, or [10] < [9] is false because 10 > 9.
FOLLOW-UP: How do you compare arrays by value?  Loop and compare elements (or JSON.stringify for simple data). Note == also can't do it.
*/
