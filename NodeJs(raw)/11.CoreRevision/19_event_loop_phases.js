/* 2_event_loop_phases.js

=====================================================
Event Loop Phases
=====================================================

Definition (What I should say in the interview):
- "Each iteration of the Node event loop, called a tick, goes through fixed phases in order:
   **timers, pending callbacks, idle/prepare, poll, check, and close callbacks**. Each phase has
   its own FIFO queue of callbacks. Timers runs expired setTimeout/setInterval callbacks, poll
   waits for and runs I/O callbacks, check runs setImmediate, and close handles things like
   socket 'close' events. Microtasks are drained after every single callback in between."

-----------------------------------------------------
The Phases
-----------------------------------------------------
   +---------------------------+
   | 1. timers                 |  setTimeout / setInterval callbacks whose time has expired
   | 2. pending callbacks      |  some system I/O callbacks deferred from previous loop (e.g. TCP errors)
   | 3. idle, prepare          |  internal use only
   | 4. poll                   |  get new I/O events, run I/O callbacks (fs, network); may block here waiting
   | 5. check                  |  setImmediate callbacks
   | 6. close callbacks        |  socket.on('close'), handle cleanup
   +---------------------------+
   (process.nextTick + promise microtasks run between each callback)

-----------------------------------------------------
Poll Phase Details (most asked)
-----------------------------------------------------
- If poll queue has callbacks -> run them until empty (or a system limit).
- If poll queue is empty:
  - setImmediate scheduled -> move to check phase.
  - otherwise wait for I/O, but only until the nearest timer is due.

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');
const net = require('net');

fs.readFile(__filename, () => {            // poll phase
  console.log('poll: file read');
  setTimeout(() => console.log('timers'), 0);
  setImmediate(() => console.log('check: immediate'));
});

const server = net.createServer().listen(0, () => {
  server.close(() => console.log('close callback'));
});

// Output for the readFile part is always:
// poll: file read
// check: immediate
// timers

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Listing process.nextTick or Promises as a phase. They are NOT phases; they are microtask queues
  processed between callbacks.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which phase does setImmediate run in?
A1: The check phase, right after poll.

Q2: Why can the loop "block" in the poll phase?
A2: When nothing else is pending, it waits there for I/O events instead of busy-looping, which saves CPU.

Q3: Where do fs.readFile callbacks run?
A3: In the poll phase, once the thread pool finishes the read.
*/
