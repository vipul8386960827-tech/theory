/*
==========================================================================================
QUESTION 4: Number() vs parseInt() vs parseFloat()
Topic: Operators, typeof and Numbers   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(Number(""), parseInt(""));
console.log(Number("12px"), parseInt("12px"));
console.log(Number(null), parseInt(null));
console.log(Number(" 12 "), parseInt(" 12 "));
console.log(Number("1e3"), parseInt("1e3"), parseFloat("1e3"));
console.log(Number([]), Number([5]), Number([1, 2]));
console.log(Number(undefined), Number(true), Number("0b101"));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
0 NaN
NaN 12
0 NaN
12 12
1000 1 1000
0 5 NaN
NaN 1 5

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Number(x)   -> converts the WHOLE value (ToNumber). Any invalid character -> NaN.
               Leading/trailing whitespace is ignored; an empty string becomes 0.
parseInt(s) -> converts to string, then parses the longest valid integer PREFIX.
               If no digit is found at the start -> NaN.

Number("") = 0               | parseInt("") = NaN (no digits at all)
Number("12px") = NaN         | parseInt("12px") = 12 (stops at "p")
Number(null) = 0             | parseInt(null) -> parseInt("null") -> NaN
Number(" 12 ") = 12          | parseInt(" 12 ") = 12 (leading whitespace skipped)
Number("1e3") = 1000         | parseInt("1e3") = 1 (stops at "e") | parseFloat understands
                               exponents -> 1000
Number([])     -> ToPrimitive gives ""    -> 0
Number([5])    -> "5"                     -> 5
Number([1, 2]) -> "1,2"                   -> NaN
Number(undefined) = NaN, Number(true) = 1
Number("0b101") = 5 -- Number understands 0b (binary), 0o (octal), 0x (hex) prefixes.
                  (parseInt only understands 0x.)

KEY RULE: Number is strict (whole string must be numeric, "" -> 0, null -> 0); parseInt is lenient (reads a prefix, "" -> NaN, null -> NaN).
COMMON MISTAKE: Assuming Number("") and Number(null) are NaN, or that parseInt("1e3") is 1000.
FOLLOW-UP: What do unary + and Number differ in?  Nothing for normal values: +"12px" is NaN and +"" is 0, just like Number (the only difference: +10n throws a TypeError, Number(10n) gives 10).
*/
