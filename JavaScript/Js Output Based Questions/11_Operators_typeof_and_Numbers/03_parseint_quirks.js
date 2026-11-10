/*
==========================================================================================
QUESTION 3: parseInt quirks
Topic: Operators, typeof and Numbers   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

console.log(parseInt(0.000005));
console.log(parseInt(0.0000005));
console.log(parseInt("0.0000005"));
console.log(parseInt(999999999999999999999));
console.log(parseInt("08"));
console.log(parseInt("0x1F"));
console.log(parseInt("123abc"));
console.log(parseInt("abc123"));
console.log(parseInt("1010", 2));
console.log(parseInt(null, 36));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
0
5
0
1
8
31
123
NaN
10
1112745

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
parseInt(value, radix) ALWAYS converts its first argument to a STRING first, then
reads digits from the left until it hits a character that is not a valid digit.

parseInt(0.000005)
  String(0.000005) = "0.000005" -> reads "0", stops at "." -> 0

parseInt(0.0000005)
  Numbers smaller than 1e-6 are stringified in exponent form:
  String(0.0000005) = "5e-7" -> reads "5", stops at "e" -> 5

parseInt("0.0000005")
  Already a string "0.0000005" -> reads "0" -> 0

parseInt(999999999999999999999)
  Numbers >= 1e21 are stringified in exponent form: "1e+21" -> reads "1" -> 1

parseInt("08")
  Since ES5, a leading 0 does NOT mean octal anymore -> 8
  (Old ES3 engines returned 0 here. This is why people say "always pass a radix".)

parseInt("0x1F")
  With no radix, a "0x"/"0X" prefix means hexadecimal -> 1*16 + 15 = 31

parseInt("123abc") -> 123 (stops at "a")
parseInt("abc123") -> NaN (the very first character is not a digit)
parseInt("1010", 2) -> binary 1010 = 10

parseInt(null, 36)
  String(null) = "null". In base 36 the letters a-z are digits 10-35, so every letter
  of "null" is a valid digit: n=23, u=30, l=21, l=21
  23*36^3 + 30*36^2 + 21*36 + 21 = 1073088 + 38880 + 756 + 21 = 1112745

KEY RULE: parseInt stringifies its argument, then parses the longest valid prefix in the given radix. It is meant for strings, not for truncating numbers (use Math.trunc).
COMMON MISTAKE: Expecting parseInt(0.0000005) to be 0 -- forgetting the number becomes "5e-7" before parsing.
FOLLOW-UP: What is parseInt(undefined, 36)?  86464843759093 -- every letter of "undefined" is a valid base-36 digit. But parseInt(undefined) (radix 10) is NaN, because "u" is not a decimal digit.
*/
