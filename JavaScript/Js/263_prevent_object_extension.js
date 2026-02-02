/* 263_prevent_object_extension.js

=====================================================
Preventing Object Extension – Interview-Ready Answer
=====================================================

Definition:
- "In JavaScript, you can prevent an object from accepting new properties 
  using `Object.preventExtensions(obj)`. Existing properties can still be modified or deleted, 
  but no new properties can be added."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Secure objects from accidental addition of new properties.  
   - Useful in APIs or large applications to maintain object integrity.

2. **Syntax**  
   - `Object.preventExtensions(obj)`

3. **Checking Extensibility**  
   - Use `Object.isExtensible(obj)` to check if object can accept new properties.

-----------------------------------------------------
Examples:

// Example 1: Default extensible object
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

// Example 3: Strict mode
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
- `Object.preventExtensions()` blocks addition of new properties.  
- Existing properties remain editable or deletable.  
- Provides control over object structure.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Sealed notebook: you can edit existing notes but cannot add new pages.

-----------------------------------------------------
Example / Usage:

const car = { brand: "Tesla" };
Object.preventExtensions(car);
console.log(Object.isExtensible(car)); // false
car.model = "S"; // Ignored
console.log(car); // { brand: "Tesla" }

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `preventExtensions` and `seal`?  
A1: `preventExtensions` only blocks adding new properties; `seal` also makes existing properties non-configurable.

Q2: Difference between `preventExtensions` and `freeze`?  
A2: `freeze` blocks adding, deleting, and modifying properties; `preventExtensions` only blocks new properties.

Q3: Can a non-extensible object become extensible again?  
A3: No, once prevented, it cannot be reverted.

Q4: Are arrays extensible by default?  
A4: Yes, unless `preventExtensions` is applied.

Q5: What happens in strict mode if you try to add a property to a non-extensible object?  
A5: A `TypeError` is thrown.
*/
