/*
==========================================================================================
QUESTION 12: Number.MAX_SAFE_INTEGER and precision loss
Topic: Operators, typeof and Numbers   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const max = Number.MAX_SAFE_INTEGER;

console.log(max);
console.log(max + 1);
console.log(max + 2);
console.log(max + 1 === max + 2);
console.log(9007199254740993);
console.log(Number.isSafeInteger(2 ** 53));
console.log(String(2n ** 53n + 1n));
console.log(Number.MAX_VALUE * 2);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
9007199254740991
9007199254740992
9007199254740992
true
9007199254740992
false
9007199254740993
Infinity

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A JavaScript Number (IEEE-754 double) has 53 bits of integer precision (the mantissa).
Number.MAX_SAFE_INTEGER = 2^53 - 1 = 9007199254740991 is the largest integer n such that
n and n + 1 are both exactly representable.

max + 1 = 2^53 = 9007199254740992 -> still exact.
max + 2 = 2^53 + 1 -> NOT representable. Above 2^53 only EVEN integers exist, so the
          value is rounded to the nearest representable: 9007199254740992.
max + 1 === max + 2 -> both are 9007199254740992 -> true

console.log(9007199254740993)
  Even the LITERAL can't be stored; it is rounded when the code is parsed -> ...992.

Number.isSafeInteger(2 ** 53) -> false (it is exactly representable, but 2^53 + 1 is
  not, so it is outside the "safe" range).

2n ** 53n + 1n
  BigInt has arbitrary precision -> exactly 9007199254740993.
  (String(...) is used so the output doesn't include the "n" suffix that consoles show.)

Number.MAX_VALUE * 2 -> overflows -> Infinity. (MAX_VALUE is about 1.79e308.)

KEY RULE: Integers beyond 2^53 - 1 silently lose precision. Use BigInt (e.g. for IDs from APIs, use strings or BigInt).
COMMON MISTAKE: Answering 9007199254740993 for max + 2, or confusing MAX_SAFE_INTEGER with MAX_VALUE.
FOLLOW-UP: What is 10n + 1?  TypeError: Cannot mix BigInt and other types, use explicit conversions.
*/
