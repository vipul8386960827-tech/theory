/* 3_operational_vs_programmer_errors.js

=====================================================
Operational Errors vs Programmer Errors
=====================================================

Definition (What I should say in the interview):
- "**Operational errors** are expected runtime problems that can happen even in correct code -
   like a DB timeout, invalid user input, file not found or a 3rd party API being down. We
   handle them gracefully and return a proper response. **Programmer errors** are bugs in our
   code - like reading a property of undefined or calling a function with wrong arguments.
   Those cannot be handled meaningfully at runtime, so the right move is to log, crash and
   let a process manager restart the app, then fix the code."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect          | Operational Error                  | Programmer Error                  |
|-----------------|------------------------------------|-----------------------------------|
| Cause           | Environment / user / network       | Bug in our code                   |
| Examples        | ECONNREFUSED, 404, validation fail | TypeError, ReferenceError         |
| Predictable?    | Yes, we can anticipate them        | No                                |
| How to handle   | Retry, fallback, send 4xx/5xx      | Log, crash, restart, fix the code |
| User message    | Meaningful ("Email already used")  | Generic "Something went wrong"    |

-----------------------------------------------------
Example (marking errors with isOperational)
-----------------------------------------------------
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // we created it on purpose
  }
}

// Error middleware decides based on the flag
app.use((err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({ status: 'fail', message: err.message });
  }
  console.error('BUG:', err);  // programmer error or unknown
  res.status(500).json({ status: 'error', message: 'Something went wrong' });
});

// Operational: user not found -> next(new AppError('User not found', 404))
// Programmer:  user.profile.name when user is undefined -> TypeError

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- A programmer error inside a request does not always need a full crash - Express catches sync
  errors per request. But an uncaughtException means state is unknown -> exit.
- Do not show internal error details (stack, SQL) to clients for non-operational errors.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not just catch programmer errors and keep running?
A1: Because the app may be in a corrupted state (half-updated objects, leaked connections).
    Restarting with a clean state is safer, and PM2/Kubernetes restart it in seconds.

Q2: Is a validation error operational?
A2: Yes - bad user input is expected. We respond with 400 and a clear message.

Q3: How do you tell them apart in code?
A3: Use custom error classes with an isOperational flag; anything without the flag is treated as a bug.
*/
