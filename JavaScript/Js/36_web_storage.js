/* 
36_web_storage.js – Interview-Ready Answer:

"Web Storage in JavaScript provides two mechanisms—`localStorage` and `sessionStorage`— 
for storing key-value data in the browser. Unlike cookies, they are larger in size 
and not sent with every HTTP request."

1️⃣ Key Points to Highlight:

1. Types of Web Storage:
- `localStorage`:
  - Persistent storage.
  - Data survives browser reloads and closures.
  - Scope: per origin (domain + protocol + port).

- `sessionStorage`:
  - Temporary storage.
  - Data cleared when the tab/browser session ends.
  - Scope: per tab.

2. Common Methods:
- setItem(key, value) → store data.
- getItem(key) → retrieve data.
- removeItem(key) → remove specific key.
- clear() → remove all items.
- key(index) → get key by index.
- length → number of items stored.

3. Key Features:
- Stores strings only; objects/arrays must be serialized (`JSON.stringify`) 
  and deserialized (`JSON.parse`).
- Synchronous API.
- Larger capacity than cookies (~5-10MB).
- Not sent with HTTP requests (reduces network overhead).

2️⃣ Examples:

// localStorage example
localStorage.setItem("name", "Kaizer");
console.log(localStorage.getItem("name")); // "Kaizer"
localStorage.removeItem("name");
localStorage.clear();

// Storing objects
const user = { id: 1, name: "Amit" };
localStorage.setItem("user", JSON.stringify(user));
const retrievedUser = JSON.parse(localStorage.getItem("user"));
console.log(retrievedUser.name); // "Amit"

// sessionStorage example
sessionStorage.setItem("sessionID", "ABC123");
console.log(sessionStorage.getItem("sessionID")); // "ABC123"

3️⃣ Real-Life Analogies:

- Global Analogy:
  - localStorage = permanent drawer; sessionStorage = temporary clipboard.
- India-specific Analogy:
  - localStorage = cupboard where spices are kept permanently; 
    sessionStorage = plate used for serving in a single meal.
- Web Analogy:
  - localStorage = save user settings for future visits; 
    sessionStorage = save form data temporarily while tab is open.

4️⃣ Code Explanation:

- `localStorage` persists until manually cleared.
- `sessionStorage` clears automatically when the session ends.
- Only strings can be stored; use `JSON.stringify` for objects.
- Synchronous, so avoid storing large data that blocks UI.

5️⃣ Example / Usage:

// Saving user preferences
const theme = { darkMode: true, fontSize: 16 };
localStorage.setItem("theme", JSON.stringify(theme));

// Retrieving preferences
const savedTheme = JSON.parse(localStorage.getItem("theme"));
console.log(savedTheme.darkMode); // true

// Storing session-specific token
sessionStorage.setItem("authToken", "xyz123");
console.log(sessionStorage.getItem("authToken")); // "xyz123"

6️⃣ Follow-Up Interview Questions:

Q1: Difference between localStorage and sessionStorage?  
A1: localStorage persists across browser sessions; sessionStorage clears 
    when tab is closed.

Q2: Can you store objects in Web Storage?  
A2: Yes, by using JSON.stringify() to store and JSON.parse() to retrieve.

Q3: Is Web Storage synchronous or asynchronous?  
A3: Synchronous.

Q4: What is the storage limit?  
A4: Usually around 5-10MB per origin (browser-dependent).

Q5: How is Web Storage different from cookies?  
A5: Web Storage is larger, not sent with HTTP requests, and easier to work with.
*/
