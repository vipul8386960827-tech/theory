/* 23_domain_module_deprecated.js

=====================================================
domain Module (Deprecated)
=====================================================

Definition (What I should say in the interview):
- "The **domain** module was an old Node API to group several async operations and catch any
   error from them in one place, a bit like a try/catch for async code. It has been **deprecated** for many years (since
   the early io.js/Node 4 days) and should not be used in new code, because it had hidden problems: it did not
   work reliably with promises and native modules, and catching an error with it encouraged
   keeping a process alive in an unknown state. Today we use **promises + async/await**,
   **process-level handlers** for crashes, and **AsyncLocalStorage** if we need per-request context."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Status -> Deprecated (pending removal); it still exists for backward compatibility.
2. Purpose was -> route errors from all async ops inside domain.run() to domain.on('error').
3. Problems -> implicit binding magic, unreliable with promises, performance overhead,
   and it hid errors that should crash the process.
4. Replacements:
   - Error handling -> async/await + try/catch, Express error middleware.
   - Crash safety  -> uncaughtException / unhandledRejection + process manager restart.
   - Request context (request id, user) -> AsyncLocalStorage (async_hooks).

-----------------------------------------------------
Example (old way - do not use)
-----------------------------------------------------
const domain = require('domain');
const d = domain.create();
d.on('error', (err) => console.error('Caught by domain:', err.message));
d.run(() => {
  setTimeout(() => { throw new Error('async boom'); }, 100);
});

-----------------------------------------------------
Example (modern replacement - AsyncLocalStorage for request context)
-----------------------------------------------------
const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto');
const als = new AsyncLocalStorage();

app.use((req, res, next) => {
  als.run({ requestId: randomUUID() }, next);
});

app.use((err, req, res, next) => {
  const { requestId } = als.getStore() || {};
  console.error(`[${requestId}]`, err);
  res.status(500).json({ message: 'Something went wrong', requestId });
});

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why was domain deprecated?
A1: It was fragile (did not cover all async boundaries like promises consistently), slowed things
    down, and its main use - catching errors to keep the process running - is unsafe.

Q2: Have you used domains?
A2: No, only seen it in legacy code or docs. In my projects I use async/await with a central
    error handler and AsyncLocalStorage when I need request-scoped data like a request id.

Q3: Is AsyncLocalStorage an error-handling tool?
A3: Not directly - it carries context across async calls, which is the useful part of what domains
    did. Error handling itself is done with try/catch and error middleware.
*/
