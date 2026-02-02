/* 303_avoid_with_statement.js

=====================================================
Avoid `with` Statement in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The `with` statement extends the scope chain for a statement block, 
  allowing shorthand access to object properties, but it is discouraged 
  due to unpredictable behavior and performance issues."

Key Points to Highlight:
- Can cause ambiguity in variable resolution
- Makes code harder to read and maintain
- Not allowed in strict mode (ES5+)
- Better alternatives: direct property access, destructuring, or local variables

Examples:

// Using `with` (not recommended)
const obj = { a: 10, b: 20 };
with(obj) {
  console.log(a + b); // 30
}

// Preferred approach
const { a, b } = obj;
console.log(a + b); // 30

// Direct access
console.log(obj.a + obj.b); // 30

Code Explanation:
- `with` temporarily adds object properties to the scope chain
- Can lead to confusion if variable names overlap with outer scope

Real-Life Analogy:
- Like borrowing someone's desk and using their tools without labeling — can cause confusion if you have similar tools of your own

Example / Usage:

function calculate(obj) {
  // Avoid using 'with' to prevent ambiguity
  return obj.a + obj.b;
}
console.log(calculate({ a: 5, b: 15 })); // 20

Follow-Up Interview Questions:
- Q1: Why is `with` forbidden in strict mode?
  A1: It introduces scope ambiguity and potential errors.
- Q2: Are there any situations where `with` is safe?
  A2: Very few, mainly legacy code; modern JS avoids it entirely.
- Q3: How to replace `with` effectively?
  A3: Use destructuring or local variables for clarity.
- Q4: Does `with` affect performance?
  A4: Yes, it can slow down property lookup.
- Q5: Is `with` considered a best practice?
  A5: No, always avoid in modern JavaScript development.
*/
