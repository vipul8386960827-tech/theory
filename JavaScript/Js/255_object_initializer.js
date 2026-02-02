/* 255_object_initializer.js

=====================================================
Object Initializer in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "An object initializer (or object literal) is a syntax for creating 
   objects directly using curly braces `{}` with optional properties 
   and methods, providing a concise way to define objects."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Basic Syntax**  
   - Create objects with key-value pairs.  
   - Example: `const obj = { key: value };`

2. **Shorthand Property Names**  
   - If variable name matches property name, you can omit the value.  
   - Example:  
     ```js
     const name = "Kaizer";
     const user = { name }; // equivalent to { name: name }
     ```

3. **Methods in Object Literals**  
   - Functions can be defined directly inside objects.  
   - Example:  
     ```js
     const obj = { greet() { console.log("Hello"); } };
     obj.greet();
     ```

4. **Computed Property Names**  
   - Dynamic property names using `[expression]`.  
   - Example:  
     ```js
     const key = "age";
     const user = { [key]: 25 };
     ```

5. **Nested Objects**  
   - Objects can contain other objects.  
   - Example: `{ address: { city: "Delhi", pin: 110001 } }`

-----------------------------------------------------
Examples:

// Basic object initializer
const user = {
  name: "Kaizer",
  age: 25
};
console.log(user.name); // Kaizer

// Shorthand property names
const name = "Alice";
const age = 30;
const person = { name, age };
console.log(person); // { name: "Alice", age: 30 }

// Methods in object
const calculator = {
  add(a, b) { return a + b; },
  multiply(a, b) { return a * b; }
};
console.log(calculator.add(2,3)); // 5

// Computed property names
const prop = "score";
const player = { [prop]: 100 };
console.log(player.score); // 100

// Nested object
const company = { 
  name: "TechCorp", 
  address: { city: "Mumbai", zip: 400001 } 
};
console.log(company.address.city); // Mumbai

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Object initializers provide a clean, readable way to create objects.  
- Supports methods, nested structures, computed keys, and shorthand properties.  
- Useful for configuration objects, API responses, and general object creation.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of an object literal as filling a form: each property is a labeled field, 
  and you can define subforms (nested objects) or even attach actions (methods).

-----------------------------------------------------
Example / Usage:

const config = {
  url: "https://api.example.com",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  showConfig() { console.log(this); }
};
config.showConfig();

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between object initializer and `new Object()`?  
A1: Initializer `{}` is concise and readable; `new Object()` is longer and rarely used.

Q2: Can you use expressions as property names?  
A2: Yes, with computed property syntax `[expression]`.

Q3: How to define methods in object literals?  
A3: Using shorthand syntax `methodName() { ... }` or `methodName: function() { ... }`.

Q4: Are object properties enumerable by default?  
A4: Yes, properties defined via initializer are enumerable.

Q5: Can object literals have getters and setters?  
A5: Yes, using `get propName()` and `set propName(value)` syntax.  
*/
