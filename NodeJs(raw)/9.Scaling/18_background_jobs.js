/* 18_background_jobs.js

=====================================================
Background Jobs
=====================================================

Definition (What I should say in the interview):
- "Background jobs are tasks that **don't need to finish before I send the HTTP response**,
   like sending emails, generating reports, resizing images or calling slow third-party APIs.
   Instead of doing them inside the request, the API **adds a job to a queue** and immediately
   responds, and a separate **worker process** picks up the job and runs it. In Node I mostly use
   **BullMQ** with Redis, which gives retries, delays, scheduling and concurrency control. This
   keeps the API fast and lets me scale the workers separately from the API."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. API = producer (queue.add), worker = separate process (new Worker(...)).
2. Retries with backoff: attempts: 3, backoff: { type: 'exponential', delay: 1000 }.
3. Delayed jobs (send reminder in 1 hour) and repeatable jobs (cron-like).
4. Concurrency per worker, and run more worker processes to scale.
5. Return 202 Accepted + job ID; client polls status or gets a webhook/socket event.

-----------------------------------------------------
Example (BullMQ)
-----------------------------------------------------
// queue.js
const { Queue } = require('bullmq');
const connection = { host: 'localhost', port: 6379 };
const emailQueue = new Queue('emails', { connection });

// API route -> just enqueue
app.post('/signup', async (req, res) => {
  const user = await User.create(req.body);
  const job = await emailQueue.add('welcome', { userId: user.id }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
  });
  res.status(201).json({ user, jobId: job.id });   // response is not waiting for email
});

// worker.js (run as its own process: node worker.js)
const { Worker } = require('bullmq');
new Worker('emails', async (job) => {
  const user = await User.findById(job.data.userId);
  await mailer.send(user.email, 'Welcome!');
}, { connection, concurrency: 5 })
  .on('failed', (job, err) => console.error(`Job ${job.id} failed:`, err.message));

// Repeatable job every day at 2 AM
await reportQueue.add('daily', {}, { repeat: { pattern: '0 2 * * *' } });

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Fire-and-forget promises in the route (sendEmail() without await/queue) -> lost on crash, no retry.
- Passing whole objects in job data -> pass IDs and load fresh data in the worker.
- node-cron/setInterval in a multi-instance API -> runs on every instance; use repeatable jobs.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between a background job and a worker thread?
A1: A job is about *when/where* work runs (later, in another process, with retries). A worker
    thread is about running CPU code in parallel inside one process.

Q2: How do you monitor jobs?
A2: Bull Board / Arena dashboards, failed-job events, and alerts on queue length.
*/
