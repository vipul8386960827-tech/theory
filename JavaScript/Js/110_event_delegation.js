/* 
110_event_delegation.js – Interview-Ready Answer

"In JavaScript, event delegation is a pattern where a single event listener 
is added to a parent element to handle events on its child elements using 
event bubbling, improving performance and dynamic handling."

1️⃣ Key Points to Highlight

1. Definition:
- Instead of adding listeners to multiple child elements, add one listener to parent.
- Use `event.target` to determine which child triggered the event.
- Takes advantage of event bubbling in DOM.

2. Syntax Example

const parent = document.getElementById("parent");

parent.addEventListener("click", function(event) {
    if (event.target && event.target.matches("button.child")) {
        console.log("Button clicked:", event.target.textContent);
    }
});

// HTML Example
// <div id="parent">
//   <button class="child">Button 1</button>
//   <button class="child">Button 2</button>
// </div>

3. Real-Life Analogies

- Global Analogy: event delegation = assigning a manager to handle requests 
  from multiple employees instead of contacting each individually.
- India-specific Analogy: event delegation = one station master managing multiple platforms.
- Web Analogy: Instead of attaching click listener to 100 table rows, attach it to the table.

4. Code Explanation

- Saves memory by reducing number of event listeners.
- Handles dynamic elements added after listener assignment.
- Uses `event.target` to check which child fired the event.
- Can use `matches()` or `closest()` for targeting specific elements.

5. Example / Usage

const list = document.getElementById("myList");

list.addEventListener("click", (event) => {
    if(event.target && event.target.tagName === "LI") {
        console.log("List item clicked:", event.target.textContent);
    }
});

// Dynamically added list item will also be handled
const newItem = document.createElement("li");
newItem.textContent = "Item 4";
list.appendChild(newItem);

6️⃣ Follow-Up Interview Questions

Q1: Why use event delegation?  
A1: Improves performance, reduces memory usage, handles dynamic elements.

Q2: What is the role of event.target?  
A2: Identifies the actual element that triggered the event.

Q3: Can delegation work for all event types?  
A3: Works for events that bubble (click, input, etc.), not focus/blur.

Q4: Difference between event.target and event.currentTarget?  
A4: target = actual element clicked; currentTarget = element listener is attached to.

Q5: Can event delegation simplify handling dynamic content?  
A5: Yes, new child elements automatically handled without adding new listeners.
*/
