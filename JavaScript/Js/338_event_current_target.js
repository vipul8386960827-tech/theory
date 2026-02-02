/* 338_event_current_target.js

=====================================================
Event CurrentTarget in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The `currentTarget` property of an event object refers to the element 
  on which the event listener is currently attached, as opposed to `target` 
  which is the element that triggered the event."

Key Points to Highlight:
- Useful in event delegation to know which element has the listener
- Remains the same during event bubbling
- Read-only property

Examples:

const list = document.querySelector('#myList');

list.addEventListener('click', (e) => {
  console.log('Event target:', e.target);         // Child element clicked
  console.log('Event currentTarget:', e.currentTarget); // #myList
});

Code Explanation:
- e.target → element where the event originated
- e.currentTarget → element listener is bound to
- Helps distinguish between actual source and listener container

Real-Life Analogy:
- target → employee who pressed a button
- currentTarget → manager monitoring the button press

Example / Usage:

document.querySelector('#menu').addEventListener('click', (e) => {
  if (e.currentTarget.id === 'menu') {
    console.log('Listener on menu triggered by', e.target.tagName);
  }
});

Follow-Up Interview Questions:
- Q1: Difference between target and currentTarget?
  A1: target = origin element; currentTarget = listener element.
- Q2: Does currentTarget change during bubbling?
  A2: No, it always refers to element with the listener.
- Q3: Can currentTarget be different from target?
  A3: Yes, common in event delegation.
- Q4: Is currentTarget available in all event types?
  A4: Yes, for standard DOM events.
- Q5: How is currentTarget useful?
  A5: To manage events on container elements for multiple child elements efficiently.
*/
