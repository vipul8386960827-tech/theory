/*
==========================================================================================
QUESTION 2: 0.1 + 0.2
Topic: Operators, typeof and Numbers   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log(0.5 + 0.25 === 0.75);
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);
console.log((0.1 + 0.2).toFixed(2));
console.log(typeof (0.1 + 0.2).toFixed(2));
console.log(0.1 * 3);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
0.30000000000000004
false
true
true
0.30
string
0.30000000000000004

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
JavaScript numbers are 64-bit IEEE-754 binary floating point values.
Fractions like 0.1 and 0.2 cannot be represented exactly in binary (just like 1/3 can't
be written exactly in decimal), so each is stored as the NEAREST representable value.

0.1 + 0.2
  The tiny errors add up and the result is the double closest to 0.30000000000000004,
  which is NOT the same double as the one used for the literal 0.3.
  -> 0.30000000000000004, and 0.1 + 0.2 === 0.3 is false.

0.5 + 0.25 === 0.75
  0.5 = 2^-1 and 0.25 = 2^-2 are exact in binary, so there is no rounding -> true.

Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON
  The standard way to compare floats: check the difference is smaller than a tolerance.
  Number.EPSILON is about 2.22e-16 -> true.

(0.1 + 0.2).toFixed(2) -> "0.30"
  toFixed rounds for display and returns a STRING (hence typeof is "string").

0.1 * 3 -> 0.30000000000000004 (same kind of rounding error).

KEY RULE: Never compare floating point results with ===. Compare with a tolerance (Number.EPSILON) or work in integers (e.g. cents).
COMMON MISTAKE: Answering 0.3 / true, or thinking this is a JavaScript bug -- every language using IEEE-754 doubles behaves the same.
FOLLOW-UP: What is 0.1 + 0.7?  0.7999999999999999.
*/
