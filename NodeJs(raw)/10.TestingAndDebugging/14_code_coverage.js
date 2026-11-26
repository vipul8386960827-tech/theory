/* 14_code_coverage.js

=====================================================
Code Coverage
=====================================================

Definition (What I should say in the interview):
- "Code coverage measures how much of the source code is executed when the tests run. Jest
   gives it with the --coverage flag and reports four metrics: **statements, branches,
   functions and lines**. It's useful to find untested parts of the code, and teams often set
   a minimum threshold in CI. But high coverage doesn't mean good tests - code can be executed
   without its result being asserted - so I treat it as a guide, not a goal."

-----------------------------------------------------
The 4 Metrics
-----------------------------------------------------
1. Statements -> % of statements executed.
2. Branches   -> % of if/else, ternary, switch, && / || paths taken. (usually the most useful)
3. Functions  -> % of functions called at least once.
4. Lines      -> % of executable lines executed.

-----------------------------------------------------
Example
-----------------------------------------------------
// Run
//   npx jest --coverage
//   node --test --experimental-test-coverage     (built-in runner)
//   npx c8 mocha                                  (Mocha with V8 coverage)

// jest.config.js
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**', '!src/server.js'],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 85, statements: 85 },
  },
  coverageReporters: ['text', 'lcov'],   // lcov -> HTML report in coverage/lcov-report
};

// Branch coverage example
function getDiscount(user) {
  if (user.isPremium) return 20;
  return 0;
}
// Only testing a premium user -> 100% functions, but 50% branches.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- If coverage drops below the threshold, Jest exits with a non-zero code -> CI fails.
- Jest uses Babel/istanbul instrumentation by default; coverageProvider: 'v8' uses V8's
  native coverage (faster).
- Exclude generated files, config and migrations so the number stays meaningful.
- Services like Codecov / Coveralls / SonarQube show coverage changes on each PR.

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Chasing 100% by writing tests with no real assertions. A test like
  "call function, expect nothing" increases coverage but proves nothing.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What coverage percentage is good?
A1: Around 70-85% is a common realistic target; more important is that critical paths
    (auth, payments, data validation) are well covered, including error branches.

Q2: How can you check test quality beyond coverage?
A2: Mutation testing (e.g. Stryker) changes the code slightly and checks if tests fail -
    if they still pass, the tests are weak.
*/
