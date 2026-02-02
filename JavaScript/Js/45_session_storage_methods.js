/* 
45_session_storage_methods.js – Interview-Ready Answer:

"sessionStorage is a Web Storage API that allows storing key-value pairs in 
the browser for the duration of a tab or session. It provides specific methods 
to manage the stored data."

1️⃣ Key Points to Highlight:

1. Common Methods:

- setItem(key, value): Stores a value under the specified key.
- getItem(key): Retrieves the value associated with the key.
- removeItem(key): Removes a specific key-value pair.
- clear(): Clears all key-value pairs in the sessionStorage.
- key(index): Returns the name of the key at the specified index.
- length: Returns the number of items stored.

2. Key Features:

- Data is cleared when the browser tab or session ends.
- Only accessible within the tab that created it.
- Synchronous API.
- Stores only strings; objects need serialization via JSON.

2️⃣ Examples:

// Store data
sessionStorage.setItem("authToken", "abc123");
sessionStorage.setItem("userName", "Kaizer");

// Retrieve data
console.log(sessionStorage.getItem("authToken")); // "abc123"
console.log(sessionStorage.getItem("userName")); // "Kaizer"

// Remove specific item
sessionStorage.removeItem("authToken");

// Check remaining keys
console.log(sessionStorage.length); // 1
console.log(sessionStorage.key(0)); // "userName"

// Clear all session storage
sessionStorage.clear();
console.log(sessionStorage.length); // 0

// Storing objects
const user = { id: 1, name: "Amit" };
sessionStorage.setItem("user", JSON.stringify(user));
const retrievedUser = JSON.parse(sessionStorage.getItem("user"));
console.log(retrievedUser.name); // "Amit"

3️⃣ Real-Life Analogies:

- Global Analogy:
  - sessionStorage = temporary clipboard; discarded when tab closes.
- India-specific Analogy:
  - sessionStorage = plate used for serving one meal; disposed after use.
- Web Analogy:
  - sessionStorage = store temporary form data or auth token while tab is open.

4️⃣ Code Explanation:

- `setItem` adds or updates key-value pairs.
- `getItem` fetches value.
- `removeItem` deletes a specific key.
- `clear` deletes all keys.
- `key(index)` returns key by index; `length` gives total items.
- Objects must be converted to strings using `JSON.stringify` and back using `JSON.parse`.

5️⃣ Example / Usage:

// Save temporary session data
sessionStorage.setItem("cartItems", JSON.stringify([101, 102, 103]));

// Retrieve and use
const cart = JSON.parse(sessionStorage.getItem("cartItems"));
console.log(cart); // [101, 102, 103]

// Delete an item
sessionStorage.removeItem("cartItems");

// Clear all session data
sessionStorage.clear();

6️⃣ Follow-Up Interview Questions:

Q1: Difference between sessionStorage and localStorage?  
A1: sessionStorage clears when tab closes; localStorage persists across sessions.

Q2: Can multiple tabs share sessionStorage?  
A2: No, each tab has its own separate sessionStorage.

Q3: Is sessionStorage synchronous or asynchronous?  
A3: Synchronous.

Q4: Can sessionStorage store objects?  
A4: Yes, via `JSON.stringify()` and `JSON.parse()`.

Q5: What happens if sessionStorage exceeds capacity?  
A5: Throws `QuotaExceededError`; handle using try/catch.
*/
