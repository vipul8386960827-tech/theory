/*
==========================================================================================
QUESTION 6: constructor property after manual prototype inheritance
Topic: Prototypes and Classes   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function A() {}
function B() {}

B.prototype = Object.create(A.prototype);

const b = new B();

console.log(b instanceof B, b instanceof A);
console.log(b.constructor === B);
console.log(b.constructor === A);
console.log(b.constructor.name);

B.prototype.constructor = B;
console.log(b.constructor.name);

console.log(A.prototype.constructor === A);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true true
false
true
A
B
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
By default every function's prototype object has a `constructor` property pointing back
to the function: A.prototype.constructor === A.

1. B.prototype = Object.create(A.prototype) REPLACES B's default prototype with a new
   empty object whose prototype is A.prototype. This new object has NO own
   `constructor`.
2. Chain of b:  b -> (new B.prototype) -> A.prototype -> Object.prototype -> null
   - instanceof B: B.prototype is in the chain -> true
   - instanceof A: A.prototype is in the chain -> true
3. b.constructor: not on b, not on the new B.prototype, found on A.prototype -> A.
   So `=== B` is false, `=== A` is true, name is "A".
4. Restoring B.prototype.constructor = B (the standard fix) -> now found earlier in the
   chain -> "B". Since b's prototype is that same object, b sees the change.
5. A.prototype.constructor was never touched -> true.

KEY RULE: `constructor` is just an inherited property on the prototype; replacing a prototype loses it unless you set it back. instanceof does not use `constructor` at all - it checks the prototype chain.
COMMON MISTAKE: Assuming b.constructor is always the function used with `new`.
*/
