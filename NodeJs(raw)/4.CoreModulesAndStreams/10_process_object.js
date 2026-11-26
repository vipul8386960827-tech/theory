/* 10_process_object.js

=====================================================
process Object
=====================================================

Definition (What I should say in the interview):
- "process is a **global object** that represents the currently running Node.js process. It gives
   information about and control over the process: environment variables (process.env),
   command-line arguments (process.argv), current directory, memory usage, PID, the standard I/O
   streams, and lifecycle events like 'exit', 'uncaughtException' and signals like SIGTERM. It is
   also an EventEmitter."

-----------------------------------------------------
Key Points (most used)
-----------------------------------------------------
1. process.env          -> environment variables (strings).
2. process.argv         -> CLI arguments.
3. process.cwd()        -> directory Node was started from (not the file's dir).
4. process.pid, process.platform, process.version, process.versions.
5. process.memoryUsage() -> { rss, heapTotal, heapUsed, external, arrayBuffers }.
6. process.uptime(), process.hrtime.bigint() -> high-resolution timing.
7. process.nextTick(cb) -> runs cb before other queued async work.
8. process.stdin / stdout / stderr -> streams.
9. process.exitCode / process.exit(), process.on('SIGTERM'|'exit'|...).

-----------------------------------------------------
Example
-----------------------------------------------------
console.log('PID:', process.pid);
console.log('Node:', process.version);
console.log('CWD:', process.cwd());
console.log('ENV:', process.env.NODE_ENV || 'development');

const mem = process.memoryUsage();
console.log('Heap used MB:', (mem.heapUsed / 1024 / 1024).toFixed(1));

const start = process.hrtime.bigint();
for (let i = 0; i < 1e6; i++);
console.log('Loop took ns:', process.hrtime.bigint() - start);

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully');
  // server.close(() => process.exit(0));
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- process.cwd() vs __dirname: cwd depends on where you ran "node", __dirname is the folder of
  the current file.
- process.nextTick runs before Promise microtasks; overusing it can starve the event loop.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Do you need to require process?
A1: No, it is global. You can also import it from 'node:process' explicitly.

Q2: How do you detect a memory leak quickly?
A2: Log process.memoryUsage().heapUsed over time; if it keeps growing under steady load, take
    heap snapshots (--inspect / Chrome DevTools) and compare.
*/
