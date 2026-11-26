/* 4_uncaught_exception.js

=====================================================
uncaughtException
=====================================================

Definition (What I should say in the interview):
- "**uncaughtException** is an event on the process object that fires when a synchronous error
   bubbles all the way up to the event loop without any try/catch. By default Node prints the
   stack and exits with code 1. I can listen to it, but only as a **last resort** - to log the
   error and exit. After an uncaught exception the process is in an **unknown state**, so I
   should never continue serving requests; a process manager like PM2 or Kubernetes restarts it."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Fires for errors thrown and not caught anywhere (including in callbacks/timers).
2. Register the handler at the TOP of the entry file, before other code runs.
3. Handler should be synchronous: log, then process.exit(1).
4. Not a replacement for proper try/catch.
5. 'uncaughtExceptionMonitor' event lets you observe without changing default crash behavior.

-----------------------------------------------------
Example
-----------------------------------------------------
// server.js - first lines
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1); // do not keep running in an unknown state
});

const express = require('express');
const app = express();

setTimeout(() => {
  // not inside any try/catch -> goes to uncaughtException
  undefinedFunction();
}, 1000);

app.listen(3000);

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Using it to "keep the server alive" -> memory leaks, open sockets, inconsistent data.
- Doing async work (like sending an email) in the handler -> may never complete; at most
  flush logs quickly, then exit.
- If the handler itself throws, Node exits immediately with code 7.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why must the listener be registered at the top?
A1: Errors thrown before the listener is attached (e.g. during require) will not be caught by it.

Q2: Who restarts the app after process.exit(1)?
A2: A process manager - PM2, systemd, Docker restart policy or Kubernetes. That is why exiting is safe.

Q3: Does an error thrown in an Express route trigger uncaughtException?
A3: No, Express wraps sync route code in try/catch and forwards it to error middleware. But an error
    thrown inside a setTimeout or callback in that route would escape and trigger it.
*/
