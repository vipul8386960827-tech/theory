/* 148_create_new_object_recommendations.js

=====================================================
Creating New Objects in JavaScript: Recommendations
=====================================================

Definition:
- JavaScript objects store key-value pairs.
- There are multiple ways to create objects; some are preferred for clarity and performance.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using Object Literals (Recommended)
   - Simple, concise, readable.
   - Example:
     const person = {
         name: "Alice",
         age: 25
     };

2. Using `Object.create()`
   - Creates a new object with a specified prototype.
   - Example:
     const proto = { greet() { console.log("Hello"); } };
     const obj = Object.create(proto);
     obj.greet(); // "Hello"

3. Using Constructor Functions
   - Traditional way; works with `new`.
   - Example:
     function Person(name, age) {
         this.name = name;
         this.age = age;
     }
     const p = new Person("Bob", 30);

4. Using ES6 Classes
   - Preferred for structured objects and OOP.
   - Example:
     class Person {
         constructor(name, age) {
             this.name = name;
             this.age = age;
         }
         greet() {
             console.log("Hello " + this.name);
         }
     }
     const p1 = new Person("Charlie", 35);
     p1.greet(); // "Hello Charlie"

-----------------------------------------------------
Recommendations:
-----------------------------------------------------
- Use object literals for simple objects.
- Use `Object.create()` for prototype-based inheritance.
- Use classes or constructors for complex objects with methods.
- Avoid `new Object()`; less readable and unnecessary.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between object literal and `new Object()`?
A1: Object literal is concise and preferred; `new Object()` is verbose and rarely used.

Q2: Can object literals have methods?
A2: Yes, ES6 supports concise method syntax.

Q3: Difference between constructor functions and classes?
A3: Classes provide syntactic sugar, but work similarly under the hood with prototypes.

Q4: Can `Object.create(null)` be used?
A4: Yes, creates a plain object with no prototype.

Q5: When to use `Object.assign()` with new objects?
A5: To clone objects or merge multiple objects safely.
*/
