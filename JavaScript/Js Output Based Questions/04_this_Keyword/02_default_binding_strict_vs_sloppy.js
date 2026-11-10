/*
==========================================================================================
QUESTION 2: Default binding - sloppy vs strict mode, primitives as this
Topic: this Keyword   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function sloppy() {
  return typeof this;
}

function strict() {
  "use strict";
  return typeof this;
}

console.log(sloppy());
console.log(strict());

console.log(sloppy.call(5));
console.log(strict.call(5));

function sloppyThis() {
  return this;
}
console.log(sloppyThis.call(null) === globalThis);
console.log(strict.call(null));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
object
undefined
object
number
true
object

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. sloppy(): plain call in non-strict code -> this = global object -> "object".
2. strict(): in strict mode a plain call leaves this as undefined -> "undefined".
3. sloppy.call(5): non-strict functions "box" primitive this values into wrapper
   objects (new Number(5)) -> "object".
4. strict.call(5): strict functions receive this exactly as passed -> "number".
5. sloppyThis.call(null): non-strict functions replace a null/undefined this with the
   global object, so the returned this IS globalThis -> true.
6. strict.call(null): this is exactly null, and typeof null is "object" (a historic
   quirk) -> "object".

KEY RULE: Non-strict functions coerce `this` (null/undefined -> global object, primitives -> wrapper objects); strict functions use `this` exactly as given.
COMMON MISTAKE: Answering "object" for strict() or "number" for sloppy.call(5); also forgetting typeof null is "object".
*/
