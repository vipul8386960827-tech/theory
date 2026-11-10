/*
==========================================================================================
QUESTION 2: __proto__ vs prototype
Topic: Prototypes and Classes   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function Foo() {}
const f = new Foo();

console.log(f.__proto__ === Foo.prototype);
console.log(Object.getPrototypeOf(f) === Foo.prototype);
console.log(Foo.__proto__ === Function.prototype);
console.log(Foo.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__);
console.log(f.prototype);
console.log(typeof (() => {}).prototype);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true
true
true
true
null
undefined
undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Two different things:
  - `X.prototype` - a regular property that exists on (constructable) FUNCTIONS. It is
    the object that will become the prototype of instances created with `new X()`.
  - `obj.__proto__` (standard form: Object.getPrototypeOf(obj)) - the actual internal
    [[Prototype]] link of ANY object, i.e. where property lookup continues.

1. new Foo() sets f's [[Prototype]] to Foo.prototype -> true.
2. Same check with the standard API -> true.
3. Foo itself is a function object, created by Function -> its prototype link is
   Function.prototype -> true.
4. Foo.prototype is a plain object -> its prototype is Object.prototype -> true.
5. Object.prototype is the end of the chain -> null.
6. f is an ordinary object, not a function -> it has no `prototype` property -> undefined.
7. Arrow functions cannot be used with `new`, so they have no prototype property
   -> typeof undefined -> "undefined".

Full chain for f:  f -> Foo.prototype -> Object.prototype -> null

KEY RULE: `prototype` belongs to constructor functions (blueprint for instances); `__proto__` / [[Prototype]] is the link every object has to its parent.
COMMON MISTAKE: Thinking f.prototype === Foo.prototype, or that the chain ends with Object.prototype being undefined instead of null.
*/
