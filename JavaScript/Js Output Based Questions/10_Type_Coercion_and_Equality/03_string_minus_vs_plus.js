/*
==========================================================================================
QUESTION 3: "5" - 3 vs "5" + 3
Topic: Type Coercion and Equality   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log("5" - 3);
console.log("5" + 3);
console.log("5" * "2");
console.log("10" / "2");
console.log("5" + -"2");
console.log(5 + +"3");
console.log(1 + 2 + "3");
console.log("1" + 2 + 3);
console.log("abc" - 1);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
2
53
10
5
5-2
8
33
123
NaN

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Only + is "overloaded" (string concatenation OR numeric addition). The other arithmetic
operators (- * / %) ALWAYS convert both operands with ToNumber.

"5" - 3        -> ToNumber("5") = 5 -> 5 - 3 = 2
"5" + 3        -> one operand is a string -> concatenation -> "5" + "3" = "53"
"5" * "2"      -> 5 * 2 = 10
"10" / "2"     -> 10 / 2 = 5
"5" + -"2"     -> unary minus runs first: -"2" -> -2 (a number)
                  then "5" + -2 -> string concatenation -> "5-2"
5 + +"3"       -> unary plus: +"3" -> 3, then 5 + 3 = 8
1 + 2 + "3"    -> + is left-to-right: (1 + 2) = 3, then 3 + "3" = "33"
"1" + 2 + 3    -> ("1" + 2) = "12", then "12" + 3 = "123"
"abc" - 1      -> ToNumber("abc") = NaN -> NaN - 1 = NaN

KEY RULE: + concatenates if either side is a string; - * / % always convert to numbers. Evaluation is left to right.
COMMON MISTAKE: Answering "6" for 1 + 2 + "3" or 6 for "1" + 2 + 3 -- forgetting that + is evaluated left to right and the type can change midway.
FOLLOW-UP: What is "5" - - "2"?  Answer: 7, because - -"2" is 5 minus (-2).
*/
