/*
==========================================================================================
QUESTION 2: [] + {} vs {} + [] (statement vs expression)
Topic: Type Coercion and Equality   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log([] + {});
console.log({} + []);
console.log(eval("{} + []"));
console.log(eval("({} + [])"));
console.log({} + {});

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
[object Object]
[object Object]
0
[object Object]
[object Object][object Object]

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
[] + {}
  - ToPrimitive([]) -> "" (valueOf returns the array itself, so toString -> join -> "")
  - ToPrimitive({}) -> "[object Object]" (Object.prototype.toString)
  - "" + "[object Object]" -> "[object Object]"

{} + []   inside console.log(...)
  - Inside the parentheses of a function call the parser expects an EXPRESSION,
    so {} is an object literal. Same steps as above -> "[object Object]".

eval("{} + []")
  - eval parses the string as a PROGRAM (statements). A line that starts with { is
    parsed as an empty BLOCK statement, not an object literal.
  - What remains is the separate statement:  +[]   (unary plus!)
  - Unary + -> ToNumber([]) -> ToPrimitive gives "" -> ToNumber("") -> 0
  - The completion value of the program is 0. This is exactly what you see when you
    type {} + [] directly into a browser console / REPL in statement position.

eval("({} + [])")
  - Wrapping in parentheses forces expression parsing -> "[object Object]".

{} + {}  (as an expression)
  - "[object Object]" + "[object Object]" -> "[object Object][object Object]".
  - Typed as a statement, it would be: empty block, then +{} -> NaN.

KEY RULE: A { at the START of a statement is a block, not an object literal. As an expression, {} is an object that converts to "[object Object]".
COMMON MISTAKE: Saying {} + [] is always 0 (it is only 0 in statement position) or always "[object Object]" (not when typed directly into the console).
FOLLOW-UP: What does typing {} + {} in Chrome's console print? Modern Chrome DevTools wraps input that starts with { AND ends with } in parentheses, so it shows "[object Object][object Object]"; real statement parsing (e.g. eval("{} + {}") or older consoles) gives NaN. {} + [] does not end with }, so DevTools still shows 0 for it.
*/
