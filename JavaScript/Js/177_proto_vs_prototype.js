/* 177_proto_vs_prototype.js

=====================================================
Difference Between __proto__ and prototype in JavaScript
=====================================================

prototype is used when you create objects using a constructor function — it defines what properties and methods all instances should share.
__proto__ is what each individual object uses internally to access those shared properties and methods.

-----------------------------------------------------
Key Differences:
-----------------------------------------------------

1. __proto__
   - Exists on all objects.
   - Points to the object's prototype (internal link).
   - Example:
     const obj = {};
     console.log(obj.__proto__ === Object.prototype); // true

2. prototype
   - Exists only on functions (constructor functions, classes).
   - Defines properties and methods for instances.
   - Example:
     function Person(name) { this.name = name; }
     Person.prototype.greet = function() { console.log("Hello " + this.name); }
     const p = new Person("Alice");
     p.greet(); // "Hello Alice"

3. Relationship
   - When accessing a property, JS checks object → __proto__ → prototype chain.
   - Example:
     console.log(p.__proto__ === Person.prototype); // true

4. Classes
   - Classes use `prototype` similarly.
   - Example:
     class Animal { speak() { console.log("Hi"); } }
     const a = new Animal();
     console.log(a.__proto__ === Animal.prototype); // true

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- prototype is like a **blueprint** of a house.
- __proto__ is like a **link from the actual house to the blueprint**, used to check features.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can __proto__ be modified?
A1: Yes, but it’s not recommended; use Object.create or class inheritance.

Q2: Can prototype be changed after object creation?
A2: Changing prototype only affects future instances, not existing ones.

Q3: Difference between Object.getPrototypeOf(obj) and obj.__proto__?
A3: Both give the prototype, but getPrototypeOf is standard and safer.

Q4: Are prototypes only for methods?
A4: No, can store any property, but methods are common.

Q5: How does inheritance work in JS with prototype chain?
A5: JS looks for a property on the object, then in __proto__, and up the chain until found or null.
*/
