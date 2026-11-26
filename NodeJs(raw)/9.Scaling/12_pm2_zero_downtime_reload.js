/* 12_pm2_zero_downtime_reload.js

=====================================================
PM2 Zero-Downtime Reload
=====================================================

Definition (What I should say in the interview):
- "**pm2 reload** restarts the instances of an app **one by one** in cluster mode. It starts a
   new instance, waits until it is ready, and only then stops an old one, so there is always at
   least one instance serving traffic and users don't see errors during a deploy. **pm2
   restart** on the other hand kills and restarts all instances at once, which causes a short
   downtime. To make reload really safe, my app must handle **graceful shutdown** and can
   signal when it is **ready**."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Works properly only in **cluster mode** (-i). In fork mode reload behaves like restart.
2. On stop, PM2 sends **SIGINT**, waits **kill_timeout** (default 1600 ms), then SIGKILL.
3. **wait_ready: true** -> PM2 waits for process.send('ready') before treating the instance as up.
4. **listen_timeout** -> how long to wait for 'ready' before moving on.
5. Graceful shutdown = stop accepting new connections, finish in-flight requests, close DB.

-----------------------------------------------------
Example
-----------------------------------------------------
// server.js
const app = require('./app');
const db = require('./db');

const server = app.listen(3000, () => {
  if (process.send) process.send('ready');      // tell PM2 we are ready
});

process.on('SIGINT', () => {
  console.log('Graceful shutdown...');
  server.close(async () => {                    // stop new connections, wait for current ones
    await db.close();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();   // force exit if stuck
});

// ecosystem.config.js
module.exports = { apps: [{
  name: 'api', script: 'server.js', instances: 4, exec_mode: 'cluster',
  wait_ready: true, listen_timeout: 10000, kill_timeout: 12000,
}] };

// deploy
git pull && npm ci && pm2 reload ecosystem.config.js --env production

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- kill_timeout shorter than your shutdown time -> PM2 SIGKILLs and requests still get cut.
- Keep-alive connections can keep server.close() waiting -> use server.closeIdleConnections()
  (Node 18.2+) or set a forced timeout.
- DB migrations that break the old code version will still cause errors during a rolling reload.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: reload vs restart?
A1: reload = rolling, one instance at a time, no downtime. restart = all at once, brief downtime.

Q2: What is the Kubernetes equivalent?
A2: A rolling update of the Deployment, with readiness probes and SIGTERM handling.
*/
