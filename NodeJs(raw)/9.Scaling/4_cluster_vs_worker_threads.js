/* 4_cluster_vs_worker_threads.js

=====================================================
Cluster vs Worker Threads
=====================================================

Definition (What I should say in the interview):
- "Cluster and worker threads solve different problems. **Cluster** creates **multiple
   processes** that share a port, so it helps me handle **more incoming requests** by using all
   CPU cores. **Worker threads** create **threads inside one process** to run **CPU-heavy code**
   in parallel without blocking the event loop. So cluster is for scaling the server, and
   worker threads are for offloading heavy computation from a request."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature            | Cluster                        | Worker Threads                    |
|--------------------|--------------------------------|-----------------------------------|
| Unit               | Process                        | Thread (same process)             |
| Memory             | Fully separate                 | Separate heaps, can share via     |
|                    |                                | SharedArrayBuffer                 |
| Communication      | IPC (process.send)             | postMessage / MessageChannel      |
| Goal               | Throughput (more requests)     | Offload CPU-bound tasks           |
| Port sharing       | Yes                            | No (not meant for servers)        |
| Crash isolation    | Strong (one worker dies only)  | Weaker (same process)             |
| Startup / memory   | Heavier                        | Lighter                           |

-----------------------------------------------------
Example (using both together)
-----------------------------------------------------
// Cluster: 4 processes serve HTTP on port 3000.
// Inside each process, a small worker_threads pool handles image resizing.
const cluster = require('cluster');
if (cluster.isPrimary) {
  for (let i = 0; i < 4; i++) cluster.fork();
} else {
  const express = require('express');
  const Piscina = require('piscina');
  const pool = new Piscina({ filename: __dirname + '/resize.js' });
  const app = express();
  app.post('/resize', async (req, res) => {
    const out = await pool.run({ path: req.query.file });  // CPU work off the event loop
    res.json(out);
  });
  app.listen(3000);
}

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Saying "worker threads make my API faster" for an I/O-bound API -> wrong; cluster or more
  instances help throughput, threads only help CPU-bound code.
- Cluster does NOT fix a blocking function: one heavy request still freezes that worker.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: You have a CPU-heavy endpoint that freezes the server. Cluster or workers?
A1: Worker threads (or a background job). Cluster only spreads the freeze across fewer users.

Q2: Can worker threads share a JavaScript object?
A2: Not directly. Objects are cloned. Only SharedArrayBuffer memory is truly shared.

Q3: Which is better for crash safety?
A3: Cluster, since each worker is an isolated process.
*/
