/* 
16_pure_function.js – Interview-Ready Answer:

"A pure function is a function that, given the same input, always returns the same output 
and has no side effects (does not modify external state or rely on it)."

1️⃣ Definition:
- Pure function → deterministic and side-effect-free.
- Side effect → any interaction with external state (e.g., modifying global variables, I/O operations).

2️⃣ Key Points to Highlight:
- Predictable output → easy to test and debug.
- No side effects → does not change external variables or data.
- Supports functional programming principles like immutability and referential transparency.

3️⃣ Examples:

// Pure function
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (always same output)

// Impure function (side effect)
let counter = 0;
function increment() {
  counter += 1; // modifies external state
  return counter;
}
console.log(increment()); // 1
console.log(increment()); // 2 (different output, depends on external state)

4️⃣ Real-Life Analogies:
- Global Analogy:
  - Pure function = calculator: same inputs always give the same result.
  - Impure function = vending machine that sometimes fails or modifies stock.
- India-specific Analogy:
  - Pure function = automated ticket booking that always gives correct seat if inputs same.
  - Impure function = local shopkeeper who changes price depending on day or mood.
- Web Analogy:
  - Pure function = utility function like `Math.max()`.
  - Impure function = modifying DOM or fetching external data inside a function.

5️⃣ Code Explanation:
- Pure functions are predictable, testable, and safe to use in concurrent environments.
- Impure functions may cause bugs due to hidden dependencies or side effects.

6️⃣ Example / Usage:

// Pure function example
const square = x => x * x;
console.log(square(4)); // 16
console.log(square(4)); // 16 (always same output)

// Impure function example
let arr = [1, 2, 3];
function addToArray(value) {
  arr.push(value); // modifies external array
  return arr;
}
console.log(addToArray(4)); // [1,2,3,4]
console.log(addToArray(5)); // [1,2,3,4,5]

7️⃣ Follow-Up Interview Questions:

Q1: What is a pure function?  
A1: A function that returns the same output for same input and has no side effects.

Q2: Why are pure functions important in functional programming?  
A2: They are predictable, easier to test, and support immutability and composability.

Q3: Can a pure function modify its arguments?  
A3: No, modifying arguments counts as a side effect; instead, return a new value.

Q4: Give an example of a pure function in JavaScript.  
A4: `const add = (a, b) => a + b;`

Q5: Difference between pure and impure functions?  
A5: Pure: deterministic & no side effects; Impure: may produce different outputs or modify external state.
*/
