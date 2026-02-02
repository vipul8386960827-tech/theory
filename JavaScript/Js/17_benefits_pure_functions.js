/* 
17_benefits_pure_functions.js – Interview-Ready Answer:

"Pure functions provide several benefits that improve code reliability, maintainability, 
and ease of testing in JavaScript and functional programming."

1️⃣ Key Points to Highlight:

1. Predictable Output:
- Given the same input, a pure function always returns the same result.
- Makes debugging and reasoning about code easier.

2. Testability:
- Pure functions are isolated and deterministic, making unit testing straightforward.

3. No Side Effects:
- Pure functions do not alter external state (variables, DOM, database, etc.), reducing unexpected bugs.

4. Referential Transparency:
- A pure function can be replaced by its output value without changing program behavior.

5. Reusability:
- Pure functions are independent of external state, so they can be reused in different contexts.

6. Support for Functional Programming:
- Enables composition, currying, and other functional patterns effectively.

2️⃣ Examples:

// Pure function
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (predictable output)

// Impure function (side effects)
let counter = 0;
const increment = () => counter += 1;
console.log(increment()); // 1
console.log(increment()); // 2 (not predictable)

3️⃣ Real-Life Analogies:
- Global Analogy: 
  - Pure function = vending machine that always gives the same product for the same coin.
  - Impure function = vending machine that sometimes gives a different item or jams.
- India-specific Analogy:
  - Pure function = automated railway reservation system giving the same seat result for same inputs.
  - Impure function = local booking agent who may assign different seats for same request.
- Web Analogy:
  - Pure function = `Math.max(2,5)` always returns 5.
  - Impure function = function that modifies DOM or fetches live data.

4️⃣ Code Explanation:
- Pure functions reduce bugs and make reasoning about code easier.
- Ideal for unit testing, caching/memoization, and functional programming.

5️⃣ Example / Usage:

// Composition of pure functions
const double = x => x * 2;
const square = x => x * x;

const doubleThenSquare = x => square(double(x));
console.log(doubleThenSquare(3)); // 36

// Memoization with pure functions
const memoize = fn => {
  const cache = {};
  return (...args) => {
    const key = args.toString();
    if (cache[key]) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

const slowAdd = (a, b) => a + b;
const fastAdd = memoize(slowAdd);
console.log(fastAdd(2, 3)); // 5 (cached on repeated calls)

// Impure function example (avoid for benefits)
let arr = [];
const addToArr = val => arr.push(val); // modifies external array
addToArr(1);
addToArr(2);
console.log(arr); // [1,2]

6️⃣ Follow-Up Interview Questions:

Q1: What are the benefits of pure functions?  
A1: Predictable output, testability, no side effects, referential transparency, reusability, and functional programming support.

Q2: How do pure functions help in caching/memoization?  
A2: Since output depends only on inputs, results can be cached and reused safely.

Q3: Can pure functions modify their arguments?  
A3: No, modifying input or external state makes them impure.

Q4: Are built-in array methods like `map` and `filter` pure?  
A4: Yes, as long as the callback functions do not produce side effects.

Q5: How do pure functions improve maintainability?  
A5: They isolate logic, making code easier to understand, debug, and refactor.
*/
