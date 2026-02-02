/*
88_event_bubbling.js – Interview-Ready Answer

"In JavaScript, event bubbling is the default phase of event flow where 
an event starts at the target element and propagates up through its ancestors 
to the window object."

Key Points:

1️⃣ Definition:
Event bubbling = the upward phase of event propagation.
Event starts at the target element → parent → ancestors → window.
Default behavior for most events unless capturing is specified.
Useful for handling events on parent elements instead of individual children (event delegation).

2️⃣ Syntax Example:

// HTML structure
<div id="parent">
    <button id="child">Click Me</button>
</div>

JavaScript:
const parent = document.getElementById('parent');
const child = document.getElementById('child');

// Bubbling phase listener
parent.addEventListener('click', () => {
    console.log('Parent clicked (bubbling)');
});

child.addEventListener('click', () => {
    console.log('Child clicked (bubbling)');
});

// Clicking the button logs:
// "Child clicked (bubbling)"
// "Parent clicked (bubbling)"

3️⃣ Real-Life Analogies:

Global Analogy: Event bubbling = complaint escalation from employee → manager → CEO.
India-specific Analogy: Student gives feedback to class monitor → teacher → principal.
Web Analogy: Clicking a nested element triggers event listeners on its parent elements sequentially.

4️⃣ Code Explanation:

By default, events bubble from target to ancestors.
Parent elements can capture events from children without attaching multiple listeners.
stopPropagation() can be used to prevent further bubbling.

5️⃣ Example / Usage:

// Event delegation
const list = document.getElementById('list');
list.addEventListener('click', (e) => {
    console.log('Clicked item:', e.target.textContent);
});
// No need to attach listener to each <li>, parent handles all.

6️⃣ Follow-Up Interview Questions:

Q1: Difference between capturing and bubbling?  
A1: Capturing = ancestor → target; Bubbling = target → ancestor.

Q2: How to stop bubbling?  
A2: Use event.stopPropagation() in the event handler.

Q3: Can all events bubble?  
A3: No, some events like focus, blur, mouseenter do not bubble.

Q4: What is event delegation?  
A4: Using parent listener to handle events on children efficiently.

Q5: Why use bubbling?  
A5: Reduces number of event listeners and improves performance.
*/
