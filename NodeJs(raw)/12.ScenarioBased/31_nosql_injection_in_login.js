/* 31_nosql_injection_in_login.js

=====================================================
Scenario: Login Bypass With NoSQL Injection
=====================================================

The Question (how the interviewer asks it):
- "A tester logged in as admin by sending
   { "email": { "$ne": null }, "password": { "$ne": null } } to /login.
   How is that possible and how do you fix it?"

What the interviewer is checking:
- Understanding NoSQL injection (query operators coming from user input)
- Input validation with a schema library (zod / joi)
- Sanitization tools: Mongoose sanitizeFilter, express-mongo-sanitize
- Bonus: the same idea in SQL - parameterized queries

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify first: which DB and driver? How is the password checked - in the
   query itself, or with bcrypt after finding the user?
2. Explain: express.json() turns the body into objects, so email can be an
   object, not a string. { "$ne": null } means "not equal to null", which
   matches the first user - often the admin.
3. The login logic is also wrong if it puts the password in the query.
   Correct flow: find by email only, then bcrypt.compare() the password.
4. Validate input with zod or joi: email must be a string and a valid
   email, password must be a string. Reject anything else with 400.
5. Add a second layer: mongoose.set('sanitizeFilter', true), which wraps
   objects with $ keys in $eq. Or use express-mongo-sanitize, but check it
   supports your Express version (Express 5 made req.query read-only).
6. Avoid $where and $expr built from user input, and never pass req.query
   directly into find().
7. For SQL: never build queries with string concatenation; always use
   parameterized queries or an ORM, and give the DB user minimal permissions.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const { z } = require('zod');
const mongoose = require('mongoose');

mongoose.set('sanitizeFilter', true);        // global extra layer

// BAD: user input goes straight into the query
// const user = await User.findOne({ email: req.body.email, password: req.body.password });

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(128),
});

app.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid input' });
  }
  const { email, password } = parsed.data;   // guaranteed strings now

  const user = await User.findOne({ email }).select('+password');
  const ok = user && (await bcrypt.compare(password, user.password));
  if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

  issueTokens(res, user);
  res.json({ message: 'Logged in' });
});

// SQL version (pg) - BAD vs GOOD
// BAD:  db.query(`SELECT * FROM users WHERE email = '${email}'`);
// GOOD: db.query('SELECT * FROM users WHERE email = $1', [email]);

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "This is NoSQL injection: the JSON body lets the attacker send a MongoDB
   operator like $ne instead of a string, so the query matches any user. I
   fix it by validating input with zod so email and password must be
   strings, by finding the user only by email and checking the password with
   bcrypt, and by enabling Mongoose sanitizeFilter as a second layer. For SQL
   the same rule applies: always use parameterized queries."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "MongoDB has no SQL, so injection is impossible."
- Storing plain-text passwords and comparing them in the query.
- Relying only on a sanitizer package and skipping type validation.
- Escaping strings by hand for SQL instead of using parameters.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can the same attack happen with query strings?
A1: Yes. With the "qs" parser, ?email[$ne]=x becomes { email: { $ne: 'x' } }.
    Validate req.query too, or use the simple query parser.

Q2: Why does a parameterized query prevent SQL injection?
A2: The SQL text and the values are sent separately. The database treats
    the value only as data, never as SQL code, so "' OR 1=1 --" is just text.

Q3: What other injection types should a Node developer know?
A3: Command injection (child_process.exec with user input - use execFile
    with an argument array), XSS (escape output), and prototype pollution
    (block keys like __proto__ when merging objects).
*/
