/* 6_custom_error_classes.js

=====================================================
Custom Error Classes
=====================================================

Definition (What I should say in the interview):
- "A custom error class is a class that **extends the built-in Error** and adds extra fields like
   statusCode, error code or isOperational. It lets me throw meaningful errors such as
   NotFoundError or ValidationError from any layer, and my central error handler can check
   **instanceof** or the fields to build the right HTTP response. It keeps the stack trace and
   removes repeated res.status().json() code from controllers."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Always call super(message) -> sets message and stack.
2. Set this.name = this.constructor.name -> logs show "NotFoundError" instead of "Error".
3. Error.captureStackTrace(this, this.constructor) -> hides the constructor frame from the stack.
4. Build a small hierarchy: AppError -> NotFoundError, ValidationError, AuthError.
5. Use instanceof or a code field to branch in the handler.

-----------------------------------------------------
Example
-----------------------------------------------------
class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class ValidationError extends AppError {
  constructor(details) {
    super('Invalid input data', 400, 'VALIDATION_ERROR');
    this.details = details; // e.g. [{ field: 'email', msg: 'required' }]
  }
}

// Service layer
async function getUser(id) {
  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User');
  return user;
}

// In the error handler
// if (err instanceof ValidationError) res.status(400).json({ errors: err.details });

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Forgetting super() -> "Must call super constructor" ReferenceError.
- Throwing plain objects { status: 404 } -> no stack trace, instanceof Error fails.
- Too many tiny classes - a few generic ones plus a code field is usually enough.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why set this.name?
A1: By default name is "Error". Setting it makes logs and err.toString() show the real class name.

Q2: instanceof vs checking err.code?
A2: instanceof works within one codebase. A code string also survives serialization (e.g. across
    services or in JSON logs), so I often use both.

Q3: Can you pass the original error as the cause?
A3: Yes, since Node 16.9: new AppError('DB failed', { cause: err }) if the constructor forwards
    options to super, so the original error is kept for debugging.
*/
