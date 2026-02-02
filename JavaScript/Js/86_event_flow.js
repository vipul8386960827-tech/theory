/*
86_event_flow.js – Interview-Ready Answer

"In JavaScript, event flow determines the order in which events are handled 
on DOM elements. There are two main phases: capturing and bubbling."

Key Points:

1️⃣ Definition:
- Event flow = the path an event takes through the DOM.
- Two main phases:
  1. Capturing Phase (trickling down from window → document → target element)
  2. Bubbling Phase (bubbles up from target element → document → window)
- Default event listeners use bubbling unless `{ capture: true }` is specified.

2️⃣ Syntax Example:

// HTML structure example
// <div id="parent">
//     <button id="child">Click Me</button>
// </div>

// JavaScript
const parent = document.getElementById('parent');
const child = document.getElementById('child');

// Bubbling phase listener (default)
parent.addEventListener('click', () => {
    console.log('Parent clicked (bubbling)');
});

child.addEventListener('click', () => {
    console.log('Child clicked (bubbling)');
});

// Capturing phase listener
parent.addEventListener('click', () => {
    console.log('Parent clicked (capturing)');
}, true);

3️⃣ Real-Life Analogies:
- Global Analogy: Event flow = chain of command; a message can go top-down (capturing) or bottom-up (bubbling).
- India-specific Analogy: Capturing = teacher checking students in classroom before class starts; Bubbling = feedback travels up from students to principal.
- Web Analogy: Click on a nested element triggers event listeners in a specific order based on capturing/bubbling.

4️⃣ Code Explanation:
- By default, events bubble up from target to ancestors.
- Setting `{ capture: true }` triggers listener during capturing phase.
- Useful for controlling how parent and child elements react to the same event.

5️⃣ Example / Usage:

// Clicking the button will log:
// "Parent clicked (capturing)"
// "Child clicked (bubbling)"
// "Parent clicked (bubbling)"

6️⃣ Follow-Up Interview Questions:

Q1: What is the difference between capturing and bubbling?  
A1: Capturing goes from ancestor → target, Bubbling goes target → ancestor.

Q2: Can an event skip bubbling or capturing?  
A2: Yes, using event.stopPropagation() prevents further propagation.

Q3: What is event delegation?  
A3: Using a parent listener to handle events on its children efficiently.

Q4: Does all DOM events bubble?  
A4: No, some events like focus, blur, mouseenter do not bubble.

Q5: How to attach a listener specifically for capturing?  
A5: Pass `{ capture: true }` as the third argument in addEventListener().
*/
