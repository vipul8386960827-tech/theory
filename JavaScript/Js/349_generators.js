/* 349_generators.js

=====================================================
Generators in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Generators are special functions that can pause execution and 
  resume later, using the `function*` syntax and the `yield` keyword."

Key Points to Highlight:
- Declared using `function*` syntax
- `yield` pauses execution and returns a value
- Can be iterated using `.next()` method
- Maintain internal state between executions
- Useful for lazy evaluation, iterables, and async patterns

Examples:

// Simple generator
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Infinite generator
function* idGenerator() {
  let id = 1;
  while(true) {
    yield id++;
  }
}

const idGen = idGenerator();
console.log(idGen.next().value); // 1
console.log(idGen.next().value); // 2

Code Explanation:
- `function*` creates a generator
- Each `yield` returns a value and pauses execution
- `.next()` resumes execution from last `yield`
- `done` indicates completion

Real-Life Analogy:
- Like a bookmark in a book: you can pause reading and resume exactly where you left off

Example / Usage:

function* fibonacci() {
  let a = 0, b = 1;
  while(true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

Follow-Up Interview Questions:
- Q1: Difference between generator and normal function?
  A1: Generator can pause and resume execution; normal function runs top-to-bottom.
- Q2: Can generators maintain state between calls?
  A2: Yes, internal state is preserved across `yield` calls.
- Q3: How to iterate over a generator?
  A3: Using `.next()`, `for...of`, or spreading into an array.
- Q4: Can generators be infinite?
  A4: Yes, often used for infinite sequences like IDs or Fibonacci numbers.
- Q5: Use cases of generators?
  A5: Lazy evaluation, async patterns, iterables, and large data processing.
*/
