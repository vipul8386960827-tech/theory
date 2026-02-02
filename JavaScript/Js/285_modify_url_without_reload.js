/* 285_modify_url_without_reload.js

=====================================================
Modify URL Without Reload in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "You can change the URL displayed in the browser without reloading 
  the page using the History API (`pushState` and `replaceState`). 
  This is commonly used in single-page applications (SPA)."

Key Points to Highlight:
- Purpose: Update URL for navigation, bookmarking, or state management without page refresh.
- Methods:
  - history.pushState(stateObj, title, url) → adds a new entry in history
  - history.replaceState(stateObj, title, url) → modifies current history entry
- stateObj → JS object storing page state
- title → currently ignored by most browsers
- url → new URL (relative or absolute)
- window.history.back(), forward(), go() → navigate history

Examples:

// Change URL without reloading
history.pushState({page: 1}, "Title 1", "/page1");
console.log(window.location.href); // Updated URL

// Replace current URL
history.replaceState({page: 2}, "Title 2", "/page2");
console.log(window.location.href); // Updated URL

// Listen for back/forward navigation
window.onpopstate = function(event) {
  console.log("State changed:", event.state);
};

Code Explanation:
- pushState adds a new URL entry, replaceState modifies current.
- No reload occurs, only URL and history state change.
- Useful in SPA routing.

Real-Life Analogy:
- Like flipping pages in a book without physically changing the book, but the bookmark reflects the current page.

Example / Usage:

// SPA navigation example
document.getElementById('navHome').addEventListener('click', () => {
  history.pushState({page: 'home'}, "Home", "/home");
  renderHomePage(); // Function to update content
});

Follow-Up Interview Questions:
- Q1: Difference between pushState and replaceState?
  A1: pushState → adds new entry; replaceState → modifies current entry.
- Q2: Does pushState trigger a page reload?
  A2: No, URL changes without reload.
- Q3: How to detect when user clicks back/forward buttons?
  A3: Use window.onpopstate event listener.
- Q4: Can you push the same URL multiple times?
  A4: Yes, each entry is separate in history stack.
- Q5: Why not change window.location.href directly?
  A5: Changing href reloads the page; pushState avoids reload.
*/
