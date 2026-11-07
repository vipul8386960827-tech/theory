/*
What is __proto__ in JavaScript?

__proto__ is a legacy accessor that allows us to access
or change an object's prototype.

The prototype is the object from which another object
can inherit properties and methods.

Example:
*/

const parent = {
  greet() {
    console.log("Hello!");
  }
};

const child = {
  name: "Alice"
};

// Set parent's object as child's prototype
child.__proto__ = parent;

// JavaScript finds greet() through the prototype
console.log(child.greet); // Function
child.greet();            // Hello!

// Check whether parent is child's prototype
console.log(child.__proto__ === parent); // true

/*
How does it work?

1. child does not have its own greet() method.
2. JavaScript looks for greet() on child.
3. Since it is not found, JavaScript checks child's prototype.
4. It finds greet() on parent and executes it.

Important interview points:

- __proto__ accesses an object's prototype.
- It is not the same as Constructor.prototype.
- Constructor.prototype is the object used as the
  prototype for instances created with new Constructor().
- __proto__ is a legacy accessor; prefer
  Object.getPrototypeOf(child) to read the prototype.
- Prefer Object.setPrototypeOf(child, parent) when
  changing the prototype is necessary.
*/