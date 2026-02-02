/* 180_freeze_method_purpose.js

=====================================================
Purpose of Object.freeze() in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.freeze() is used to make an object immutable, preventing 
  any addition, deletion, or modification of its properties. 
  This ensures data integrity and avoids accidental changes."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Protecting Configuration Objects
   - Example:
     const config = { apiUrl: "https://api.com", timeout: 5000 };
     Object.freeze(config);
     // config.apiUrl = "https://newapi.com"; // ❌ not allowed

2. Preventing Accidental Mutations
   - Helps in large applications to avoid unintended side-effects.

3. Ensuring Consistency in Constants
   - Example:
     const STATUS = Object.freeze({ PENDING: "pending", DONE: "done" });
     // STATUS.DONE = "completed"; // ❌ not allowed

4. Arrays Protection
   - Example:
     const arr = [1,2,3];
     Object.freeze(arr);
     // arr.push(4); // ❌ not allowed
     // arr[0] = 10; // ❌ not allowed

5. Combination with Deep Freeze
   - For nested objects, freeze each level to make it fully immutable.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Freezing an object is like **locking a safe**:
  - Nothing inside can be changed unless the lock is removed.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can Object.freeze() be undone?
A1: No, freezing is permanent for that object reference.

Q2: Difference between freeze and seal?
A2: Seal allows modifying existing properties; freeze disallows all modifications.

Q3: Does freeze protect nested objects automatically?
A3: No, nested objects remain mutable unless frozen separately.

Q4: How to check if an object is frozen?
A4: Use Object.isFrozen(obj).

Q5: Why use freeze in practice?
A5: To enforce immutability, improve reliability, and prevent accidental changes.
*/
