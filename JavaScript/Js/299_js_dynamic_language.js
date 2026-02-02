/* 299_js_dynamic_language.js

=====================================================
JavaScript as a Dynamic Language – Interview-Ready Answer
=====================================================

Definition:
- "JavaScript is a dynamic, weakly-typed language, meaning variable types can 
  change at runtime, and type checking is performed during execution rather than compile time."

Key Points to Highlight:
- Variables can hold different types over time
- No need to declare types explicitly
- Supports runtime property addition/removal for objects
- Flexibility allows rapid development but may introduce runtime errors

Examples:

let value = 10;          // number
console.log(typeof value); // "number"

value = "Hello";         // string
console.log(typeof value); // "string"

const obj = {};
obj.name = "Alice";      // dynamically adding property
console.log(obj.name);   // "Alice"

Code Explanation:
- Type of variables can change dynamically
- Objects can be modified at runtime
- This flexibility is characteristic of dynamic languages

Real-Life Analogy:
- Like a person who can change their role in a team anytime without prior declaration

Example / Usage:

let data = [1, 2, 3];
data = "Now I'm a string"; // JS allows this without error
console.log(data);

Follow-Up Interview Questions:
- Q1: Difference between dynamic and static typing?
  A1: Dynamic: types determined at runtime; Static: types declared at compile-time.
- Q2: Is dynamic typing a disadvantage?
  A2: Can lead to runtime errors; requires careful testing.
- Q3: Can functions be dynamic in JS?
  A3: Yes, functions are first-class objects and can be reassigned.
- Q4: How to check type of a variable?
  A4: Using typeof operator.
- Q5: Does dynamic language mean weakly typed?
  A5: Usually, but not always; JS is weakly typed since implicit conversions occur.
*/
