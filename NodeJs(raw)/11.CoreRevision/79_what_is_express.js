/* 1_what_is_express.js

=====================================================
What is Express.js?
=====================================================

Definition (What I should say in the interview):
- "Express is a **minimal and unopinionated web framework** built on top of Node's core http
   module. It gives us routing, a middleware pipeline, and helper methods on req and res like
   res.json() and req.params, so we don't have to parse URLs or set headers by hand. Because it
   is unopinionated, it doesn't force any folder structure or ORM - we pick what we need.
   In my projects I've used it mainly to build REST APIs on top of MongoDB or PostgreSQL."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Built on top of http.createServer() -> app is actually a request handler function.
2. Core features: routing, middleware, request/response helpers, template engine support.
3. Unopinionated -> no enforced structure (unlike NestJS).
4. Huge ecosystem of middleware: cors, helmet, morgan, multer, express-session, etc.
5. Current major versions: Express 4 (most existing code) and Express 5 (stable since 2024).

-----------------------------------------------------
Example (minimal server)
-----------------------------------------------------
const express = require('express');
const app = express();

app.use(express.json());              // parse JSON bodies

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: Date.now(), name });
});

app.listen(3000, () => console.log('Server running on port 3000'));

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- app.listen() internally does http.createServer(app).listen(...) and returns the http.Server.
- Express itself is single-threaded like Node; it does not add concurrency on its own.
- "Minimal" means things like validation, auth, and DB access are added via libraries.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why use Express instead of the plain http module?
A1: Routing, middleware, body parsing and response helpers save a lot of boilerplate and
    make code easier to organize and maintain.

Q2: What does "unopinionated" mean?
A2: Express doesn't dictate project structure, ORM, or patterns - the team decides.

Q3: What does app.listen() return?
A3: A Node http.Server instance - useful for graceful shutdown (server.close()) or attaching socket.io.
*/
