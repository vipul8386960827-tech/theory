/*
==========================================================================================
QUESTION 1: Destructuring defaults -- undefined vs null
Topic: Destructuring, Spread and Rest   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const { a = 1, b = 2, c = 3, d = 4 } = { a: undefined, b: null, c: 0 };
console.log(a, b, c, d);

const [x = 10, y = 20, z = 30] = [undefined, null];
console.log(x, y, z);

const { name: userName = "Guest" } = {};
console.log(userName);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1 null 0 4
10 null 30
Guest

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A default value in destructuring is used ONLY when the extracted value is strictly
=== undefined. Any other value, including null, 0, "" and false, is kept.

{ a = 1 }  -> a is explicitly undefined          -> default used -> 1
{ b = 2 }  -> b is null (not undefined)          -> null is kept -> null
{ c = 3 }  -> c is 0                             -> 0 is kept    -> 0
{ d = 4 }  -> the property doesn't exist (reading it gives undefined) -> 4

[x = 10, y = 20, z = 30] = [undefined, null]
  x -> undefined -> 10
  y -> null      -> null
  z -> no element at index 2 -> undefined -> 30

{ name: userName = "Guest" } = {}
  Renames the property "name" to the variable userName, with a default -> "Guest".
  (Note: there is no variable called "name" created here.)

KEY RULE: Defaults (in destructuring AND in function parameters) trigger only for undefined, never for null.
COMMON MISTAKE: Expecting b to be 2 because null "means no value". Unlike ??, destructuring defaults ignore null.
FOLLOW-UP: How do you also default null?  Use ?? after destructuring: const b2 = b ?? 2.
*/
