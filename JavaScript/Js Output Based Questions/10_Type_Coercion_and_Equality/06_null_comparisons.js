/*
==========================================================================================
QUESTION 6: null == 0 vs null >= 0
Topic: Type Coercion and Equality   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(null == 0);
console.log(null > 0);
console.log(null >= 0);
console.log(undefined == 0);
console.log(undefined >= 0);
console.log(null == undefined);
console.log(null === undefined);
console.log(null == false);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
false
false
true
false
false
true
false
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
== and the relational operators (> < >= <=) follow DIFFERENT algorithms.

Relational operators: convert both sides with ToNumber (after ToPrimitive).
  null > 0      -> 0 > 0   -> false
  null >= 0     -> a >= b is computed as NOT (a < b). 0 < 0 is false -> NOT false -> true
  undefined >= 0-> NaN < 0 is "undefined" (NaN comparisons fail) -> result is false

Loose equality (==): null and undefined are special. They are ONLY loosely equal to
each other (and themselves). No numeric conversion is done for them.
  null == 0          -> false  (null only == null/undefined)
  undefined == 0     -> false
  null == undefined  -> true
  null === undefined -> false  (different types)
  null == false      -> false  (false becomes 0, and null == 0 is false)

So null is "not greater than 0", "not equal to 0", yet ">= 0". Mathematically odd,
but it follows directly from the two algorithms.

KEY RULE: == treats null/undefined specially (they equal only each other); >, <, >=, <= convert null to 0 and undefined to NaN.
COMMON MISTAKE: Assuming null >= 0 is false because null == 0 and null > 0 are false.
FOLLOW-UP: What is undefined == null and undefined <= null?  true and false (NaN <= 0 is false).
*/
