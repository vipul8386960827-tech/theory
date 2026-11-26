/* 28_node_vs_browser_event_loop.js

=====================================================
Node.js Event Loop vs Browser Event Loop
=====================================================

Definition (What I should say in the interview):
- "Both run JavaScript on a single thread with macrotasks and microtasks, but they are implemented
   differently. The browser event loop is defined by the HTML spec: it takes one task, drains all
   microtasks, and then may **render** the page, with things like requestAnimationFrame. Node's
   loop is implemented by **libuv** and has **phases** - timers, poll, check, close - plus Node-only
   queues like process.nextTick and setImmediate. Since Node 11 the microtask timing matches the
   browser, so most Promise and setTimeout puzzles behave the same."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect              | Browser                              | Node.js                           |
|---------------------|--------------------------------------|-----------------------------------|
| Implemented by      | browser engine (HTML spec)           | libuv                             |
| Structure           | task queues + rendering steps        | 6 phases per iteration            |
| Rendering           | yes (style, layout, paint, rAF)      | no                                |
| Node-only APIs      | -                                    | process.nextTick, setImmediate    |
| Browser-only        | requestAnimationFrame, requestIdleCallback | -                           |
| I/O sources         | DOM events, network, user input      | fs, sockets, child processes      |
| Timer min delay     | clamped to 4ms after nesting >= 5    | 1ms minimum                       |

-----------------------------------------------------
Example (same in both, Node 11+)
-----------------------------------------------------
setTimeout(() => {
  console.log('timeout 1');
  Promise.resolve().then(() => console.log('micro 1'));
}, 0);
setTimeout(() => console.log('timeout 2'), 0);

// Browser and Node 11+: timeout 1, micro 1, timeout 2

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- In the browser, a long task blocks clicks and rendering -> UI freezes.
  In Node, a long task blocks all incoming requests -> server freezes.
- Node exits when there is nothing left to do; a browser tab's loop lives as long as the page.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does the browser have a check phase or setImmediate?
A1: No standard setImmediate; you would use setTimeout, MessageChannel or queueMicrotask.

Q2: Does the browser have the nextTick queue?
A2: No, only the single microtask queue (Promises, queueMicrotask, MutationObserver).

Q3: Why does Node have phases at all?
A3: Because libuv groups callbacks by type (timers, I/O, immediates, close) to handle server I/O efficiently.
*/
