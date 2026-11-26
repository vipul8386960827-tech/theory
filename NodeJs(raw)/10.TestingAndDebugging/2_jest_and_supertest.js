/* 2_jest_and_supertest.js

=====================================================
Jest and Supertest
=====================================================

Definition (What I should say in the interview):
- "**Jest** is a JavaScript test framework that gives you the test runner, assertions with
   expect, mocking with jest.fn and jest.mock, and coverage out of the box. **Supertest** is a
   library for testing HTTP servers - I pass it my Express app and it sends real HTTP requests
   to it without me having to call app.listen() or pick a port. Together they are the most
   common setup I have used for testing Node REST APIs."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Jest: describe / test (or it) / expect, matchers like toBe, toEqual, toHaveBeenCalledWith.
2. Jest runs each test file in its own isolated module registry; files run in parallel workers.
3. Supertest: request(app).get('/path').set(headers).send(body) -> returns a promise.
4. Export the app separately from server.listen() so tests can import it without opening a port.
5. Run with "npx jest" or an npm script "test": "jest".

-----------------------------------------------------
Example
-----------------------------------------------------
// app.js
const express = require('express');
const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.post('/users', (req, res) => {
  if (!req.body.email) return res.status(400).json({ error: 'email required' });
  res.status(201).json({ id: 1, email: req.body.email });
});
module.exports = app;            // server.js does app.listen(3000)

// tests/app.test.js
const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('POST /users without email -> 400', async () => {
    await request(app).post('/users').send({}).expect(400);
  });
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- toBe uses Object.is (for primitives); toEqual does deep equality (for objects/arrays).
- Always await (or return) the Supertest promise, otherwise the test ends before the request.
- "Jest did not exit" warning -> usually an open DB connection or server; close it in afterAll.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not call app.listen() in tests?
A1: Supertest binds the app to an ephemeral port internally, so no port conflicts between
    parallel test files and nothing left listening after tests.

Q2: How do you test a protected route?
A2: Generate a valid token in the test (or mock the auth middleware) and send it with
    .set('Authorization', 'Bearer ' + token).

Q3: How do you run a single test?
A3: npx jest path/to/file, or use test.only / jest -t "test name".
*/
