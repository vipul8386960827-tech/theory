/* 9_server_crashes_on_unhandled_rejection.js

=====================================================
Scenario: Server Crashes on Unhandled Promise Rejection
=====================================================

The Question (how the interviewer asks it):
- "Our production server keeps crashing. The last log line says
  'UnhandledPromiseRejection'. How do you find the cause and handle it?"

What the interviewer is checking:
- Do you know that since Node 15, an unhandled rejection CRASHES the process
  by default (--unhandled-rejections=throw)?
- Can you find the ROOT CAUSE (a missing await / .catch) instead of hiding it?
- Do you know process.on('unhandledRejection') / 'uncaughtException' and
  that they are a LAST safety net, not the fix?
- Do you rely on a process manager (PM2, Docker, Kubernetes) to restart?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Read the stack trace in the logs. It usually points to the exact promise
   that rejected without a handler.
2. Fix the root cause: add `await` inside try/catch, or add `.catch()`.
   Common causes: "fire and forget" calls, async callbacks inside forEach,
   promises created but never awaited, missing error handling in Express.
3. Add a global `unhandledRejection` handler that LOGS the error with full
   details, then shuts down gracefully (close server, then exit(1)).
4. Add `uncaughtException` handler too. After it, the process state is
   unknown, so I always exit - I never "continue as normal".
5. Make sure a process manager (PM2 / Docker restart policy / K8s) restarts
   the app automatically and run more than one instance.
6. Prevent it in future: ESLint rules `no-floating-promises`
   (typescript-eslint) and `require-await`, plus alerts on crash count.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: promise is not awaited, rejection has no handler -> process crashes
app.post('/order', (req, res) => {
  sendInvoice(req.body);          // returns a promise, nobody catches it
  res.send('ok');
});

// GOOD: handle it where it happens
app.post('/order', async (req, res, next) => {
  try {
    await sendInvoice(req.body);
    res.send('ok');
  } catch (err) {
    next(err);
  }
});

// Fire-and-forget on purpose? Still attach a catch:
sendAnalytics(data).catch((err) => logger.error({ err }, 'analytics failed'));

// LAST safety net (in server.js)
const server = app.listen(3000);

function crash(type) {
  return (err) => {
    logger.fatal({ err }, `${type} - shutting down`);
    server.close(() => process.exit(1));
    setTimeout(() => process.exit(1), 10000).unref(); // force exit
  };
}
process.on('unhandledRejection', crash('unhandledRejection'));
process.on('uncaughtException', crash('uncaughtException'));

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Since Node 15, an unhandled rejection crashes the process, so first I
  read the stack trace and fix the real bug - usually a missing await or a
  missing .catch. Then I add a global unhandledRejection and
  uncaughtException handler that logs the error and shuts down gracefully,
  because the app may be in a bad state. A process manager like PM2 or
  Kubernetes restarts it, and I run several instances so users are not
  affected. Finally I add a lint rule for floating promises."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "I add process.on('unhandledRejection') and just log it, the server keeps
  running." This hides bugs and can leave the app in a broken state.
- Using `--unhandled-rejections=warn` or `none` in production to stop crashes.
- Wrapping everything in try/catch but leaving the catch block empty.
- Not having any auto-restart (no PM2 / Docker / K8s), so one crash = downtime.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between unhandledRejection and uncaughtException?
A1: unhandledRejection fires when a promise rejects and no handler is
    attached. uncaughtException fires when a synchronous error (or one from
    a callback) is thrown and nothing catches it. In modern Node an unhandled
    rejection is turned into an uncaught exception by default.

Q2: Why should you exit the process after uncaughtException?
A2: The error happened in the middle of some code, so memory, open
    connections or locks can be in an unknown state. Node docs say it is not
    safe to resume. Log, clean up, exit, and let the process manager restart.

Q3: Why does async code inside array.forEach cause this problem?
A3: forEach does not wait for the promises it creates and ignores their
    results, so a rejection has no handler. Use `for...of` with await, or
    `await Promise.all(items.map(fn))` to handle errors properly.
*/
