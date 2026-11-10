/*
==========================================================================================
QUESTION 10: super calls, overriding, and this before super()
Topic: Prototypes and Classes   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + " makes a sound";
  }
}

class Dog extends Animal {
  speak() {
    return super.speak() + " and barks";
  }
}

const d = new Dog("Rex");
console.log(d.speak());
console.log(d instanceof Animal);
console.log(Object.getPrototypeOf(Dog) === Animal);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);

class Cat extends Animal {
  constructor(name) {
    this.lives = 9;
    super(name);
  }
}

new Cat("Tom");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Rex makes a sound and barks
true
true
true
ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Dog has no constructor, so it gets the default `constructor(...args) { super(...args) }`
   -> Animal's constructor sets this.name = "Rex".
2. d.speak() finds Dog.prototype.speak first (overriding). `super.speak()` calls
   Animal.prototype.speak with the SAME this (d) -> "Rex makes a sound", then
   " and barks" is appended.
3. d's chain: d -> Dog.prototype -> Animal.prototype -> ... -> instanceof Animal true.
4. `extends` sets up TWO prototype links:
     Dog -> Animal                       (for static inheritance)
     Dog.prototype -> Animal.prototype   (for instance methods)
   Both checks are true.
5. Cat's constructor uses `this` before calling super(). In a derived class the
   instance is created BY the parent constructor, so `this` is uninitialized until
   super() returns -> ReferenceError. (The message shown is V8's - Chrome/Node;
   Firefox says "must call super constructor before using 'this' in derived class
   constructor".)

KEY RULE: In a derived class constructor you must call super() before touching `this`; super.method() calls the parent's method with the current `this`.
COMMON MISTAKE: Thinking super.speak() runs with a separate "parent" object (so this.name would be undefined), or that assigning this before super is allowed.
*/
