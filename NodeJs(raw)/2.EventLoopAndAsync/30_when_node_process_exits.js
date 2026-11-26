/* 30_when_node_process_exits.js

=====================================================
When Does a Node.js Process Exit?
=====================================================

Definition (What I should say in the interview):
- "A Node process exits naturally when the event loop has **nothing left to wait for** - no active
   timers, open servers or sockets, pending fs or thread pool requests, or child processes that
   keep it alive. Before exiting it emits **'beforeExit'**, where I can still schedule work, and
   then **'exit'**, where only synchronous code runs. It can also exit early through
   process.exit(), an uncaught exception, an unhandled Promise rejection (default since Node 15),
   or a signal like SIGINT or SIGTERM."

-----------------------------------------------------
What keeps the process alive
-----------------------------------------------------
- Ref'ed timers / intervals, listening servers, open sockets, pending fs/dns/crypto requests,
  child processes, stdin being read.
- NOT kept alive by: a pending Promise alone, or unref'ed timers/handles.

-----------------------------------------------------
Exit Codes to know
-----------------------------------------------------
| Code | Meaning                                    |
|------|--------------------------------------------|
| 0    | success / loop emptied                     |
| 1    | uncaught fatal exception                   |
| 13   | unsettled top-level await (ESM)            |
| 128+N| killed by signal N (e.g. 130 for SIGINT)   |

-----------------------------------------------------
Example
-----------------------------------------------------
process.on('beforeExit', (code) => {
  console.log('beforeExit', code);            // loop is empty, could schedule more work here
});

process.on('exit', (code) => {
  console.log('exit', code);
  setTimeout(() => console.log('never runs'), 0);   // async work is ignored in 'exit'
});

new Promise(() => {});                         // pending forever, does NOT keep process alive
setTimeout(() => console.log('timer done'), 100);

// Output:
// timer done
// beforeExit 0
// exit 0

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Prefer setting process.exitCode = 1 over process.exit(1) - exit() kills pending writes
  (e.g. logs to stdout piped to a file may be lost).
- 'beforeExit' is NOT emitted for process.exit() or uncaught exceptions.
- For graceful shutdown, handle SIGTERM: stop accepting requests, close server and DB, then exit.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does my script hang and never exit?
A1: Something still holds the loop - an open DB connection, server, or interval. Close it or unref it.

Q2: Can you do async cleanup in the 'exit' handler?
A2: No, only synchronous code; do async cleanup in signal handlers or 'beforeExit'.

Q3: What happens on unhandled rejection in Node 15+?
A3: It is treated like an uncaught exception, so the process exits with code 1 unless handled.
*/
