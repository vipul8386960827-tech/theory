/* 15_process_exit_codes_and_events.js

=====================================================
Process Exit Codes and Process Events
=====================================================

Definition (What I should say in the interview):
- "Exit code 0 means success and any non-zero code means failure; tools like Docker, Kubernetes
   and CI use it to decide what happened. I prefer setting **process.exitCode = 1** and letting
   the process finish naturally, instead of calling **process.exit()**, because exit() kills the
   process immediately - pending writes, like logs to stdout or a file, can be lost. For lifecycle
   I listen to events like SIGTERM for graceful shutdown, and uncaughtException /
   unhandledRejection to log and exit."

-----------------------------------------------------
Common Exit Codes
-----------------------------------------------------
| Code | Meaning                                                 |
|------|---------------------------------------------------------|
| 0    | success                                                 |
| 1    | uncaught fatal exception / generic failure              |
| 9    | invalid argument                                        |
| 130  | killed by SIGINT (Ctrl+C) -> 128 + 2                    |
| 137  | killed by SIGKILL (often OOM killer in Docker) -> 128+9 |
| 143  | killed by SIGTERM -> 128 + 15                           |

-----------------------------------------------------
Important Process Events
-----------------------------------------------------
- 'exit'               -> about to exit; ONLY synchronous code runs here.
- 'beforeExit'         -> event loop is empty; you can schedule more work (not on process.exit()).
- 'uncaughtException'  -> a thrown error was not caught. App state is unknown -> log and exit.
- 'unhandledRejection' -> promise rejected with no catch (since Node 15 this crashes by default).
- 'SIGTERM' / 'SIGINT' -> stop signals from orchestrator / Ctrl+C.

-----------------------------------------------------
Example (graceful shutdown)
-----------------------------------------------------
const http = require('http');
const server = http.createServer((req, res) => res.end('ok')).listen(3000);

function shutdown(signal) {
  console.log(`${signal} received, closing server`);
  server.close(() => {
    // close DB connections here
    process.exitCode = 0;          // let Node exit naturally
  });
  setTimeout(() => process.exit(1), 10000).unref(); // force if stuck
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  process.exitCode = 1;
  shutdown('unhandledRejection');
});
process.on('exit', (code) => console.log('exiting with', code));

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Using uncaughtException to "keep the server alive" - the app may be in a broken state.
  Log, exit, and let PM2/Kubernetes restart it.
- Doing async work (DB writes) inside the 'exit' listener - it never completes.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is process.exit() risky?
A1: It ends the process immediately, so async stdout/file writes and pending requests can be cut off.

Q2: Can you catch SIGKILL?
A2: No. SIGKILL (and SIGSTOP) cannot be handled - that is why graceful shutdown uses SIGTERM.
*/
