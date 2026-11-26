/* 37_process_vs_thread.js

=====================================================
Process vs Thread
=====================================================

Definition (What I should say in the interview):
- "A **process** is a running instance of a program with its **own memory space**, and a
   **thread** is a unit of execution inside a process that **shares the process's memory**.
   Processes are isolated, so a crash in one doesn't affect another, but they are heavier and
   communicate through IPC. Threads are lighter and share data easily, but need care with
   shared state. In Node, one process runs JS on one main thread; for more parallelism we use
   **child_process / cluster** for extra processes or **worker_threads** for extra threads."

-----------------------------------------------------
Comparison Table
-----------------------------------------------------
| Feature        | Process                         | Thread                          |
|----------------|---------------------------------|---------------------------------|
| Memory         | Own memory space                | Shares memory of its process    |
| Creation cost  | Heavy                           | Lighter                         |
| Communication  | IPC (messages, pipes, sockets)  | Shared memory / messages        |
| Isolation      | Crash doesn't affect others     | Crash can kill the whole process|
| Node API       | child_process, cluster          | worker_threads                  |
| Node use case  | Scale HTTP server across cores  | CPU-heavy tasks (image, hashing)|

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Each Node process has its own V8 instance, event loop and memory (heap).
2. Each worker thread also has its own V8 isolate and event loop, but they live in one process
   and can share memory via SharedArrayBuffer.
3. libuv's thread pool (default 4, UV_THREADPOOL_SIZE) is internal threads for fs/crypto/zlib.
4. cluster forks processes that share the same server port.

-----------------------------------------------------
Example
-----------------------------------------------------
// Thread: run CPU work without blocking the main event loop
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: 40 });
  worker.on('message', (result) => console.log('fib =', result));
  console.log('Main thread is still free, pid:', process.pid);
} else {
  const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));
  parentPort.postMessage(fib(workerData));
}

// Process: run a separate program
// const { exec } = require('child_process');
// exec('node -v', (err, stdout) => console.log('child process says', stdout.trim()));

-----------------------------------------------------
Analogy
-----------------------------------------------------
A process is a house with its own kitchen; threads are people in the same house sharing it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: cluster vs worker_threads?
A1: cluster = multiple processes to scale an HTTP server across CPU cores; worker_threads =
    threads inside one process for CPU-heavy tasks.

Q2: Do worker threads share variables with the main thread?
A2: No, normal variables are copied via postMessage (structured clone); only SharedArrayBuffer
    is truly shared.
*/
