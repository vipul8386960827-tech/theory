/* 5_error_handling_middleware.js

=====================================================
Error Handling Middleware
=====================================================

Definition (What I should say in the interview):
- "Error-handling middleware is a special middleware with **four arguments: (err, req, res,
   next)**. Express recognises it by the argument count, so even if I don't use next I still
   have to declare it. It must be registered **after all routes**, and it runs whenever a
   handler calls next(err) or throws synchronously. In my projects I keep one centralized error
   handler that maps custom error classes to status codes and hides stack traces in production."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Signature must have exactly 4 params, otherwise it's treated as normal middleware.
2. Register it last - after routes and the 404 handler.
3. Sync throw -> caught automatically. Async errors in Express 4 -> must call next(err).
4. Express 5 -> rejected promises / async throws are forwarded automatically.
5. If headers are already sent, delegate to the default handler: return next(err).

-----------------------------------------------------
Example (custom error class + central handler)
-----------------------------------------------------
const express = require('express');
const app = express();

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Express 4 helper to forward async errors
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = null; // await User.findById(req.params.id)
  if (!user) throw new AppError('User not found', 404);
  res.json(user);
}));

app.use((req, res, next) => next(new AppError(`Route ${req.originalUrl} not found`, 404)));

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.isOperational ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

app.listen(3000);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Writing (err, req, res) with 3 args -> Express thinks it's a normal middleware.
- Putting the error handler before routes -> it never receives their errors.
- Unhandled promise rejection in Express 4 async handler -> request hangs.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you have multiple error handlers?
A1: Yes - e.g. one that logs then calls next(err), and a final one that sends the response.

Q2: What does express-async-errors do?
A2: It patches Express 4 so async errors go to error middleware without wrapping each handler.
*/
