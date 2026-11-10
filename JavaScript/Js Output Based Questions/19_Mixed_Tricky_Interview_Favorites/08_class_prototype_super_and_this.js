/*
==========================================================================================
QUESTION 8: Classes, prototype lookup, super and lost `this`
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return super.speak() + ' (woof)';
  }
}

const d = new Dog('Rex');
console.log(d.speak());

const speak = d.speak;
try {
  speak();
} catch (e) {
  console.log(e.name);
}

Animal.prototype.speak = function () {
  return `${this.name} was patched`;
};
console.log(d.speak());

d.speak = () => 'own property';
console.log(d.speak());

delete d.speak;
console.log(d.speak());

console.log(Object.getPrototypeOf(d) === Dog.prototype, d instanceof Animal);
console.log(d.hasOwnProperty('name'), d.hasOwnProperty('speak'));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Rex makes a sound (woof)
TypeError
Rex was patched (woof)
own property
Rex was patched (woof)
true true
true false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. d.speak() finds speak on Dog.prototype. super.speak() calls Animal.prototype.speak
   with this = d -> 'Rex makes a sound (woof)'.
2. `const speak = d.speak; speak()` loses the object. Class bodies are ALWAYS strict
   mode, so this is undefined (not window). super.speak() runs with this = undefined and
   `this.name` throws -> TypeError.
3. Patching Animal.prototype.speak at runtime: super.speak looks up the method on
   Animal.prototype at CALL time, so the new version is used -> 'Rex was patched (woof)'.
4. Assigning d.speak creates an OWN property on the instance, which shadows the
   prototype method -> 'own property'.
5. delete removes the own property; lookup falls back to Dog.prototype.speak again.
6. d's prototype is Dog.prototype, whose prototype is Animal.prototype -> true true.
7. name was set in the constructor (own property); speak lives on the prototype
   -> true false.

KEY RULE: Methods live on the prototype and are looked up at call time (own properties
shadow them). Class code is strict, so detached methods get this = undefined.
COMMON MISTAKE: Answering 'undefined makes a sound (woof)' for the detached call (that
would be sloppy mode), or expecting the prototype patch not to affect existing objects.
*/
