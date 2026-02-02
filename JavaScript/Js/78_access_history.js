/* 
78_access_history.js – Interview-Ready Answer

"In JavaScript, the `history` object provides methods to interact with 
the browser session history, allowing navigation between previously 
visited pages."

1️⃣ Key Points to Highlight

1. Definition:
- `window.history` gives access to the browser's history stack.
- Allows moving backward, forward, or to a specific page.

2. Syntax Example

// Go back one page
window.history.back();

// Go forward one page
window.history.forward();

// Go to specific position
window.history.go(-2); // two pages back
window.history.go(1);  // one page forward

// History length
console.log(window.history.length); // number of entries in session history

3. Real-Life Analogies

- Global Analogy: history = diary recording pages you visited, can flip back and forth.
- India-specific Analogy: history = travel log of train journeys, allows going back to previous stops.
- Web Analogy: Back and Forward buttons in the browser use history object internally.

4. Code Explanation

- Provides control over browser navigation without reloading the page manually.
- Cannot access URLs directly for security reasons.
- Useful in single-page applications for managing routing programmatically.

5. Example / Usage

console.log("History length:", window.history.length);

document.getElementById("backBtn").addEventListener("click", () => {
    window.history.back();
});

document.getElementById("forwardBtn").addEventListener("click", () => {
    window.history.forward();
});

document.getElementById("goBtn").addEventListener("click", () => {
    window.history.go(-2); // Go back 2 pages
});

6️⃣ Follow-Up Interview Questions

Q1: Can you read the URLs from history object?  
A1: No, for security reasons; you can only navigate programmatically.

Q2: Difference between history.back() and history.go(-1)?  
A2: Both navigate back one page; go() is more general with offset.

Q3: Is history object part of DOM or BOM?  
A3: Part of BOM (Browser Object Model).

Q4: Can history.length decrease?  
A4: Yes, closing tabs or navigating across sessions can affect it.

Q5: How is history used in single-page applications?  
A5: For routing without full page reloads using pushState and popState events.
*/
