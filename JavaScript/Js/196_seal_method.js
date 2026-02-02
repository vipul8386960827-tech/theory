/* 196_seal_method.js

=====================================================
Object.seal() Method in JavaScript
=====================================================

Definition:
- `Object.seal(obj)` prevents adding or removing properties
  from an object. Existing properties can still be modified.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     const person = { name: "Alice", age: 25 };
     Object.seal(person);
     person.name = "Bob";    // ✅ modification allowed
     // person.gender = "F"; // ❌ adding new property not allowed
     // delete person.age;   // ❌ deleting property not allowed
     console.log(person);    // { name: "Bob", age: 25 }

2. Checking if Object is Sealed
   - Example:
     console.log(Object.isSealed(person)); // true

3. Differences from Object.freeze()
   - `seal`: cannot add/delete properties, can modify existing.
   - `freeze`: cannot add/delete/modify properties (fully immutable).

4. Common Use Cases
   - Protect object structure while allowing updates.
   - Prevent accidental addition or removal of properties in critical objects.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Sealing an object is like **sealing an envelope**:
  - You can change the contents inside, but cannot add or remove sheets of paper.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can nested objects be sealed with Object.seal()?
A1: No, only the first level is sealed; nested objects remain mutable.

Q2: Can you unseal a sealed object?
A2: No, sealing is permanent.

Q3: What happens when trying to add a property to a sealed object?
A3: In strict mode, it throws an error; otherwise, fails silently.

Q4: Can Object.seal() be used on arrays?
A4: Yes, prevents adding/removing elements but allows modifying existing elements.

Q5: Why use Object.seal() instead of Object.freeze()?
A5: When you want to restrict structure but still allow value changes.
*/
