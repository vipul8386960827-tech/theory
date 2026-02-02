/* 
43_local_vs_session.js – Interview-Ready Answer:

"localStorage and sessionStorage are part of the Web Storage API, allowing 
client-side storage of key-value pairs. They differ mainly in lifetime and scope."

1️⃣ Key Points to Highlight:

1. localStorage:
- Persistent storage; survives browser reloads and closures.
- Larger capacity (~5-10MB).
- Synchronous API.
- Accessible only by JavaScript; not sent with HTTP requests.
- Scope: entire origin (domain + protocol + port).

2. sessionStorage:
- Temporary storage; cleared when tab or browser session ends.
- Similar capacity (~5-10MB).
- Synchronous API.
- Accessible only by JavaScript; not sent with HTTP requests.
- Scope: per tab/session.

3. Key Differences:

| Feature       | localStorage         | sessionStorage       |
|---------------|--------------------|--------------------|
| Lifetime      | Persistent          | Session only       |
| Scope         | Entire origin       | Tab/session        |
| Storage Size  | ~5-10MB             | ~5-10MB            |
| Sent to Server| No                  | No                 |
| API           | Synchronous         | Synchronous        |

4️⃣ Examples:

// localStorage
localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme")); // "dark"
localStorage.removeItem("theme");

// sessionStorage
sessionStorage.setItem("token", "abc123");
console.log(sessionStorage.getItem("token")); // "abc123"
sessionStorage.removeItem("token";

// Clear all
localStorage.clear();
sessionStorage.clear();

5️⃣ Real-Life Analogies:

- Global Analogy:
  - localStorage = personal locker for long-term items; sessionStorage = temporary clipboard.
- India-specific Analogy:
  - localStorage = cupboard where spices are stored permanently; sessionStorage = plate used only for one meal.
- Web Analogy:
  - localStorage = store user theme settings; sessionStorage = store temporary form data during a session.

6️⃣ Code Explanation:

- Both store key-value pairs in the browser.
- localStorage persists indefinitely until cleared.
- sessionStorage clears automatically when tab or session closes.
- Neither is sent to the server; only accessible via JS.

7️⃣ Example / Usage:

// Save theme in localStorage
localStorage.setItem("theme", "dark");

// Save temporary auth token in sessionStorage
sessionStorage.setItem("authToken", "xyz123");

// Retrieve and use
const theme = localStorage.getItem("theme");
const token = sessionStorage.getItem("authToken");
console.log(theme, token);

// Clear when needed
localStorage.removeItem("theme");
sessionStorage.removeItem("authToken");

8️⃣ Follow-Up Interview Questions:

Q1: Difference between localStorage and sessionStorage?  
A1: localStorage persists; sessionStorage clears with tab/session.

Q2: Can these storages be accessed by server?  
A2: No, client-side only.

Q3: What is the typical storage size?  
A3: ~5-10MB per origin (browser-dependent).

Q4: Can multiple tabs share sessionStorage?  
A4: No, each tab has its own sessionStorage.

Q5: Are localStorage and sessionStorage synchronous or asynchronous?  
A5: Synchronous.
*/
