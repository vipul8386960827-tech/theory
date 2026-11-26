/* 10_worker_threads_communication.js

=====================================================
Worker Threads Communication
=====================================================

Definition (What I should say in the interview):
- "Worker threads talk to each other mainly through **message passing**: postMessage() on one
   side and a 'message' event on the other. By default the data is **copied** using the
   structured clone algorithm. For large binary data I can **transfer** an ArrayBuffer so it is
   moved instead of copied, and if I really need both threads to see the same memory, I use a
   **SharedArrayBuffer** together with **Atomics** to avoid race conditions. There is also
   **MessageChannel** for direct worker-to-worker communication."

-----------------------------------------------------
Ways to Communicate
-----------------------------------------------------
| Method                   | Copy or share?        | Use when                          |
|--------------------------|-----------------------|-----------------------------------|
| workerData               | Copied once at start  | Initial input                     |
| postMessage(obj)         | Copied (clone)        | Normal messages, results          |
| postMessage(buf, [buf])  | Transferred (moved)   | Large binary data, zero-copy      |
| SharedArrayBuffer        | Shared memory         | Counters, shared buffers          |
| MessageChannel ports     | Copied                | Worker-to-worker direct channel   |
| BroadcastChannel         | Copied                | One message to many threads       |

-----------------------------------------------------
Example
-----------------------------------------------------
// main.js
const { Worker } = require('worker_threads');

const shared = new SharedArrayBuffer(4);       // 4 bytes = one Int32
const counter = new Int32Array(shared);

const w = new Worker('./worker.js', { workerData: { shared } });

const big = new ArrayBuffer(1024 * 1024);
w.postMessage({ big }, [big]);                 // transfer: big.byteLength is now 0 here

w.on('message', (msg) => {
  console.log(msg, 'counter =', Atomics.load(counter, 0));
});

// worker.js
const { parentPort, workerData } = require('worker_threads');
const counter = new Int32Array(workerData.shared);

parentPort.on('message', ({ big }) => {
  Atomics.add(counter, 0, 1);                  // thread-safe increment
  parentPort.postMessage(`got ${big.byteLength} bytes`);
});

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Functions, class instances' methods and sockets cannot be cloned -> DataCloneError.
- Using a transferred buffer after sending it -> it is detached (length 0).
- Writing to shared memory without Atomics -> race conditions.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is message passing slow for big objects?
A1: Structured clone serializes and copies the whole object. Transfer or shared memory avoids it.

Q2: How do you stop a worker?
A2: worker.terminate() from the main thread, or process.exit() / parentPort.close() inside it.

Q3: What is Atomics.wait / Atomics.notify?
A3: Low-level primitives to block a thread until a shared value changes and to wake it up.
*/
