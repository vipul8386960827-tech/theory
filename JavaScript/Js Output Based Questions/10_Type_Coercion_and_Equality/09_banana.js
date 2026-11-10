/*
==========================================================================================
QUESTION 9: "b" + "a" + +"a" + "a"
Topic: Type Coercion and Equality   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log("b" + "a" + +"a" + "a");
console.log(("b" + "a" + +"a" + "a").toLowerCase());
console.log("a" + + "b");
console.log(+"");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
baNaNa
banana
aNaN
0

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
"b" + "a" + +"a" + "a"
  The key is the "+ +" in the middle: the second + is a UNARY plus applied to "a".
  The expression is really:  "b" + "a" + (+"a") + "a"

  1. +"a" -> ToNumber("a") -> NaN
  2. "b" + "a"      -> "ba"
  3. "ba" + NaN     -> string concatenation, String(NaN) = "NaN" -> "baNaN"
  4. "baNaN" + "a"  -> "baNaNa"

  .toLowerCase() -> "banana"

"a" + + "b"
  Spaces don't matter: + "b" is unary plus -> NaN -> "a" + NaN = "aNaN"

+""
  ToNumber("") is 0 (an empty / whitespace-only string converts to 0, not NaN).

KEY RULE: A + that has no left operand is unary plus and means ToNumber. Unary operators bind tighter than binary +.
COMMON MISTAKE: Answering "baaa" or a SyntaxError, missing that "+ +" contains a unary plus that turns "a" into NaN.
FOLLOW-UP: What is 1 + - + + + - + 1?  Answer: 2 -- the unary signs resolve to + (two minuses cancel), so it is 1 + 1.
*/
