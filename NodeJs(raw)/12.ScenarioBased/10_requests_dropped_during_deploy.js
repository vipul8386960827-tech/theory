/* 10_requests_dropped_during_deploy.js

=====================================================
Scenario: Requests Dropped During Deploy
=====================================================

The Question (how the interviewer asks it):
- "Every time we deploy, some users see 502 errors or their requests fail.
  How would you make deploys smooth with zero downtime?"

What the interviewer is checking:
- Do you know about graceful shutdown (SIGTERM, server.close)?
- Do you understand in-flight requests and keep-alive connections?
- Do you know how the load balancer / health checks fit in?
- Do you know tools like PM2 reload or Kubernetes rolling updates?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Check how the old process is stopped. Usually the platform (Docker, K8s,
   PM2) sends SIGTERM, and if the app does not handle it, Node exits at once
   and all in-flight requests are killed.
2. Listen for SIGTERM (and SIGINT). On signal, first mark the app as
   "not ready" so the health check fails and the load balancer stops sending
   new traffic.
3. Call server.close(). It stops accepting new connections and waits for
   current requests to finish.
4. Close idle keep-alive connections (server.closeIdleConnections(), Node
   18.2+), otherwise server.close() can wait a long time.
5. After requests finish, close DB pool, Redis, queue workers, then exit(0).
   Add a force-exit timeout (e.g. 10-25s) shorter than the platform's grace
   period (K8s default terminationGracePeriodSeconds = 30).
6. Use a rolling deploy: start new instances, wait until their readiness
   check passes, then stop old ones. With PM2 use `pm2 reload` (not restart)
   in cluster mode.
7. Make sure the readiness check only passes when DB etc. are connected.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const server = app.listen(3000);
let shuttingDown = false;

// readiness probe used by the load balancer / Kubernetes
app.get('/health/ready', (req, res) => {
  if (shuttingDown) return res.status(503).send('shutting down');
  res.send('ok');
});

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info(`${signal} received, starting graceful shutdown`);

  // force exit if something hangs
  setTimeout(() => process.exit(1), 25000).unref();

  server.close(async () => {          // waits for in-flight requests
    await mongoose.connection.close();
    await redis.quit();
    logger.info('clean shutdown');
    process.exit(0);
  });
  server.closeIdleConnections();      // drop idle keep-alive sockets
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// PM2: pm2 start app.js -i max   then deploy with:  pm2 reload app

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Requests are dropped because the old process is killed while it is still
  handling requests. I add graceful shutdown: on SIGTERM I fail the readiness
  check so the load balancer stops new traffic, call server.close() to finish
  in-flight requests, close idle keep-alive connections, then close the DB
  and exit, with a force-exit timeout. And I deploy with a rolling update or
  pm2 reload, so new instances are healthy before old ones stop."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Calling process.exit() directly on SIGTERM - this kills in-flight requests.
- Thinking server.close() closes everything immediately (it only stops new
  connections; keep-alive sockets can keep it open).
- No force-exit timeout, so the platform sends SIGKILL anyway.
- Using `pm2 restart` instead of `pm2 reload`, or running only one instance.
- Starting the app with `npm start` in Docker - npm may not forward SIGTERM to
  Node. Use `CMD ["node", "server.js"]`.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between liveness and readiness probes?
A1: Liveness says "the process is alive"; if it fails, K8s restarts the
    container. Readiness says "I can take traffic"; if it fails, K8s just
    stops routing requests to it. During shutdown, readiness should fail.

Q2: What happens if the app ignores SIGTERM?
A2: The platform waits for the grace period, then sends SIGKILL, which
    cannot be caught. All requests and open work are lost at once.

Q3: How do you handle long-running work like WebSockets or queue jobs?
A3: Stop taking new jobs (worker.close() in BullMQ waits for the active job),
    tell WebSocket clients to reconnect and close them, and keep the grace
    period long enough. Long jobs should be retry-safe in case they are cut.
*/
