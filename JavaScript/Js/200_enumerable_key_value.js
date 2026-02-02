/* 200_enumerable_key_value.js

=====================================================
Enumerable Properties and Key-Value Pairs in JavaScript
=====================================================

Definition (Interview-friendly):
- "Enumerable properties are object properties that can be iterated 
  over using loops like `for...in` or methods like `Object.keys()`. 
  Non-enumerable properties are hidden from these operations."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Checking Enumerable Properties
   - Example:
     const obj = { name: "Alice", age: 25 };
     console.log(Object.keys(obj)); // ["name", "age"]

2. Using `for...in` Loop
   - Example:
     for (let key in obj) {
         if (obj.hasOwnProperty(key)) {
             console.log(key, obj[key]);
         }
     }

3. Defining Non-Enumerable Properties
   - Example:
     Object.defineProperty(obj, "salary", {
         value: 5000,
         enumerable: false
     });
     console.log(Object.keys(obj)); // ["name", "age"]
     console.log(obj.salary);       // 5000

4. Using `Object.entries()` for Key-Value Pairs
   - Example:
     const entries = Object.entries(obj);
     console.log(entries); // [["name","Alice"], ["age",25]]

5. Iterating Entries
   - Example:
     for (const [key, value] of Object.entries(obj)) {
         console.log(key, value);
     }

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Enumerable properties are like **items visible on a shelf**:
  - You can see and interact with them, while non-enumerable are hidden.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between enumerable and non-enumerable?
A1: Enumerable properties appear in loops/methods; non-enumerable are hidden.

Q2: Default enumerable status of object properties?
A2: Properties created normally are enumerable; some methods (like prototype) may be non-enumerable.

Q3: Can non-enumerable properties be accessed?
A3: Yes, directly using `obj.prop` or `Object.getOwnPropertyDescriptor`.

Q4: How to list all properties including non-enumerable?
A4: Use `Object.getOwnPropertyNames(obj)`.

Q5: Difference between `Object.keys()` and `Object.entries()`?
A5: `Object.keys()` returns an array of property names; `Object.entries()` returns [key, value] pairs.
*/
