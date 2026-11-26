/* 7_testing_pyramid.js

=====================================================
Testing Pyramid
=====================================================

Definition (What I should say in the interview):
- "The testing pyramid is a guideline for how to balance different kinds of tests. At the
   bottom you have **many unit tests** because they are fast and cheap, in the middle a smaller
   number of **integration tests**, and at the top only a **few end-to-end tests** because they
   are slow, expensive and more flaky. The idea is to catch most bugs as low and as early as
   possible, and use E2E only for the critical user journeys."

-----------------------------------------------------
The Pyramid
-----------------------------------------------------
            /  E2E   \           few     - slow, realistic, flaky
           / Integration \       some    - API + DB together
          /     Unit      \      many    - fast, isolated

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Moving up: more confidence per test, but slower, costlier and harder to debug.
2. Moving down: faster feedback, easier to pinpoint failure, but less realistic.
3. Rough split often quoted: ~70% unit, ~20% integration, ~10% E2E (not a strict rule).
4. Anti-pattern "ice cream cone": mostly manual/E2E tests and very few unit tests.
5. For backend APIs, some teams prefer the "testing trophy" - more weight on integration
   tests, since route-level tests with a test DB give high confidence at reasonable cost.

-----------------------------------------------------
Example (how it maps to a Node API project)
-----------------------------------------------------
// Unit        -> tests/unit: services, validators, utils (jest, mocks)
// Integration -> tests/integration: Supertest + mongodb-memory-server
// E2E         -> tests/e2e: running app + real dependencies, or Playwright/Cypress for UI

// package.json
"scripts": {
  "test:unit": "jest tests/unit",
  "test:int":  "jest tests/integration --runInBand",
  "test:e2e":  "jest tests/e2e",
  "test":      "npm run test:unit && npm run test:int"
}

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- In CI, run unit tests on every push, integration on every PR, E2E before deploy/nightly.
- The pyramid is about cost and feedback speed, not about which test type is "better".

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not just write E2E tests for everything?
A1: They are slow, flaky (network, timing), and when they fail it is hard to know which layer
    broke. The suite becomes too slow to run on every change.

Q2: What is the testing trophy?
A2: A model (Kent C. Dodds) with static checks (lint/types) at the base and the biggest
    layer being integration tests - it fits well for APIs and UI apps.
*/
