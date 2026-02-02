/* 260_get_prototype_string.js

=====================================================
Getting Prototype as String – Interview-Ready Answer
=====================================================

Definition:
- "You can obtain the internal [[Prototype]] of an object as a string 
  using `Object.prototype.toString.call(obj)`. This helps identify 
  the object type or prototype in a standardized format."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Detect the internal class/type of an object.  
   - Useful for distinguishing between Arrays, Objects, Dates, etc.

2. **Syntax**  
   - `Object.prototype.toString.call(obj)` → returns `[object Type]`.

3. **Difference from typeof**  
   - `typeof` returns `"object"` for most objects.  
   - `toString.call` gives precise type: `[object Array]`, `[object Date]`, `[object Map]`, etc.

-----------------------------------------------------
Examples:

// Example 1: Array
const arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr)); // [object Array]

// Example 2: Date
const date = new Date();
console.log(Object.prototype.toString.call(date)); // [object Date]

// Example 3: Map
const map = new Map();
console.log(Object.prototype.toString.call(map)); // [object Map]

// Example 4: Plain object
const obj = {};
console.log(Object.prototype.toString.call(obj)); // [object Object]

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `toString.call(obj)` returns `[object Type]` where `Type` is the internal class.  
- Helps reliably check object types across environments.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of it as a “label” on each object that clearly tells you its exact type.

-----------------------------------------------------
Example / Usage:

function getType(obj) {
  return Object.prototype.toString.call(obj);
}

console.log(getType([1,2,3])); // [object Array]
console.log(getType(new Date())); // [object Date]
console.log(getType(null)); // [object Null]
console.log(getType(undefined)); // [object Undefined]

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why not use `typeof` for arrays?  
A1: `typeof []` returns "object", which is ambiguous; `toString.call` gives exact type.

Q2: Can this detect custom classes?  
A2: Yes, returns `[object Object]` for most custom classes unless `Symbol.toStringTag` is used.

Q3: Difference between `obj.constructor` and `toString.call(obj)`?  
A3: `constructor` can be overwritten; `toString.call` is reliable for type detection.

Q4: What does `Symbol.toStringTag` do?  
A4: Allows customizing the string returned by `Object.prototype.toString`.

Q5: Can it detect primitive types?  
A5: Yes, e.g., `[object Number]`, `[object String]`, `[object Boolean]`.
*/
