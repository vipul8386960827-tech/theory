/* 17_concurrency_vs_parallelism.js

=====================================================
Concurrency vs Parallelism
=====================================================

Definition (What I should say in the interview):
- "Concurrency means **dealing with many tasks at once** by interleaving them - they make progress
   in overlapping time periods, but not necessarily at the same instant. Parallelism means
   **actually executing multiple tasks at the same instant** on multiple CPU cores. Node's main
   thread gives you concurrency through the event loop; for parallelism you use worker_threads,
   the cluster module or multiple processes, and internally libuv's thread pool also runs in parallel."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect          | Concurrency                       | Parallelism                       |
|-----------------|-----------------------------------|-----------------------------------|
| Meaning         | structure: many tasks in progress | execution: many tasks at once     |
| Needs cores     | works on 1 core                   | needs multiple cores              |
| Good for        | I/O-bound work                    | CPU-bound work                    |
| In Node         | event loop, Promise.all on I/O    | worker_threads, cluster, pool     |

-----------------------------------------------------
Example (concurrency vs parallelism)
-----------------------------------------------------
// Concurrency: 3 HTTP calls in flight, one JS thread
const urls = ['https://example.com/a', 'https://example.com/b', 'https://example.com/c'];
// await Promise.all(urls.map((u) => fetch(u)));   // waiting overlaps

// Parallelism: CPU work on separate cores
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  for (let i = 0; i < 2; i++) {
    new Worker(__filename).on('message', (m) => console.log('worker done:', m));
  }
} else {
  let sum = 0;
  for (let i = 0; i < 1e8; i++) sum += i;   // runs truly in parallel with the other worker
  parentPort.postMessage(sum);
}

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Saying Promise.all makes CPU-heavy code parallel. It does not; JS callbacks still run one at a
  time on the main thread. It only overlaps waiting time.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Concurrency: one chef switching between three dishes while each one simmers.
- Parallelism: three chefs, each cooking one dish at the same time.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is Node concurrent or parallel?
A1: The JS code is concurrent on one thread; Node as a whole uses parallelism internally (thread pool, OS).

Q2: When do you need parallelism in Node?
A2: CPU-bound tasks like image resizing, PDF generation, heavy hashing or data crunching.

Q3: cluster vs worker_threads?
A3: cluster forks processes sharing a server port for scaling HTTP; worker_threads are threads in one process for CPU tasks.
*/
