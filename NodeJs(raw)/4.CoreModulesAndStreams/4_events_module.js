/* 4_events_module.js

=====================================================
events Module (EventEmitter)
=====================================================

Definition (What I should say in the interview):
- "The events module provides the EventEmitter class, which implements the observer / pub-sub
   pattern. You register listeners with on() and trigger them with emit(). A lot of Node core is
   built on it - streams, http servers, process, sockets. One important thing: emit() calls the
   listeners **synchronously**, in the order they were registered."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. on / addListener -> register; once -> runs only one time.
2. emit(name, ...args) -> calls listeners synchronously, returns true if there were listeners.
3. off / removeListener, removeAllListeners.
4. 'error' event is special: if emitted with no listener, Node THROWS and can crash the process.
5. Default max 10 listeners per event -> warning (possible memory leak). setMaxListeners(n).
6. prependListener -> add to the front; events.once(emitter, name) -> returns a Promise.

-----------------------------------------------------
Example
-----------------------------------------------------
const EventEmitter = require('events');

class OrderService extends EventEmitter {
  placeOrder(order) {
    // ...save order
    this.emit('orderPlaced', order);
  }
}

const svc = new OrderService();
svc.on('orderPlaced', (o) => console.log('Send email for', o.id));
svc.once('orderPlaced', (o) => console.log('First order ever:', o.id));
svc.on('error', (err) => console.error('Handled:', err.message));

svc.placeOrder({ id: 1 });   // both listeners
svc.placeOrder({ id: 2 });   // only the 'on' listener
console.log('after emit');   // prints after listeners (sync)

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Adding listeners inside a request handler and never removing them -> memory leak and the
  "MaxListenersExceededWarning".
- Not listening for 'error' -> unhandled 'error' event crashes the app.
- Assuming emit is async. If you want async, use setImmediate / process.nextTick inside.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is EventEmitter asynchronous?
A1: No. emit runs listeners synchronously. The async part comes from what triggers the emit (I/O).

Q2: How do you await an event once?
A2: const [data] = await events.once(emitter, 'ready');

Q3: EventEmitter vs a message queue?
A3: EventEmitter is in-process memory only; a queue (RabbitMQ, Kafka) works across processes and
    survives restarts.
*/
