/* 194_assign_method_applications.js

=====================================================
Object.assign() Method Applications in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.assign() copies enumerable own properties from one or more 
  source objects to a target object, useful for cloning, merging, 
  and adding properties."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Cloning an Object (Shallow Copy)
   - Example:
     const source = { a: 1, b: 2 };
     const clone = Object.assign({}, source);
     console.log(clone); // { a: 1, b: 2 }

2. Merging Objects
   - Example:
     const obj1 = { x: 10 };
     const obj2 = { y: 20 };
     const merged = Object.assign({}, obj1, obj2);
     console.log(merged); // { x: 10, y: 20 }

3. Adding Properties
   - Example:
     const target = { name: "Alice" };
     Object.assign(target, { age: 25 });
     console.log(target); // { name: "Alice", age: 25 }

4. Overwriting Properties
   - Example:
     const obj = { a: 1, b: 2 };
     Object.assign(obj, { b: 10 });
     console.log(obj); // { a: 1, b: 10 }

5. Edge Cases
   - Shallow copy only (nested objects remain referenced)
   - Only copies enumerable own properties
   - Can merge multiple sources; later sources overwrite earlier

6. Use Cases
   - Shallow cloning
   - Merging configs or default options
   - Adding or updating object properties dynamically

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Object.assign() is like **copying sticky notes from multiple sheets**:
  - You can combine notes onto one sheet; new notes overwrite existing ones.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between Object.assign() and spread operator?
A1: Both create shallow copies; Object.assign() can assign to existing object; spread creates a new object.

Q2: Does Object.assign() perform deep copy?
A2: No, it only performs shallow copy.

Q3: Can Object.assign() copy non-enumerable properties?
A3: No, only enumerable own properties.

Q4: Can Object.assign() copy prototype properties?
A4: No, only own properties.

Q5: Alternative for deep cloning?
A5: Use JSON.parse(JSON.stringify(obj)), structuredClone(), or libraries like lodash.
*/
