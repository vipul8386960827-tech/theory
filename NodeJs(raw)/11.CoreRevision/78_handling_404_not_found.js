/* 17_handling_404_not_found.js

=====================================================
Handling 404 Not Found
=====================================================

Definition (What I should say in the interview):
- "There are two kinds of 404 in an API. The first is an **unknown route** - no route matched the
   URL. I handle it with a **catch-all middleware placed after all routes and before the error
   handler**, which creates a 404 error and passes it to next(). The second is a **valid route but
   missing resource**, like GET /users/123 when that user does not exist - there the controller
   itself returns a 404. Note that Express does not treat a 404 as an error; by default it just
   sends 'Cannot GET /path'."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Order matters: routes -> 404 handler -> error handler.
2. 404 handler is NORMAL middleware (3 args), not error middleware.
3. Forward to the central handler with next(new AppError(..., 404)) for a consistent response shape.
4. Express 4 wildcard: app.all('*', ...). Express 5: app.all('/*splat', ...) or simply app.use(...).
5. Resource-not-found inside controllers -> also 404, but with a specific message.

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);

// 1. Unknown route -> runs only if nothing above responded
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server`, 404));
});

// 2. Missing resource inside a controller
// const user = await User.findById(id);
// if (!user) return next(new AppError('No user found with that ID', 404));

// 3. Central error handler (last)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ status: 'fail', message: err.message });
});

app.listen(3000);

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Placing the 404 handler at the top -> every request returns 404.
- Using app.get('*') only -> POST/PUT to unknown routes are not covered; use app.use or app.all.
- Returning 404 for a route that exists but user is not allowed -> should be 403 (or 404
  intentionally, to hide existence - but be consistent).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is the 404 handler not error middleware?
A1: Because no error happened - nothing matched. It is a normal middleware that creates the error.

Q2: How does Express know no route matched?
A2: It does not "know" - middleware runs in order, and if no route sends a response, the request
    falls through to the next middleware, which is our 404 handler.

Q3: 404 vs 400?
A3: 404 = resource or route does not exist; 400 = request is malformed or invalid (e.g. bad ID format).
*/
