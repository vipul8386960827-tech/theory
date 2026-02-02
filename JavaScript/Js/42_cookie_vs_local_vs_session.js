/* 
42_cookie_vs_local_vs_session.js – Interview-Ready Answer:

"In JavaScript, data can be stored on the client-side using Cookies, localStorage, 
or sessionStorage. Each has distinct behavior, use-cases, and limitations."

1️⃣ Key Points to Highlight:

1. Cookies:
- Key-value storage sent with every HTTP request.
- Small size (~4KB).
- Can have `expires`, `max-age`, `secure`, `httpOnly`, `sameSite`.
- Accessible by server and client (unless HttpOnly).
- Persistent (based on expiration).

2. localStorage:
- Key-value storage, client-side only.
- Larger capacity (~5-10MB).
- Persistent until manually cleared.
- Synchronous API.
- Only accessible by JS; not sent with HTTP requests.

3. sessionStorage:
- Key-value storage, client-side only.
- Similar to localStorage but temporary.
- Cleared when tab or session ends.
- Synchronous API.
- Only accessible by JS; not sent with HTTP requests.

2️⃣ Comparison Table:

| Feature       | Cookie         | localStorage    | sessionStorage |
|---------------|----------------|----------------|----------------|
| Storage Size  | ~4KB           | ~5-10MB        | ~5-10MB        |
| Sent to Server| Yes             | No             | No             |
| Lifetime      | Configurable   | Persistent     | Session only   |
| JS Accessible | Yes/No (HttpOnly)| Yes           | Yes            |
| Scope         | Domain & Path  | Domain         | Tab            |

3️⃣ Examples:

// Cookie
document.cookie = "sessionID=xyz123; path=/; secure; samesite=Strict";

// localStorage
localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme"));

// sessionStorage
sessionStorage.setItem("authToken", "abc123");
console.log(sessionStorage.getItem("authToken"));

// Delete examples
document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
localStorage.removeItem("theme");
sessionStorage.removeItem("authToken");

4️⃣ Real-Life Analogies:

- Global Analogy:
  - Cookie = sticky note that server can read; localStorage = personal drawer; sessionStorage = temporary clipboard.
- India-specific Analogy:
  - Cookie = chit that goes to office; localStorage = permanent locker; sessionStorage = plate used for one meal.
- Web Analogy:
  - Cookie = session ID sent with request; localStorage = save theme; sessionStorage = save temporary form data.

5️⃣ Code Explanation:

- Cookies: small, sent to server, can store session info.
- localStorage: persistent, JS only, larger size.
- sessionStorage: temporary, JS only, per tab.
- Choosing storage depends on security, persistence, and server access requirements.

6️⃣ Example / Usage:

// Store theme in localStorage
localStorage.setItem("theme", "dark");

// Store session token in sessionStorage
sessionStorage.setItem("token", "abc123");

// Store login session in cookie
document.cookie = "userID=101; path=/; secure; samesite=Strict";

7️⃣ Follow-Up Interview Questions:

Q1: When to use cookies over localStorage?  
A1: When server needs access (e.g., session ID).

Q2: Can localStorage and sessionStorage be accessed by server?  
A2: No, client-side only.

Q3: Which has larger storage, cookies or localStorage?  
A3: localStorage.

Q4: When does sessionStorage clear?  
A4: When the browser tab/session ends.

Q5: How to make cookies secure?  
A5: Use `secure`, `httpOnly`, and `sameSite` options.
*/
