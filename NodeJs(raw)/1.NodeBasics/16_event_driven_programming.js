/* 16_event_driven_programming.js

=====================================================
Event-Driven Programming
=====================================================

Definition (What I should say in the interview):
- "Event-driven programming is a style where the flow of the program is determined by
   **events** - like an incoming HTTP request, a file finishing reading, or a timer firing.
   We register **listeners/callbacks** for events, and they run when the event occurs. Node.js
   is built around this: the event loop waits for events and dispatches them to handlers, and
   many core modules extend **EventEmitter**."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Event** -> something happened (request, data, error, close).
2. **Listener / handler** -> function that runs when the event fires.
3. **Emitter** -> object that emits events (EventEmitter).
4. Core modules built on EventEmitter: http.Server, streams, process, net.Socket.

-----------------------------------------------------
Example
-----------------------------------------------------
const EventEmitter = require('events');
const orders = new EventEmitter();

orders.on('placed', (order) => console.log('Send email for', order.id));
orders.on('placed', (order) => console.log('Update stock for', order.id));

orders.emit('placed', { id: 101 });

// Node core example:
server.on('request', (req, res) => res.end('hi'));   // http server emits 'request'

-----------------------------------------------------
Benefits
-----------------------------------------------------
- Loose coupling (emitter doesn't know who listens).
- Natural fit for async I/O and real-time apps.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Event-driven vs callbacks?
A1: Callbacks are single "done" functions for one operation; events can fire many times and
    have many listeners.

Q2: Are EventEmitter listeners async?
A2: No - emit() calls listeners synchronously, in the order they were registered.
*/
