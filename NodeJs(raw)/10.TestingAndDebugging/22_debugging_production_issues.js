/* 22_debugging_production_issues.js

=====================================================
Debugging Production Issues
=====================================================

Definition (What I should say in the interview):
- "In production I usually can't attach a debugger or add console.logs freely, so I rely on
   **observability**: logs, metrics, traces and error tracking. My approach is: first check
   the impact and recent changes like a deploy, then use dashboards and logs with request IDs
   to narrow down which endpoint or dependency is failing, reproduce it in staging or locally
   with the same data, and if it's a memory or CPU problem, collect a heap snapshot or CPU
   profile from one instance. Mitigate first - rollback, scale, restart - then find the root cause."

-----------------------------------------------------
Step-by-step approach
-----------------------------------------------------
1. Assess impact: which users/endpoints, since when, error rate, latency.
2. Check what changed: recent deploy, config, traffic spike, dependency outage.
3. Mitigate: rollback, feature flag off, scale out, restart unhealthy instances.
4. Investigate: logs by requestId, APM traces, error tracker (Sentry) stack traces.
5. Reproduce: staging or local with same input/data/version.
6. Fix + add a test that reproduces the bug + post-mortem.

-----------------------------------------------------
Common issue types and tools
-----------------------------------------------------
| Symptom                    | Likely cause                  | Tool                        |
|----------------------------|-------------------------------|-----------------------------|
| Memory grows, OOM restarts | leak (cache, listeners)       | heap snapshots, memoryUsage |
| CPU 100%, all slow         | blocked event loop            | CPU profile, clinic         |
| Random 500s                | unhandled errors, bad input   | logs, Sentry                |
| Slow single endpoint       | slow query / external API     | APM traces, DB slow log     |
| Process crashes            | uncaught exception/rejection  | crash logs, report          |

-----------------------------------------------------
Example - capture useful data safely
-----------------------------------------------------
// Log fatal errors before exit (then let PM2/Kubernetes restart the process)
process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'uncaught exception');
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'unhandled rejection');
});

// Diagnostic report (stack, heap stats, libuv handles) - Node 12+
//   node --report-on-fatalerror --report-uncaught-exception app.js
//   process.report.writeReport();     // on demand

// Heap snapshot on signal, near-OOM snapshot
//   node --heapsnapshot-signal=SIGUSR2 --heapsnapshot-near-heap-limit=1 app.js

// Turn on debug logs without redeploy
//   LOG_LEVEL=debug  (if logger level reads from env/config)

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Take snapshots/profiles from ONE instance taken out of the load balancer if possible.
- Enable source maps (node --enable-source-maps) for TypeScript to get real stack traces.
- Never expose --inspect publicly; if needed, use an SSH tunnel to a single instance.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Tell me about a production issue you debugged.
A1: Example: API latency spiked after a deploy; APM traces showed a new query without an index
    doing a collection scan. Rolled back, added the index, redeployed, added a monitor on query time.

Q2: Should the process keep running after an uncaughtException?
A2: No. The app may be in an unknown state; log it, exit, and let the process manager restart it.
*/
