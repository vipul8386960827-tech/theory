/* 42_refactor_legacy_callback_code.js

=====================================================
Scenario: Refactor legacy callback-hell code with no tests
=====================================================

The Question (how the interviewer asks it):
- "You join a team and inherit an old Node service full of nested callbacks
   and no tests. It works in production. How do you refactor it safely?"

What the interviewer is checking:
- Do you protect current behavior before changing code?
- Do you know characterization tests?
- Do you know util.promisify, fs/promises and async/await?
- Do you work in small, safe, reviewable steps?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Understand first. Read the code, find the main flows and the most
   critical/most changed files. Do not rewrite everything at once.
2. Write characterization tests: tests that record what the code does now
   (even strange behavior), usually at the API level with supertest. They
   are my safety net.
3. Set up basic tooling: ESLint, Prettier, CI running the tests.
4. Convert step by step: use util.promisify or the built-in promise APIs
   (fs/promises, timers/promises), then rewrite one function with
   async/await.
5. Keep the same public interface at first. If other code still expects a
   callback, keep a small wrapper (util.callbackify) until all callers move.
6. Fix error handling: callback code often ignores `err` or calls the
   callback twice. With async/await, use try/catch and one error handler.
7. Small PRs, one module at a time, run tests after each step, deploy often
   and watch error rates. Behavior changes go in separate PRs.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BEFORE: callback hell, errors easy to miss
function getReport(userId, cb) {
  db.getUser(userId, (err, user) => {
    if (err) return cb(err);
    db.getOrders(user.id, (err, orders) => {
      if (err) return cb(err);
      fs.readFile('./template.html', 'utf8', (err, tpl) => {
        if (err) return cb(err);
        cb(null, render(tpl, { user, orders }));
      });
    });
  });
}

// AFTER: same behavior, async/await
const { promisify } = require('node:util');
const { readFile } = require('node:fs/promises');
const getUser = promisify(db.getUser.bind(db));
const getOrders = promisify(db.getOrders.bind(db));

async function getReportAsync(userId) {
  const user = await getUser(userId);
  const [orders, tpl] = await Promise.all([        // independent -> parallel
    getOrders(user.id),
    readFile('./template.html', 'utf8'),
  ]);
  return render(tpl, { user, orders });
}

// Keep old callers working during migration
const getReport = require('node:util').callbackify(getReportAsync);

// Characterization test written BEFORE the refactor
test('report output stays the same', async () => {
  const html = await promisify(getReport)(42);
  expect(html).toMatchSnapshot();
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I would not start by rewriting. First I write characterization tests,
   mostly API-level tests with supertest, that capture what the code does
   today. Then I refactor in small steps: promisify callback functions or use
   the built-in promise APIs, rewrite one function at a time with
   async/await, and keep a callbackify wrapper for old callers. Each step is
   a small PR with tests passing, and I deploy often and watch errors."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "I would rewrite the whole service from scratch."
- Refactoring with no tests, so you cannot know if behavior changed.
- Mixing refactoring and new features/bug fixes in one huge PR.
- Promisifying a method without .bind() and losing `this`.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is a characterization test?
A1: A test that records the current behavior of existing code, not the
    "correct" behavior. It protects you from changing behavior by accident.

Q2: When does util.promisify not work directly?
A2: When the callback is not the standard (err, value) last argument, when
    the callback gets several values, or when the function is a method that
    needs `this` (then use .bind). Functions can also define
    util.promisify.custom.

Q3: Is sequential await always the right conversion?
A3: No. If calls do not depend on each other, use Promise.all to run them in
    parallel, or the refactor can make the code slower.
*/
