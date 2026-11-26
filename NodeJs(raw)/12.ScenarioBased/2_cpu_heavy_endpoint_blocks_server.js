/* 2_cpu_heavy_endpoint_blocks_server.js

=====================================================
Scenario: One CPU-Heavy Endpoint Freezes the Whole Server
=====================================================

The Question (how the interviewer asks it):
- "We have an endpoint that generates a PDF report (or resizes images). When someone calls it,
   the whole server stops responding for all other users for several seconds. Why, and how
   do you fix it?"

What the interviewer is checking:
- Do you understand that Node runs your JS on ONE main thread (the event loop)?
- Do you know that async/await does NOT make CPU work non-blocking?
- Do you know the options: worker threads, child processes, job queues, separate service.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Explain the cause: the PDF/image work is CPU-bound JavaScript running on the main thread.
   While it runs, the event loop cannot handle any other request, timer or I/O callback.
2. Confirm it: high CPU and high event loop lag while that endpoint runs. A CPU profile
   (`node --inspect` or `clinic flame`) shows the heavy function.
3. Quick check: maybe a library already has an async/native version (e.g. `sharp` for images
   does work in libuv threads, not on the main thread). Use it if possible.
4. Short tasks (under a few seconds): move the work to a Worker Thread, best with a worker
   pool (e.g. `piscina`) so we do not create a new thread per request.
5. Long tasks (reports that take 10s+): use a job queue (BullMQ + Redis). The API returns
   202 Accepted with a jobId; a separate worker process does the job; the client polls or
   gets a webhook/email when it is ready.
6. Protect the server: limit concurrency (pool size), add rate limiting for this endpoint,
   and set timeouts so one big job cannot use all resources.
7. Scale: run the heavy workers as their own service so the API stays fast.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: CPU work on the main thread - all users wait
app.get('/report', (req, res) => {
  const pdf = buildHugePdfSync(req.query.month); // takes 5 seconds, blocks event loop
  res.type('pdf').send(pdf);
});

// GOOD (short jobs): worker thread pool with piscina
// report.worker.js
//   module.exports = ({ month }) => buildHugePdfSync(month);
const Piscina = require('piscina');
const pool = new Piscina({ filename: require.resolve('./report.worker.js'), maxThreads: 4 });

app.get('/report', async (req, res, next) => {
  try {
    const pdf = await pool.run({ month: req.query.month }); // runs in another thread
    res.type('pdf').send(Buffer.from(pdf));
  } catch (err) { next(err); }
});

// GOOD (long jobs): queue + background worker (BullMQ)
const { Queue } = require('bullmq');
const reportQueue = new Queue('reports', { connection: { host: 'localhost', port: 6379 } });

app.post('/reports', async (req, res) => {
  const job = await reportQueue.add('monthly', { month: req.body.month, userId: req.user.id });
  res.status(202).json({ jobId: job.id, status: 'queued' }); // client checks later
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Node runs JavaScript on a single main thread, so CPU-heavy code like PDF generation blocks
   the event loop and every other request waits. Making the function async does not help
   because the CPU work still runs on the same thread. For short tasks I move the work to
   worker threads using a pool like piscina. For long tasks I put a job in a queue like
   BullMQ, return 202 with a job id, and let a separate worker process do it."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Wrap it in a Promise / make it async" - this does not move CPU work off the main thread.
- "Use setTimeout or process.nextTick" - still the same thread.
- Creating a new Worker for every request with no limit (thread explosion, memory spikes).
- Saying "Node is bad for this, rewrite in Java" without offering a Node solution.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Worker threads vs child processes vs cluster?
A1: Worker threads = threads in the same process, cheap, can share memory (SharedArrayBuffer);
    good for CPU tasks. Child process = separate process, more isolation, can run any program.
    Cluster = many copies of the whole server to use all cores for handling requests.

Q2: Doesn't the libuv thread pool solve this?
A2: Only for work Node itself sends there (fs, dns.lookup, crypto.pbkdf2, zlib). Your own JS
    loops always run on the main thread.

Q3: Why use a queue instead of a worker thread for long reports?
A3: A queue survives restarts, supports retries, spreads work across machines, and the HTTP
    request does not have to stay open for a long time (no proxy timeouts).
*/
