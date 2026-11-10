/*
==========================================================================================
QUESTION 1: typeof quirks
Topic: Operators, typeof and Numbers   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log(typeof null);
console.log(typeof NaN);
console.log(typeof function () {});
console.log(typeof class {});
console.log(typeof []);
console.log(typeof undeclaredVariable);
console.log(typeof Symbol("id"));
console.log(typeof 10n);
console.log(typeof typeof 1);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
object
number
function
function
object
undefined
symbol
bigint
string

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
typeof null -> "object"
  A famous bug from the first JavaScript implementation (values were tagged with a type
  tag, and null used the same tag as objects). It can never be fixed without breaking
  the web. null is a primitive.

typeof NaN -> "number"
  NaN is a special value of the Number type.

typeof function () {} -> "function"
  Functions are objects, but typeof gives them their own result ("callable objects").

typeof class {} -> "function"
  Classes are just special constructor functions.

typeof [] -> "object"
  Arrays are objects. Use Array.isArray([]) to detect arrays.

typeof undeclaredVariable -> "undefined"
  typeof is the ONLY operator that does not throw a ReferenceError for an undeclared
  identifier. (Exception: let/const/class in their temporal dead zone DO throw.)

typeof Symbol("id") -> "symbol",   typeof 10n -> "bigint"

typeof typeof 1
  Inner: typeof 1 = "number" (a string). Outer: typeof "number" = "string".

KEY RULE: typeof returns one of: "undefined", "object", "boolean", "number", "bigint", "string", "symbol", "function". null and arrays both report "object".
COMMON MISTAKE: Answering "null" for typeof null, "array" for typeof [], or expecting a ReferenceError for typeof of an undeclared variable.
FOLLOW-UP: What does { typeof x; let x = 1; } do?  It throws ReferenceError: Cannot access 'x' before initialization, because x is in the TDZ.
*/
