/* 422_events_module.js

=====================================================
Events Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `events` module in Node.js provides the **EventEmitter class**, which allows objects to **emit and listen for events**. 
   It is a core part of Node.js architecture, enabling asynchronous and event-driven programming, 
   commonly used for handling actions like data arrival, user interactions, or system events."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides the `EventEmitter` class to create event-driven objects.
2. Objects can **emit events** using `emit()` method.
3. Can **listen for events** using `on()` or `once()`.
4. Supports removing listeners with `removeListener()` or `off()`.
5. Supports **listener count** and **max listeners** configuration.
6. Underpins **many Node.js core modules** like `http`, `streams`, and `net`.

-----------------------------------------------------
Basic Example (Creating Custom EventEmitter)
-----------------------------------------------------
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listen for event
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit event
myEmitter.emit('greet', 'Kaizer'); // Hello, Kaizer!

// Using once
myEmitter.once('welcome', () => {
  console.log('Welcome once!');
});
myEmitter.emit('welcome'); // Welcome once!
myEmitter.emit('welcome'); // Will not trigger

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Handling asynchronous actions (e.g., reading files, network requests).
- Building custom modules that emit events.
- Implementing server-side notifications or message queues.
- Underlying architecture for streams, HTTP requests, and WebSocket events.
- Decoupling code using event-driven design.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Each `EventEmitter` instance maintains its own **listener list**.
2. Avoid memory leaks by removing listeners when not needed.
3. Default max listeners is 10; can be increased using `setMaxListeners()`.
4. `emit()` returns true if event had listeners, false otherwise.
5. Supports **synchronous invocation** of listeners.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `EventEmitter` as a **radio station**:
  - The object emits signals (events), and listeners tune in to respond when those signals occur.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is EventEmitter in Node.js?  
A1: A class that allows objects to emit and listen for events, enabling event-driven programming.

Q2: Difference between `on()` and `once()`?  
A2: `on()` listens multiple times; `once()` listens only for the first emission.

Q3: How do you remove an event listener?  
A3: Using `removeListener(eventName, listener)` or `off(eventName, listener)`.

Q4: How to prevent memory leaks when using events?  
A4: Remove unnecessary listeners and manage max listeners appropriately.

Q5: Name some Node.js core modules that use EventEmitter.  
A5: `http`, `net`, `stream`, `fs` (some methods), and `process`.
*/
