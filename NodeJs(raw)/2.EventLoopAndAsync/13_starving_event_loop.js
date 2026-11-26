/* 13_starving_event_loop.js

=====================================================
Starving the Event Loop
=====================================================

Definition (What I should say in the interview):
- "Starving the event loop means the loop never gets to move to its next phase, so I/O, timers and
   new requests never get processed, even though no single function is "long". It usually happens
   with **recursive process.nextTick or endless Promise microtasks**, because Node drains those
   queues completely before continuing, and new items added during the drain are also run. The
   fix is to yield with setImmediate or setTimeout so the loop can breathe."

-----------------------------------------------------
Blocking vs Starving
-----------------------------------------------------
| Blocking                               | Starving                                       |
|----------------------------------------|------------------------------------------------|
| one long synchronous task              | many tiny tasks that keep re-queuing           |
| e.g. while loop, readFileSync          | e.g. recursive nextTick / Promise.then         |
| stack never empties                    | stack empties but microtask queue never does   |

-----------------------------------------------------
Example (starvation - timer NEVER fires)
-----------------------------------------------------
setTimeout(() => console.log('timer'), 0);

let count = 0;
function spin() {
  count++;
  process.nextTick(spin);          // re-queue forever
}
spin();
// 'timer' is never printed; CPU at 100%.

-----------------------------------------------------
Example (fixed - setImmediate lets the loop move)
-----------------------------------------------------
setTimeout(() => console.log('timer'), 0);

let n = 0;
function work() {
  if (++n < 1e5) setImmediate(work);   // check phase -> loop continues
}
work();
// 'timer' prints normally.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Same issue with an async function that loops forever on "await Promise.resolve()" - it never
  yields to macrotasks.
- Starvation can also come from a flood of resolved Promises in a tight loop over big data.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can recursive setImmediate starve I/O?
A1: No. Immediates added during the check phase run in the next iteration, so poll gets its turn.

Q2: Does "await" inside a loop always yield to I/O?
A2: Only if it awaits real I/O. Awaiting already-resolved values just queues microtasks.

Q3: How do you detect starvation in production?
A3: Event loop lag metrics spike and health check endpoints time out.
*/
