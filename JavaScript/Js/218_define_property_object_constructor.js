/* 218_define_property_object_constructor.js

=====================================================
Object.defineProperty() with Object Constructor in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.defineProperty() allows adding or modifying a property on an object 
  with detailed control over its behavior, such as writable, enumerable, 
  and configurable."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Adding a New Property
   - Example:
     const obj = {};
     Object.defineProperty(obj, "name", {
         value: "Alice",
         writable: true,
         enumerable: true,
         configurable: true
     });
     console.log(obj.name); // "Alice"

2. Modifying Property Attributes
   - Example:
     Object.defineProperty(obj, "name", { writable: false });
     obj.name = "Bob"; 
     console.log(obj.name); // Still "Alice"

3. Defining Getters and Setters
   - Example:
     const person = { _age: 25 };
     Object.defineProperty(person, "age", {
         get() { return this._age; },
         set(value) { if(value > 0) this._age = value; },
         enumerable: true
     });
     person.age = 30;
     console.log(person.age); // 30

4. Use Case
   - Control how properties are accessed, modified, and enumerated
   - Useful for defining constants, read-only values, or computed properties

5. Edge Cases
   - Default attributes: writable=false, enumerable=false, configurable=false
   - Attempting to change non-configurable property throws error

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Object.defineProperty() is like **setting rules for a locker**:
  - Who can open it, can you change its contents, or can it be removed.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between direct assignment and defineProperty()?
A1: Direct assignment uses default attributes; defineProperty allows control over descriptors.

Q2: Can you make a property read-only?
A2: Yes, set writable: false.

Q3: Can you hide a property from for...in loops?
A3: Yes, set enumerable: false.

Q4: Can you delete a non-configurable property?
A4: No, it cannot be deleted.

Q5: Can getters/setters be enumerable?
A5: Yes, enumerable: true makes them appear in loops.
*/
