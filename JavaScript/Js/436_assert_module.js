/* 436_assert_module.js

=====================================================
Assert Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `assert` module in Node.js provides a set of **assertion functions** 
  for testing invariants in code. It is mainly used in unit testing to ensure 
  that code behaves as expected, throwing errors when assertions fail."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **assert(value)** → Throws an error if `value` is falsy.
2. **assert.strictEqual(actual, expected)** → Tests strict equality (`===`).
3. **assert.deepStrictEqual(actual, expected)** → Tests deep equality of objects/arrays.
4. **assert.notStrictEqual(actual, expected)** → Throws if values are strictly equal.
5. **assert.rejects(asyncFn, error)** → Asserts that a promise rejects with a specific error.
6. **assert.doesNotThrow(fn)** → Ensures a function does not throw an error.
7. Useful for **unit testing** without external testing libraries.
8. Can be used in production code for runtime sanity checks (optional).

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const assert = require('assert');

const a = 5;
const b = 5;
assert(a === b); // Passes, no error

assert.strictEqual(a, b); // Passes, a === b

-----------------------------------------------------
Example (Deep Equality)
-----------------------------------------------------
const obj1 = { name: 'Kaizer', age: 25 };
const obj2 = { name: 'Kaizer', age: 25 };

assert.deepStrictEqual(obj1, obj2); // Passes

-----------------------------------------------------
Example (Asserting Errors)
-----------------------------------------------------
function willThrow() {
  throw new Error('Something went wrong');
}

assert.throws(
  willThrow,
  Error,
  'Function did not throw as expected'
);

-----------------------------------------------------
Example (Promises)
-----------------------------------------------------
const asyncFn = async () => { throw new Error('Fail'); };

assert.rejects(
  asyncFn,
  Error,
  'Promise did not reject as expected'
);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Writing unit tests to verify function outputs.
- Validating invariants in code during development.
- Ensuring promises reject or resolve as expected.
- Quick debugging during development without external frameworks.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `assert` throws **AssertionError** when a test fails.
2. `assert.strictEqual` uses `===`, whereas `assert.equal` uses `==`.
3. Use `deepStrictEqual` for object or array comparisons.
4. `assert` is synchronous; asynchronous assertions require `assert.rejects` or `assert.doesNotReject`.
5. Commonly used with testing frameworks like Mocha, Jest, or Node.js native tests.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `assert` as a **checkpoint or guard**:
  - It ensures your code is behaving correctly and immediately alerts you 
    if something is wrong.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between `assert.equal` and `assert.strictEqual`?  
A1: `assert.equal` uses `==` (type coercion allowed), `assert.strictEqual` uses `===` (strict equality, no coercion).

Q2: How do you assert that a promise rejects?  
A2: Use `assert.rejects(promise, expectedError)`.

Q3: Can `assert` be used in production code?  
A3: Yes, for runtime sanity checks, but mostly used in development/testing.

Q4: How do you compare objects using `assert`?  
A4: Use `assert.deepStrictEqual(obj1, obj2)` to check deep equality.

Q5: What error does `assert` throw on failure?  
A5: `AssertionError`.
*/
