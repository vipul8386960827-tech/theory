/*
==========================================================================================
QUESTION 3: Arrow function as a method in an object literal
Topic: this Keyword   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
Assume this runs in a browser <script> (top-level `this` is window).
*/

const obj = {
  label: "my object",
  regular: function () {
    return this.label;
  },
  arrow: () => {
    return this.label;
  },
  shorthand() {
    return this.label;
  },
};

console.log(obj.regular());
console.log(obj.arrow());
console.log(obj.shorthand());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
my object
undefined
my object

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. obj.regular() -> regular function called as a method -> this = obj -> "my object".
2. obj.arrow() -> arrow functions do NOT get their own `this`. They capture `this` from
   the scope where they are DEFINED. An object literal `{ }` is NOT a scope - so the
   surrounding scope is the top-level script, where this = window. window.label is
   undefined -> undefined. Calling it as obj.arrow() does not change that.
3. Shorthand methods are regular functions -> "my object".

(In Node, the top-level `this` of a CommonJS file is module.exports `{}`, which also
has no label -> the output is identical.)

KEY RULE: Arrow functions take `this` lexically from the enclosing function/script scope; object literals don't create a `this` scope. Don't use arrows for object methods that need `this`.
COMMON MISTAKE: Answering "my object" for obj.arrow(), believing the dot call sets `this` for arrows.
*/
