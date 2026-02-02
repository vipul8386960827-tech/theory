/* 191_object_value_comparison.js

=====================================================
Compare Object Values in JavaScript
=====================================================

Definition (Interview-friendly):
- "Comparing objects in JavaScript requires checking properties and values, 
  because direct comparison (obj1 === obj2) only compares references, not content."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Direct Comparison (Reference)
   - Example:
     const obj1 = { a: 1 };
     const obj2 = { a: 1 };
     console.log(obj1 === obj2); // false
     const obj3 = obj1;
     console.log(obj1 === obj3); // true

2. Shallow Comparison
   - Compare keys and values at the first level
   - Example:
     function shallowEqual(o1, o2) {
         const keys1 = Object.keys(o1);
         const keys2 = Object.keys(o2);
         if(keys1.length !== keys2.length) return false;
         return keys1.every(k => o1[k] === o2[k]);
     }
     console.log(shallowEqual({a:1}, {a:1})); // true
     console.log(shallowEqual({a:1}, {a:2})); // false

3. Deep Comparison
   - Recursively compare nested objects
   - Example:
     function deepEqual(o1, o2) {
         if(o1 === o2) return true;
         if(typeof o1 !== "object" || typeof o2 !== "object" || !o1 || !o2) return false;
         const keys1 = Object.keys(o1);
         const keys2 = Object.keys(o2);
         if(keys1.length !== keys2.length) return false;
         return keys1.every(k => deepEqual(o1[k], o2[k]));
     }

4. Use Cases
   - Validating object equality in tests, state comparison in React, or configuration checks

5. Edge Cases
   - Functions, symbols, and prototypes may require special handling
   - Arrays are objects; treat accordingly

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Object comparison is like **checking if two boxes have the same items inside**:
  - Reference equality checks if it’s the same box; deep equality checks the contents.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why does {} === {} return false?
A1: Different references; each object occupies separate memory.

Q2: Difference between shallow and deep comparison?
A2: Shallow compares only first-level properties; deep compares nested structures too.

Q3: Are arrays compared the same way as objects?
A3: Yes, they are objects; element comparison requires iterative or recursive check.

Q4: Can JSON.stringify() be used for comparison?
A4: Yes, for simple objects without functions, symbols, or circular references.

Q5: Performance concern for deep comparison?
A5: Deep comparison is slower for large/nested objects.
*/
