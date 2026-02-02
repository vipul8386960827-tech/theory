/* 425_cluster_module.js

=====================================================
Cluster Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `cluster` module in Node.js allows an application to **utilize multiple CPU cores** by creating a cluster of Node.js processes (workers) that share the same server port. 
   It helps improve performance by distributing workloads across multiple workers while the master process manages them."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Helps overcome Node.js’s **single-threaded limitation** by spawning multiple worker processes.
2. Workers are copies of the main process, each running on a separate core.
3. Master process manages and distributes incoming connections to workers.
4. Workers can share the same server port via the **Round-Robin scheduling** (default in most systems).
5. Provides automatic **worker management** (restarting workers when they crash).
6. Built on top of the `child_process` module.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process running on PID: ${process.pid}`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker dies, restart it
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Workers share the same TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Handled by worker ${process.pid}\n`);
  }).listen(3000);

  console.log(`Worker started: ${process.pid}`);
}

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Scaling Node.js applications to **multi-core systems**.
- High-performance HTTP servers.
- Load balancing tasks across workers.
- Fault tolerance (auto-restart workers if they crash).

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. All workers share the same server port but maintain **separate memory**.
2. Master process does not handle requests directly; it delegates to workers.
3. Communication between master and workers is via IPC (message passing).
4. Workers are **independent processes**, not threads.
5. Node.js also provides **Worker Threads** for lighter concurrency.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of clustering like a **restaurant kitchen**:
  - The head chef (master process) assigns orders (requests) to multiple cooks (workers). 
  - If a cook quits (crashes), the head chef hires a new one immediately.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why do we need the cluster module in Node.js?  
A1: Because Node.js runs on a single thread by default, the cluster module allows utilizing multiple CPU cores for better scalability.

Q2: Difference between `child_process` and `cluster`?  
A2: `child_process` is for running arbitrary processes, while `cluster` is specifically for creating multiple workers that share the same server port.

Q3: How do workers communicate with the master process?  
A3: Using IPC channels (`worker.send()` and `process.on('message')`).

Q4: What happens if a worker crashes?  
A4: The cluster module can automatically restart a new worker to maintain availability.

Q5: Is cluster the best way to achieve concurrency in Node.js today?  
A5: Cluster is useful for multi-core scaling, but **Worker Threads** are better for CPU-bound tasks as they share memory more efficiently.
*/
