/* 448_event_target_module.js

=====================================================
EventTarget in JavaScript
=====================================================

Definition (What I should say in the interview):
- "EventTarget is a **built-in interface** in JavaScript that provides the ability for an object to **receive and dispatch events**. 
   It allows you to register event listeners, remove them, and emit events, forming the foundation for event-driven programming in both browsers and Node.js environments."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **addEventListener(type, listener[, options])** → Registers an event listener for a specific event type.
2. **removeEventListener(type, listener[, options])** → Removes a previously registered event listener.
3. **dispatchEvent(event)** → Dispatches an event to the target, invoking all relevant listeners.
4. Supports event propagation with options like `{ capture, once, passive }`.
5. Built-in in browser objects (e.g., `window`, `document`, DOM elements) and can be used in custom classes.

-----------------------------------------------------
Basic Example (Custom EventTarget)
-----------------------------------------------------
class MyEmitter extends EventTarget {}

const emitter = new MyEmitter();

function onCustomEvent(e) {
  console.log('Custom event received:', e.detail);
}

emitter.addEventListener('myEvent', onCustomEvent);

const event = new CustomEvent('myEvent', { detail: { message: 'Hello World' } });
emitter.dispatchEvent(event); // Logs: Custom event received: { message: 'Hello World' }

emitter.removeEventListener('myEvent', onCustomEvent);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Handling DOM events (click, input, keyboard events) in browsers.
- Building **custom event-driven modules** in JavaScript or Node.js.
- Communicating between components in frameworks like React or libraries like Lit.
- Wrapping asynchronous operations with event dispatching.
- Implementing pub/sub or observer patterns.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `EventTarget` does not inherently manage event bubbling; that's specific to DOM elements.
2. `dispatchEvent` returns a boolean indicating if `preventDefault()` was called.
3. You can extend EventTarget in custom classes to make them event-aware.
4. Modern Node.js versions support `EventTarget` as an alternative to `EventEmitter`.
5. Event listeners can be added with `{ once: true }` to auto-remove after invocation.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of EventTarget as a **mailbox system**:
  - You can subscribe (addEventListener) to specific types of mail (events), receive mail (dispatchEvent), and unsubscribe when no longer interested (removeEventListener).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between EventTarget and EventEmitter?  
A1: `EventEmitter` is Node.js-specific, older API; `EventTarget` is standard, browser-compatible, and supports DOM events.

Q2: How do you stop an event from propagating?  
A2: Use `event.stopPropagation()` or `event.preventDefault()` inside a listener.

Q3: Can you listen for an event only once?  
A3: Yes, by using `{ once: true }` in `addEventListener`.

Q4: Can custom classes use EventTarget?  
A4: Yes, by extending the EventTarget class.

Q5: Does EventTarget support multiple listeners for the same event?  
A5: Yes, all registered listeners are invoked in the order they were added.
*/
