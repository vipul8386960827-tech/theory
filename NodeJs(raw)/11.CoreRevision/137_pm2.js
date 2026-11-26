/* 5_pm2.js

=====================================================
PM2 (Process Manager)
=====================================================

Definition (What I should say in the interview):
- "PM2 is a **production process manager** for Node.js. It keeps my app **alive** by
   restarting it on crash, can run it in **cluster mode** across all CPU cores without me
   writing cluster code, and gives me **logs, monitoring and zero-downtime reloads**. It can
   also generate a startup script so the app comes back after a server reboot. On a plain VM
   or EC2 instance, PM2 is usually how I run Node in production."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Auto-restart on crash, optional restart on memory limit (max_memory_restart).
2. Cluster mode: -i max -> one instance per core, uses Node's cluster module internally.
3. Log management: pm2 logs, log files per app, pm2-logrotate module.
4. Config in ecosystem.config.js (env vars, instances, script).
5. pm2 startup + pm2 save -> survive reboots.

-----------------------------------------------------
Example (common commands)
-----------------------------------------------------
pm2 start app.js --name api            # fork mode, 1 instance
pm2 start app.js -i max --name api     # cluster mode, all cores
pm2 list                               # status of all apps
pm2 logs api                           # tail logs
pm2 monit                              # CPU / memory dashboard
pm2 restart api                        # hard restart (small downtime)
pm2 reload api                         # zero-downtime reload (cluster mode)
pm2 scale api 6                        # change number of instances
pm2 startup && pm2 save                # start on boot

// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api',
    script: './src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    env_production: { NODE_ENV: 'production', PORT: 3000 },
  }],
};
// pm2 start ecosystem.config.js --env production

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Using PM2 cluster mode inside Docker/Kubernetes -> usually unnecessary; the orchestrator
  restarts containers and scales replicas. (pm2-runtime exists if you still want it.)
- Cluster mode needs a stateless app (no in-memory sessions).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Fork mode vs cluster mode in PM2?
A1: Fork mode runs a single process (any script). Cluster mode runs multiple Node instances
    sharing one port.

Q2: How does PM2 compare to nodemon?
A2: nodemon is for development (restart on file change). PM2 is for production.

Q3: How do you avoid a memory leak taking down the app?
A3: Fix the leak, but as a safety net use max_memory_restart so PM2 restarts the instance.
*/
