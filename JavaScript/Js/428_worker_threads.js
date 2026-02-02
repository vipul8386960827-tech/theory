/* 428_worker_threads.js

=====================================================
Worker Threads Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `worker_threads` module in Node.js enables **multi-threading** by running JavaScript in 
   parallel threads. Unlike child processes, worker threads share memory via `SharedArrayBuffer`, 
   making them ideal for CPU-intensive tasks without blocking the event loop."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides true **multi-threading** inside a single Node.js process.
2. Each worker has its own event loop, JS engine instance, and memory space.
3. Workers can share memory efficiently via `SharedArrayBuffer` and `Atomics`.
4. Communication happens through **message passing** (`postMessage` and `on('message')`).
5. Better than `cluster` or `child_process` for CPU-bound computations.
6. Requires explicit setup; not enabled by default like the event loop.

-----------------------------------------------------
Basic Example (Creating a Worker)
-----------------------------------------------------
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Main thread
  const worker = new Worker(__filename); // run the same file in worker
  worker.on('message', (msg) => console.log('Message from worker:', msg));
  worker.postMessage('Hello Worker!');
} else {
  // Worker thread
  parentPort.on('message', (msg) => {
    console.log('Message from main:', msg);
    parentPort.postMessage('Hello Main!');
  });
}

-----------------------------------------------------
Example (Heavy Computation Offloaded)
-----------------------------------------------------
const { Worker } = require('worker_threads');

function runWorker(file, workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(file, { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with code ${code}`));
    });
  });
}

// worker.js
const { parentPort, workerData } = require('worker_threads');
let sum = 0;
for (let i = 0; i < workerData.num; i++) sum += i;
parentPort.postMessage(sum);

// main.js
runWorker('./worker.js', { num: 1e7 }).then(console.log);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- CPU-heavy tasks like image processing, cryptography, or data parsing.
- Real-time applications needing low-latency processing.
- Offloading work without blocking the event loop.
- Multi-threaded servers where tasks run in parallel.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Worker threads are different from processes; they share memory but run in parallel.
2. Best for **CPU-bound tasks**; for I/O-bound tasks, async event loop is usually enough.
3. Use `SharedArrayBuffer` for memory sharing between threads.
4. Workers add overhead; avoid overusing them for lightweight tasks.
5. Introduced in Node.js v10.5.0 and stabilized in v12.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of worker threads as **extra chefs in the same kitchen**:
  - They share the same pantry (memory) but cook dishes independently without blocking each other.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between `worker_threads` and `cluster`?  
A1: `cluster` creates multiple processes (separate memory), while `worker_threads` create multiple threads within the same process (shared memory).

Q2: When should you use worker threads?  
A2: For CPU-intensive tasks like compression, encryption, or mathematical calculations that block the event loop.

Q3: How do worker threads communicate with each other?  
A3: Through message passing (`postMessage`) and shared memory (`SharedArrayBuffer`).

Q4: Can worker threads improve I/O performance?  
A4: Not significantly; Node.js async model already handles I/O well. Workers are mainly for CPU-bound tasks.

Q5: What risks exist when using shared memory with workers?  
A5: Race conditions and data inconsistency if not carefully synchronized with `Atomics`.
*/
