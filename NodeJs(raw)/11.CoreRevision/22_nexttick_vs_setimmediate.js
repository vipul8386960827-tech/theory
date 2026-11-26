/* 5_nexttick_vs_setimmediate.js

=====================================================
process.nextTick vs setImmediate
=====================================================

Definition (What I should say in the interview):
- "process.nextTick schedules a callback to run **right after the current operation finishes**,
   before the event loop continues and even before Promise callbacks. setImmediate schedules a
   callback in the **check phase** of the event loop, after I/O has been polled. The names are
   confusing - nextTick actually runs sooner, setImmediate runs later. I prefer setImmediate in
   most cases because recursive nextTick can starve I/O."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature           | process.nextTick              | setImmediate                  |
|-------------------|-------------------------------|-------------------------------|
| Queue             | nextTick queue (microtask)    | check phase queue (macrotask) |
| Runs              | after current op, before loop | in check phase of the loop    |
| vs Promises       | before .then callbacks        | after them                    |
| Recursion risk    | can starve I/O forever        | safe, I/O gets a turn         |
| Browser support   | Node only                     | Node only (non-standard)      |

-----------------------------------------------------
Example
-----------------------------------------------------
setImmediate(() => console.log('3. setImmediate'));
Promise.resolve().then(() => console.log('2. promise'));
process.nextTick(() => console.log('1. nextTick'));
console.log('0. sync');

// Output:
// 0. sync
// 1. nextTick
// 2. promise
// 3. setImmediate

-----------------------------------------------------
Real Use Case of nextTick
-----------------------------------------------------
- Emitting an event after the constructor returns, so the caller can attach listeners first:
  const EventEmitter = require('events');
  class Conn extends EventEmitter {
    constructor() { super(); process.nextTick(() => this.emit('ready')); }
  }
  new Conn().on('ready', () => console.log('ready'));   // works

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which one does the Node documentation recommend?
A1: setImmediate, because it is easier to reason about and does not starve the loop.

Q2: Can nextTick block I/O?
A2: Yes. If a nextTick callback keeps scheduling another nextTick, the loop never moves on.

Q3: When would you still use nextTick?
A3: To make an API consistently async, or to run something after the current stack but before any I/O.
*/
