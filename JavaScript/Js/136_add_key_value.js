/* 136_add_key_value.js

=====================================================
Adding Key-Value Pairs in JavaScript Objects
=====================================================

Definition:
- In JavaScript, objects store data in **key-value pairs**.
- You can dynamically add, update, or delete properties using dot notation or bracket notation.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Dot Notation:
   - `obj.key = value;`
   - Best when key is known and valid identifier.

2. Bracket Notation:
   - `obj["key"] = value;`
   - Useful when key is dynamic, contains spaces, or special characters.

3. Dynamic Keys (ES6):
   - `obj[variableKey] = value;`
   - Can also use **computed property names** in object literals:
     `{ [variableKey]: value }`

4. Immutability (React Context):
   - Avoid mutating state directly in React.
   - Use spread operator: `{ ...obj, newKey: newValue }`

-----------------------------------------------------
Example:
-----------------------------------------------------
const obj = { name: "Alice" };

// Using dot notation
obj.age = 25;   // { name: "Alice", age: 25 }

// Using bracket notation
obj["city"] = "London"; // { name: "Alice", age: 25, city: "London" }

// Dynamic key
const key = "country";
obj[key] = "UK"; // { name: "Alice", age: 25, city: "London", country: "UK" }

// Immutable update
const newObj = { ...obj, hobby: "Reading" }; 
// { name: "Alice", age: 25, city: "London", country: "UK", hobby: "Reading" }

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of an object as a **box with labeled compartments**.
- Adding a key-value pair is like labeling a new compartment and putting an item inside.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: When should you use bracket notation over dot notation?  
A1: When the key is dynamic, contains spaces, or is not a valid JS identifier.

Q2: Why avoid mutating objects directly in React state?  
A2: Direct mutation can cause unpredictable rendering and bugs; use immutable updates instead.

Q3: Can object keys be anything other than strings?  
A3: Keys are automatically converted to strings, except for Symbols.

Q4: How do you add multiple key-value pairs at once immutably?  
A4: Use the spread operator with an object containing new properties: `{ ...obj, a: 1, b: 2 }`.
*/
