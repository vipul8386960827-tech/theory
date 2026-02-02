/* 226_function_parameter_rules.js

=====================================================
Function Parameter Rules in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Function parameter rules define how parameters are declared, 
   ordered, and used inside JavaScript functions."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Order Matters  
   - Parameters are matched with arguments by position.

2. Default Parameters  
   - You can assign default values (only apply when argument is `undefined`).

3. Rest Parameters  
   - Use `...args` to capture remaining arguments as an array.

4. Parameter Count  
   - Functions do not enforce argument count; extra arguments are ignored, 
     missing ones become `undefined`.

5. Unique Names  
   - Parameter names should be unique in strict mode.

6. Destructuring  
   - Parameters can use object or array destructuring for cleaner code.

-----------------------------------------------------
Examples:

// Rule 1: Order matters
function greet(first, second) {
  console.log(first, second);
}
greet("Hello", "World"); // Hello World

// Rule 2: Default parameters
function sayHi(name = "Guest") {
  console.log("Hi", name);
}
sayHi(); // Hi Guest

// Rule 3: Rest parameters
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6

// Rule 4: Argument count
function test(a, b) {
  console.log(a, b);
}
test(1);        // 1 undefined
test(1, 2, 3);  // 1 2

// Rule 5: Unique names
// function bad(a, a) {} // SyntaxError in strict mode

// Rule 6: Destructuring
function printUser({ name, age }) {
  console.log(name, age);
}
printUser({ name: "John", age: 30 }); // John 30

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of parameters like seats in a theater:  
  - People (arguments) sit in order.  
  - If a seat is empty (missing argument), it stays vacant (`undefined`).  
  - Extra people (extra arguments) are ignored unless a “catch-all” row (rest parameter) exists.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Parameters give names to inputs.
- Defaults avoid errors when arguments are missing.
- Rest parameters handle variable-length inputs.
- Destructuring makes code cleaner when passing objects/arrays.

-----------------------------------------------------
Example / Usage:

function multiply(a, b = 2) {
  return a * b;
}
console.log(multiply(5));    // 10
console.log(multiply(5, 3)); // 15

function logAll(...values) {
  console.log(values);
}
logAll(1, "two", true); // [1, "two", true]

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if more arguments are passed than parameters?  
A1: Extra arguments are ignored unless accessed via `arguments` or rest parameters.

Q2: How do default parameters differ from `||` fallback?  
A2: Default parameters only trigger on `undefined`, while `||` also triggers on falsy values.

Q3: Can you mix regular, default, and rest parameters?  
A3: Yes, but rest must always come last.

Q4: What is the role of destructuring in parameters?  
A4: It simplifies accessing object/array values directly in the parameter list.

Q5: Are parameters mandatory in JavaScript?  
A5: No, JavaScript functions can be called with fewer or more arguments.
*/
