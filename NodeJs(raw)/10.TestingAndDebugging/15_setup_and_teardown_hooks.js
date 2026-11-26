/* 15_setup_and_teardown_hooks.js

=====================================================
Setup and Teardown Hooks
=====================================================

Definition (What I should say in the interview):
- "Setup and teardown hooks let me run common code before and after tests instead of
   repeating it in every test. Jest has **beforeAll** and **afterAll**, which run once per file
   or describe block - good for expensive things like connecting to a database - and
   **beforeEach** and **afterEach**, which run around every single test - good for resetting
   data and mocks so tests don't affect each other."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. beforeAll  -> once before all tests in the scope (connect DB, start server).
2. beforeEach -> before every test (seed data, create fresh objects).
3. afterEach  -> after every test (clear collections, jest.clearAllMocks()).
4. afterAll   -> once after all tests (close DB, stop servers) -> prevents hanging Jest.
5. Hooks inside a describe apply only to that describe block.
6. Shared setup per test file -> "setupFilesAfterEnv" in jest.config.js,
   and "globalSetup"/"globalTeardown" for things that run once for the whole test run.

-----------------------------------------------------
Example (execution order)
-----------------------------------------------------
beforeAll(() => console.log('1 - outer beforeAll'));
afterAll(() => console.log('outer afterAll'));
beforeEach(() => console.log('outer beforeEach'));
afterEach(() => console.log('outer afterEach'));

describe('cart', () => {
  beforeEach(() => console.log('  inner beforeEach'));

  test('adds item', () => console.log('    test 1'));
  test('removes item', () => console.log('    test 2'));
});

// Output for each test inside describe:
// outer beforeEach -> inner beforeEach -> test -> (inner afterEach) -> outer afterEach

// Async hooks work like async tests
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI);
});

-----------------------------------------------------
Equivalent in other runners
-----------------------------------------------------
| Jest       | Mocha       | node:test   |
|------------|-------------|-------------|
| beforeAll  | before      | before      |
| beforeEach | beforeEach  | beforeEach  |
| afterEach  | afterEach   | afterEach   |
| afterAll   | after       | after       |

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Creating shared mutable state in beforeAll that tests modify -> order-dependent tests.
- Forgetting to return/await inside async hooks -> test starts before setup finishes.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Where do you put jest.clearAllMocks()?
A1: In afterEach (or set clearMocks: true in jest.config.js) so every test starts clean.

Q2: Difference between globalSetup and beforeAll?
A2: globalSetup runs once before ALL test files in a separate context (e.g. start a Docker DB);
    beforeAll runs once per test file/describe inside the test environment.
*/
