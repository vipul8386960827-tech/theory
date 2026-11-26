/* 13_send_email_without_slowing_signup.js

=====================================================
Scenario: Welcome Email Makes Signup Slow and Fragile
=====================================================

The Question (how the interviewer asks it):
- "Our signup API takes 3-4 seconds because it sends a welcome email. And
  when the email service is down, signup fails too. How would you fix this?"

What the interviewer is checking:
- Can you separate the critical path (create user) from side effects (email)?
- Do you know background jobs / message queues (BullMQ + Redis, SQS, RabbitMQ)?
- Do you know retries with backoff, and dead-letter / failed jobs?
- Do you know why plain fire-and-forget is not reliable enough?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Measure first: confirm with logs/APM that the SMTP/API call is the slow
   part of the request.
2. Decide what is critical: creating the user is critical; the email is not.
   The email should never make signup fail.
3. Move the email to a background job. The route saves the user, adds a job
   to a queue (BullMQ on Redis), and returns 201 right away.
4. A separate worker process reads the queue and sends the email.
5. Configure retries with exponential backoff (e.g. 5 attempts), so a short
   email-provider outage is handled automatically.
6. Keep failed jobs for inspection / alerting (dead-letter idea) and make the
   job idempotent (jobId per user) so a retry does not send 2 emails.
7. For strong guarantees (user saved but Redis down), use the outbox pattern:
   write an "email pending" row in the same DB transaction, and a worker
   picks it up.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// queue.js
const { Queue, Worker } = require('bullmq');
const connection = { host: 'localhost', port: 6379 };
const emailQueue = new Queue('emails', { connection });

// signup route - fast, does not wait for email
app.post('/signup', catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  await emailQueue.add('welcome', { userId: user.id }, {
    jobId: `welcome-${user.id}`,                 // no duplicate jobs
    attempts: 5,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true,
    removeOnFail: false,                         // keep for debugging
  });
  res.status(201).json({ id: user.id });
}));

// worker.js - runs as a SEPARATE process
const worker = new Worker('emails', async (job) => {
  const user = await User.findById(job.data.userId);
  await mailer.sendWelcome(user.email);          // throw -> BullMQ retries
}, { connection, concurrency: 10 });

worker.on('failed', (job, err) =>
  logger.error({ jobId: job?.id, err }, 'email job failed'));

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "The email is a side effect, so it should not block or break signup. I save
  the user, push a job to a queue like BullMQ on Redis, and return 201
  immediately. A separate worker sends the email with retries and
  exponential backoff, and failed jobs are kept so we can alert and retry.
  I use a jobId per user so retries do not send duplicates, and for strict
  reliability I would use the outbox pattern."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Just removing `await` from sendEmail - no retries, lost on crash/restart,
  and an unhandled rejection can crash the process.
- Using setTimeout or an in-memory array as a "queue" - lost on restart and
  not shared between instances.
- Running heavy workers in the same process as the API under high load.
- No monitoring of failed jobs, so emails silently never arrive.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not just call sendEmail without await (fire and forget)?
A1: It makes the response fast, but there is no retry, the work is lost if
    the process restarts, and you must still add .catch() or the rejection
    can crash Node. A queue persists the job and retries it.

Q2: What is exponential backoff?
A2: Waiting longer after each failure, for example 2s, 4s, 8s, 16s. It gives
    the failing service time to recover and avoids flooding it.

Q3: What is the outbox pattern?
A3: In the same DB transaction as creating the user, you insert an "outbox"
    row describing the event. A separate process reads the outbox and
    publishes jobs. So the user and the event are saved together or not at
    all - no case where the user exists but the email job is lost.
*/
