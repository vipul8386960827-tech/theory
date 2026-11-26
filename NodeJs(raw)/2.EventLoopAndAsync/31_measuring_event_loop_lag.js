/* 31_measuring_event_loop_lag.js

=====================================================
Measuring Event Loop Lag (Delay)
=====================================================

Definition (What I should say in the interview):
- "Event loop lag is the delay between when a callback **should** run and when it **actually**
   runs, because the main thread was busy with something else. It is one of the best health
   metrics for a Node service - high lag means requests are waiting in line. I measure it with
   **perf_hooks.monitorEventLoopDelay**, which gives a histogram with mean, max and percentiles,
   and with **performance.eventLoopUtilization()**, which tells how busy the loop is. Tools like
   clinic.js, APMs and Prometheus clients expose these too."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Healthy service: lag of a few ms. Spikes of 100ms+ mean blocking code.
2. monitorEventLoopDelay -> histogram in **nanoseconds** (min, max, mean, percentile(99)).
3. eventLoopUtilization (ELU) -> ratio 0..1 of time the loop was active vs idle.
4. Simple manual method: schedule a timer and compare expected vs actual time.

-----------------------------------------------------
Example 1 (built-in histogram)
-----------------------------------------------------
const { monitorEventLoopDelay, performance } = require('perf_hooks');

const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

// simulate blocking every 500ms
setInterval(() => { const end = Date.now() + 100; while (Date.now() < end) {} }, 500);

setInterval(() => {
  console.log({
    meanMs: (h.mean / 1e6).toFixed(1),
    p99Ms: (h.percentile(99) / 1e6).toFixed(1),
    maxMs: (h.max / 1e6).toFixed(1),
    elu: performance.eventLoopUtilization().utilization.toFixed(2),
  });
  h.reset();
}, 2000);
// max/p99 will show around 100ms because of the busy loop

-----------------------------------------------------
Example 2 (manual measurement)
-----------------------------------------------------
let last = process.hrtime.bigint();
setInterval(() => {
  const now = process.hrtime.bigint();
  const lagMs = Number(now - last) / 1e6 - 1000;
  if (lagMs > 50) console.warn('event loop lag:', lagMs.toFixed(1), 'ms');
  last = now;
}, 1000).unref();

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Use p99/max, not only mean - short spikes hide in the average.
- Some load balancers / health checks can return 503 when lag is high (e.g. toobusy-js idea).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Lag is high but CPU looks low - possible?
A1: It can happen with long GC pauses or CPU throttling in containers. If lag is LOW but responses are
    slow, the bottleneck is elsewhere - DB, external APIs or a saturated thread pool.

Q2: Lag is high - what is your next step?
A2: Take a CPU profile (--cpu-prof, clinic flame) to find the synchronous hot function.

Q3: Why unref() the monitoring timer?
A3: So the monitor alone does not keep the process alive.
*/
