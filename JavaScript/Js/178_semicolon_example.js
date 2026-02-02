/* 178_semicolon_example.js

=====================================================
Semicolon Usage in JavaScript
=====================================================

Definition (Interview-friendly):
- "Semicolons in JavaScript mark the end of a statement. 
  They are optional due to Automatic Semicolon Insertion (ASI), 
  but using them prevents ambiguity and unexpected behavior."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Standard Usage
   - Example:
     const a = 10;
     const b = 20;
     console.log(a + b);

2. ASI (Automatic Semicolon Insertion)
   - JavaScript automatically inserts semicolons in many cases.
   - Example:
     const x = 5
     const y = 10
     console.log(x + y)

3. Pitfalls Without Semicolons
   - Example:
     const func = () => {}
     [1,2,3].forEach(n => console.log(n)) 
     // ❌ May be interpreted as func()[1,2,3] due to ASI

4. Recommended Practice
   - Always use semicolons in production code to avoid unexpected errors.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Semicolons are like **periods at the end of sentences**:
  - They clearly indicate where a statement ends.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Are semicolons mandatory in JavaScript?
A1: No, but recommended to avoid ambiguity.

Q2: What is Automatic Semicolon Insertion (ASI)?
A2: JS engine inserts semicolons at runtime where it thinks they are missing.

Q3: Give an example where ASI can cause errors.
A3: Returning an object literal on the next line without semicolon:
     return 
     { name: "Alice" } // Actually returns undefined

Q4: Can arrow functions be affected by missing semicolons?
A4: Yes, especially when followed by a line starting with `[` or `(`.

Q5: Best practice for semicolon usage?
A5: Use semicolons consistently to prevent subtle bugs.
*/
