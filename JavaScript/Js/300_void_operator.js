/* 300_void_operator.js

=====================================================
Void Operator in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The `void` operator evaluates a given expression and always returns 
  `undefined` regardless of the expression's result."

Key Points to Highlight:
- Commonly used to prevent default actions in links: `href="javascript:void(0)"`
- Can execute expressions without returning a value
- Rarely used in modern JavaScript, mostly for legacy code or bookmarklets
- Syntax: `void(expression)`

Examples:

// Basic usage
let result = void (2 + 3);
console.log(result); // undefined

// Prevent link navigation
// <a href="javascript:void(0)">Click me</a>

// Using in functions
function logAndIgnore(value) {
  return void console.log(value); // prints value, returns undefined
}
logAndIgnore("Hello"); // logs "Hello"

Code Explanation:
- Evaluates the expression but discards its value
- Useful when a return value is unnecessary or must be undefined

Real-Life Analogy:
- Like doing a task for its side effect but intentionally ignoring the outcome

Example / Usage:

const x = 10;
console.log(void (x + 5)); // undefined

Follow-Up Interview Questions:
- Q1: Difference between void and undefined?
  A1: `void` always returns undefined; `undefined` is a value a variable can hold.
- Q2: Why use void with links?
  A2: To prevent page reload or navigation while executing JS code.
- Q3: Can void take multiple expressions?
  A3: No, only a single expression is allowed.
- Q4: Modern alternatives to void?
  A4: Use event.preventDefault() in click handlers.
- Q5: Is void commonly used today?
  A5: Rarely; mostly in legacy code, bookmarklets, or specialized cases.
*/
