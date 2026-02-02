/* 259_get_prototype.js

=====================================================
Getting Prototype – Interview-Ready Answer
=====================================================

Definition:
- "The prototype of an object is another object from which it inherits 
  properties and methods. In JavaScript, `Object.getPrototypeOf(obj)` 
  is used to access an object's prototype."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Access inherited properties and methods.  
   - Understand the object's prototype chain.

2. **Syntax**  
   - `Object.getPrototypeOf(obj)` → returns the prototype object.

3. **Prototype Chain**  
   - Objects can inherit from other objects via the prototype chain.  
   - Used in inheritance and property delegation.

-----------------------------------------------------
Examples:

// Example 1: Simple object
const parent = { greet() { console.log("Hello"); } };
const child = Object.create(parent);

console.log(Object.getPrototypeOf(child) === parent); // true
child.greet(); // Hello

// Example 2: Class example
class Person {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}

const p = new Person("Kaizer");
console.log(Object.getPrototypeOf(p) === Person.prototype); // true
p.sayName(); // Kaizer

// Example 3: Prototype chain
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `Object.getPrototypeOf(obj)` retrieves the object from which `obj` inherits.  
- Useful for debugging inheritance or manually extending prototypes.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Prototype = parent blueprint.  
- Child objects automatically get access to parent features without copying them.

-----------------------------------------------------
Example / Usage:

const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `__proto__` and `Object.getPrototypeOf()`?  
A1: `__proto__` is non-standard accessor, `Object.getPrototypeOf()` is standard.

Q2: Can you set an object's prototype?  
A2: Yes, using `Object.setPrototypeOf(obj, proto)`, but it's not recommended for performance.

Q3: How does prototype chain affect property lookup?  
A3: JS searches object first, then follows the prototype chain until found or reaches null.

Q4: Can functions have prototypes?  
A4: Yes, functions have a `prototype` property used when creating instances with `new`.

Q5: Is every object linked to a prototype?  
A5: Yes, except `Object.create(null)` which has no prototype.
*/
