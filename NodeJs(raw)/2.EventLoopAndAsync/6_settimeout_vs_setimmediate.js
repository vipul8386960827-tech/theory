/* 6_settimeout_vs_setimmediate.js

=====================================================
setTimeout(fn, 0) vs setImmediate
=====================================================

Definition (What I should say in the interview):
- "setTimeout(fn, 0) runs in the **timers phase** once at least 1ms has passed, while setImmediate
   runs in the **check phase**. If I call both from the main module, the order is **not
   deterministic** - it depends on whether 1ms has already elapsed when the loop starts, which
   depends on process performance. But inside an I/O callback, **setImmediate always runs first**,
   because after the poll phase the loop goes straight to check before wrapping back to timers."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. setTimeout(fn, 0) is actually setTimeout(fn, 1) - Node clamps 0 to 1ms.
2. Main module: order can change between runs.
3. Inside I/O callback (poll phase): setImmediate -> then setTimeout, guaranteed.
4. If you need "run after I/O, as soon as possible", setImmediate is the right tool.

-----------------------------------------------------
Example 1 (main module - NOT deterministic)
-----------------------------------------------------
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

// Output: sometimes "timeout, immediate", sometimes "immediate, timeout"

-----------------------------------------------------
Example 2 (inside I/O callback - deterministic)
-----------------------------------------------------
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});

// Output (always):
// immediate
// timeout

-----------------------------------------------------
Why?
-----------------------------------------------------
- Main module: when the loop enters the timers phase, if 1ms has passed the timer fires first;
  if not, the loop moves on and check (setImmediate) runs first.
- I/O callback: we are in poll; next phase is check, timers only come in the next iteration.

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Confidently answering "setTimeout 0 always runs first". Interviewers ask this exact question to
  see if you know about the non-determinism.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can setTimeout(fn, 0) run before a resolved Promise?
A1: No. Promise callbacks are microtasks and run before the loop reaches any phase.

Q2: How do you force setImmediate to run first in the main module?
A2: Schedule both inside an I/O callback, for example inside fs.readFile.

Q3: Is setImmediate available in browsers?
A3: Not as a standard; it is a Node API.
*/
