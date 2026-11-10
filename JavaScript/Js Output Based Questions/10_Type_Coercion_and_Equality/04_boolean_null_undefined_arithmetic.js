/*
==========================================================================================
QUESTION 4: true + true, null + 1, undefined + 1
Topic: Type Coercion and Equality   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(true + true);
console.log(true + false);
console.log(true + "1");
console.log(true - "1");
console.log(null + 1);
console.log(undefined + 1);
console.log(true + null);
console.log(null + "1");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
2
1
true1
0
1
NaN
1
null1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
ToNumber conversion table you need here:
   true -> 1     false -> 0     null -> 0     undefined -> NaN

true + true     -> no strings -> numeric: 1 + 1 = 2
true + false    -> 1 + 0 = 1
true + "1"      -> a string is present -> ToString(true) = "true" -> "true1"
true - "1"      -> - always numeric: 1 - 1 = 0
null + 1        -> 0 + 1 = 1
undefined + 1   -> NaN + 1 = NaN
true + null     -> 1 + 0 = 1
null + "1"      -> a string is present -> ToString(null) = "null" -> "null1"

KEY RULE: ToNumber(null) is 0 but ToNumber(undefined) is NaN. With a string operand, + uses ToString instead ("true", "null", "undefined").
COMMON MISTAKE: Thinking undefined + 1 is 1 (like null), or that true + "1" is 2.
FOLLOW-UP: What is [] + null + 1?  Answer: "null1" -- [] becomes "", "" + null = "null", "null" + 1 = "null1".
*/
