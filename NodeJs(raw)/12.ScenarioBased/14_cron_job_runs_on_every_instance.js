/* 14_cron_job_runs_on_every_instance.js

=====================================================
Scenario: Cron Job Runs on Every Instance
=====================================================

The Question (how the interviewer asks it):
- "We use node-cron to send a daily report email. After we scaled to 4
  instances, every customer gets the report 4 times. How do you fix it?"

What the interviewer is checking:
- Do you understand that in-process timers run in EVERY instance/process?
- Do you know options: single scheduler, distributed lock, queue repeatable
  jobs, platform cron (K8s CronJob)?
- Can you use Redis SET NX PX correctly (lock with expiry, safe release)?
- Do you think about idempotency if the job still runs twice?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Explain the cause: node-cron / setInterval lives inside each Node process.
   4 instances (or PM2 cluster with 4 workers) = 4 schedulers.
2. Option A - single scheduler: run cron in a separate "scheduler" process
   with only 1 replica, or use the platform (Kubernetes CronJob, cloud
   scheduler). Simple and clear.
3. Option B - distributed lock: every instance tries to take a Redis lock
   with `SET key value NX PX ttl`. Only the one that gets it runs the job.
4. Lock details: TTL must be longer than the job, value must be unique so
   only the owner can release it (check-and-delete in a Lua script).
5. Option C - BullMQ repeatable job / job scheduler: the schedule is stored
   in Redis once, and one worker picks up each run.
6. Make the job itself idempotent anyway: e.g. store "report sent for
   2026-11-26" with a unique key, so a rare double run does no harm.
7. Avoid `NODE_APP_INSTANCE === '0'` tricks for Kubernetes - every pod has
   its own value and pods come and go.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const cron = require('node-cron');
const crypto = require('crypto');
const Redis = require('ioredis');
const redis = new Redis();

const RELEASE_LUA = `
  if redis.call('get', KEYS[1]) == ARGV[1] then
    return redis.call('del', KEYS[1])
  end
  return 0`;

async function runWithLock(key, ttlMs, fn) {
  const token = crypto.randomUUID();
  const ok = await redis.set(key, token, 'PX', ttlMs, 'NX');
  if (!ok) return;                 // another instance has the lock
  try {
    await fn();
  } finally {
    await redis.eval(RELEASE_LUA, 1, key, token); // delete only my lock
  }
}

// every instance schedules it, but only ONE runs it
cron.schedule('0 8 * * *', () =>
  runWithLock('lock:daily-report', 10 * 60 * 1000, sendDailyReports)
    .catch((err) => logger.error({ err }, 'daily report failed')));

// Alternative (BullMQ): stored once in Redis, run by one worker
// await queue.upsertJobScheduler('daily-report',
//   { pattern: '0 8 * * *' }, { name: 'daily-report' });

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "node-cron runs inside each process, so 4 instances means 4 runs. The
  simplest fix is a single scheduler: a separate process with one replica
  or a Kubernetes CronJob. If cron must stay in the app, I use a Redis
  distributed lock with SET NX and an expiry, so only one instance runs the
  job, and I release it safely. Another clean option is BullMQ repeatable
  jobs. I also make the job idempotent in case it ever runs twice."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- A Redis lock with no TTL - if the instance crashes, the lock stays forever.
- Releasing with a plain DEL - you may delete a lock another instance now owns.
- "Just run 1 instance" - that removes scaling and high availability.
- Using an in-memory flag (`let isRunning`) - not shared between instances.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What if the job takes longer than the lock TTL?
A1: The lock expires and another instance may start the same job. Set TTL
    larger than the worst case, or extend the lock while running (Redlock
    libraries support this), and keep the job idempotent.

Q2: Why is the lock value a random token?
A2: So only the instance that created the lock can delete it. The Lua script
    checks the value and deletes in one atomic step.

Q3: Does PM2 cluster mode cause the same problem?
A3: Yes. Each cluster worker is a separate process with its own timers. You
    can run cron in a separate PM2 app with 1 instance, or use a lock.
*/
