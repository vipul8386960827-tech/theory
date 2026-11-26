/* 2_middleware.js

=====================================================
Middleware in Express
=====================================================

Definition (What I should say in the interview):
- "A middleware is just a **function with access to req, res and next** that runs during the
   request-response cycle. Express is basically a pipeline of middleware - each one can read or
   modify the request, end the response, or call next() to pass control to the next one. We use
   it for cross-cutting concerns like logging, parsing the body, authentication and error
   handling, so that route handlers stay focused on business logic."

-----------------------------------------------------
What a middleware can do
-----------------------------------------------------
1. Execute any code (logging, timing, metrics).
2. Modify req / res (e.g. attach req.user after verifying a JWT).
3. End the request-response cycle (res.status(401).json(...)).
4. Call next() to move on, or next(err) to jump to error middleware.

-----------------------------------------------------
Example (logger + auth middleware)
-----------------------------------------------------
const express = require('express');
const app = express();

// Application-level: runs for every request
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`);
  });
  next();
});

// Reusable auth middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  req.user = { id: 1, role: 'admin' }; // normally decoded from JWT
  next();
}

// Route-level: only for this route
app.get('/profile', requireAuth, (req, res) => res.json(req.user));

app.listen(3000);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Forgetting to call next() and not sending a response -> request hangs until timeout.
- Calling next() AND sending a response -> "Cannot set headers after they are sent" error.
- Not using "return" before res.status(...).json(...) inside an if, so code keeps running.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is a route handler also a middleware?
A1: Yes, technically. It's just the last function in the chain and usually ends the response.

Q2: How do you pass data between middlewares?
A2: Attach it to req (req.user) or to res.locals, which is meant for per-request data.

Q3: Can you apply multiple middlewares to one route?
A3: Yes - app.get('/x', mw1, mw2, handler) or pass an array [mw1, mw2].
*/
