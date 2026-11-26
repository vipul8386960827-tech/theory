/* 2_worker_threads.js

=====================================================
Worker Threads
=====================================================

Definition (What I should say in the interview):
- "The **worker_threads** module lets me run JavaScript in **parallel threads inside the same
   process**. Each worker has its own V8 isolate and event loop, but they can **share memory**
   using SharedArrayBuffer or transfer ArrayBuffers. I use them for **CPU-heavy work** like image
   processing, hashing or big JSON parsing, so the main event loop is not blocked. For normal
   I/O they don't help, because Node's I/O is already asynchronous."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. new Worker(file, { workerData }) starts a thread running that file.
2. Communication: parentPort.postMessage() / worker.on('message') (structured clone).
3. Lighter than processes (same process, less memory) but each thread still has its own heap.
4. Use a **worker pool** (e.g. piscina) instead of creating a new worker per request.
5. isMainThread tells you whether the code runs in the main thread or a worker.

-----------------------------------------------------
Example (offload a CPU task)
-----------------------------------------------------
// main.js
const { Worker } = require('worker_threads');

function runFib(n) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./fib-worker.js', { workerData: n });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with code ${code}`));
    });
  });
}
runFib(40).then((r) => console.log('fib(40) =', r));
console.log('Main thread is still free');   // prints first

// fib-worker.js
const { parentPort, workerData } = require('worker_threads');
const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));
parentPort.postMessage(fib(workerData));

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Using workers for DB calls or HTTP calls -> no gain, only overhead.
- Spawning a worker per request -> startup cost (~ms and memory). Use a pool.
- Workers cannot see main-thread variables; data sent via postMessage is copied, not shared.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Are worker threads the same as the libuv thread pool?
A1: No. The libuv pool runs C++ tasks (fs, crypto). worker_threads run your own JS code.

Q2: Does a crash in a worker kill the process?
A2: An uncaught error emits 'error' on the Worker object; if you handle it, the main thread survives.

Q3: When would you pick worker threads in a real project?
A3: Generating PDFs/reports, resizing images, heavy encryption or parsing large CSV files.
*/
