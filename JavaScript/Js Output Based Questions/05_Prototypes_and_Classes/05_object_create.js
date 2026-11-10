/*
==========================================================================================
QUESTION 5: Object.create and objects without a prototype
Topic: Prototypes and Classes   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const base = {
  type: "base",
  describe() {
    return "I am " + this.type;
  },
};

const child = Object.create(base);
child.type = "child";

console.log(child.describe());
console.log(base.describe());
console.log(Object.getPrototypeOf(child) === base);
console.log(child.hasOwnProperty("describe"));
console.log(base.isPrototypeOf(child));

const bare = Object.create(null);
bare.x = 1;
console.log(typeof bare.toString);
console.log("x" in bare);
console.log(bare.hasOwnProperty("x"));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
I am child
I am base
true
false
true
undefined
true
TypeError: bare.hasOwnProperty is not a function

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Object.create(base) makes a new empty object whose [[Prototype]] is base.
   child.type = "child" creates an own property on child.
2. child.describe(): describe is found on base, but it's CALLED on child, so
   this = child -> "I am child". (`this` is the receiver, not the object owning the
   method.)
3. base.describe() -> "I am base".
4. child's prototype is exactly base -> true.
5. describe is inherited, not own -> false.
6. base.isPrototypeOf(child) -> base is in child's chain -> true.
7. Object.create(null) creates an object with NO prototype at all - nothing is
   inherited from Object.prototype -> toString is undefined.
8. `in` still works (it is an operator, not an inherited method) -> true.
9. hasOwnProperty is an Object.prototype method, which bare does not inherit
   -> calling undefined -> TypeError. (Use Object.hasOwn(bare, "x") instead.)

KEY RULE: Object.create(proto) sets the new object's prototype directly; inherited methods run with `this` = the object they were called on. Object.create(null) gives a truly empty "dictionary" object.
COMMON MISTAKE: Answering "I am base" for child.describe(), or assuming every object has hasOwnProperty/toString.
*/
