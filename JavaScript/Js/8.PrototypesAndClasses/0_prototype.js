/*
Prototype in JavaScript:

A prototype is an object from which another object
can inherit properties and methods.

When JavaScript cannot find a property on an object,
it looks for that property on the object's prototype.

Example:
*/

const parent = {
  greet() {
    console.log("Hello!");
  }
};

const child = Object.create(parent);

child.greet(); // "Hello!"

/*
Here:
- parent is the prototype of child.
- child inherits the greet() method from parent.
- Object.getPrototypeOf(child) returns parent.

Interview definition:
A prototype is an object that another object inherits
properties and methods from.
*/