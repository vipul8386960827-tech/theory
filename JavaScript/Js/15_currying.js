/* 
15_currying.js – Interview-Ready Answer:

"Currying is a functional programming technique in which a function that takes multiple arguments is transformed
 into a sequence of functions,
 each taking one argument at a time. Each inner function remembers the previously passed arguments via closures, 
 and the final inner function performs the computation using all collected arguments."

1️⃣ Definition:
- Currying → converting `f(a, b, c)` into `f(a)(b)(c)`.
- Enables partial application and reusable function components.

2️⃣ Key Points to Highlight:
- Helps break down complex functions into simpler, single-argument functions.
- Promotes function reusability and composition.
- Different from partial application (partial application can accept multiple arguments at each step).

3️⃣ Examples:

// Normal function
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried function
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

// Using arrow functions
const curriedAddArrow = a => b => c => a + b + c;
console.log(curriedAddArrow(1)(2)(3)); // 6

4️⃣ Real-Life Analogies:
- Global Analogy: 
  - Currying = ordering pizza one topping at a time, sequentially building the full pizza.
- India-specific Analogy:
  - Currying = making a thali where each dish is added one by one.
- Web Analogy:
  - Currying = middleware functions in Express.js where each function handles part of the request sequentially.

5️⃣ Code Explanation:
- Currying transforms multi-parameter functions into chained unary functions.
- Useful in functional programming, composition, and event handling.

6️⃣ Example / Usage:

// Partial application example
const multiply = a => b => a * b;
const double = multiply(2);
console.log(double(5)); // 10
const triple = multiply(3);
console.log(triple(5)); // 15

// Using with array methods
const addCurried = a => b => a + b;
const add5 = addCurried(5);
console.log(add5(10)); // 15

7️⃣ Follow-Up Interview Questions:

Q1: What is the difference between currying and partial application?  
A1: Currying transforms a function into nested unary functions. Partial application pre-fills some arguments but can accept multiple at once.

Q2: Why is currying useful in functional programming?  
A2: It allows composition, reuse of functions, and building specialized functions from general ones.

Q3: Can arrow functions be curried?  
A3: Yes, arrow functions are commonly used to create curried functions.

Q4: Give an example of currying in real-world JavaScript libraries.  
A4: Libraries like Lodash provide `_.curry()` to transform functions for functional composition.

Q5: What is the output of `const add = a => b => a + b; add(2)(3);`?  
A5: 5
*/
