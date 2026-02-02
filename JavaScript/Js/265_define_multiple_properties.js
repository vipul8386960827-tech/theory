/* 265_define_multiple_properties.js

=====================================================
Defining Multiple Properties – Interview-Ready Answer
=====================================================

Definition:
- "In JavaScript, `Object.defineProperties()` allows you to define multiple 
  properties on an object at once, specifying their values and descriptors 
  (writable, enumerable, configurable)."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Efficiently add or modify multiple properties with specific descriptors.  
   - Useful for controlling property behavior (read-only, hidden, etc.).

2. **Syntax**  
   - Object.defineProperties(obj, { prop1: descriptor1, prop2: descriptor2, ... })

3. **Property Descriptors**  
   - `value` → property value.  
   - `writable` → if true, property can be changed.  
   - `enumerable` → if true, property shows up in loops.  
   - `configurable` → if true, property can be deleted or modified.

-----------------------------------------------------
Examples:

// Example 1: Define multiple properties
const person = {};
Object.defineProperties(person, {
  name: {
    value: "Kaizer",
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
    value: 30,
    writable: false,
    enumerable: true,
    configurable: false
  }
});

console.log(person); // { name: "Kaizer", age: 30 }
person.name = "Updated"; // works
person.age = 40; // ignored in non-strict mode
console.log(person); // { name: "Updated", age: 30 }

// Example 2: Non-enumerable property
Object.defineProperties(person, {
  secret: { value: "hidden", enumerable: false }
});
console.log(Object.keys(person)); // ["name", "age"]

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `defineProperties` accepts an object and a property-descriptor map.  
- Each descriptor controls writability, enumerability, and configurability.  
- Prevents writing repetitive `defineProperty` calls.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like furnishing a new house: you can set multiple items (properties) with rules (descriptors) at once.

-----------------------------------------------------
Example / Usage:

const car = {};
Object.defineProperties(car, {
  brand: { value: "Tesla", writable: true, enumerable: true },
  model: { value: "S", writable: true, enumerable: true },
  secretCode: { value: "1234", enumerable: false }
});
console.log(car); // { brand: "Tesla", model: "S" }
console.log(Object.keys(car)); // ["brand", "model"]

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `defineProperty` and `defineProperties`?  
A1: `defineProperty` defines one property; `defineProperties` defines multiple at once.

Q2: Can you make a property read-only?  
A2: Yes, set `writable: false`.

Q3: Can non-enumerable properties be accessed?  
A3: Yes, they exist, just won’t appear in loops like `for...in`.

Q4: Can you delete a non-configurable property?  
A4: No, it cannot be deleted or reconfigured.

Q5: What is default descriptor if omitted?  
A5: `value: undefined`, `writable: false`, `enumerable: false`, `configurable: false`.
*/
