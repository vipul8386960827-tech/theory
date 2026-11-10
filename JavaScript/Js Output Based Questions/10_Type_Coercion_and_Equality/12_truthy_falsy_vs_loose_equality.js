/*
==========================================================================================
QUESTION 12: Truthy/falsy values vs == true / == false
Topic: Type Coercion and Equality   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(Boolean([]), Boolean({}), Boolean("0"), Boolean(" "));
console.log(Boolean(""), Boolean(NaN), Boolean(new Boolean(false)));

if ("0") console.log("A: '0' is truthy");
if ("0" == false) console.log("B: '0' == false");
if ([] == false) console.log("C: [] == false");
if ("hello" == true) console.log("D: 'hello' == true");
else console.log("D: 'hello' is NOT == true");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true true true true
false false true
A: '0' is truthy
B: '0' == false
C: [] == false
D: 'hello' is NOT == true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Truthiness (ToBoolean) is used by if, !, &&, ||, ternary and Boolean().
The ONLY falsy values are: false, 0, -0, 0n, "", null, undefined, NaN
(plus the legacy document.all in browsers). EVERYTHING else is truthy, including:
  []  {}  "0"  " "  "false"  new Boolean(false)  (it is an object!)

Line 1: [] {} "0" " " are all truthy -> true true true true
Line 2: "" and NaN are falsy; new Boolean(false) is an OBJECT -> truthy -> false false true

But == does NOT use truthiness. It converts the boolean to a number:
  "0" == false     -> "0" == 0 -> 0 == 0 -> true          (so B prints)
  [] == false      -> [] == 0 -> "" == 0 -> 0 == 0 -> true (so C prints)
  "hello" == true  -> "hello" == 1 -> NaN == 1 -> false    (so the else branch prints)

So "0" is truthy AND "0" == false. "hello" is truthy but NOT == true.

KEY RULE: Never compare with == true / == false. Boolean context uses ToBoolean; == with a boolean uses ToNumber.
COMMON MISTAKE: Thinking "0" is falsy (it is a non-empty string), or that a truthy value is always == true.
FOLLOW-UP: What does !!"false" give?  true -- any non-empty string is truthy.
*/
