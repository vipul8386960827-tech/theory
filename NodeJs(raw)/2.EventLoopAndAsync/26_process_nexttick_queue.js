/* 26_process_nexttick_queue.js

=====================================================
The process.nextTick Queue
=====================================================

Definition (What I should say in the interview):
- "process.nextTick puts a callback into a special **nextTick queue** that Node processes
   immediately after the current JavaScript operation completes - before Promise microtasks and
   before the event loop moves to the next phase. Technically it is not part of the event loop
   at all; Node drains it every time it comes back from JS to C++. It is the **highest priority**
   async queue in Node, which makes it powerful but also easy to misuse."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Order after each callback: nextTick queue fully -> Promise queue fully -> repeat if new ticks.
   A nextTick queued from inside a .then waits until the current promise queue is empty.
2. nextTicks added while draining are run in the same drain (can starve the loop).
3. Accepts extra args: process.nextTick(fn, arg1, arg2).
4. Node-only API; not available in browsers.

-----------------------------------------------------
Example (interleaving nextTick and promises)
-----------------------------------------------------
Promise.resolve().then(() => {
  console.log('promise 1');
  process.nextTick(() => console.log('tick inside promise'));
}).then(() => console.log('promise 2'));

process.nextTick(() => {
  console.log('tick 1');
  process.nextTick(() => console.log('tick 2 (nested)'));
});

// Output:
// tick 1
// tick 2 (nested)          <- nested tick still runs before any promise
// promise 1
// promise 2                <- V8 drains the WHOLE promise queue first
// tick inside promise      <- then Node checks the nextTick queue again

-----------------------------------------------------
Why Node uses it internally
-----------------------------------------------------
- To emit errors/events asynchronously, after the user has had a chance to attach handlers.
- Example: net.createServer().listen() emits 'listening' via nextTick.
- To keep APIs consistently async ("don't release Zalgo").

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Using nextTick to "defer heavy work". It does not defer to after I/O; it runs before I/O.
  Use setImmediate for that.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is nextTick part of the event loop phases?
A1: No, it is processed between operations, outside the phase structure.

Q2: In ESM, does nextTick still run before promises?
A2: In ESM the module itself is evaluated as part of a Promise job, so at top level of an .mjs file
    promise callbacks can run before nextTick. Inside normal callbacks the usual order applies.

Q3: Is there a limit on the nextTick queue?
A3: No built-in limit - that is exactly why recursive nextTick can freeze I/O forever.
*/
