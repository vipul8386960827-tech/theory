/*
==========================================================================================
QUESTION 8: Objects with custom valueOf and toString
Topic: Type Coercion and Equality   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const obj = {
  valueOf() {
    return 42;
  },
  toString() {
    return "hello";
  },
};

console.log(obj == 42);
console.log(obj + 1);
console.log(obj + "");
console.log(`${obj}`);
console.log(String(obj));
console.log(obj > 41);
console.log(obj == "hello");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true
43
42
hello
hello
true
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
ToPrimitive(obj, hint) picks the order of methods to try:
   hint "number" or "default" -> valueOf() first, then toString()
   hint "string"              -> toString() first, then valueOf()
The first method that returns a primitive wins.

obj == 42
  Object vs number -> ToPrimitive(obj, "default") -> valueOf() = 42 -> 42 == 42 -> true

obj + 1
  + uses hint "default" -> valueOf() = 42 -> 42 + 1 = 43

obj + ""
  Still hint "default" -> valueOf() = 42 -> 42 + "" = "42"   (NOT "hello"!)

`${obj}`
  Template literals use ToString -> hint "string" -> toString() = "hello"

String(obj)
  Also hint "string" -> "hello"

obj > 41
  Relational operators use hint "number" -> 42 > 41 -> true

obj == "hello"
  hint "default" -> 42, then 42 == "hello" -> ToNumber("hello") = NaN -> false

KEY RULE: Only explicit string conversion (String(), template literals, property keys) prefers toString. +, ==, and comparisons call valueOf first.
COMMON MISTAKE: Answering "hello" for obj + "" -- concatenating with a string does NOT give the string hint; the hint is "default".
FOLLOW-UP: What if valueOf returned an object (e.g. return {})?  Then it is ignored and toString is used: obj + 1 would be "hello1".
*/
