/* 202_list_object_keys.js

=====================================================
Listing Object Keys in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.keys(obj) returns an array of a given object's own enumerable 
  property names, allowing iteration or processing of keys."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     const obj = { name: "Alice", age: 25 };
     const keys = Object.keys(obj);
     console.log(keys); // ["name", "age"]

2. Iterating Keys
   - Example:
     for (const key of Object.keys(obj)) {
         console.log(key, obj[key]);
     }

3. Filtering Keys
   - Example:
     const filteredKeys = Object.keys(obj).filter(key => key.startsWith("a"));
     console.log(filteredKeys); // ["age"]

4. Difference from for...in
   - Object.keys() only includes own properties, not inherited ones.
   - Example:
     const parent = { p: 1 };
     const child = Object.create(parent);
     child.c = 2;
     console.log(Object.keys(child)); // ["c"]
     for (const key in child) console.log(key); // "c", "p"

5. Combining with Object.values()
   - Example:
     const values = Object.keys(obj).map(key => obj[key]);
     console.log(values); // ["Alice", 25]

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Object.keys() is like **getting the labels of jars on a shelf**:
  - You know what each jar contains by its name.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Do Object.keys() include non-enumerable properties?
A1: No, only enumerable own properties.

Q2: Difference between Object.keys() and Object.getOwnPropertyNames()?
A2: getOwnPropertyNames() returns all own properties, including non-enumerable.

Q3: Can keys be used to reconstruct an object?
A3: Yes, combining with values, e.g., using Object.fromEntries().

Q4: Are keys returned in any guaranteed order?
A4: Yes, ES6 specifies order: integer keys in ascending order, then strings, then symbols.

Q5: Can keys include symbols?
A5: No, symbols are returned by Object.getOwnPropertySymbols().
*/
