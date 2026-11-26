/* 1_cluster_module.js

=====================================================
Cluster Module
=====================================================

Definition (What I should say in the interview):
- "Node runs my JavaScript on a **single thread**, so one process can only use one CPU core.
   The **cluster** module lets me start **multiple Node processes (workers)** from one
   **primary** process, and all of them **share the same server port**. The primary accepts
   connections and hands them to workers, so I can use all CPU cores on the machine. Each
   worker is a separate process with its own memory, event loop and V8 instance."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. cluster.fork() creates a worker (internally uses child_process.fork with an IPC channel).
2. Use **cluster.isPrimary** to check the role (cluster.isMaster is deprecated since v16).
3. Usually fork one worker per CPU core -> os.availableParallelism() (or os.cpus().length).
4. Workers **do not share memory** -> in-memory sessions/cache are per worker.
5. If a worker crashes, the primary gets an 'exit' event and can fork a replacement.

-----------------------------------------------------
Example
-----------------------------------------------------
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isPrimary) {
  const numCPUs = os.availableParallelism();
  console.log(`Primary ${process.pid} starting ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died (${signal || code}). Restarting...`);
    cluster.fork();                       // keep the pool full
  });
} else {
  http.createServer((req, res) => {
    res.end(`Handled by worker ${process.pid}\n`);
  }).listen(3000);                        // all workers listen on 3000
}

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Storing sessions or counters in a JS object -> every worker has a different copy. Use Redis.
- Forking more workers than cores usually does not help; it adds context switching.
- Cluster scales on ONE machine only. For multiple machines you need a load balancer.
- In production most people use PM2 cluster mode instead of writing this code by hand.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How can multiple processes listen on the same port?
A1: The workers do not actually bind the port themselves. The primary owns the listening
    socket and passes connections (or the handle) to workers over IPC.

Q2: What happens to in-flight requests if a worker crashes?
A2: Requests on that worker fail. Other workers keep serving, and the primary can fork a new one.

Q3: Is cluster the same as multithreading?
A3: No. Cluster = multiple processes (separate memory). Multithreading in Node = worker_threads.
*/
