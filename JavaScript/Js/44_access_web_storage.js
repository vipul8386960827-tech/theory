/* 
44_access_web_storage.js – Interview-Ready Answer:

"Accessing Web Storage (localStorage and sessionStorage) in JavaScript allows 
storing, retrieving, and managing key-value data directly in the browser."

1️⃣ Key Points to Highlight:

1. Methods for both localStorage and sessionStorage:
- setItem(key, value) → store data.
- getItem(key) → retrieve data.
- removeItem(key) → remove specific key.
- clear() → remove all items.
- key(index) → get key by index.
- length → number of items stored.

2. Data Handling:
- Stores only strings.
- Objects/arrays must be serialized with `JSON.stringify()` and deserialized with `JSON.parse()`.

3. Security & Scope:
- localStorage: persistent, entire origin.
- sessionStorage: temporary, per tab/session.
- Not sent with HTTP requests.
- Synchronous API.

2️⃣ Examples:

// localStorage example
localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme")); // "dark"
localStorage.removeItem("theme");
localStorage.clear();

// sessionStorage example
sessionStorage.setItem("authToken", "xyz123");
console.log(sessionStorage.getItem("authToken")); // "xyz123"
sessionStorage.removeItem("authToken");
sessionStorage.clear();

// Storing objects
const user = { id: 1, name: "Kaizer" };
localStorage.setItem("user", JSON.stringify(user));
const retrievedUser = JSON.parse(localStorage.getItem("user"));
console.log(retrievedUser.name); // "Kaizer"

3️⃣ Real-Life Analogies:

- Global Analogy:
  - localStorage = permanent drawer; sessionStorage = temporary clipboard.
- India-specific Analogy:
  - localStorage = cupboard for long-term storage; sessionStorage = plate used for a single meal.
- Web Analogy:
  - localStorage = store user preferences; sessionStorage = store temporary form input during session.

4️⃣ Code Explanation:

- `setItem` saves string data under a key.
- `getItem` retrieves it.
- Use `JSON.stringify`/`JSON.parse` for objects/arrays.
- `removeItem` deletes specific key; `clear` deletes all.
- Synchronous access ensures immediate availability, but avoid large data that blocks UI.

5️⃣ Example / Usage:

// Save theme
localStorage.setItem("theme", "dark");

// Save session token
sessionStorage.setItem("token", "abc123");

// Retrieve data
const theme = localStorage.getItem("theme");
const token = sessionStorage.getItem("token");
console.log(theme, token); // "dark" "abc123"

// Delete specific data
localStorage.removeItem("theme");
sessionStorage.removeItem("token");

// Clear all data
localStorage.clear();
sessionStorage.clear();

6️⃣ Follow-Up Interview Questions:

Q1: How do you store objects in Web Storage?  
A1: Use `JSON.stringify()` to store and `JSON.parse()` to retrieve.

Q2: Difference between localStorage and sessionStorage?  
A2: localStorage persists across sessions; sessionStorage clears when tab closes.

Q3: Are Web Storage APIs synchronous or asynchronous?  
A3: Synchronous.

Q4: Can Web Storage data be accessed by the server?  
A4: No, client-side only.

Q5: What happens if storage limit is exceeded?  
A5: Throws `QuotaExceededError`; handle with try/catch.
*/
