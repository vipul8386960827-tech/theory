/*
==========================================================================================
QUESTION 5: [] == ![]
Topic: Type Coercion and Equality   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log([] == ![]);
console.log([] == []);
console.log([] == false);
console.log(![] == false);
console.log([] == 0);
console.log([0] == false);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true
false
true
true
true
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Relevant steps of the loose equality (==) algorithm:
  a) Same type -> compare like === (objects: same reference?).
  b) If one side is a boolean -> convert it to a number first.
  c) Object vs number/string -> ToPrimitive(object), then compare again.
  d) String vs number -> ToNumber(string).

[] == ![]
  1. ![] is evaluated first. Every object is truthy, so ![] = false.
  2. Now: [] == false. Boolean side -> ToNumber(false) = 0.  ->  [] == 0
  3. Object vs number -> ToPrimitive([]) = "".               ->  "" == 0
  4. String vs number -> ToNumber("") = 0.                   ->  0 == 0
  5. true

[] == []
  Both are objects (same type), two DIFFERENT array instances -> false.

[] == false   -> [] == 0 -> "" == 0 -> 0 == 0 -> true
![] == false  -> false == false -> true
[] == 0       -> "" == 0 -> 0 == 0 -> true
[0] == false  -> [0] == 0 -> "0" == 0 -> 0 == 0 -> true

KEY RULE: With ==, booleans are converted to NUMBERS (not the other way round), and objects are converted with ToPrimitive. Truthiness (if/!) is a different rule: all objects are truthy.
COMMON MISTAKE: Answering false because "an array can't equal its own negation" or because [] is truthy. Truthiness is NOT used by ==.
FOLLOW-UP: Is [] truthy if [] == false is true?  Yes. if ([]) runs, because ToBoolean(object) is always true; == uses number conversion instead.
*/
