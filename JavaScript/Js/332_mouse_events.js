/* 332_mouse_events.js

=====================================================
Mouse Events in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Mouse events are triggered by user interactions with a mouse, 
  such as clicks, movement, or hovering over elements."

Key Points to Highlight:
- Common mouse events:
  - click → triggered on mouse click
  - dblclick → triggered on double click
  - mousedown → mouse button pressed
  - mouseup → mouse button released
  - mousemove → mouse moves over element
  - mouseenter → mouse enters element
  - mouseleave → mouse leaves element
- Used for interactive UI, drag-and-drop, tooltips, etc.
- Can attach using addEventListener or HTML attributes

Examples:

const box = document.querySelector('#box');

box.addEventListener('click', () => {
  console.log('Box clicked');
});

box.addEventListener('mouseenter', () => {
  box.style.backgroundColor = 'lightblue';
});

box.addEventListener('mouseleave', () => {
  box.style.backgroundColor = '';
});

Code Explanation:
- click logs a message
- mouseenter changes background color when mouse hovers
- mouseleave resets background color when mouse leaves

Real-Life Analogy:
- Click → pressing a button on a remote
- Mouse move → pointing the cursor over a screen
- Mouse enter/leave → moving into or out of a room

Example / Usage:

const dragItem = document.querySelector('#drag');
dragItem.addEventListener('mousedown', () => console.log('Drag start'));
dragItem.addEventListener('mouseup', () => console.log('Drag end'));

Follow-Up Interview Questions:
- Q1: Difference between mouseenter and mouseover?
  A1: mouseenter does not bubble; mouseover bubbles.
- Q2: Difference between mouseleave and mouseout?
  A2: mouseleave does not bubble; mouseout bubbles.
- Q3: Can you prevent default actions of mouse events?
  A3: Yes, using event.preventDefault().
- Q4: How to track mouse coordinates?
  A4: Use event.clientX and event.clientY.
- Q5: Are mouse events compatible with touch devices?
  A5: Not directly; use touch events for mobile devices.
*/
