/* 19_sigterm_vs_sigkill.js

=====================================================
SIGTERM vs SIGKILL (and SIGINT)
=====================================================

Definition (What I should say in the interview):
- "Signals are how the OS or an orchestrator tells a process to stop. **SIGTERM** is a polite
   request to terminate - Node can **catch it** with process.on('SIGTERM') and do a graceful
   shutdown. **SIGKILL** is a forced kill handled by the kernel - it **cannot be caught or
   ignored**, the process just dies with no cleanup. Kubernetes and Docker first send SIGTERM,
   wait a grace period, and then send SIGKILL, so my cleanup has to finish within that window."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Signal  | Number | Sent by                          | Catchable? | Typical use          |
|---------|--------|----------------------------------|------------|----------------------|
| SIGINT  | 2      | Ctrl+C in terminal               | Yes        | Local dev stop       |
| SIGTERM | 15     | kill <pid>, docker stop, K8s, PM2| Yes        | Graceful shutdown    |
| SIGKILL | 9      | kill -9, OOM killer, K8s timeout | No         | Force kill           |
| SIGHUP  | 1      | Terminal closed                  | Yes        | Reload config (some) |

- docker stop -> SIGTERM, then SIGKILL after 10s (default).
- Kubernetes -> SIGTERM, then SIGKILL after terminationGracePeriodSeconds (default 30s).

-----------------------------------------------------
Example
-----------------------------------------------------
const http = require('http');
const server = http.createServer((req, res) => res.end('ok')).listen(3000);

process.on('SIGTERM', () => {
  console.log('SIGTERM received - closing server');
  server.close(() => {
    console.log('Closed cleanly');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Ctrl+C pressed');
  process.exit(0);
});

// Not allowed - Node throws if you try to listen for SIGKILL:
// process.on('SIGKILL', ...) -> Error: uv_signal_start EINVAL

// Test it:
//   node server.js  then in another terminal:  kill -TERM <pid>   -> handler runs
//                                               kill -9 <pid>     -> dies instantly

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Once you add a SIGTERM/SIGINT listener, Node no longer exits by default - you must call exit yourself.
- On Windows, SIGTERM is not really supported for sending; SIGINT (Ctrl+C) works.
- If Node runs under "npm start" or a shell script in Docker, the signal may go to npm/sh and not
  reach Node. Use CMD ["node", "server.js"] or an init like tini.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why can't SIGKILL be caught?
A1: The kernel kills the process directly without delivering the signal to it - by design, so a
    stuck process can always be stopped.

Q2: Your pods lose requests during deploys. Why?
A2: Likely no SIGTERM handler, or shutdown takes longer than the grace period and gets SIGKILLed.
    Add graceful shutdown and keep it under the grace period.

Q3: What exit code do you see after SIGKILL?
A3: 137 (128 + 9).
*/
