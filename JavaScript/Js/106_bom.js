/* 
106_bom.js – Interview-Ready Answer

"In JavaScript, BOM (Browser Object Model) provides objects and methods 
to interact with the browser outside the document, such as controlling 
windows, history, location, and timers."

1️⃣ Key Points to Highlight

1. Definition:
- BOM = Browser Object Model.
- Allows interaction with browser features, not the page content (DOM).
- Main BOM objects: window, navigator, screen, location, history, frames, setTimeout/setInterval.

2. Syntax Example

// Window object
console.log(window.innerWidth); // width of browser viewport

// Alert using BOM
window.alert("Hello BOM!");

// Location object
console.log(window.location.href); // current URL

// History object
window.history.back(); // go back one page

// Timers
let timerId = window.setTimeout(() => {
    console.log("Timeout executed");
}, 1000);

3. Real-Life Analogies

- Global Analogy: BOM = control panel of a car, lets you manage features outside the engine (DOM).
- India-specific Analogy: BOM = control room in a railway station managing signals and trains.
- Web Analogy: BOM controls browser features like opening windows, redirecting pages, and accessing history.

4. Code Explanation

- BOM is global in browsers; window object is top-level.
- Provides methods to interact with browser functionalities not related to HTML content.
- Can use timers, dialogs, URL manipulations, and navigation via BOM.

5. Example / Usage

// Using BOM objects
console.log("Browser width:", window.innerWidth);
console.log("Browser URL:", window.location.href);

window.setTimeout(() => {
    console.log("Executed after 2 seconds");
}, 2000);

window.history.forward(); // navigate forward in history

6️⃣ Follow-Up Interview Questions

Q1: Is BOM standardized like DOM?  
A1: No, DOM is standardized; BOM is mostly browser-dependent.

Q2: Can you access BOM in Node.js?  
A2: No, BOM is browser-specific.

Q3: Difference between BOM and DOM?  
A3: DOM = document content; BOM = browser features outside document.

Q4: What is the top-level object in BOM?  
A4: `window`

Q5: Can BOM be used to manipulate URL?  
A5: Yes, using `window.location` object.
*/
