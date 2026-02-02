/* 341_prevent_default.js

=====================================================
preventDefault() in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "`preventDefault()` is a method on the Event object that prevents 
  the browser's default action for that event."

Key Points to Highlight:
- Stops the browser from performing its default behavior
- Commonly used with form submissions, links, and drag/drop events
- Does not stop event propagation; use stopPropagation() separately
- Works only in event handlers

Examples:

const form = document.querySelector('#myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from submitting
  console.log('Form submission prevented');
});

const link = document.querySelector('#myLink');
link.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent navigation
  console.log('Link click prevented');
});

Code Explanation:
- Calling preventDefault() stops default action like page reload
- Allows custom handling of events without losing browser control

Real-Life Analogy:
- Like stopping a default workflow to implement your own process

Example / Usage:

document.querySelector('#button').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Custom button action without default behavior');
});

Follow-Up Interview Questions:
- Q1: Difference between preventDefault() and stopPropagation()?
  A1: preventDefault() stops default action; stopPropagation() stops event bubbling/capturing.
- Q2: Can preventDefault() stop all events?
  A2: Only default browser actions, not custom JavaScript events.
- Q3: Does preventDefault() work in inline HTML events?
  A3: No, must be called on event object in JS handler.
- Q4: When to use preventDefault()?
  A4: To implement custom form handling, link navigation, or drag/drop behavior.
- Q5: Can preventDefault() be called multiple times?
  A5: Yes, but calling once is sufficient to stop default action.
*/
