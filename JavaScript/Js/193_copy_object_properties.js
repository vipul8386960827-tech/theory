/* 193_copy_object_properties.js

=====================================================
Copy Object Properties in JavaScript
=====================================================

Definition (Interview-friendly):
- "Copying object properties creates a new object with the same keys 
  and values. This can be shallow or deep depending on the method."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using Object.assign() (Shallow Copy)
   - Example:
     const source = { a: 1, b: 2 };
     const copy = Object.assign({}, source);
     console.log(copy); // { a: 1, b: 2 }

2. Using Spread Operator (Shallow Copy)
   - Example:
     const original = { x: 10, y: 20 };
     const cloned = { ...original };
     console.log(cloned); // { x: 10, y: 20 }

3. Deep Copy with JSON
   - Example:
     const nested = { a: 1, b: { c: 2 } };
     const deepCopy = JSON.parse(JSON.stringify(nested));
     console.log(deepCopy); // { a: 1, b: { c: 2 } }

4. Edge Cases
   - Shallow copy copies references for nested objects
   - Functions, symbols, and undefined may not copy correctly with JSON

5. Use Cases
   - Avoid mutating original object
   - Useful in state management (React, Redux)

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Copying object properties is like **making a photocopy of a document**:
  - Shallow copy copies only top-level text; nested attachments may still reference original.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between shallow and deep copy?
A1: Shallow copies top-level properties; deep copies nested objects recursively.

Q2: Does spread operator create deep copy?
A2: No, it creates a shallow copy only.

Q3: Can functions be copied with JSON method?
A3: No, JSON.stringify() ignores functions.

Q4: Alternatives for deep copy besides JSON?
A4: Recursive copy, lodash cloneDeep, structuredClone() (modern JS).

Q5: Why copy objects instead of modifying directly?
A5: To prevent side effects and maintain immutability.
*/
