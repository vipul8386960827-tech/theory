/*
=====================================
Push and Replace Methods of History in JavaScript
=====================================

Definition:
The history API in JavaScript allows you to manipulate the browser's 
session history stack. `pushState` and `replaceState` are methods 
to programmatically change the URL without reloading the page.

-------------------------------------
Key Points:
-------------------------------------
- **pushState**: Adds a new entry to the history stack.  
- **replaceState**: Replaces the current entry in the history stack.  
- Both methods do not trigger a page reload.  
- Can store state objects associated with the URL.  
- Useful in SPA routing, dynamic content updates, and navigation control.

-------------------------------------
Example 1: pushState
-------------------------------------
const state = { page: 1 };
const title = "Page 1";
const url = "/page1";

history.pushState(state, title, url);

// Browser URL changes to /page1
// Back button will go to the previous page

-------------------------------------
Example 2: replaceState
-------------------------------------
const state2 = { page: 2 };
const title2 = "Page 2";
const url2 = "/page2";

history.replaceState(state2, title2, url2);

// Browser URL changes to /page2
// Back button will skip the replaced entry and go to the page before pushState

-------------------------------------
Example 3: Listening to History Changes
-------------------------------------
window.addEventListener("popstate", (event) => {
  console.log("Current state:", event.state);
});

-------------------------------------
Real-Life Analogy:
-------------------------------------
- pushState = adding a new bookmark in your browser 📑  
- replaceState = updating an existing bookmark 🔄  
- Both change the URL without leaving the page.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: What's the difference between pushState and replaceState?
A1: pushState adds a new entry; replaceState updates the current entry.

Q2: Does using pushState reload the page?
A2: No, it only changes the URL and state.

Q3: Can you store objects in state parameter?
A3: Yes, any serializable JavaScript object can be stored.

Q4: How do you detect when back/forward is used?
A4: Listen to the `popstate` event.

Q5: Can pushState/replaceState change the domain?
A5: No, you can only change the path, query, or hash within the same origin.
*/
