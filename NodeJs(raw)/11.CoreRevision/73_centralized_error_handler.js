/* 7_centralized_error_handler.js

=====================================================
Centralized Error Handler (Express Error Middleware)
=====================================================

Definition (What I should say in the interview):
- "A centralized error handler is **one Express middleware with four arguments (err, req, res,
   next)** that is registered **after all routes**. Controllers and services do not format error
   responses themselves - they just throw or call next(err), and this one place decides the
   status code, the response shape and the logging. This gives a consistent API response and
   avoids duplicated try/catch-and-respond code in every route."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Express recognizes error middleware ONLY by its 4 parameters - keep next even if unused.
2. Register it LAST (after routes and the 404 handler).
3. Reach it with next(err) or by throwing synchronously in a route.
4. Calling next(err) skips all normal middleware and goes to error middleware.
5. If headers are already sent, delegate to Express default: return next(err).

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new AppError('User not found', 404));
    res.json(user);
  } catch (err) {
    next(err); // forward to the central handler
  }
});

// ---- registered after all routes ----
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const statusCode = err.statusCode || 500;
  logger.error({ err, path: req.originalUrl, method: req.method });

  res.status(statusCode).json({
    status: statusCode < 500 ? 'fail' : 'error',
    message: err.isOperational ? err.message : 'Something went wrong',
  });
}
app.use(errorHandler);

app.listen(3000);

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Writing (err, req, res) with 3 args -> Express treats it as normal middleware, never called with errors.
- Registering it before routes -> it never receives their errors.
- Calling next('some string') -> works but you lose the stack; always pass an Error.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you have more than one error middleware?
A1: Yes, they run in order. E.g. one to log, one to convert DB errors to AppError, one to respond.
    Each passes on with next(err).

Q2: What happens if no error middleware is defined?
A2: Express uses its built-in handler: responds 500 with the stack trace in development
    and just the status text when NODE_ENV=production.

Q3: Does throwing in an async route reach this handler?
A3: In Express 4 no - the promise rejection is not caught, so I need try/catch + next, a wrapper,
    or express-async-errors. In Express 5 yes, it is forwarded automatically.
*/
