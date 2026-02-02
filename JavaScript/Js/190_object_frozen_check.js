/* 190_object_frozen_check.js

=====================================================
Check if Object is Frozen in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.isFrozen() determines whether an object is frozen. 
  A frozen object cannot have new properties added, existing 
  properties removed, or values modified."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Freezing an Object
   - Example:
     const obj = { name: "Alice" };
     Object.freeze(obj);
     obj.name = "Bob"; // ❌ won't change
     obj.age = 25;     // ❌ won't add
     console.log(obj); // { name: "Alice" }

2. Checking if Frozen
   - Example:
     console.log(Object.isFrozen(obj)); // true
     const obj2 = { age: 30 };
     console.log(Object.isFrozen(obj2)); // false

3. Nested Objects
   - Only shallow freeze by default
   - Example:
     const nested = { inner: { value: 1 } };
     Object.freeze(nested);
     nested.inner.value = 2; // ✅ works, inner object not frozen
     console.log(nested.inner.value); // 2

4. Use Case
   - Prevent modifications to objects in critical parts of code
   - Ensure immutability for constants or config objects

5. Edge Cases
   - Arrays and functions can also be frozen
   - Freezing primitive values has no effect

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Freezing an object is like **locking a box**:
  - You cannot add, remove, or change items inside the box once locked.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between freeze() and seal()?
A1: freeze() prevents adding/removing/modifying; seal() prevents adding/removing but allows modifying.

Q2: Does Object.isFrozen() check nested objects?
A2: No, only checks shallow freeze.

Q3: Can you unfreeze an object?
A3: No, freezing is permanent.

Q4: Can frozen arrays be modified?
A4: No, methods that modify the array (push, pop) will fail.

Q5: How to deeply freeze an object?
A5: Recursively call Object.freeze() on all nested objects.
*/
