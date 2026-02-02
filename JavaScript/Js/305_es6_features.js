/* 305_es6_features.js

=====================================================
ES6 Features in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "ES6 (ECMAScript 2015) introduced modern syntax and features 
  to JavaScript, making code cleaner, modular, and more efficient."

Key Points to Highlight:
- Block-scoped variables: let, const
- Arrow functions: concise syntax, lexical `this`
- Template literals: string interpolation using backticks
- Default parameters: assign default values to function parameters
- Destructuring: extract values from arrays or objects
- Spread/rest operators: expand or collect elements
- Classes: syntactic sugar for constructor functions
- Modules: import/export for modular code
- Promises: handle asynchronous operations
- Enhanced object literals: shorthand properties, computed keys

Examples:

// let and const
let x = 10;
const y = 20;

// Arrow function
const add = (a, b) => a + b;

// Template literals
console.log(`Sum: ${add(x, y)}`); // Sum: 30

// Destructuring
const obj = {a:1, b:2};
const {a, b} = obj;

// Spread operator
const arr1 = [1,2];
const arr2 = [...arr1,3,4]; // [1,2,3,4]

// Class
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}
const p = new Person('Alice');
p.greet(); // Hello, Alice

Code Explanation:
- ES6 introduces cleaner syntax and better readability
- Enables modern JavaScript patterns like async programming, modularity, and immutability

Real-Life Analogy:
- ES6 is like upgrading from a basic phone to a smartphone with more features and efficiency

Example / Usage:

// Using Promise
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data received'), 1000);
  });
};
fetchData().then(console.log); // Data received

Follow-Up Interview Questions:
- Q1: What is the difference between var, let, and const?
  A1: var = function-scoped; let/const = block-scoped; const is immutable.
- Q2: Can arrow functions be used as constructors?
  A2: No, they do not have their own `this` or [[Construct]].
- Q3: How does destructuring work with default values?
  A3: You can assign defaults like: const {a=10} = obj;
- Q4: Difference between ES5 and ES6 classes?
  A4: ES6 classes are syntactic sugar; ES5 uses prototype-based constructors.
- Q5: Why are Promises preferred over callbacks?
  A5: Better readability, chaining, and error handling.
*/
