/* 7_disadvantages_of_nodejs.js

=====================================================
Disadvantages of Node.js
=====================================================

Definition (What I should say in the interview):
- "The main disadvantage is that Node.js is **not good for CPU-intensive tasks**. Since JS
   runs on a single thread, heavy computation blocks the event loop and every other request
   waits. Other drawbacks are async complexity if not handled well, an unhandled error can
   crash the process, and npm package quality varies a lot."

-----------------------------------------------------
Disadvantages
-----------------------------------------------------
1. **CPU-heavy work blocks the event loop** (image processing, big loops, huge JSON parsing).
   -> Fix: worker_threads, child processes, job queues, or a separate service.
2. **Async complexity** -> callback hell in older code (solved by Promises / async-await).
3. **Error handling** -> an uncaught error can crash the whole process.
4. **npm package quality** -> many small/unmaintained packages, security risks (use npm audit).
5. **Less suited** for heavy computation compared to Java/Go/C++.
6. **Fast-changing ecosystem** -> frequent tooling/library changes.

-----------------------------------------------------
Example (blocking the event loop)
-----------------------------------------------------
app.get('/heavy', (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1e10; i++) sum += i;   // blocks EVERY other request
  res.send(String(sum));
});

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you handle CPU-intensive tasks in Node.js?
A1: Offload to worker_threads or child_process, push to a queue (BullMQ) processed by
    background workers, or move it to a separate service.
*/
