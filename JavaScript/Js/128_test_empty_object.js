/* 128_test_empty_object.js

=====================================================
How to Test if an Object is Empty in JavaScript
=====================================================

Definition:
An "empty object" means an object that has **no own enumerable properties**.  
Checking if an object is empty is common in validations, API responses, 
and state management.

-----------------------------------------------------
Key Methods:
-----------------------------------------------------

1. **Object.keys(obj).length === 0**
   - `Object.keys()` returns an array of own property names.
   - If length is 0 → object has no properties.
   - ✅ Most commonly used.
   Example:
   Object.keys(obj).length === 0

2. **Object.entries(obj).length === 0**
   - Similar to keys, but checks key-value pairs.
   Example:
   Object.entries(obj).length === 0

3. **JSON.stringify(obj) === "{}"**
   - Converts object to string.
   - Works but less efficient, not recommended for large objects.
   Example:
   JSON.stringify(obj) === "{}"

4. **for...in loop with hasOwnProperty**
   - Loops through all enumerable properties.
   - If none found, object is empty.
   Example:
   for (let key in obj) {
     if (obj.hasOwnProperty(key)) {
       // Not empty
     }
   }

5. **Using Lodash (if library available)**
   - `_.isEmpty(obj)`
   - Safest and handles arrays, maps, sets as well.

-----------------------------------------------------
Examples:
-----------------------------------------------------
const obj1 = {};
const obj2 = { name: "Alice" };

// Method 1
console.log(Object.keys(obj1).length === 0); // true
console.log(Object.keys(obj2).length === 0); // false

// Method 2
console.log(Object.entries(obj1).length === 0); // true

// Method 3
console.log(JSON.stringify(obj1) === "{}"); // true

// Method 4
function isEmpty(o) {
  for (let key in o) {
    if (o.hasOwnProperty(key)) return false;
  }
  return true;
}
console.log(isEmpty(obj1)); // true

-----------------------------------------------------
Edge Cases:
-----------------------------------------------------
- `null` or `undefined` → should not be tested as objects.
- Arrays → `[]` is empty, but has `length` property.
- Object with non-enumerable properties → may appear "empty" with keys().

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Checking an object’s emptiness is like checking if a box has 
  any visible items inside:
  - `Object.keys` = looking for labels on the box.
  - `JSON.stringify` = shaking the box and writing down what’s inside.
  - `for...in` = inspecting each item one by one.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why is `Object.keys(obj).length === 0` preferred?  
A1: It’s simple, efficient, and directly supported.

Q2: What happens if the object has non-enumerable properties?  
A2: They won’t show up in `Object.keys`, so the object may appear empty.

Q3: How would you test if an array is empty vs an object?  
A3: Array → check `.length === 0`. Object → check `Object.keys().length === 0`.

Q4: How does Lodash’s `isEmpty()` differ from native checks?  
A4: It works for objects, arrays, maps, and sets consistently.
*/
