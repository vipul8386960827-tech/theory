/* 40_eventemitter_sync_vs_async.js

=====================================================
Is EventEmitter Synchronous or Asynchronous?
=====================================================

Definition (What I should say in the interview):
- "EventEmitter's emit() is **synchronous**. When I call emit, Node calls every listener for that
   event one by one, in registration order, **before emit returns**. Nothing goes through the
   event loop. Events often feel async because they are triggered by async I/O, like a 'data'
   event on a socket, but the emit call itself is plain synchronous function calls. If I want a
   listener to do work asynchronously, I use setImmediate or process.nextTick inside it."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. emit() -> loops over listeners and calls them directly.
2. A slow listener blocks the emitter and all later listeners.
3. An error thrown in a listener propagates up to the emit() caller.
4. async listeners: emit does NOT await them; their rejections are unhandled unless you use
   new EventEmitter({ captureRejections: true }), which routes them to the 'error' event.

-----------------------------------------------------
Example (proof that emit is sync)
-----------------------------------------------------
const EventEmitter = require('events');
const e = new EventEmitter();

e.on('greet', () => console.log('2. listener A'));
e.on('greet', () => {
  setImmediate(() => console.log('5. listener B async part'));
  console.log('3. listener B');
});

console.log('1. before emit');
e.emit('greet');
console.log('4. after emit');

// Output:
// 1. before emit
// 2. listener A
// 3. listener B
// 4. after emit
// 5. listener B async part

-----------------------------------------------------
Example (error propagation)
-----------------------------------------------------
e.on('save', () => { throw new Error('listener failed'); });
try { e.emit('save'); }
catch (err) { console.log('caught at emit:', err.message); }   // caught at emit: listener failed

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Emitting an event in a constructor before anyone has subscribed - the listener is attached
  later and misses it. Fix: emit via process.nextTick.
- Doing heavy work inside listeners of a hot event (like every request) and slowing everything.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How can you wait for an event with async/await?
A1: const [value] = await events.once(emitter, 'ready'); - it returns a Promise.

Q2: Does emit wait for async listeners?
A2: No. It calls them and ignores the returned Promises.

Q3: Why did Node make emit synchronous?
A3: It is simple and fast, and order is predictable; async scheduling is left to the developer.
*/
