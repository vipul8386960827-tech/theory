/* 29_event_loop_changes_node11.js

=====================================================
Event Loop Change in Node 11 (Microtask Timing)
=====================================================

Definition (What I should say in the interview):
- "Before Node 11, when several timers expired in the same timers phase, Node ran **all** of
   those timer callbacks first and only then drained the microtask queues. From Node 11 onwards,
   Node drains process.nextTick and Promise microtasks **after each individual setTimeout,
   setInterval and setImmediate callback**. This was done to match browser behavior, so code
   that mixes timers and Promises now behaves the same in Node and Chrome."

-----------------------------------------------------
Before vs After
-----------------------------------------------------
| Version     | Microtasks run...                                       |
|-------------|---------------------------------------------------------|
| Node <= 10  | after the whole timers phase (or whole check phase)     |
| Node 11+    | after EACH timer / immediate callback                   |

-----------------------------------------------------
Example
-----------------------------------------------------
setTimeout(() => {
  console.log('timeout 1');
  Promise.resolve().then(() => console.log('promise 1'));
  process.nextTick(() => console.log('tick 1'));
}, 0);

setTimeout(() => {
  console.log('timeout 2');
  Promise.resolve().then(() => console.log('promise 2'));
}, 0);

// Node 10 and earlier:        // Node 11 and later:
// timeout 1                   // timeout 1
// timeout 2                   // tick 1
// tick 1                      // promise 1
// promise 1                   // timeout 2
// promise 2                   // promise 2

-----------------------------------------------------
Same idea with setImmediate
-----------------------------------------------------
setImmediate(() => { console.log('imm 1'); Promise.resolve().then(() => console.log('p1')); });
setImmediate(() => console.log('imm 2'));
// Node 11+: imm 1, p1, imm 2

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Old blog posts and Stack Overflow answers often show the pre-11 output - be careful.
- The phase order itself did not change; only when microtasks are drained.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why did Node make this change?
A1: For consistency with browsers, so isomorphic code and Promise-based libraries behave predictably.

Q2: Did it affect I/O callbacks in the poll phase?
A2: Microtasks were already run after each I/O callback; the change mainly affected timers and immediates.

Q3: What would you answer if asked for "the" output?
A3: Give the Node 11+ output and mention that older versions differed.
*/
