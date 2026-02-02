/* 198_freeze_vs_seal.js

=====================================================
Difference Between Object.freeze() and Object.seal() in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.freeze() makes an object completely immutable: you cannot 
  add, delete, or modify its properties. Object.seal() only prevents 
  adding or deleting properties, but allows modification of existing ones."

-----------------------------------------------------
Key Differences:
-----------------------------------------------------

1. Object.freeze()
   - Prevents adding, deleting, or changing properties.
   - Example:
     const obj = { name: "Alice" };
     Object.freeze(obj);
     // obj.name = "Bob"; // ❌ not allowed
     // obj.age = 25;     // ❌ not allowed
     console.log(obj);    // { name: "Alice" }

2. Object.seal()
   - Prevents adding or deleting properties, but allows modifying existing ones.
   - Example:
     const obj2 = { name: "Alice" };
     Object.seal(obj2);
     obj2.name = "Bob";    // ✅ allowed
     // obj2.age = 25;     // ❌ not allowed
     console.log(obj2);    // { name: "Bob" }

3. Nested Objects
   - Both methods only affect first-level properties. Nested objects remain mutable.

4. Checking Status
   - Object.isFrozen(obj) // true if frozen
   - Object.isSealed(obj) // true if sealed

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Freeze: **sealed ice cube** – cannot change shape or content.
- Seal: **sealed envelope** – cannot add/remove papers but can edit contents inside.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you unfreeze or unseal an object?
A1: No, these operations are permanent.

Q2: Which is stricter, freeze or seal?
A2: Freeze is stricter; it prevents all modifications.

Q3: Can arrays be frozen or sealed?
A3: Yes, same rules apply: freeze prevents changes, seal prevents adding/removing elements.

Q4: When to use seal instead of freeze?
A4: When you want to prevent structural changes but still allow updates to values.

Q5: Do these methods improve performance?
A5: Not significantly; mainly used for safety and immutability enforcement.
*/
