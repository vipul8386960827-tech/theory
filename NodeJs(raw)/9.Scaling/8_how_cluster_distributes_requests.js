/* 8_how_cluster_distributes_requests.js

=====================================================
How Cluster Distributes Requests
=====================================================

Definition (What I should say in the interview):
- "The cluster module supports two scheduling approaches. The default on all platforms
   **except Windows** is **round-robin**: the **primary process listens on the port, accepts
   each new connection and passes it to the next worker** in turn. The second approach, the
   default on Windows, is that the primary creates the listening socket and **sends it to the
   workers, who accept connections directly**, and the OS decides which worker gets it. That
   second approach tends to be unbalanced, which is why round-robin is the default elsewhere."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. cluster.schedulingPolicy = cluster.SCHED_RR   -> round-robin (primary accepts).
   cluster.schedulingPolicy = cluster.SCHED_NONE -> leave it to the OS (workers accept).
2. Can also set env var: NODE_CLUSTER_SCHED_POLICY=rr or none.
3. Must be set **before** the first cluster.fork() call.
4. Distribution is per **connection**, not per HTTP request. With keep-alive, many requests
   on one connection all go to the same worker.
5. The handle is passed over the **IPC channel** created by fork.

-----------------------------------------------------
Example (seeing the distribution)
-----------------------------------------------------
const cluster = require('cluster');
const http = require('http');

cluster.schedulingPolicy = cluster.SCHED_RR;   // explicit round-robin

if (cluster.isPrimary) {
  for (let i = 0; i < 3; i++) cluster.fork();
} else {
  http.createServer((req, res) => {
    res.setHeader('Connection', 'close');      // new connection each time -> see rotation
    res.end(`worker ${cluster.worker.id}\n`);
  }).listen(3000);
}
// for i in 1 2 3 4 5 6; do curl -s localhost:3000; done
// worker 1, worker 2, worker 3, worker 1, ...

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Expecting perfectly equal load: round-robin counts connections, not how heavy each request is.
- Round-robin does not give stickiness -> same user can hit different workers. Socket.io
  long-polling breaks without sticky sessions.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is round-robin not the default on Windows?
A1: Because of how handles are passed on Windows, round-robin had performance issues there,
    so Windows defaults to letting workers accept on the shared socket.

Q2: Why does the OS-based approach get unbalanced?
A2: The OS tends to wake the same few processes, so a couple of workers get most connections.

Q3: Is the primary a bottleneck in round-robin?
A3: Slightly, since it accepts all connections, but it only passes handles; it does no app work.
*/
