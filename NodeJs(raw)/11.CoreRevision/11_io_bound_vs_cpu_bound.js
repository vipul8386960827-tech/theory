/* 18_io_bound_vs_cpu_bound.js

=====================================================
I/O-Bound vs CPU-Bound Tasks
=====================================================

Definition (What I should say in the interview):
- "An **I/O-bound** task spends most of its time **waiting** for input/output - database,
   network, files. A **CPU-bound** task spends most of its time doing **computation** - like
   image processing, encryption or complex calculations. Node.js is excellent for I/O-bound
   work because waiting is non-blocking, but CPU-bound work blocks the single JS thread."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| I/O-bound                         | CPU-bound                              |
|-----------------------------------|----------------------------------------|
| DB queries, API calls, file reads | Image/video processing, hashing loops  |
| Limited by network/disk speed     | Limited by CPU speed                   |
| Node handles it great             | Blocks the event loop                  |
| Scale with async I/O              | Scale with workers / more cores        |

-----------------------------------------------------
Example
-----------------------------------------------------
// I/O-bound - fine in Node
app.get('/orders', async (req, res) => res.json(await Order.find()));

// CPU-bound - bad on main thread
app.get('/report', (req, res) => res.json(generateHugeReportSync()));

// CPU-bound - better: offload to a worker thread
const { Worker } = require('worker_threads');
app.get('/report', (req, res) => {
  const worker = new Worker('./report-worker.js');
  worker.once('message', (data) => res.json(data));
});

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you identify a CPU-bound problem in production?
A1: High CPU usage, rising event-loop lag, all endpoints slowing down together; confirm with
    profiling (node --prof, clinic.js, Chrome DevTools).
*/
