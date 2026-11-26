/* 22_sql_and_nosql_injection.js

=====================================================
SQL and NoSQL Injection
=====================================================

Definition (What I should say in the interview):
- "Injection happens when user input is treated as part of a query instead of as data. In SQL,
   concatenating input into a query string lets an attacker add things like ' OR '1'='1. The
   fix is **parameterized queries** or an ORM. In MongoDB the classic attack is sending an
   **operator object** instead of a string, like { "$gt": "" } as the password, which matches
   any value. The fix is to **validate types**, cast input to strings, and strip keys starting
   with $ using a sanitizer."

-----------------------------------------------------
Example (SQL - vulnerable vs safe)
-----------------------------------------------------
// VULNERABLE
const q = `SELECT * FROM users WHERE email = '${req.body.email}'`;
// email = "' OR '1'='1" -> returns all users

// SAFE - parameterized (pg)
const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
// mysql2: pool.execute('SELECT * FROM users WHERE email = ?', [email])

-----------------------------------------------------
Example (NoSQL - vulnerable vs safe)
-----------------------------------------------------
// Attacker sends JSON body:
// { "email": "admin@site.com", "password": { "$gt": "" } }
// or query string: ?email[$ne]=x  (qs parser turns it into an object)

// VULNERABLE (plain-text compare, typical in tutorials)
User.findOne({ email: req.body.email, password: req.body.password });

// SAFE
const { email, password } = req.body;
if (typeof email !== 'string' || typeof password !== 'string') {
  return res.status(400).json({ message: 'Invalid input' });
}
const user = await User.findOne({ email: String(email) });   // then bcrypt.compare

// Global sanitizer middleware: removes keys starting with $ or containing dots
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
// Mongoose: mongoose.set('sanitizeFilter', true) wraps filters with $eq

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Never use $where or eval-like features with user input (server-side JS execution).
- ORMs are safe by default but raw query helpers (sequelize.query, knex.raw) with string
  concatenation are still vulnerable.
- Use a least-privilege DB user, so even a successful injection cannot drop tables.
- Validation with joi/zod at the edge rejects unexpected object shapes early.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is MongoDB immune to injection because it has no SQL?
A1: No. Operator injection ($gt, $ne, $regex) and $where are real attacks.

Q2: Why does parameterization work?
A2: The query structure is sent separately from the values, so the DB never parses input as code.

Q3: Can you parameterize table or column names?
A3: No - whitelist allowed names (e.g. sort fields) in code.
*/
