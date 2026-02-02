/* 
26_hoisting.js – Interview-Ready Answer:

"Hoisting is a JavaScript behavior where variable and function declarations are moved to the top 
of their scope during compilation. This allows functions and variables to be used before they are declared."

1️⃣ Key Points to Highlight:

1. Variable Hoisting:
- `var` declarations are hoisted and initialized with `undefined`.
- `let` and `const` are hoisted but remain in the Temporal Dead Zone (TDZ) until initialized.

2. Function Hoisting:
- Function declarations are hoisted with their entire body.
- Function expressions (including arrow functions) are treated like variables; only the variable name is hoisted, not the assignment.

3. Scope:
- Hoisting occurs within the current scope (function or global).

2️⃣ Examples:

// var hoisting
console.log(aVar); // undefined
var aVar = 10;

// let/const hoisting
// console.log(aLet); // ReferenceError (TDZ)
let aLet = 20;
// console.log(aConst); // ReferenceError (TDZ)
const aConst = 30;

// Function declaration hoisting
console.log(sum(2, 3)); // 5
function sum(x, y) {
  return x + y;
}

// Function expression hoisting
// console.log(multiply(2, 3)); // TypeError: multiply is not a function
const multiply = function(x, y) {
  return x * y;
};

// Arrow function expression hoisting
// console.log(divide(6, 2)); // TypeError: divide is not a function
const divide = (x, y) => x / y;

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Hoisting = a factory preparing all tools and materials at the start of the day,
    so workers can use them anytime during the day.
- India-specific Analogy:
  - Hoisting = preparing all ingredients for a restaurant before opening, so chefs can cook immediately.
- Web Analogy:
  - Hoisting = JavaScript engine moving variable and function declarations to the top of their scope.

4️⃣ Code Explanation:

- `var` variables are hoisted with `undefined` initialization.
- `let` and `const` are hoisted but not initialized (TDZ applies).
- Function declarations are fully hoisted with their body.
- Function expressions behave like variables, only the name is hoisted.

5️⃣ Example / Usage:

// Correct usage of hoisted function
console.log(greet()); // "Hello!"
function greet() {
  return "Hello!";
}

// Correct usage of var
console.log(msg); // undefined
var msg = "Hi";

// TDZ with let/const
// console.log(age); // ReferenceError
let age = 25;
// console.log(salary); // ReferenceError
const salary = 5000;

6️⃣ Follow-Up Interview Questions:

Q1: What is hoisting?  
A1: JavaScript behavior where variable and function declarations are moved to the top of their scope.

Q2: Difference between hoisting of var, let, and const?  
A2: `var` → hoisted and initialized with undefined; `let`/`const` → hoisted but in TDZ until initialization.

Q3: Are function expressions hoisted?  
A3: Only the variable name is hoisted; the assignment is not hoisted.

Q4: Are arrow functions hoisted?  
A4: No, they are function expressions. Only the variable name is hoisted, not the function body.

Q5: Why is understanding hoisting important?  
A5: Prevents ReferenceErrors, helps debug initialization issues, and clarifies function vs variable behavior.
*/
