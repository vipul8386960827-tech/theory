/*
==========================================================================================
QUESTION 12: IIFE variations and their return values
Topic: Functions   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

var result = (function () {
  return "A";
})();

var r2 = (function () {
  return "B";
}());

var r3 = function () {
  return "C";
}();

console.log(result, r2, r3);

var r4 = !function () {
  console.log("D runs");
  return true;
}();

console.log(r4);

var r5 = (() => "E")();
console.log(r5);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
A B C
D runs
false
E

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
An IIFE (Immediately Invoked Function Expression) is a function EXPRESSION that is
called right where it is defined. The key is that the parser must see an expression,
not a declaration.

1. (function(){...})()  -> classic form -> "A"
2. (function(){...}())  -> parens around the whole call, also valid -> "B"
3. var r3 = function(){...}() -> after `=` the parser already expects an expression,
   so no parentheses are needed -> "C"
4. !function(){...}() -> the unary `!` forces expression context. The function runs
   (prints "D runs") and returns true, then ! negates it -> r4 = false.
5. Arrow IIFE must be wrapped: (() => "E")() -> "E".

KEY RULE: Anything that puts the function in expression position (parens, =, !, +, void) allows immediate invocation.
COMMON MISTAKE: Thinking r4 is true (forgetting the ! applies to the RETURN value), or thinking form 3 is a syntax error.
FOLLOW-UP: `function () { return 1; }();` written as a standalone statement -> SyntaxError, because a statement starting with `function` is parsed as a declaration (which needs a name and cannot be invoked).
*/
