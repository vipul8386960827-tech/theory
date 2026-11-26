/* 5_unhandled_rejection.js

=====================================================
unhandledRejection
=====================================================

Definition (What I should say in the interview):
- "**unhandledRejection** fires when a promise is rejected and no .catch() or try/catch handles it.
   Before Node 15 it only printed a warning, but **since Node 15 the default mode is
   --unhandled-rejections=throw**, so it is raised as an uncaught exception and the process
   crashes. In production I register a process-level handler to log the error and shut down
   gracefully, but the real fix is to always handle promises where they are created."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Handler signature -> process.on('unhandledRejection', (reason, promise) => {}).
2. reason may not be an Error (someone can reject with a string).
3. Node 15+ -> crash by default; older versions -> warning only.
4. Flag options: --unhandled-rejections=throw | strict | warn | none | warn-with-error-code.
5. Typical causes: missing await, missing .catch(), async event handlers.

-----------------------------------------------------
Example (graceful shutdown on unhandled rejection)
-----------------------------------------------------
const app = require('./app');
const server = app.listen(3000);

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION! Shutting down...', reason);
  // let in-flight requests finish, then exit
  server.close(() => process.exit(1));
  setTimeout(() => process.exit(1), 10000).unref(); // safety net
});

// Bug: nobody catches this
async function connectDB() {
  throw new Error('DB connection failed');
}
connectDB(); // -> unhandledRejection

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Writing the handler and NOT exiting -> hides bugs and leaves the app in a bad state.
- Attaching .catch() later (e.g. in a setTimeout) still triggers the event first,
  then 'rejectionHandled' fires.
- Difference from uncaughtException: here we can call server.close() first, because the
  rejection usually comes from a specific failed operation.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What changed in Node 15 regarding unhandled rejections?
A1: The default changed from "warn" to "throw" - an unhandled rejection now crashes the process
    with exit code 1, unless an unhandledRejection listener is registered.

Q2: If I add an unhandledRejection listener, does the process still crash?
A2: No, the listener replaces the default behavior. So I must call process.exit myself.

Q3: How do you avoid unhandled rejections in Express 4?
A3: Wrap async route handlers (catchAsync / express-async-errors) so rejections go to next(err).
*/
