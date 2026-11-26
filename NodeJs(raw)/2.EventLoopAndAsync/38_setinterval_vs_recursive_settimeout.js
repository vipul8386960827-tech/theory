/* 38_setinterval_vs_recursive_settimeout.js

=====================================================
setInterval vs Recursive setTimeout
=====================================================

Definition (What I should say in the interview):
- "setInterval schedules the callback every N milliseconds **regardless of whether the previous
   run has finished**. If the callback is async, like a DB poll that sometimes takes longer than
   the interval, runs can overlap and pile up. With a **recursive setTimeout**, I schedule the
   next run only after the current one completes, so there is a guaranteed gap and no overlap.
   For polling jobs with async work I prefer recursive setTimeout."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect                  | setInterval                    | recursive setTimeout             |
|-------------------------|--------------------------------|----------------------------------|
| Next run scheduled      | on a fixed clock               | after current run finishes       |
| Overlap with async work | possible                       | never                            |
| Gap between runs        | can be ~0 if work is slow      | always at least the delay        |
| Dynamic delay (backoff) | hard                           | easy - change delay each time    |
| Stop                    | clearInterval(id)              | clearTimeout / a stop flag       |

-----------------------------------------------------
Example 1 (problem with setInterval + async)
-----------------------------------------------------
const slowJob = () => new Promise((r) => setTimeout(r, 1500));   // takes 1.5s
let running = 0;

const id = setInterval(async () => {
  running++;
  console.log('started, running now:', running);   // goes 1, 2, 2...
  await slowJob();
  running--;
}, 1000);
setTimeout(() => clearInterval(id), 5000);

-----------------------------------------------------
Example 2 (recursive setTimeout - no overlap, with backoff)
-----------------------------------------------------
let delay = 1000;
let stopped = false;

async function poll() {
  try {
    await slowJob();
    console.log('poll done');
    delay = 1000;                                  // reset on success
  } catch (e) {
    delay = Math.min(delay * 2, 30000);            // exponential backoff on error
  }
  if (!stopped) setTimeout(poll, delay);
}
poll();
setTimeout(() => { stopped = true; }, 6000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- setInterval is fine for short, synchronous, cheap work (e.g. updating an in-memory counter).
- With recursive setTimeout, total period = work time + delay, so it drifts; that is OK for polling.
- Always clear intervals on shutdown, otherwise they keep the process alive.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does setInterval "catch up" if the loop was blocked for a long time?
A1: No, it does not fire many times to catch up; it runs once when possible and continues from there.

Q2: Is there a Promise-based interval?
A2: Yes, for await (const _ of setInterval(1000)) from timers/promises - it waits for each loop body.

Q3: What would you use for jobs across multiple servers?
A3: A distributed scheduler or job queue, so only one instance runs each job.
*/
