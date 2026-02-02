/* 350_yield_keyword.js

=====================================================
`yield` Keyword in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "`yield` is used inside generator functions to pause execution and 
  produce a value, resuming later from the same point."

Key Points to Highlight:
- Only valid inside generator functions (`function*`)
- Pauses function execution, returns a value to the caller
- Execution resumes when `.next()` is called again
- Can receive values sent from `.next(value)` call
- Allows creation of iterables and lazy sequences

Examples:

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numbers();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Receiving values from next()
function* addGenerator() {
  const x = yield 10;
  const y = yield 20;
  return x + y;
}

const gen2 = addGenerator();
console.log(gen2.next());      // { value: 10, done: false }
console.log(gen2.next(5));     // { value: 20, done: false }
console.log(gen2.next(15));    // { value: 20, done: true }

Code Explanation:
- `yield` pauses generator and outputs value
- `.next()` resumes generator execution
- Can pass data back into generator via `.next(value)`

Real-Life Analogy:
- Like pausing a Netflix video: you stop at a scene (yield) and resume later exactly where you left off

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
- Q1: Can yield be used outside generator functions?
  A1: No, it will throw SyntaxError.
- Q2: Difference between return and yield in generator?
  A2: `yield` pauses and returns a value; `return` ends the generator.
- Q3: How to iterate over generator using yield?
  A3: Using `.next()` or `for...of`.
- Q4: Can yield receive input from next() call?
  A4: Yes, value passed to next() becomes the result of yield expression.
- Q5: Use cases of yield?
  A5: Lazy evaluation, iterables, async patterns, large data processing.
*/
