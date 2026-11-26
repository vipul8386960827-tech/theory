/* 14_event_emitter.js

=====================================================
EventEmitter
=====================================================

Definition (What I should say in the interview):
- "EventEmitter is a class from the 'events' module that implements the **observer pattern** in
   Node. An object can emit named events, and other code registers listeners for those names with
   .on(). Many core modules are built on it - http servers, streams, sockets, process. I use it
   to decouple parts of my app, for example emitting 'orderCreated' and letting the email and
   analytics modules listen without the order service knowing about them."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. const EventEmitter = require('events');
2. .on(name, fn) registers, .emit(name, ...args) triggers.
3. Listeners run in the order they were registered.
4. The special 'error' event: if emitted with no listener, Node **throws** and can crash.
5. Usually you extend EventEmitter in your own class.

-----------------------------------------------------
Example
-----------------------------------------------------
const EventEmitter = require('events');

class OrderService extends EventEmitter {
  create(order) {
    // ...save to DB
    this.emit('orderCreated', order);
  }
}

const orders = new OrderService();

orders.on('orderCreated', (o) => console.log('email sent for', o.id));
orders.on('orderCreated', (o) => console.log('analytics tracked', o.id));
orders.on('error', (err) => console.error('order error:', err.message));

orders.create({ id: 101 });
orders.emit('error', new Error('payment failed'));

// Output:
// email sent for 101
// analytics tracked 101
// order error: payment failed

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Not adding an 'error' listener on streams/emitters -> unhandled 'error' crashes the app.
- Using arrow functions when you need "this" to be the emitter inside the listener.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- A YouTube channel: the channel emits "new video", subscribers get notified. The channel does
  not need to know who the subscribers are.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which core modules use EventEmitter?
A1: http.Server, net.Socket, streams, process, child_process and many more.

Q2: EventEmitter vs a message queue like RabbitMQ?
A2: EventEmitter is in-process memory only; a queue works across processes and survives restarts.

Q3: Does emit return anything?
A3: Yes, true if the event had listeners, false otherwise.
*/
