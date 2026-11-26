/* 3_is_node_a_language_framework_or_runtime.js

=====================================================
Is Node.js a Language, a Framework, or a Runtime?
=====================================================

Definition (What I should say in the interview):
- "Node.js is a **runtime environment**, not a language and not a framework. The language
   is JavaScript. Frameworks like **Express, NestJS, Fastify** are built on top of Node.js."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Language**  -> JavaScript (syntax and rules, defined by ECMAScript).
2. **Runtime**   -> Node.js (executes JS, gives server APIs like fs, http).
3. **Framework** -> Express / NestJS / Koa (give structure: routing, middleware).
4. Node.js gives low-level building blocks; frameworks make building apps faster.

-----------------------------------------------------
Example
-----------------------------------------------------
// Pure Node.js (runtime only) - manual routing
require('http').createServer((req, res) => {
  if (req.url === '/users') res.end('users');
}).listen(3000);

// Express (framework on top of Node)
const app = require('express')();
app.get('/users', (req, res) => res.send('users'));
app.listen(3000);

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Saying "Node.js is a backend framework" or "Node.js is a language" - both are wrong.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Then what is Express?
A1: A minimal web framework built on top of Node's http module.

Q2: Library vs framework?
A2: You call a library; a framework calls your code (inversion of control).
*/
