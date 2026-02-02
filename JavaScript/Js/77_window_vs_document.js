/* 
77_window_vs_document.js – Interview-Ready Answer

"In JavaScript, `window` and `document` are two core objects of the BOM 
and DOM respectively, serving different purposes."

1️⃣ Key Points to Highlight

1. Definition:
- `window`: Top-level object representing the browser window. Part of BOM.
- `document`: Represents the web page (HTML) loaded in the window. Part of DOM.

2. Syntax Example

// window object
console.log(window.innerWidth); // viewport width
window.alert("Hello!"); // browser alert

// document object
console.log(document.title); // page title
document.body.style.backgroundColor = "lightblue"; // modify page content

3. Key Differences:

| Feature        | window                     | document                  |
|----------------|---------------------------|---------------------------|
| Type           | BOM object                | DOM object                |
| Represents     | Browser window            | Webpage content           |
| Accessed via   | window or global scope    | document                  |
| Common uses    | alerts, timers, navigation | manipulate HTML elements |

4. Real-Life Analogies

- Global Analogy: window = room, document = items inside the room.
- India-specific Analogy: window = classroom, document = blackboard and furniture inside.
- Web Analogy: window controls browser features; document controls HTML elements.

5. Code Explanation

- window is parent object; document is a child object of window.
- Anything accessible via document affects page content.
- Anything accessible via window affects browser environment or window-level functionality.

6. Example / Usage

console.log("Browser width:", window.innerWidth);
console.log("Page title:", document.title);

document.body.style.backgroundColor = "#f0f0f0";

window.setTimeout(() => {
    alert("2 seconds passed!");
}, 2000);

7️⃣ Follow-Up Interview Questions

Q1: Can you access document without window?  
A1: Yes, `document` is global; window.document is same as document.

Q2: Is document part of BOM?  
A2: No, document is part of DOM.

Q3: Can window methods access DOM elements?  
A3: Indirectly, yes, via document object.

Q4: Is window the global object in browsers?  
A4: Yes, in browser environment, global scope is window.

Q5: Difference between window.innerWidth and document.body.clientWidth?  
A5: innerWidth = viewport width including scrollbar; clientWidth = width of body content.
*/
