/* 38_sql_databases_with_node.js

=====================================================
Using SQL Databases with Node.js
=====================================================

Definition (What I should say in the interview):
- "To use a SQL database like PostgreSQL or MySQL in Node, I use a driver such as **pg** or
   **mysql2**, usually through a **connection pool**, and optionally a query builder like Knex or
   an ORM like Prisma, Sequelize or TypeORM. The most important rule is to **always use
   parameterized queries** - placeholders like $1 or ? - and never concatenate user input into
   SQL, to prevent SQL injection. Schema changes are managed with **migrations**."

-----------------------------------------------------
Options
-----------------------------------------------------
| Layer          | Libraries                    | Notes                               |
|----------------|------------------------------|-------------------------------------|
| Driver         | pg, mysql2, better-sqlite3   | Raw SQL, fastest, full control      |
| Query builder  | Knex, Kysely                 | JS API for SQL, migrations (Knex)   |
| ORM            | Prisma, Sequelize, TypeORM   | Models, relations, type safety      |

-----------------------------------------------------
Example (pg with pool + parameterized query + transaction)
-----------------------------------------------------
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });

// Parameterized (safe)
const { rows } = await pool.query('SELECT id, name FROM users WHERE email = $1', [email]);

// NEVER do this (SQL injection)
// pool.query(`SELECT * FROM users WHERE email = '${email}'`);

// Transaction: same client for all statements
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amt, fromId]);
  await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amt, toId]);
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();                       // return connection to the pool
}

// mysql2 uses ? placeholders
const [rows2] = await mysqlPool.execute('SELECT * FROM products WHERE id = ?', [id]);

// Prisma
const user = await prisma.user.findUnique({ where: { email }, include: { orders: true } });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Placeholders cannot be used for identifiers (table/column names); whitelist those values.
- Run migrations (Prisma migrate, Knex migrate, Sequelize CLI) in CI/CD, not by hand.
- A transaction must run on ONE client from the pool; pool.query may use different connections.
- Watch out for N+1 with ORM lazy loading; use include/JOINs.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How does a parameterized query prevent SQL injection?
A1: SQL text and values are sent separately; the DB treats values only as data, never as SQL
    code, so input like ' OR 1=1 -- cannot change the query.

Q2: Why might you choose raw SQL over an ORM?
A2: Complex reports, performance tuning, or DB-specific features (CTEs, window functions)
    where generated queries are inefficient or hard to express.
*/
