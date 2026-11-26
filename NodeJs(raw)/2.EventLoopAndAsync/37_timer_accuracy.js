/* 37_timer_accuracy.js

=====================================================
Timer Accuracy in Node.js
=====================================================

Definition (What I should say in the interview):
- "The delay in setTimeout is a **minimum, not a guarantee**. Node promises the callback will not
   run before the delay, but it can run later, because timers are only checked in the timers
   phase, and if the main thread is busy with sync code or long callbacks, the timer just waits.
   Also, the delay is clamped: 0 becomes 1ms, and anything above about 24.8 days (2^31 - 1 ms)
   becomes 1ms with a warning. So timers are fine for scheduling, but not for precise timing."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Delay is a lower bound; actual time = delay + time until the loop reaches timers phase.
2. setTimeout(fn, 0) -> 1ms.
3. Delay > 2147483647 ms -> TimeoutOverflowWarning and set to 1ms.
4. Blocking code delays ALL timers.
5. For measuring time use process.hrtime.bigint() or performance.now(), not Date.now() differences
   across timers (Date can jump with system clock changes).

-----------------------------------------------------
Example 1 (blocked timer)
-----------------------------------------------------
const start = Date.now();
setTimeout(() => console.log('fired after', Date.now() - start, 'ms'), 100);

const end = Date.now() + 500;
while (Date.now() < end) {}          // block for 500ms

// Output: fired after ~500 ms  (not 100)

-----------------------------------------------------
Example 2 (overflow)
-----------------------------------------------------
setTimeout(() => console.log('runs almost immediately!'), 30 * 24 * 60 * 60 * 1000);
// TimeoutOverflowWarning: ... does not fit into a 32-bit signed integer. Timeout duration was set to 1.

-----------------------------------------------------
Long Delays - What to do
-----------------------------------------------------
- For "run in 30 days" use a scheduler/job queue (cron, BullMQ, Agenda) with persisted jobs,
  not an in-memory timer that dies on restart anyway.

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Using setTimeout for exact intervals in things like rate limiting windows or billing, and
  assuming exact timing.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can a timer fire earlier than its delay?
A1: No, Node guarantees it will not fire before the threshold (small OS clock rounding aside).

Q2: Do thousands of timers hurt performance?
A2: Node groups timers with the same duration in lists, so it scales well; still, clear the ones you no longer need.

Q3: How would you build a more accurate interval?
A3: Calculate the next delay from the expected time (drift correction) using recursive setTimeout.
*/
