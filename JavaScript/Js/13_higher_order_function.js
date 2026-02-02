/* 
13_higher_order_function.js – Interview-Ready Answer:

"A higher-order function (HOF) is a function that either takes one or more functions as arguments, 
returns a function, or both. HOFs are a core concept of functional programming in JavaScript."

1️⃣ Definition:
- Higher-order function → can take functions as arguments, return a function, or both.
- Built upon the concept of first-class functions.

2️⃣ Key Points to Highlight:
- Enables abstraction and code reuse.
- Commonly used in callbacks, array methods (map, filter, reduce), and functional utilities.
- Helps implement patterns like currying, partial application, and composition.

3️⃣ Examples:

// 1. Function as argument
function greetUser(name, formatter) {
  return formatter(name);
}

function upperCaseName(name) {
  return name.toUpperCase();
}

console.log(greetUser("Alice", upperCaseName)); // ALICE

// 2. Function that returns a function
function multiplier(x) {
  return function(y) {
    return x * y;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10

// 3. Built-in higher-order functions (array)
const numbers = [1, 2, 3, 4];
const squares = numbers.map(n => n * n); // map is HOF
console.log(squares); // [1, 4, 9, 16]

4️⃣ Real-Life Analogies:
- Global Analogy: 
  - HOF = machine that can take another machine as input or produce a machine as output.
- India-specific Analogy:
  - HOF = chef who can train another chef or create a new recipe creator.
- Web Analogy:
  - HOF = array.map(), array.filter(), array.reduce() — functions that operate on other functions.

5️⃣ Code Explanation:
- Functions can be passed around or returned like data.
- HOFs enable flexible, modular, and reusable code.
- They abstract behavior, reducing duplication.

6️⃣ Example / Usage:

// Using HOF for filtering
const fruits = ["apple", "banana", "cherry"];
const startsWith = (letter) => (item) => item.startsWith(letter);

const filtered = fruits.filter(startsWith("b"));
console.log(filtered); // ["banana"]

// Currying example
const add = (x) => (y) => x + y;
const add5 = add(5);
console.log(add5(10)); // 15

7️⃣ Follow-Up Interview Questions:

Q1: What is the difference between first-order and higher-order functions?  
A1: First-order functions do not take/return other functions; higher-order functions do.

Q2: Can arrow functions be higher-order functions?  
A2: Yes, any function (arrow or regular) can be a HOF.

Q3: Give examples of built-in higher-order functions in JavaScript.  
A3: Array methods: map, filter, reduce, forEach, sort, etc.

Q4: Why are higher-order functions important in functional programming?  
A4: They allow abstraction, composition, and modularity.

Q5: How do you implement a higher-order function that returns another function?  
A5: Example: `const multiplier = x => y => x * y;` — returns a function using lexical closure.
*/
