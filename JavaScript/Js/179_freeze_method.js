/* 179_freeze_method.js

=====================================================
Object.freeze() Method in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.freeze() makes an object completely immutable: 
  you cannot add, delete, or modify its properties."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     const obj = { name: "Alice", age: 25 };
     Object.freeze(obj);
     // obj.name = "Bob"; // ❌ not allowed
     // obj.age = 30;     // ❌ not allowed
     // obj.gender = "F"; // ❌ not allowed
     console.log(obj);    // { name: "Alice", age: 25 }

2. Checking if Object is Frozen
   - Example:
     console.log(Object.isFrozen(obj)); // true

3. Arrays
   - Can freeze arrays to prevent adding/removing elements.
   - Example:
     const arr = [1,2,3];
     Object.freeze(arr);
     // arr.push(4); // ❌ not allowed
     arr[0] = 10;   // ❌ not allowed
     console.log(arr); // [1,2,3]

4. Nested Objects
   - Only first-level properties are frozen; nested objects remain mutable.
   - Example:
     const nested = { inner: { a: 1 } };
     Object.freeze(nested);
     nested.inner.a = 2; // ✅ allowed

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Freezing an object is like **freezing water into ice**:
  - You cannot change its shape or content.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can Object.freeze() be undone?
A1: No, freezing is permanent.

Q2: Difference between freeze and seal?
A2: Seal locks structure but allows modifying existing properties; freeze locks both structure and values.

Q3: Does freezing affect nested objects automatically?
A3: No, nested objects need separate freeze calls.

Q4: How to deeply freeze an object?
A4: Recursively call Object.freeze on all nested objects.

Q5: Are frozen objects truly immutable?
A5: First-level properties are immutable; nested objects may still be mutable unless deeply frozen.
*/
