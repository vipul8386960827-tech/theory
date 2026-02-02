/* 
25_memoization.js – Interview-Ready Answer:

"Memoization is an optimization technique in JavaScript where the results of expensive 
function calls are cached, so that subsequent calls with the same inputs return the cached result, 
improving performance."

1️⃣ Key Points to Highlight:

1. Purpose:
- Avoid repeated calculations for the same inputs.
- Commonly used in recursive functions like Fibonacci, factorial, or heavy computations.

2. How It Works:
- Store the result of a function in a cache object.
- Before computing, check if the result exists in the cache.
- Return cached result if available; otherwise, compute and store it.

3. Benefits:
- Reduces computational time.
- Improves efficiency, especially for recursive and repeated calls.
- Can be used in both functional and object-oriented JavaScript.

2️⃣ Examples:

// Memoization for Fibonacci (recursive)
function memoizedFibonacci() {
  const cache = {};
  return function fib(n) {
    if (n <= 1) return n;
    if (cache[n]) return cache[n];
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fib = memoizedFibonacci();
console.log(fib(10)); // 55
console.log(fib(10)); // 55 (retrieved from cache, faster)

// Simple memoization function
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = args.toString();
    if (cache[key]) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Usage
const slowAdd = (a, b) => {
  console.log("Computing...");
  return a + b;
};
const fastAdd = memoize(slowAdd);
console.log(fastAdd(2, 3)); // "Computing..." 5
console.log(fastAdd(2, 3)); // 5 (from cache, no "Computing...")

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Memoization = remembering previous results to avoid redoing work.
- India-specific Analogy:
  - Memoization = remembering bus fare for a route so you don’t need to check the ticket again.
- Web Analogy:
  - Memoization = caching API responses to avoid repeated network requests.

4️⃣ Code Explanation:
- Memoization creates a cache object for storing computed results.
- Recursive functions like Fibonacci greatly benefit from memoization to avoid exponential calls.
- General-purpose `memoize` function can wrap any pure function.

5️⃣ Example / Usage:

// Fibonacci with memoization
const fibMemo = memoize(n => {
  if (n <= 1) return n;
  return fibMemo(n - 1) + fibMemo(n - 2);
});
console.log(fibMemo(10)); // 55

// Heavy computation example
const multiply = memoize((a, b) => a * b);
console.log(multiply(5, 10)); // 50
console.log(multiply(5, 10)); // 50 (cached result)

6️⃣ Follow-Up Interview Questions:

Q1: What is memoization?  
A1: Caching the results of expensive function calls to improve performance for repeated inputs.

Q2: When should you use memoization?  
A2: For pure functions with repetitive computations, especially recursive algorithms.

Q3: Can memoization be used with impure functions?  
A3: Not recommended, because results may depend on external state, breaking correctness.

Q4: How is memoization different from caching?  
A4: Memoization is function-specific caching, usually in memory; caching can be broader (like API responses).

Q5: Can arrow functions be memoized?  
A5: Yes, as long as they are pure and deterministic.
*/
