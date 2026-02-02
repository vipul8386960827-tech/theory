/* 340_stop_propagation.js

=====================================================
stopPropagation() in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "`stopPropagation()` is a method on the Event object that prevents the event 
  from bubbling or capturing further in the DOM."

Key Points to Highlight:
- Stops event from moving to other listeners in the bubbling/capturing phases
- Does not prevent default browser behavior (use preventDefault() for that)
- Useful in event delegation to control which handlers run

Examples:

const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

// Parent listener
parent.addEventListener('click', () => {
  console.log('Parent clicked');
});

// Child listener with stopPropagation
child.addEventListener('click', (e) => {
  console.log('Child clicked');
  e.stopPropagation(); // prevents parent click handler from executing
});

Code Explanation:
- When child is clicked, only child listener executes
- Parent listener is skipped due to stopPropagation()
- Provides control over event flow in complex DOM structures

Real-Life Analogy:
- Like sending a message that cannot be forwarded beyond the first recipient

Example / Usage:

document.querySelector('#button').addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Button clicked without bubbling');
});

Follow-Up Interview Questions:
- Q1: Difference between stopPropagation() and preventDefault()?
  A1: stopPropagation() stops event flow; preventDefault() stops default action.
- Q2: Does stopPropagation() affect other listeners on the same element?
  A2: No, only stops propagation to other elements.
- Q3: Can it stop capturing phase?
  A3: Yes, when used in a capturing listener.
- Q4: When is stopPropagation useful?
  A4: To prevent parent handlers from reacting to child events.
- Q5: Can events be completely blocked?
  A5: For both default behavior and propagation, use stopPropagation + preventDefault.
*/
