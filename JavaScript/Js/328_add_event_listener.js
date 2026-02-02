/* 328_add_event_listener.js

=====================================================
addEventListener in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "addEventListener is a method used to attach an event handler 
  to an element without overwriting existing handlers, allowing multiple 
  listeners for the same event type."

Key Points to Highlight:
- Syntax: element.addEventListener(eventType, handler, options)
- eventType: string like 'click', 'keyup', etc.
- handler: function executed when event occurs
- options:
  - capture: boolean, use capturing phase if true
  - once: boolean, execute handler only once
  - passive: boolean, improves scrolling performance
- Preferred over inline handlers or element.onclick

Examples:

const btn = document.querySelector('#myBtn');

// Simple click handler
btn.addEventListener('click', function(event) {
  console.log('Button clicked!', event.target);
});

// Execute only once
btn.addEventListener('click', () => {
  console.log('Clicked once!');
}, { once: true });

// Capturing phase
btn.addEventListener('click', () => {
  console.log('Capturing phase');
}, { capture: true });

Code Explanation:
- Allows multiple handlers for same event
- Options provide more control over event behavior
- Event object contains information about the event

Real-Life Analogy:
- Like assigning multiple staff members to respond to a doorbell; all can act independently.

Example / Usage:

document.querySelector('#inputBox').addEventListener('keyup', (e) => {
  console.log('Key pressed:', e.key);
});

Follow-Up Interview Questions:
- Q1: Difference between addEventListener and onclick?
  A1: onclick allows one handler; addEventListener allows multiple handlers.
- Q2: What is event capturing vs bubbling?
  A2: Capturing → event moves from ancestor to target; Bubbling → event moves from target to ancestor.
- Q3: How to remove an event listener?
  A3: element.removeEventListener(eventType, handler)
- Q4: What does { once: true } do?
  A4: Executes the handler only once and then removes it.
- Q5: What is passive option used for?
  A5: Improves scrolling performance by indicating handler won’t call preventDefault().
*/
