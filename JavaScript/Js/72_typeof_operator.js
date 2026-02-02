/* 
72_typeof_operator.js – Interview-Ready Answer

"The `typeof` operator in JavaScript is used to determine the type of a 
value or variable. It returns a string indicating the type."

1️⃣ Key Points to Highlight

1. Definition:
- Unary operator that returns the type as a string.
- Works for variables, literals, expressions, and objects.

2. Syntax Example

console.log(typeof 42); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (known quirk)
console.log(typeof {}); // "object"
console.log(typeof []); // "object" (arrays are objects)
console.log(typeof function(){}); // "function"
console.log(typeof Symbol()); // "symbol"
console.log(typeof BigInt(123)); // "bigint"

3. Quirks / Lesser Known Facts:
- `typeof null` returns "object" (historical bug).
- Arrays and objects both return "object"; use Array.isArray() to check arrays.
- Functions return "function", which is a callable object type.
- `typeof` on undeclared variable returns "undefined" instead of throwing error.

4. Real-Life Analogies

- Global Analogy: typeof = asking "what type of item is this?" (fruit, vegetable, tool).
- India-specific Analogy: typeof = checking whether a note is currency, receipt, or ID card.
- Web Analogy: Checking variable type before performing operations (e.g., string concatenation vs number addition).

5. Code Explanation

- Provides a quick way to identify types at runtime.
- Useful in conditionals, validation, or debugging.

6. Example / Usage

let value1 = 10;
let value2 = "Hello";
let value3;

console.log(typeof value1); // "number"
console.log(typeof value2); // "string"
console.log(typeof value3); // "undefined"
console.log(typeof null);   // "object"
console.log(typeof []);     // "object"
console.log(typeof function(){}); // "function"

7️⃣ Follow-Up Interview Questions

Q1: Why does typeof null return "object"?  
A1: Historical JavaScript bug; null is actually a primitive.

Q2: How to distinguish between array and object using typeof?  
A2: Use Array.isArray(value) for arrays.

Q3: Can typeof detect undeclared variables?  
A3: Yes, returns "undefined" without throwing an error.

Q4: What is the type of NaN?  
A4: "number"

Q5: Can typeof detect class instances?  
A5: Returns "object"; check constructor or use instanceof for specific class.
*/
