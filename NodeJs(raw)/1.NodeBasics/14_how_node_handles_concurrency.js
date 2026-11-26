/* 14_how_node_handles_concurrency.js

=====================================================
How Does Node.js Handle Concurrency / Many Requests?
=====================================================

Definition (What I should say in the interview):
- "Node handles concurrency using the **event loop and non-blocking I/O**, not threads. When a
   request needs I/O like a DB query, Node starts the operation, registers a callback, and
   immediately moves on to the next request. When the I/O completes, the callback is queued and
   the event loop executes it. So one thread can manage thousands of requests, because it never
   sits idle waiting."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Concurrency != parallelism** -> Node interleaves many tasks on one thread; it does not
   run JS in parallel.
2. I/O is delegated to the OS / libuv thread pool -> those run in parallel in the background.
3. The event loop picks completed callbacks one by one.
4. Works great when requests are **I/O-bound** (most web APIs).
5. For more throughput -> run multiple processes (cluster / PM2 / containers).

-----------------------------------------------------
Example
-----------------------------------------------------
app.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id); // thread is FREE while DB works
  res.json(user);
});
// 1000 users hit this route -> 1000 queries in flight, one thread, no blocking.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- A waiter (main thread) takes an order, gives it to the kitchen (libuv/OS), and goes to the
  next table. When food is ready, the waiter serves it. One waiter, many tables.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What breaks this model?
A1: CPU-heavy synchronous code - the waiter starts cooking himself and every table waits.

Q2: How many concurrent connections can Node handle?
A2: Tens of thousands, limited mainly by memory, file descriptors and the work per request.
*/
