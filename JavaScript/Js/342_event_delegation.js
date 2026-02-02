/* 342_event_delegation.js

=====================================================
Event Delegation in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Event delegation is a technique of attaching a single event listener 
  to a parent element to handle events on its child elements, 
  taking advantage of event bubbling."

Key Points to Highlight:
- Reduces number of event listeners
- Handles dynamically added elements
- Uses event.target to determine which child triggered the event
- Efficient for large lists or tables

Examples:

const list = document.querySelector('#myList');

list.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'LI') {
    console.log('List item clicked:', e.target.textContent);
  }
});

Code Explanation:
- Listener attached to parent (`#myList`)
- `e.target` identifies the actual clicked child
- Works even for dynamically added `<li>` items

Real-Life Analogy:
- Like a manager overseeing all employees and responding based on who acted, 
  instead of hiring a separate manager for each employee

Example / Usage:

const table = document.querySelector('#myTable');

table.addEventListener('click', (e) => {
  if (e.target && e.target.matches('td.editable')) {
    console.log('Editable cell clicked:', e.target.innerText);
  }
});

Follow-Up Interview Questions:
- Q1: Why use event delegation?
  A1: Fewer listeners, handles dynamic elements, improves performance.
- Q2: Which events bubble by default?
  A2: Most events, e.g., click, keyup; some like focus/blur do not.
- Q3: How to handle non-bubbling events?
  A3: Attach listener directly or use capture phase if needed.
- Q4: Can delegation affect event order?
  A4: Yes, listener on parent executes after child listeners in bubbling phase.
- Q5: Difference between target and currentTarget?
  A5: target = element that triggered event; currentTarget = element listener attached to.
*/
