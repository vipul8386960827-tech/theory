/* 39_timer_ref_unref.js

=====================================================
Timer ref() and unref()
=====================================================

Definition (What I should say in the interview):
- "By default, an active timer keeps the Node process alive - the event loop will not exit while
   it is pending. Calling **timer.unref()** tells Node 'do not keep the process alive just for
   this timer'; if nothing else is left, the process exits and the timer never fires.
   **timer.ref()** reverses that. I use unref for background things like metrics flushing,
   cache cleanup or a heartbeat, so they do not prevent a clean shutdown or keep tests hanging."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. setTimeout / setInterval / setImmediate return objects with ref(), unref(), hasRef().
2. Timers are ref'ed by default.
3. unref'ed timer still fires normally if the process is alive for other reasons.
4. Servers, sockets and child processes also have ref()/unref().
5. timeout.refresh() restarts the timer with the same delay (useful for idle timeouts).

-----------------------------------------------------
Example
-----------------------------------------------------
const metrics = setInterval(() => console.log('flush metrics'), 1000);
metrics.unref();                                   // background job

console.log('hasRef:', metrics.hasRef());          // hasRef: false

setTimeout(() => console.log('main work done'), 2500);

// Output:
// hasRef: false
// flush metrics
// flush metrics
// main work done
// -> process exits; the interval does not keep it alive

-----------------------------------------------------
Example (idle timeout with refresh)
-----------------------------------------------------
const idle = setTimeout(() => console.log('closing idle connection'), 5000);
function onActivity() { idle.refresh(); }          // push the deadline back on each activity

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Unref'ing a timer that does important work (like a final retry). If the process becomes idle,
  that work silently never happens.
- Jest/Mocha "did not exit" warnings often come from intervals or DB pools not closed/unref'ed.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between clearTimeout and unref?
A1: clearTimeout cancels the timer; unref keeps it scheduled but stops it from holding the process alive.

Q2: Does unref make the timer less accurate?
A2: No, it only affects whether the loop counts it as a reason to stay alive.

Q3: Where else have you seen unref?
A3: On server.unref() for helper servers, child processes, and health/metrics intervals in libraries.
*/
