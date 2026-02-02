/* 
105_return_false_steps.js – Interview-Ready Answer

"In JavaScript, returning `false` from an event handler is an older way 
to prevent default actions and stop event propagation, though it's less explicit 
than using `preventDefault()` and `stopPropagation()`."

1️⃣ Key Points to Highlight

1. Definition:
- In inline HTML event handlers, returning false prevents the default action.
- In modern JS, `event.preventDefault()` and `event.stopPropagation()` are preferred.

2. Syntax Example

// Inline HTML
// <a href="https://example.com" onclick="return false;">Click me</a>
// Clicking this link does not navigate due to 'return false'.

// Using JS
const link = document.querySelector("a");
link.onclick = function() {
    console.log("Link clicked but default prevented");
    return false; // prevents default
};

3. Step-by-Step Behavior

1. Event occurs on the element (e.g., click).
2. Event handler is called.
3. Handler returns false.
4. Default browser action is canceled.
5. Event may stop bubbling depending on how it is bound (inline handlers stop bubbling).

4. Real-Life Analogies

- Global Analogy: return false = politely refusing to take action when asked.
- India-specific Analogy: return false = not authorizing a bank transaction by default.
- Web Analogy: Preventing a link click from navigating to a new page.

5. Code Explanation

- Works primarily with inline event handlers or when using old-fashioned `element.onclick`.
- Modern event listeners prefer `event.preventDefault()` and `event.stopPropagation()` for clarity.
- Returning false is shorthand but less explicit.

6. Example / Usage

// Inline event handler example
// <form onsubmit="return false;">
//   <button type="submit">Submit</button>
// </form>

// JS event listener
document.querySelector("#myLink").onclick = function() {
    console.log("Default action prevented using return false");
    return false; // cancels default action
};

7️⃣ Follow-Up Interview Questions

Q1: Does return false work with addEventListener?  
A1: No, addEventListener requires preventDefault() explicitly.

Q2: Does return false stop event propagation?  
A2: Only in inline handlers; not in addEventListener.

Q3: Why prefer preventDefault over return false?  
A3: More explicit, works consistently across all event types and listeners.

Q4: Can return false prevent form submission?  
A4: Yes, in inline event handlers.

Q5: Is return false considered modern practice?  
A5: No, modern best practice is to use preventDefault() and stopPropagation().
*/
