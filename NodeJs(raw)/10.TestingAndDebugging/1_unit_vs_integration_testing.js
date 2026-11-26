/* 1_unit_vs_integration_testing.js

=====================================================
Unit Testing vs Integration Testing
=====================================================

Definition (What I should say in the interview):
- "A **unit test** checks one small piece of code - usually a single function or class - in
   isolation, with its dependencies like the database or external APIs mocked out. An
   **integration test** checks that several pieces work together correctly, for example an
   Express route + service + real (test) database. Unit tests are fast and pinpoint bugs
   exactly; integration tests are slower but catch problems in the wiring between modules."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Unit -> one function, no network/DB/file system, runs in milliseconds.
2. Integration -> multiple layers together (route -> controller -> service -> DB).
3. Unit tests mock dependencies; integration tests use real or in-memory versions of them.
4. In a typical Node API: unit test business logic (services, utils), integration test routes.

-----------------------------------------------------
Example
-----------------------------------------------------
// utils/price.js
function applyDiscount(price, percent) {
  if (percent < 0 || percent > 100) throw new Error('Invalid percent');
  return price - (price * percent) / 100;
}
module.exports = { applyDiscount };

// Unit test - pure function, nothing external
test('applies 10% discount', () => {
  expect(applyDiscount(200, 10)).toBe(180);
});

// Integration test - real Express app + test DB through HTTP
const request = require('supertest');
const app = require('../app');
test('POST /orders saves an order', async () => {
  const res = await request(app).post('/orders').send({ productId: 'p1', qty: 2 });
  expect(res.status).toBe(201);
  expect(res.body.qty).toBe(2);
});

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect        | Unit                     | Integration                   |
|---------------|--------------------------|-------------------------------|
| Scope         | single function/module   | several modules together      |
| Dependencies  | mocked                   | real or in-memory             |
| Speed         | very fast                | slower                        |
| Failure tells | exactly which function   | something in the flow broke   |
| Quantity      | many                     | fewer                         |

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Mocking so much in "integration" tests that they become unit tests and miss real bugs
  (wrong query, missing middleware, bad JSON parsing).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which one do you write more of?
A1: More unit tests because they are cheap and fast, plus integration tests for the important
    API flows like auth, create order, payment.

Q2: Is testing an Express route with Supertest unit or integration?
A2: Usually integration, because it goes through middleware, routing and the controller together.
*/
