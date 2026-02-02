/* 
47_why_web_storage.js – Interview-Ready Answer:

"Web Storage (localStorage and sessionStorage) provides a way to store 
key-value data on the client-side efficiently, with more space and 
better control than cookies."

1️⃣ Key Points to Highlight:

1. Benefits over Cookies:
- Larger storage capacity (~5-10MB vs ~4KB for cookies).
- Not sent with every HTTP request (reduces bandwidth).
- Simpler API (setItem, getItem, removeItem, clear).
- Can store structured data via JSON serialization.

2. Use Cases:
- Persisting user preferences (themes, language settings).
- Storing temporary session data (form inputs, auth tokens).
- Syncing state across tabs (via `storage` event for localStorage).
- Offline storage for progressive web apps.

3. Security:
- Accessible only via JavaScript; not automatically sent to server.
- Can be cleared manually or programmatically.
- Unlike cookies, cannot use HttpOnly; security must be handled in code.

4. Real-Life Analogies:

- Global Analogy:
  - Web Storage = personal locker for data instead of sticky notes (cookies).
- India-specific Analogy:
  - Web Storage = cupboard for storing items securely; can access anytime.
- Web Analogy:
  - localStorage = save user theme; sessionStorage = temporary form data during session.

5️⃣ Examples:

// Store user preference in localStorage
localStorage.setItem("theme", "dark");

// Retrieve and use
const theme = localStorage.getItem("theme");
console.log(theme); // "dark"

// Store temporary session data
sessionStorage.setItem("authToken", "abc123");
console.log(sessionStorage.getItem("authToken")); // "abc123"

// Remove data
localStorage.removeItem("theme");
sessionStorage.removeItem("authToken");

// Clear all
localStorage.clear();
sessionStorage.clear();

6️⃣ Code Explanation:

- localStorage persists across sessions; sessionStorage clears with tab.
- Provides simple key-value API for client-side storage.
- Allows storing objects/arrays with JSON serialization.
- Reduces server bandwidth and improves client performance compared to cookies.

7️⃣ Follow-Up Interview Questions:

Q1: Why use Web Storage over cookies?  
A1: Larger storage, not sent with HTTP requests, simpler API.

Q2: Difference between localStorage and sessionStorage?  
A2: localStorage persists; sessionStorage clears when tab closes.

Q3: Can Web Storage be accessed by server automatically?  
A3: No, only via client-side JS.

Q4: Can objects/arrays be stored?  
A4: Yes, using `JSON.stringify()` to store and `JSON.parse()` to retrieve.

Q5: Any security concerns?  
A5: Data is accessible via JS; cannot use HttpOnly; sensitive data should be handled carefully.
*/
