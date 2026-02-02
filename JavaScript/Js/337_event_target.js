/* 337_event_target.js

=====================================================
Event Target in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The event target is the DOM element that triggered the event, accessible via 
  the `event.target` property inside an event handler."

Key Points to Highlight:
- Distinct from `currentTarget`:
  - target → element where event originated
  - currentTarget → element the listener is attached to
- Useful in event delegation to determine which child element was interacted with
- Read-only property of the Event object

Examples:

const list = document.querySelector('#myList');

list.addEventListener('click', (e) => {
  console.log('Event target:', e.target); // child element clicked
  console.log('Current target:', e.currentTarget); // #myList
});

Code Explanation:
- e.target identifies the exact element that triggered the event
- e.currentTarget refers to the element on which the listener is registered
- Useful to handle multiple child elements with a single listener

Real-Life Analogy:
- target → person who pressed a button
- currentTarget → the room where the button press is being monitored

Example / Usage:

// Event delegation
document.querySelector('#menu').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Menu item clicked:', e.target.textContent);
  }
});

Follow-Up Interview Questions:
- Q1: Difference between target and currentTarget?
  A1: target = element that triggered event; currentTarget = element listener is on.
- Q2: Can target change during bubbling?
  A2: No, target remains the original source element.
- Q3: How to stop event propagation?
  A3: event.stopPropagation()
- Q4: Is target always a DOM element?
  A4: Mostly, except for events like `window` or `document` where it may differ.
- Q5: Why use event delegation?
  A5: Efficiently handle events on multiple child elements using a single listener.
*/
