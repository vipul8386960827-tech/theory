/* 3_high_event_loop_lag_in_production.js

=====================================================
Scenario: High Event Loop Lag in Production
=====================================================

The Question (how the interviewer asks it):
- "Your monitoring dashboard shows event loop lag of 300-500ms in production at certain
   times. Users complain about slow responses. What do you do?"

What the interviewer is checking:
- Do you know what event loop lag means (time a callback waits before it can run)?
- Can you find WHICH code blocks the loop in production, safely?
- Do you know typical causes: sync APIs, big JSON, heavy regex, large loops, GC pressure.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Explain lag: if a timer set for 0ms runs after 400ms, the main thread was busy for 400ms.
   Every request in that time waits, so latency goes up for everyone.
2. Correlate: when does the lag happen? Match it with traffic, specific endpoints, cron jobs,
   deploys, and memory/GC graphs in the APM (Datadog, New Relic, Grafana).
3. Check memory too: if heap is close to the limit, long GC pauses also cause lag.
4. Find the blocking code: take a CPU profile in production or staging. Options:
   `node --cpu-prof`, `node --inspect` + Chrome DevTools, `clinic flame`, or the APM profiler.
5. Look for usual suspects: fs.readFileSync / crypto sync calls in request handlers,
   JSON.parse/stringify of very large objects, catastrophic regex (ReDoS), sorting or
   looping over huge arrays, sync logging (console.log in a hot path under heavy load).
6. Fix: use async APIs, paginate / stream big data, fix the regex, move CPU work to worker
   threads or a queue, split big loops into chunks (setImmediate) if needed.
7. Add protection: an alert on event loop delay p99, and optionally load shedding (return 503
   when lag is too high, e.g. with `@fastify/under-pressure` or a small middleware).

-----------------------------------------------------
Code Example
-----------------------------------------------------
const { monitorEventLoopDelay } = require('node:perf_hooks');

// 1) Measure lag (send these numbers to your metrics system)
const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();
setInterval(() => {
  const p99 = h.percentile(99) / 1e6;               // nanoseconds -> ms
  console.log(`event loop delay p99=${p99.toFixed(1)}ms max=${(h.max / 1e6).toFixed(1)}ms`);
  h.reset();
}, 10_000).unref();

// 2) Load shedding: reject early instead of making everyone slow
let currentLag = 0;
setInterval(() => { currentLag = h.percentile(99) / 1e6; }, 1000).unref();
app.use((req, res, next) => {
  if (currentLag > 200) return res.status(503).set('Retry-After', '5').send('Busy');
  next();
});

// 3) A typical cause and fix
// BAD:  const data = fs.readFileSync('./big.json'); JSON.parse(data) inside a route
// GOOD: load once at startup, or use fs.promises + streaming parser for big files
const fsp = require('node:fs/promises');
app.get('/config', async (req, res) => {
  const text = await fsp.readFile('./config.json', 'utf8'); // non-blocking read
  res.json(JSON.parse(text));                              // keep the file small
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Event loop lag means the main thread is busy, so all callbacks and requests wait. First
   I correlate the lag with traffic, endpoints, cron jobs and memory/GC graphs. Then I take
   a CPU profile with --cpu-prof, --inspect or clinic flame to find the blocking function.
   Common causes are sync fs/crypto calls, huge JSON parsing, bad regex and big loops. I fix
   that code or move it to worker threads, and I add an alert on event loop delay."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Restarting the server or adding instances and calling it fixed.
- Confusing event loop lag with network latency or slow DB queries (those do NOT block the loop).
- Not knowing how to profile, only "I will add console.log everywhere".
- Ignoring GC: a memory problem can show up as event loop lag.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does a slow database query cause event loop lag?
A1: No. While waiting for the DB, the event loop is free. It makes that request slow, but
    does not block others (unless the pool is exhausted - that is queuing, not lag).

Q2: What is ReDoS?
A2: Regular expression denial of service: a regex with nested quantifiers like /(a+)+$/ can
    take exponential time on some inputs and block the event loop. Fix the pattern or limit
    input length.

Q3: Is splitting work with setImmediate a good fix?
A3: It helps for medium work because other callbacks can run between chunks, but total CPU
    time is the same. For really heavy work, worker threads are better.
*/
