/* 8_graceful_shutdown.js

=====================================================
Graceful Shutdown
=====================================================

Definition (What I should say in the interview):
- "Graceful shutdown means when the app is asked to stop - usually by a **SIGTERM** from
   Kubernetes, Docker or PM2 during a deploy - it **stops accepting new requests, lets in-flight
   requests finish, closes the DB and other connections, and then exits**. I do it with
   server.close(), then closing the DB pool, and I always add a **force-exit timeout** so the
   process does not hang forever if something does not close."

-----------------------------------------------------
Steps
-----------------------------------------------------
1. Listen for SIGTERM (orchestrators) and SIGINT (Ctrl+C).
2. server.close() -> stop accepting new connections, wait for active ones.
3. Close resources -> DB, Redis, message queue consumers.
4. process.exit(0) on success, exit(1) on failure.
5. Force-exit timer (e.g. 10s) in case something hangs.

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = app.listen(3000);

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;  // avoid running twice
  shuttingDown = true;
  console.log(`${signal} received, shutting down gracefully...`);

  const forceTimer = setTimeout(() => {
    console.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
  forceTimer.unref();

  server.close(async (err) => {
    try {
      await mongoose.connection.close();
      console.log('HTTP server and DB closed');
      process.exit(err ? 1 : 0);
    } catch (e) {
      console.error('Error during shutdown', e);
      process.exit(1);
    }
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- server.close() waits for keep-alive connections too; Node 18.2+ has
  server.closeIdleConnections() / closeAllConnections() to help.
- Kubernetes sends SIGTERM, waits terminationGracePeriodSeconds (default 30s), then SIGKILL.
  Our force timeout must be shorter than that.
- In Docker, run node as PID 1 directly (CMD ["node", "server.js"]); "npm start" may not forward signals.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not just process.exit() on SIGTERM?
A1: Active requests would be cut mid-way, users get errors, and DB writes could be left half done.

Q2: Why the force-exit timeout?
A2: A long request or a stuck connection can keep server.close() waiting forever.

Q3: What about a load balancer during shutdown?
A3: Fail the readiness/health check first so the LB stops sending traffic, then close the server.
*/
