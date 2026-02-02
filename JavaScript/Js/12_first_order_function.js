/* 
12_first_order_function.js – Interview-Ready Answer:

"A first-order function is a function that does NOT take another function as an argument 
and does NOT return a function. It only operates on basic data values."

1️⃣ Definition:
- First-order function → works only with primitive values or objects, not with other functions.
- Contrast with higher-order functions, which take/return functions.

2️⃣ Key Points to Highlight:
- First-order = simple, direct function (no function passed or returned).
- All functions in JavaScript are **first-class**, but not all are higher-order.
- First-order functions form the base building blocks.

3️⃣ Examples:

// First-order function: only deals with numbers
function square(x) {
  return x * x;
}
console.log(square(4)); // 16

// Another first-order function: adds two numbers
function add(a, b) {
  return a + b;
}
console.log(add(3, 5)); // 8

// NOT first-order → returns a function (this would be higher-order)
function multiplier(x) {
  return function(y) {
    return x * y;
  };
}

4️⃣ Real-Life Analogies:
- Global Analogy: 
  - First-order = basic calculator that can only do direct calculations.
  - Higher-order = programmable calculator that accepts instructions (functions).
- India-specific Analogy:
  - First-order = street food vendor who gives you food directly.
  - Higher-order = catering service that gives you a chef (function) instead of food.
- Web Analogy:
  - First-order = direct API call returning data.
  - Higher-order = API that returns another function (e.g., SDK wrapper).

5️⃣ Code Explanation:
- First-order functions take inputs, process them, and return values.
- They are simple and do not rely on passing/returning other functions.

6️⃣ Example / Usage:

const greet = (name) => `Hello, ${name}`;
console.log(greet("Alice")); // Hello, Alice

const areaOfRectangle = (length, width) => length * width;
console.log(areaOfRectangle(5, 4)); // 20

7️⃣ Follow-Up Interview Questions:

Q1: Difference between first-class, first-order, and higher-order functions?  
A1: 
- First-class → Functions treated as values (assign/pass/return).
- First-order → Functions that don’t take/return other functions.
- Higher-order → Functions that take/return other functions.

Q2: Is every first-order function also first-class?  
A2: Yes, in JavaScript, all functions are first-class, regardless of being first-order or higher-order.

Q3: Give an example of when to use first-order functions.  
A3: For simple calculations or operations where no callbacks or function-returning is required.

Q4: Can a function be both first-order and higher-order?  
A4: No, by definition, first-order doesn’t take/return functions. Higher-order does.

Q5: Why do we care about this distinction in interviews?  
A5: It shows understanding of functional programming fundamentals and abstraction levels in JavaScript.
*/
