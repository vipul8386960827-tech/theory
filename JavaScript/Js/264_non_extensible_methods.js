/* 264_non_extensible_methods.js

=====================================================
Non-Extensible Object Methods – Interview-Ready Answer
=====================================================

Definition:
- "Once an object is made non-extensible using `Object.preventExtensions()`, 
  you cannot add new properties, but existing properties can still be modified or deleted. 
  Methods for handling non-extensible objects include `Object.isExtensible()`, 
  `Object.preventExtensions()`, and related checks."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Prevent accidental addition of properties to an object.  
   - Ensure object structure remains controlled in larger applications.

2. **Key Methods**  
   - `Object.preventExtensions(obj)` → makes object non-extensible.  
   - `Object.isExtensible(obj)` → checks if object can accept new properties.  
   - `Object.seal(obj)` → makes object non-extensible and existing properties non-configurable.  
   - `Object.freeze(obj)` → makes object immutable and non-extensible.

3. **Behavior**  
   - Existing properties can be updated or deleted unless sealed or frozen.  
   - Adding new properties fails silently in non-strict mode, throws error in strict mode.

-----------------------------------------------------
Examples:

// Example 1: Making object non-extensible
const obj = { a: 1 };
Object.preventExtensions(obj);
console.log(Object.isExtensible(obj)); // false

obj.b = 2; // Ignored in non-strict mode
console.log(obj); // { a: 1 }

// Example 2: Strict mode behavior
'use strict';
const obj2 = { x: 10 };
Object.preventExtensions(obj2);
try {
  obj2.y = 20; // TypeError
} catch (e) {
  console.log(e.message); // Cannot add property y, object is not extensible
}

// Example 3: Sealing object
const obj3 = { name: "Kaizer" };
Object.seal(obj3);
obj3.name = "Updated"; // Allowed
delete obj3.name; // Not allowed
console.log(obj3);

// Example 4: Freezing object
const obj4 = { age: 30 };
Object.freeze(obj4);
obj4.age = 40; // Ignored in non-strict mode
console.log(obj4); // { age: 30 }

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `preventExtensions` blocks new properties.  
- `isExtensible` checks extensibility.  
- `seal` prevents new properties and makes existing properties non-configurable.  
- `freeze` also makes properties read-only.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Non-extensible object = a sealed notebook where you can edit or erase existing notes but cannot add new pages.  
- Sealed object = cannot add pages and cannot remove existing pages.  
- Frozen object = cannot add, remove, or change pages.

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
Q1: Can a non-extensible object become extensible again?  
A1: No, once prevented, an object cannot be reverted to extensible.

Q2: Difference between `preventExtensions`, `seal`, and `freeze`?  
A2: `preventExtensions` blocks new properties, `seal` blocks new properties and makes existing ones non-configurable, `freeze` also makes properties read-only.

Q3: What happens when adding a property in strict mode to a non-extensible object?  
A3: A `TypeError` is thrown.

Q4: Are arrays non-extensible by default?  
A4: No, arrays are extensible unless `preventExtensions` is applied.

Q5: Can methods of non-extensible objects be modified?  
A5: Yes, unless the object is sealed or frozen.
*/
