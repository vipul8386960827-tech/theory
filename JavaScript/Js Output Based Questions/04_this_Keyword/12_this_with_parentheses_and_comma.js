/*
==========================================================================================
QUESTION 12: Parentheses, comma operator and assignment - when is `this` lost?
Topic: this Keyword   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code? (non-strict script)
*/

const obj = {
  v: "obj",
  getV() {
    return this.v;
  },
};

console.log(obj.getV());
console.log((obj.getV)());
console.log((0, obj.getV)());
console.log((obj.getV = obj.getV)());
console.log((obj.getV || null)());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
obj
obj
undefined
undefined
undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Internally, `obj.getV` evaluates to a "Reference" that remembers both the base object
(obj) and the property name. Calling a Reference uses its base object as `this`.
Any operator that has to produce a VALUE turns the Reference into a plain function
value, dropping the base object.

1. obj.getV() -> normal method call -> "obj".
2. (obj.getV)() -> grouping parentheses do NOT evaluate the reference to a value; the
   Reference survives -> this = obj -> "obj".
3. (0, obj.getV)() -> the comma operator returns the VALUE of its last operand (just
   the function) -> plain call -> this = global object -> undefined.
4. (obj.getV = obj.getV)() -> an assignment expression evaluates to the assigned
   VALUE -> plain call -> undefined.
5. (obj.getV || null)() -> logical operators also return values -> undefined.

KEY RULE: Only a direct member access (optionally wrapped in plain parentheses) keeps `this`; comma, assignment, ||, ?: etc. produce a bare function and lose it.
COMMON MISTAKE: Answering "obj" for every line, or "undefined" for the parenthesized call in line 2.
FOLLOW-UP: The `(0, fn)()` pattern is used intentionally by bundlers/transpilers to call an imported function WITHOUT a this binding.
*/
