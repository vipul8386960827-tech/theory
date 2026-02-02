/* 449_custom_events.js

=====================================================
Custom Events in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Custom Events in JavaScript allow developers to **create and dispatch their own events** beyond standard DOM events. 
   They provide a way for components or modules to communicate in an event-driven manner, passing additional data using the `detail` property."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **CustomEvent Constructor**
   - `new CustomEvent(type, options)` → Creates a custom event.
   - `type` → String representing the event name.
   - `options` → Object that can include:
     - `detail` → Custom data payload.
     - `bubbles` → Whether event bubbles (default: false).
     - `cancelable` → Whether event can be canceled (default: false).

2. **dispatchEvent(event)**
   - Used to emit the custom event on a DOM element or EventTarget.

3. **addEventListener(type, listener)**
   - Used to listen for the custom event, just like standard events.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const button = document.querySelector('button');

// Create custom event
const myEvent = new CustomEvent('sayHello', {
  detail: { name: 'Kaizer' },
  bubbles: true,
  cancelable: true
});

// Listen for the event
button.addEventListener('sayHello', (e) => {
  console.log(`Hello, ${e.detail.name}!`);
});

// Dispatch the event
button.dispatchEvent(myEvent); // Logs: Hello, Kaizer!

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Component-to-component communication in web apps.
- Triggering actions based on state changes.
- Passing structured data between different modules.
- Custom event-driven UI frameworks and libraries.
- Simulating events for testing purposes.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Custom events can bubble like standard DOM events if `bubbles: true`.
2. You can cancel a custom event using `event.preventDefault()` if `cancelable: true`.
3. Works with any EventTarget, including DOM elements and custom classes.
4. Enables decoupled architecture by avoiding direct method calls between modules.
5. Supports passing complex objects through the `detail` property.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Custom Events as **custom signals** in a communication system:
  - You define your own signal type, attach data, and listeners act upon receiving it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between CustomEvent and standard DOM events?  
A1: Standard events are predefined (click, input); CustomEvent allows creating your own event types with custom data.

Q2: Can custom events bubble?  
A2: Yes, if `bubbles: true` is set.

Q3: How do you pass data with a custom event?  
A3: Use the `detail` property in the event options.

Q4: How to cancel a custom event?  
A4: Set `cancelable: true` and call `event.preventDefault()` in the listener.

Q5: Can you use custom events in frameworks like React?  
A5: Yes, but often framework-specific event systems are preferred; however, CustomEvent can still be used on DOM elements.
*/
