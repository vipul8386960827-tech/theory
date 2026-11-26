/* 18_when_to_use_process_exit.js

=====================================================
When to Use process.exit()
=====================================================

Definition (What I should say in the interview):
- "process.exit(code) **terminates the process immediately** - pending async work like DB writes,
   HTTP responses or log flushing may be lost. So in a server I use it only in a few cases: after
   an **uncaughtException**, when **startup fails** (e.g. cannot connect to the DB or a required
   env variable is missing), and at the **end of graceful shutdown**. In CLI scripts it is fine to
   use it to return an exit code. Otherwise I prefer setting **process.exitCode** and letting the
   event loop drain naturally."

-----------------------------------------------------
Exit Codes
-----------------------------------------------------
| Code | Meaning                                             |
|------|-----------------------------------------------------|
| 0    | Success                                             |
| 1    | Uncaught fatal exception / general failure          |
| 7    | Exception handler itself threw                      |
| 9    | Invalid argument                                    |
| 128+N| Killed by signal N (e.g. 137 = SIGKILL, 143 = SIGTERM) |

-----------------------------------------------------
Good vs Bad Uses
-----------------------------------------------------
Good:
- Fatal startup error (missing JWT_SECRET, DB unreachable after retries).
- Inside uncaughtException handler.
- After server.close() + DB close in graceful shutdown.
- CLI tools / scripts / migrations to signal success or failure to CI.

Bad:
- Inside a request handler to "handle" an error -> kills the server for every user.
- Right after an async call like logger.write() -> log may never be written.
- In library code -> a library should throw, the app decides.

-----------------------------------------------------
Example
-----------------------------------------------------
// Startup validation
const required = ['DATABASE_URL', 'JWT_SECRET'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error('Missing env vars:', missing.join(', '));
  process.exit(1); // fail fast, nothing is running yet
}

// CLI script: prefer exitCode
async function runMigration() {
  try {
    await migrate();
    console.log('Migration done');
  } catch (err) {
    console.error('Migration failed', err);
    process.exitCode = 1; // exits with 1 after the event loop is empty
  }
}
runMigration();

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between process.exit(1) and process.exitCode = 1?
A1: exit() stops right away; exitCode only sets the code and Node exits naturally once all
    pending work is done, so logs and writes complete.

Q2: Does process.exit() run the 'exit' event?
A2: Yes, 'exit' listeners run, but only synchronous code in them works - async callbacks never fire.

Q3: Why exit code 137 in Docker/Kubernetes?
A3: 128 + 9 -> the container was SIGKILLed, often because of OOM or a missed shutdown deadline.
*/
