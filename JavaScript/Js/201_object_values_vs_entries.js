/* 201_object_values_vs_entries.js

=====================================================
Object.values() vs Object.entries() in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.values(obj) returns an array of the object's own property values. 
  Object.entries(obj) returns an array of [key, value] pairs for the object's 
  own properties."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Object.values()
   - Example:
     const obj = { name: "Alice", age: 25 };
     const values = Object.values(obj);
     console.log(values); // ["Alice", 25]

2. Object.entries()
   - Example:
     const entries = Object.entries(obj);
     console.log(entries); // [["name", "Alice"], ["age", 25]]

3. Iterating Values
   - Example:
     for (const value of Object.values(obj)) {
         console.log(value);
     }

4. Iterating Entries
   - Example:
     for (const [key, value] of Object.entries(obj)) {
         console.log(key, value);
     }

5. Filtering or Mapping
   - Example:
     const filtered = Object.entries(obj)
         .filter(([key, value]) => typeof value === "number");
     console.log(filtered); // [["age", 25]]

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Object.values() is like **getting all items in a shopping bag**.
- Object.entries() is like **getting a list of item names and quantities**.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between Object.keys() and Object.values()?
A1: keys() returns property names; values() returns property values.

Q2: Can entries be used to reconstruct an object?
A2: Yes, using Object.fromEntries(entries).

Q3: Do these methods include inherited properties?
A3: No, only own properties.

Q4: Are the arrays returned live or static?
A4: They are static snapshots, not live references.

Q5: When to prefer entries over values?
A5: When you need both keys and values for processing or mapping.
*/
