/*
87_event_capturing.js – Interview-Ready Answer

"In JavaScript, event capturing is one of the phases in the event flow where 
an event starts from the outermost ancestor and travels down to the target 
element before the bubbling phase."

Key Points:

1️⃣ Definition:
Event capturing is the trickling phase of event flow.
The event starts at window → document → ancestors → target element.
Capturing phase is the first phase; listeners can be triggered during this 
phase by setting { capture: true } in addEventListener.

2️⃣ Syntax Example:

HTML structure example:
<div id="parent">
    <button id="child">Click Me</button>
</div>

JavaScript:
const parent = document.getElementById('parent');
const child = document.getElementById('child');

// Capturing phase listener
parent.addEventListener('click', () => {
    console.log('Parent clicked (capturing)');
}, true);

child.addEventListener('click', () => {
    console.log('Child clicked (bubbling/default)');
});

// Clicking the button will log:
// "Parent clicked (capturing)"
// "Child clicked (bubbling/default)"

3️⃣ Real-Life Analogies:

Global Analogy: Event capturing = top-down communication in a company.
India-specific Analogy: Teacher checking students sequentially from first row to last.
Web Analogy: Event travels from outer container elements to the target element before reaching bubbling phase.

4️⃣ Code Explanation:

By default, events bubble (target → ancestors). Capturing allows executing 
listeners on ancestors before the target.
Useful when parent needs to intercept an event before child processing.

5️⃣ Example / Usage:

You can use capturing to prevent child handlers from executing first.
Example:
parent.addEventListener('click', parentHandler, true);
child.addEventListener('click', childHandler); // defaults to bubbling

6️⃣ Follow-Up Interview Questions:

Q1: How to enable capturing phase listener?  
A1: Pass { capture: true } as the third argument in addEventListener.

Q2: Can all events use capturing?  
A2: Most events can; exceptions like focus, blur do not bubble, but capturing works differently.

Q3: Difference between capturing and bubbling?  
A3: Capturing = ancestor → target; Bubbling = target → ancestor.

Q4: How to stop capturing or bubbling?  
A4: Use event.stopPropagation() to prevent further propagation in the current phase.

Q5: Why use capturing?  
A5: Useful for intercepting or overriding child events, or implementing delegated logic in top-down order.
*/
