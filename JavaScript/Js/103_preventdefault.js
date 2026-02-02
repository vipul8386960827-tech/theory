/* 
103_preventdefault.js – Interview-Ready Answer

"In JavaScript, `event.preventDefault()` is a method used to prevent 
the default action associated with an event from occurring."

1️⃣ Key Points to Highlight

1. Definition:
- Stops the browser's default behavior for an event.
- Commonly used in form submissions, anchor clicks, or drag-and-drop events.

2. Syntax Example

const link = document.querySelector("a");
link.addEventListener("click", function(event) {
    event.preventDefault(); // prevents navigation
    console.log("Default navigation prevented");
});

const form = document.querySelector("#myForm");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevents form submission
    console.log("Form submission prevented");
});

3. Real-Life Analogies

- Global Analogy: preventDefault = pressing pause before action occurs (e.g., stopping elevator door from closing automatically).
- India-specific Analogy: preventDefault = putting a hold on automatic bank transfer.
- Web Analogy: Stopping a link from navigating or preventing form from submitting automatically.

4. Code Explanation

- Works only when called inside an event handler.
- Does not stop event propagation (use stopPropagation() for that).
- Useful when handling events programmatically while preventing default browser behavior.

5. Example / Usage

const button = document.querySelector("#btn");
button.addEventListener("click", function(e) {
    e.preventDefault(); // stop default action
    console.log("Button click default prevented");
});

6️⃣ Follow-Up Interview Questions

Q1: Does preventDefault stop event bubbling?  
A1: No, use event.stopPropagation() for that.

Q2: Can preventDefault be used on any event?  
A2: Works only for events with default actions (click, submit, etc.).

Q3: What happens if you don’t call preventDefault on a form?  
A3: Form submits and page reloads by default.

Q4: Difference between preventDefault() and return false?  
A4: return false also stops propagation in some cases; preventDefault only prevents default behavior.

Q5: Is preventDefault necessary for custom events?  
A5: Only if the custom event has a default action defined.
*/
