/* 10_test_frameworks_comparison.js

=====================================================
Test Frameworks Comparison (Jest, Mocha, Vitest, node:test)
=====================================================

Definition (What I should say in the interview):
- "In Node the main options are **Jest**, **Mocha**, **Vitest** and the built-in **node:test**
   runner. Jest is all-in-one: runner, assertions, mocks and coverage in one package, which is
   why it is the most common. Mocha is just a runner, so you add Chai for assertions and Sinon
   for mocks. Vitest has a Jest-compatible API but is faster and works natively with ESM and
   Vite. And since Node 18, node:test lets you write tests with zero dependencies."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature       | Jest            | Mocha (+Chai/Sinon) | Vitest          | node:test          |
|---------------|-----------------|---------------------|-----------------|--------------------|
| Setup         | zero-config     | assemble yourself   | minimal         | built into Node    |
| Assertions    | expect built-in | Chai                | expect built-in | node:assert        |
| Mocking       | jest.fn/mock    | Sinon               | vi.fn/vi.mock   | mock.fn (basic)    |
| Coverage      | built-in        | nyc / c8            | built-in (v8)   | --experimental-test-coverage |
| ESM support   | needs config    | good                | native          | native             |
| Speed         | ok              | fast                | very fast       | fast               |

-----------------------------------------------------
Example - node:test (Node 18+)
-----------------------------------------------------
// math.test.js  -> run with: node --test
const { test, describe, mock } = require('node:test');
const assert = require('node:assert/strict');

describe('add', () => {
  test('adds numbers', () => {
    assert.equal(1 + 2, 3);
  });

  test('mock function', () => {
    const fn = mock.fn(() => 42);
    fn();
    assert.equal(fn.mock.calls.length, 1);
  });
});

-----------------------------------------------------
Example - Mocha + Chai
-----------------------------------------------------
const { expect } = require('chai');
describe('add', () => {
  it('adds numbers', () => {
    expect(1 + 2).to.equal(3);
  });
});

-----------------------------------------------------
How I choose
-----------------------------------------------------
- Existing project -> stick with what's there.
- New CommonJS API -> Jest (team familiarity, everything included).
- ESM / TypeScript / Vite projects -> Vitest.
- Small library or zero-dependency tooling -> node:test.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does Jest struggle with ESM?
A1: Jest's module mocking was built around CommonJS require; native ESM needs the
    experimental VM modules flag or a transform like babel-jest / ts-jest.

Q2: Is node:test production-ready?
A2: It is stable since Node 20 and good for simple suites, but its mocking and ecosystem
    (snapshot, watch UI, plugins) are still lighter than Jest or Vitest.
*/
