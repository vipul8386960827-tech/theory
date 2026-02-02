/* 336_event_object.js

=====================================================
Event Object in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The event object is automatically passed to event handlers and contains 
  information about the event that occurred, including type, target, and other details."

Key Points to Highlight:
- Common properties:
  - type → type of the event (click, keydown, etc.)
  - target → element that triggered the event
  - currentTarget → element the handler is attached to
  - bubbles → boolean indicating if event bubbles
  - cancelable → boolean indicating if event can be canceled
  - preventDefault() → prevents default action
  - stopPropagation() → stops event from bubbling
- Accessed in event listeners as parameter (often named e or event)

Examples:

const button = document.querySelector('#myButton');

button.addEventListener('click', (e) => {
  console.log('Event type:', e.type);
  console.log('Event target:', e.target);
  e.preventDefault(); // prevents default action if any
});

Code Explanation:
- e.type gives event type
- e.target gives element that triggered the event
- Methods like preventDefault and stopPropagation control event behavior

Real-Life Analogy:
- Event object is like a message envelope containing details about an action, 
  such as who did it and what happened

Example / Usage:

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    console.log('Enter key pressed on', event.target);
  }
});

Follow-Up Interview Questions:
- Q1: Difference between target and currentTarget?
  A1: target = actual element that triggered; currentTarget = element handler is attached to.
- Q2: Can you stop an event from bubbling?
  A2: Yes, using event.stopPropagation().
- Q3: How to prevent default browser action?
  A3: Use event.preventDefault().
- Q4: Are event objects available globally?
  A4: No, they are passed as parameter to handler.
- Q5: Can you attach custom properties to event object?
  A5: Technically yes, but not recommended; use custom event objects instead.
*/
