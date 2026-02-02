/* 
104_stoppropagation.js – Interview-Ready Answer

"In JavaScript, `event.stopPropagation()` is used to stop the event from 
bubbling up or capturing down the DOM tree, preventing parent elements 
from receiving the same event."

1️⃣ Key Points to Highlight

1. Definition:
- Stops further propagation of the current event in the capturing and bubbling phases.
- Useful in nested elements when you want only the target element to handle the event.

2. Syntax Example

const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

parent.addEventListener("click", function() {
    console.log("Parent clicked");
});

child.addEventListener("click", function(event) {
    event.stopPropagation(); // prevent event from reaching parent
    console.log("Child clicked");
});

3. Real-Life Analogies

- Global Analogy: stopPropagation = stopping a rumor at its source so it doesn’t spread further.
- India-specific Analogy: stopPropagation = stopping a message from being forwarded to everyone in a WhatsApp group.
- Web Analogy: Preventing a click on a button inside a form from triggering the form’s submit handler.

4. Code Explanation

- Works inside event handler only.
- Stops the event from reaching ancestors (bubbling) or being captured (if in capturing phase).
- Useful for controlling event flow in complex DOM structures.

5. Example / Usage

document.getElementById("outer").addEventListener("click", function() {
    console.log("Outer div clicked");
});

document.getElementById("inner").addEventListener("click", function(event) {
    event.stopPropagation(); // only inner div logs
    console.log("Inner div clicked");
});

6️⃣ Follow-Up Interview Questions

Q1: Does stopPropagation stop the default action?  
A1: No, use preventDefault() for that.

Q2: Can stopPropagation be used in both capturing and bubbling phases?  
A2: Yes, stops event from further propagation in the current phase.

Q3: What is the difference between stopPropagation and stopImmediatePropagation?  
A3: stopImmediatePropagation also prevents other handlers on the same element from executing.

Q4: Can stopPropagation be used on all events?  
A4: Yes, any event can be stopped from propagating.

Q5: Why would you use stopPropagation in nested components?  
A5: To ensure only the intended element handles the event without affecting parent handlers.
*/
