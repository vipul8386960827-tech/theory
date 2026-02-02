/* 
14_unary_function.js – Interview-Ready Answer:

"A unary function is a function that takes exactly one argument. 
In JavaScript, unary functions are often used for simplicity, currying, and higher-order function composition."

1️⃣ Definition:
- Unary function → a function with a single parameter.
- Contrast: Binary function → takes two arguments, Ternary → three, etc.

2️⃣ Key Points to Highlight:
- Useful in functional programming and array methods like `map`, `filter`, `reduce`.
- Can be easily composed with other functions.
- Makes functions predictable and reduces complexity.

3️⃣ Examples:

// Unary function
const square = (x) => x * x;
console.log(square(5)); // 25

// Binary function (for comparison)
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// Unary function in array methods
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(x => x * 2); // map passes only one argument by default
console.log(doubled); // [2, 4, 6, 8]

4️⃣ Real-Life Analogies:
- Global Analogy:
  - Unary function = vending machine that takes exactly one coin to dispense one item.
  - Binary function = vending machine requiring two coins for one item.
- India-specific Analogy:
  - Unary function = auto-rickshaw ride where you pay one fixed fare for one distance.
  - Binary function = taxi fare where base fare + per km fare (two inputs).
- Web Analogy:
  - Unary function = event handler receiving only `event` argument.

5️⃣ Code Explanation:
- Using unary functions makes code simpler and avoids argument ambiguity.
- Particularly useful with higher-order functions where only one input is expected.

6️⃣ Example / Usage:

// Using unary function in filter
const words = ["apple", "banana", "cherry"];
const startsWithA = words.filter(word => word[0] === "a");
console.log(startsWithA); // ["apple"]

// Currying to create unary function
const multiply = x => y => x * y;
const double = multiply(2);
console.log(double(5)); // 10

7️⃣ Follow-Up Interview Questions:

Q1: What is a unary function?  
A1: A function that takes exactly one argument.

Q2: Why are unary functions useful in JavaScript?  
A2: They simplify functional programming, help in currying and function composition.

Q3: Can a unary function ignore extra arguments passed to it?  
A3: Yes, JavaScript functions ignore additional arguments unless explicitly handled.

Q4: Give an example of unary function in array methods.  
A4: `array.map(x => x * 2)` — map provides only one argument to the unary callback by default.

Q5: Difference between unary, binary, and ternary functions?  
A5: Unary → 1 argument, Binary → 2 arguments, Ternary → 3 arguments. Helps clarify function expectations.
*/
