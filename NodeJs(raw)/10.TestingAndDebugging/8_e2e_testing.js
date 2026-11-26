/* 8_e2e_testing.js

=====================================================
End-to-End (E2E) Testing
=====================================================

Definition (What I should say in the interview):
- "End-to-end testing checks the whole system the way a real user or client would use it -
   the actual running server, real database, and sometimes the frontend in a browser. Instead
   of testing one function, it tests a complete flow like 'sign up -> log in -> place order'.
   For a backend, E2E usually means hitting the deployed or locally started API over HTTP;
   for full-stack apps we use tools like **Playwright** or **Cypress**."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Nothing mocked inside the system; only truly external things (payment gateway) may be sandboxed.
2. Runs against a real environment: docker-compose locally, or a staging environment.
3. Tools: Playwright, Cypress (browser); Jest/Supertest or Postman/Newman (API level).
4. Keep them few and focused on critical business journeys.
5. Need clean, seeded test data and a reset strategy between runs.

-----------------------------------------------------
Example (API-level E2E against a running server)
-----------------------------------------------------
// tests/e2e/checkout.e2e.test.js
const request = require('supertest');
const BASE = process.env.E2E_URL || 'http://localhost:3000';

test('user can sign up, log in and place an order', async () => {
  const email = `e2e_${Date.now()}@test.com`;
  await request(BASE).post('/auth/signup').send({ email, password: 'Secret123' }).expect(201);

  const login = await request(BASE).post('/auth/login').send({ email, password: 'Secret123' });
  const token = login.body.token;

  const order = await request(BASE)
    .post('/orders')
    .set('Authorization', `Bearer ${token}`)
    .send({ productId: 'p1', qty: 1 })
    .expect(201);

  expect(order.body.status).toBe('PLACED');
});

// Browser E2E (Playwright)
// await page.goto('http://localhost:3000/login');
// await page.fill('#email', email); await page.click('text=Login');
// await expect(page.locator('h1')).toHaveText('Dashboard');

-----------------------------------------------------
Common Mistakes / Notes
-----------------------------------------------------
- Flaky tests from fixed sleeps -> wait for conditions/responses instead.
- Tests depending on each other's data -> each test should create what it needs.
- Running E2E against production data -> use isolated staging/test environments.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between integration and E2E tests?
A1: Integration tests a few modules together (often in-process with Supertest and an
    in-memory DB); E2E tests the fully deployed system as a black box from outside.

Q2: How do you handle flaky E2E tests?
A2: Find the root cause (timing, shared data, unstable env), use proper waits, isolate data,
    and only as a last resort add retries - and track flaky tests instead of ignoring them.
*/
