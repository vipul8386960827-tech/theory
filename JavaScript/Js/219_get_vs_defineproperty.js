/* 219_get_vs_defineproperty.js

=====================================================
get Keyword vs Object.defineProperty() in JavaScript
=====================================================

Definition (Interview-friendly):
- "The get keyword defines a getter method in an object literal, 
  while Object.defineProperty() can define getters (and setters) 
  with detailed property descriptors like writable, enumerable, and configurable."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using get in Object Literal
   - Example:
     const obj = {
         firstName: "Alice",
         lastName: "Smith",
         get fullName() {
             return `${this.firstName} ${this.lastName}`;
         }
     };
     console.log(obj.fullName); // "Alice Smith"

2. Using Object.defineProperty() to Define Getter
   - Example:
     const person = { firstName: "Bob", lastName: "Johnson" };
     Object.defineProperty(person, "fullName", {
         get() { return `${this.firstName} ${this.lastName}`; },
         enumerable: true,
         configurable: true
     });
     console.log(person.fullName); // "Bob Johnson"

3. Key Differences
   - get: simpler syntax in object literals
   - defineProperty: more control over property descriptors, can be used on existing objects

4. Use Cases
   - Computed properties
   - Validation before accessing value
   - Controlling enumerability and configurability

5. Edge Cases
   - get in object literal cannot define configurable/writable
   - defineProperty can modify existing properties

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- get: **quick window** to peek inside an object
- defineProperty: **customized door** with locks, visibility, and rules

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can getters be writable?
A1: No, getters cannot be writable; they only return values.

Q2: Can you define setters with get keyword?
A2: No, you need set keyword or defineProperty with set descriptor.

Q3: Are getters enumerable by default?
A3: In object literals with get, yes; with defineProperty, you can control enumerability.

Q4: Can you redefine a getter on an existing property?
A4: Yes, if configurable: true using defineProperty.

Q5: Difference between getter and normal function?
A5: Getter is accessed as a property, not invoked with parentheses.
*/
