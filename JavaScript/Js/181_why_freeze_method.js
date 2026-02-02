/* 181_why_freeze_method.js

=====================================================
Why Use Object.freeze() in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.freeze() is used to make objects immutable to prevent accidental 
  changes, enforce constants, and maintain data integrity across the application."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Protecting Configuration Data
   - Example:
     const config = { apiUrl: "https://api.com", timeout: 5000 };
     Object.freeze(config);
     // config.apiUrl = "https://newapi.com"; // ❌ not allowed

2. Enforcing Constants
   - Example:
     const STATUS = Object.freeze({ PENDING: "pending", DONE: "done" });
     // STATUS.DONE = "completed"; // ❌ not allowed

3. Preventing Accidental Mutations
   - Useful in large projects or when passing objects across modules.

4. Arrays
   - Freeze arrays to prevent modification:
     const arr = [1,2,3];
     Object.freeze(arr);
     // arr.push(4); // ❌ not allowed

5. Deep Freeze for Nested Objects
   - Recursively freeze nested objects to achieve full immutability.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Freezing an object is like **placing an object in a locked display case**:
  - No one can change it, but it can still be viewed and used.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between Object.freeze() and Object.seal()?
A1: Seal allows modifying existing properties; freeze disallows all changes.

Q2: Can freezing be undone?
A2: No, once frozen, the object cannot be unfrozen.

Q3: Does Object.freeze() make nested objects immutable automatically?
A3: No, nested objects remain mutable unless frozen separately.

Q4: How to check if an object is frozen?
A4: Use Object.isFrozen(obj).

Q5: Why is Object.freeze() important in practice?
A5: It ensures immutability, improves reliability, and avoids bugs from accidental modifications.
*/
