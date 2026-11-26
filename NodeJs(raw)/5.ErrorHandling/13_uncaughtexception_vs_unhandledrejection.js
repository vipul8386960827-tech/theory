/* 13_uncaughtexception_vs_unhandledrejection.js

=====================================================
uncaughtException vs unhandledRejection
=====================================================

Definition (What I should say in the interview):
- "Both are process-level safety nets for errors nobody handled. **uncaughtException** is for
   errors that are **thrown** synchronously (including inside callbacks and timers) and never
   caught. **unhandledRejection** is for **promises that reject without a .catch()**. Since
   Node 15 both crash the process by default. In a real app I register both at startup, log the
   error with full details, and exit - and I treat each occurrence as a bug to fix, not as
   normal error handling."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect            | uncaughtException            | unhandledRejection                |
|-------------------|------------------------------|-----------------------------------|
| Trigger           | throw with no try/catch      | rejected promise with no handler  |
| Listener args     | (err, origin)                | (reason, promise)                 |
| Value type        | Usually an Error             | Anything (string, object, Error)  |
| Default behavior  | Print stack, exit code 1     | Node 15+: throw -> crash          |
| After handling    | Exit immediately (sync)      | Can close server, then exit       |

Note: if there is NO unhandledRejection listener, Node 15+ re-raises the rejection as an
uncaught exception, so uncaughtException fires with origin === 'unhandledRejection'.

-----------------------------------------------------
Example (both together in the entry file)
-----------------------------------------------------
process.on('uncaughtException', (err, origin) => {
  console.error(`[${origin}]`, err);
  process.exit(1);
});

const app = require('./app');
const server = app.listen(process.env.PORT || 3000);

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  server.close(() => process.exit(1));
});

// Triggers:
// setTimeout(() => { null.x; });           -> uncaughtException
// Promise.reject(new Error('oops'));        -> unhandledRejection

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Neither should be used for business logic - handle errors close to where they happen.
- The uncaughtException handler is registered before requiring the app so startup errors are logged.
- Use a real logger and make sure the log is flushed before exit.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the origin argument in uncaughtException?
A1: It tells whether the error came from a normal throw ('uncaughtException') or from an
    unhandled promise rejection re-raised by Node ('unhandledRejection').

Q2: Which one is more common in modern codebases?
A2: unhandledRejection - most code is async/await, and a missing await or try/catch is easy to miss.

Q3: Should I exit on unhandledRejection too?
A3: Yes, Node's own default is to crash; my handler only adds logging and a graceful close.
*/
