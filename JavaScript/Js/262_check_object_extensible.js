/* 262_check_object_extensible.js

=====================================================
Checking if Object is Extensible – Interview-Ready Answer
=====================================================

Definition:
- "In JavaScript, an object is extensible if new properties can be added to it. 
  You can check this using `Object.isExtensible(obj)` which returns a boolean."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Determine if new properties can be added to an object.  
   - Useful for controlling and securing objects in large applications.

2. **Syntax**  
   - `Object.isExtensible(obj)` → returns `true` if extensible, else `false`.

3. **Modifying Extensibility**  
   - `Object.preventExtensions(obj)` → makes object non-extensible.  
   - Non-extensible object cannot accept new properties, but existing ones can be modified or deleted.

-----------------------------------------------------
Examples:

// Example 1: Default object
const obj1 = { a: 1 };
console.log(Object.isExtensible(obj1)); // true
obj1.b = 2;
console.log(obj1); // { a: 1, b: 2 }

// Example 2: Prevent extensions
const obj2 = { x: 10 };
Object.preventExtensions(obj2);
console.log(Object.isExtensible(obj2)); // false
obj2.y = 20; // Ignored in non-strict mode, error in strict mode
console.log(obj2); // { x: 10 }

// Example 3: Non-extensible with strict mode
'use strict';
const obj3 = {};
Object.preventExtensions(obj3);
try {
  obj3.newProp = 1; // TypeError
} catch (e) {
  console.log(e.message); // Cannot add property newProp, object is not extensible
}

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `Object.isExtensible()` checks if new properties can be added.  
- `Object.preventExtensions()` makes object non-extensible.  
- Existing properties can still be modified or deleted.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Extensible object = expandable notebook (can add new pages).  
- Non-extensible object = sealed notebook (no new pages can be added).

-----------------------------------------------------
Example / Usage:

const car = { brand: "Tesla" };
console.log(Object.isExtensible(car)); // true
Object.preventExtensions(car);
console.log(Object.isExtensible(car)); // false

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `Object.isExtensible` and `Object.seal`?  
A1: `isExtensible` checks if object can accept new properties; `seal` makes object non-extensible and marks existing properties as non-configurable.

Q2: Can properties be deleted in a non-extensible object?  
A2: Yes, unless they are non-configurable.

Q3: Difference between `Object.freeze` and `Object.preventExtensions`?  
A3: `freeze` makes object non-extensible and immutable; `preventExtensions` only prevents adding new properties.

Q4: Is an array extensible by default?  
A4: Yes, arrays are extensible unless `preventExtensions` is applied.

Q5: Can you revert non-extensible object to extensible?  
A5: No, once prevented, an object cannot become extensible again.
*/
