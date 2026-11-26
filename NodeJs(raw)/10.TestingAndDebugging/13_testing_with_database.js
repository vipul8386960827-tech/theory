/* 13_testing_with_database.js

=====================================================
Testing with a Database
=====================================================

Definition (What I should say in the interview):
- "For unit tests I mock the database layer, but for integration tests I want real queries
   to run, so I use a separate test database. With MongoDB I like **mongodb-memory-server**,
   which starts a real MongoDB instance in memory for the test run - no setup, no risk to dev
   data. For SQL databases I use a dedicated test DB, often in Docker or Testcontainers, run
   migrations once, and clean the tables between tests so each test is independent."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Never run tests against dev or production databases.
2. Options: in-memory server (mongodb-memory-server), Docker test DB, Testcontainers, SQLite.
3. Connect once in beforeAll, clean data in beforeEach/afterEach, disconnect in afterAll.
4. Seed only the data each test needs (factories / fixtures).
5. Run DB test files with --runInBand if they share one database, to avoid race conditions.

-----------------------------------------------------
Example (Mongoose + mongodb-memory-server + Supertest)
-----------------------------------------------------
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

afterEach(async () => {
  await User.deleteMany({});           // clean state between tests
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

test('POST /users stores user in DB', async () => {
  await request(app).post('/users').send({ email: 'a@b.com' }).expect(201);
  const saved = await User.findOne({ email: 'a@b.com' });
  expect(saved).not.toBeNull();
});

-----------------------------------------------------
SQL alternative
-----------------------------------------------------
- Use a transaction per test and roll it back at the end (fast cleanup), or TRUNCATE tables.
- Prisma / Knex / Sequelize: point DATABASE_URL to the test DB via .env.test.

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- App connects to the real DB on import -> make the connection configurable by env.
- Not closing connections -> "Jest did not exit one second after the test run".
- Tests relying on order of execution or leftover data.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not just mock Mongoose everywhere?
A1: Mocks can't catch wrong queries, schema validation, indexes or unique constraints;
    a real (in-memory) DB does.

Q2: Downside of SQLite instead of Postgres in tests?
A2: SQL dialect and behaviour differ, so tests may pass but production fails. Prefer the
    same engine as production, e.g. Postgres in Docker.
*/
