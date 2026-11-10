/*
==========================================================================================
QUESTION 9: Math.max() and Math.min() with no arguments
Topic: Operators, typeof and Numbers   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(Math.max());
console.log(Math.min());
console.log(Math.max() < Math.min());
console.log(Math.max(1, "5", null));
console.log(Math.max(1, undefined));
console.log(Math.max(...[]));
console.log(Math.min([1, 2]));
console.log(Math.max([5]));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
-Infinity
Infinity
true
5
NaN
-Infinity
NaN
5

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Math.max starts with a "current maximum" of -Infinity and compares each argument.
Math.min starts with +Infinity. These starting values are the identity elements:
any real number is larger than -Infinity and smaller than +Infinity.

Math.max()           -> no arguments -> the starting value -Infinity
Math.min()           -> Infinity
Math.max() < Math.min() -> -Infinity < Infinity -> true
Math.max(1, "5", null) -> every argument goes through ToNumber: 1, 5, 0 -> 5
Math.max(1, undefined) -> ToNumber(undefined) = NaN; if ANY argument is NaN -> NaN
Math.max(...[])      -> spreading an empty array passes no arguments -> -Infinity
Math.min([1, 2])     -> the ARRAY is one argument: ToNumber([1, 2]) -> "1,2" -> NaN
Math.max([5])        -> ToNumber([5]) -> "5" -> 5

KEY RULE: Math.max() is -Infinity and Math.min() is Infinity. Pass arrays with spread (Math.max(...arr)), and remember any NaN argument makes the result NaN.
COMMON MISTAKE: Expecting Math.max() to be 0 or undefined, or passing an array directly (Math.max(arr)).
FOLLOW-UP: Why is a very large array risky with Math.max(...arr)?  Spread puts every element on the call stack as an argument; with hundreds of thousands of items it can throw RangeError: Maximum call stack size exceeded. Use reduce instead.
*/
