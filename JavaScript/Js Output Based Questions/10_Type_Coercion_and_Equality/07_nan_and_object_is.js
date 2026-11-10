/*
==========================================================================================
QUESTION 7: NaN === NaN and Object.is
Topic: Type Coercion and Equality   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(NaN === NaN);
console.log(NaN == NaN);
console.log(Object.is(NaN, NaN));
console.log(0 === -0);
console.log(Object.is(0, -0));
console.log(isNaN("abc"));
console.log(Number.isNaN("abc"));
console.log(typeof NaN);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
false
false
true
true
false
true
false
number

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
NaN === NaN / NaN == NaN
  By the IEEE-754 floating point standard, NaN is not equal to anything, including
  itself. Both == and === return false.

Object.is(NaN, NaN)
  Object.is uses the "SameValue" algorithm. It is like === except for two cases:
    - NaN is the same as NaN          -> true
    - +0 and -0 are DIFFERENT          -> false

0 === -0          -> true  (=== treats both zeros as equal)
Object.is(0, -0)  -> false

isNaN("abc")
  The GLOBAL isNaN first coerces with ToNumber: ToNumber("abc") = NaN -> true.
  So isNaN answers "would this become NaN?", not "is this NaN?".

Number.isNaN("abc")
  No coercion. It returns true only if the value is literally the number NaN.
  "abc" is a string -> false.

typeof NaN -> "number"  (NaN is a special numeric value: "Not a Number" is still of type number)

KEY RULE: NaN is the only value not equal to itself. Use Number.isNaN(x) or Object.is(x, NaN) to test it; Object.is also distinguishes +0 and -0.
COMMON MISTAKE: Saying NaN === NaN is true, or thinking isNaN and Number.isNaN behave the same.
FOLLOW-UP: How can you check NaN without any built-in?  x !== x is true only when x is NaN.
*/
