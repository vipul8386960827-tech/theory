/* 9_tdd_vs_bdd.js

=====================================================
TDD vs BDD
=====================================================

Definition (What I should say in the interview):
- "**TDD**, Test-Driven Development, is a developer workflow where I write a failing test
   first, then write the minimum code to make it pass, then refactor - the Red, Green,
   Refactor cycle. **BDD**, Behaviour-Driven Development, builds on TDD but focuses on
   describing the *behaviour* of the system in plain business language, often in a
   Given-When-Then format, so developers, QA and product people share the same understanding.
   TDD is about how I write code; BDD is about agreeing on what the system should do."

-----------------------------------------------------
TDD Cycle
-----------------------------------------------------
1. Red      -> write a test for the next small behaviour; it fails.
2. Green    -> write the simplest code to pass it.
3. Refactor -> clean up code (and tests) while keeping them green.
Repeat in small steps.

-----------------------------------------------------
Example - TDD with Jest
-----------------------------------------------------
// Step 1 (Red): test first, slugify does not exist yet
test('slugify converts title to url slug', () => {
  expect(slugify('Hello World Node')).toBe('hello-world-node');
});

// Step 2 (Green): minimal implementation
function slugify(str) {
  return str.trim().toLowerCase().split(/\s+/).join('-');
}
// Step 3 (Refactor): add more tests (special chars), then improve the implementation.

-----------------------------------------------------
Example - BDD style
-----------------------------------------------------
// Gherkin feature file (Cucumber.js)
// Feature: Login
//   Scenario: Valid user logs in
//     Given a registered user "a@b.com"
//     When they log in with the correct password
//     Then they receive an auth token

// BDD-style naming in Jest/Mocha
describe('when the cart is empty', () => {
  it('should return total 0', () => {
    expect(new Cart().total()).toBe(0);
  });
});

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect     | TDD                        | BDD                                |
|------------|----------------------------|------------------------------------|
| Focus      | correctness of code units  | behaviour from user/business view  |
| Written by | developers                 | devs + QA + product together       |
| Language   | code (test functions)      | Given-When-Then, plain English     |
| Tools      | Jest, Mocha, node:test     | Cucumber.js, Jest/Mocha describe-it|

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Do you follow TDD strictly?
A1: Honest answer: not always. I use it for business logic and bug fixes - write a test that
    reproduces the bug first, then fix it - so the bug never comes back.

Q2: Benefits of TDD?
A2: Better design (code must be testable), high coverage naturally, safe refactoring and
    fast feedback. Downside is slower start and it is harder for exploratory work.
*/
