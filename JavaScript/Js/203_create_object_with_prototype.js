/* 203_create_object_with_prototype.js

=====================================================
Creating Objects with a Specific Prototype in JavaScript
=====================================================

Definition (Interview-friendly):
- "You can create a new object with a specified prototype using Object.create(). 
  This allows inheritance without using constructor functions or classes."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     const parent = { greet: function() { console.log("Hello"); } };
     const child = Object.create(parent);
     child.greet(); // "Hello"

2. Adding Properties to the New Object
   - Example:
     const child = Object.create(parent);
     child.name = "Alice";
     console.log(child.name); // "Alice"
     child.greet();           // "Hello"

3. Checking Prototype
   - Example:
     console.log(Object.getPrototypeOf(child) === parent); // true

4. Using with Property Descriptors
   - Example:
     const obj = Object.create(parent, {
         age: { value: 25, writable: true, enumerable: true }
     });
     console.log(obj.age); // 25

5. Avoiding Constructor Functions
   - Object.create() provides a cleaner way to set up inheritance chains.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Creating an object with a prototype is like **building a new house 
  based on an existing blueprint**: you inherit the design but can add your own features.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between Object.create() and using constructor functions?
A1: Object.create() directly sets the prototype; constructor functions also execute initialization code.

Q2: Can the prototype be null?
A2: Yes, Object.create(null) creates an object without a prototype.

Q3: Are properties inherited through Object.create() enumerable?
A3: Only the new object's own properties are enumerable; inherited ones are accessible but may not show in Object.keys().

Q4: Can Object.create() be used for method inheritance?
A4: Yes, methods defined on the prototype object are inherited by the new object.

Q5: Why use Object.create() over class inheritance?
A5: Provides simple, flexible prototype-based inheritance without ES6 class syntax.
*/
