/* 38_long_running_task_like_video_processing.js

=====================================================
Scenario: A request triggers a 5-minute task
=====================================================

The Question (how the interviewer asks it):
- "Users upload a video and we must process it (or generate a big report).
   It takes about 5 minutes. Right now the HTTP request just waits and often
   times out. How would you redesign it?"

What the interviewer is checking:
- Do you know not to keep long work inside the HTTP request?
- Do you know the queue + worker pattern (BullMQ, RabbitMQ, SQS)?
- How does the client get the result: polling, webhook, WebSocket?
- Do you handle retries, failures and idempotency?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Explain the problem: load balancers and browsers time out (often 30-60s),
   the server holds the connection, and CPU-heavy work can block the event
   loop for every other user.
2. Accept the request fast: validate input, save the file to S3, create a
   job record in the DB with status "queued", and return 202 Accepted with a
   jobId and a status URL.
3. Put the job in a queue (BullMQ on Redis, RabbitMQ or SQS). The queue
   survives restarts and spreads work over many workers.
4. Run separate worker processes that take jobs from the queue. CPU-heavy
   work (ffmpeg) runs in a child process or worker_threads, not on the API
   server's event loop. Workers scale independently from the API.
5. Report progress: worker updates status/progress in the DB.
6. Tell the client: GET /jobs/:id for polling, or push a WebSocket/SSE event,
   or call a webhook (for server-to-server), or send an email when done.
7. Reliability: retries with exponential backoff, a max attempts limit, a
   dead-letter/failed list, and idempotent jobs (safe to run twice).

-----------------------------------------------------
Code Example
-----------------------------------------------------
// api.js
const { Queue } = require('bullmq');
const connection = { url: process.env.REDIS_URL };
const videoQueue = new Queue('video', { connection });

app.post('/videos', async (req, res) => {
  const job = await db.jobs.create({ status: 'queued', fileKey: req.body.fileKey });
  await videoQueue.add('process', { jobId: job.id, fileKey: job.fileKey }, {
    jobId: String(job.id),                          // avoid duplicate jobs
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  });
  res.status(202).location(`/jobs/${job.id}`).json({ jobId: job.id, status: 'queued' });
});

app.get('/jobs/:id', async (req, res) => {
  const job = await db.jobs.findById(req.params.id);
  if (!job) return res.status(404).end();
  res.json({ status: job.status, progress: job.progress, resultUrl: job.resultUrl });
});

// worker.js (separate process, scaled on its own)
const { Worker } = require('bullmq');
new Worker('video', async (job) => {
  await db.jobs.update(job.data.jobId, { status: 'processing' });
  const resultUrl = await transcodeVideo(job.data.fileKey, (p) => job.updateProgress(p));
  await db.jobs.update(job.data.jobId, { status: 'done', resultUrl });
}, { connection, concurrency: 2 });

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I would not keep a 5-minute task inside the HTTP request. The API
   validates the input, saves a job record and returns 202 Accepted with a
   job id right away. The job goes into a queue like BullMQ or SQS, and
   separate worker processes do the heavy work and update the status. The
   client checks GET /jobs/:id, or gets a WebSocket event or webhook when it
   is done. I add retries with backoff, a failed-jobs list, and make jobs
   idempotent."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Just increase the timeout."
- Running CPU-heavy work on the API server's main thread (blocks all users).
- Fire-and-forget with setTimeout or an un-awaited promise - the job is lost
  if the server restarts.
- No retry limit, so a bad job retries forever.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why 202 and not 200 or 201?
A1: 202 Accepted means "request received, processing is not finished yet".
    It fits async work. The Location header points to the status URL.

Q2: What does idempotent mean for a job?
A2: Running it twice gives the same result with no bad side effects, e.g. it
    checks if the output already exists, or uses a unique job id.

Q3: Webhook vs polling for the result?
A3: Polling is simple and works everywhere but adds load. Webhooks are
    efficient for server-to-server, but need retries and signature checks.
*/
