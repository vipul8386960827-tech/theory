/* 327_event_handlers.js

=====================================================
Event Handlers in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Event handlers are functions that are called when a specific event 
  occurs on an HTML element, such as clicks, key presses, or form submissions."

Key Points to Highlight:
- Can be assigned:
  - Inline in HTML: <button onclick="handleClick()">Click</button>
  - Via DOM properties: element.onclick = function() { ... }
  - Using addEventListener: element.addEventListener('click', handler)
- Multiple handlers possible with addEventListener
- Events bubble and can be captured (event capturing vs bubbling)
- Access event object to get info about event

Examples:

// Inline handler (not recommended)
<button onclick="console.log('Clicked!')">Click</button>

// DOM property
const btn = document.querySelector('#myBtn');
btn.onclick = function() {
  console.log('Button clicked');
};

// addEventListener
btn.addEventListener('click', function(event) {
  console.log('Event target:', event.target);
});

// Remove event listener
function handleClick() {
  console.log('Clicked!');
}
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick);

Code Explanation:
- Event handlers allow interactive behavior on web pages.
- addEventListener preferred: allows multiple handlers and better control.
- Event object provides properties like target, type, preventDefault(), stopPropagation().

Real-Life Analogy:
- Like assigning a security guard to respond when a door is opened.

Example / Usage:

document.querySelector('#inputBox').addEventListener('keyup', (e) => {
  console.log('Key pressed:', e.key);
});

Follow-Up Interview Questions:
- Q1: Difference between onclick and addEventListener?
  A1: onclick allows one handler; addEventListener allows multiple.
- Q2: What is event bubbling and capturing?
  A2: Bubbling: event propagates up from target; capturing: event propagates down before reaching target.
- Q3: How to prevent default action?
  A3: Use event.preventDefault().
- Q4: How to stop event propagation?
  A4: Use event.stopPropagation().
- Q5: Can you remove an event listener added via addEventListener?
  A5: Yes, must reference the same handler function.
*/
