/* 281_list_object_properties.js

=====================================================
List Object Properties in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Listing object properties means retrieving all keys or values of an object.
  This helps in iterating, debugging, or manipulating objects dynamically."

Key Points to Highlight:
- Purpose: Access all keys or values of an object programmatically.
- Common Methods:
  - Object.keys(obj) → returns array of property names (keys)
  - Object.values(obj) → returns array of property values
  - Object.entries(obj) → returns array of [key, value] pairs
- Enumerability:
  - Only enumerable properties are listed by these methods.
  - Non-enumerable properties can be checked using Object.getOwnPropertyNames(obj).

Examples:

const user = {
  name: 'Alice',
  age: 30,
  city: 'Delhi'
};

console.log(Object.keys(user));    // ['name', 'age', 'city']
console.log(Object.values(user));  // ['Alice', 30, 'Delhi']
console.log(Object.entries(user)); // [['name','Alice'], ['age',30], ['city','Delhi']]

Code Explanation:
- Object.keys → lists only property names
- Object.values → lists corresponding values
- Object.entries → lists key-value pairs for iteration
- Useful for loops, mapping, and dynamic property access.

Real-Life Analogy:
- Like checking a list of ingredients and their quantities in a recipe.

Example / Usage:

// Iterating over object properties
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Output:
// name: Alice
// age: 30
// city: Delhi

Follow-Up Interview Questions:
- Q1: Difference between Object.keys and Object.getOwnPropertyNames?
  A1: keys → enumerable properties only; getOwnPropertyNames → all properties including non-enumerable.
- Q2: How to iterate over only own properties (not inherited)?
  A2: Use Object.hasOwnProperty() check or Object.keys/Object.entries.
- Q3: Can symbols be listed with these methods?
  A3: No, use Object.getOwnPropertySymbols() for symbol properties.
- Q4: Are property order guaranteed?
  A4: Keys order is generally insertion order, but may vary for integer-like keys.
- Q5: How to combine keys and values into an object dynamically?
  A5: Use Object.fromEntries(arrayOfEntries).
*/
