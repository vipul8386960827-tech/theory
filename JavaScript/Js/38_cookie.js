/* 
38_cookie.js – Interview-Ready Answer:

"Cookies are small pieces of data stored by the browser on the client-side, 
primarily used for session management, personalization, and tracking."

1️⃣ Key Points to Highlight:

1. Characteristics:
- Stored in key-value format.
- Sent with every HTTP request to the server.
- Limited size (~4KB per cookie).
- Can have expiration, path, domain, and secure flags.

2. Setting Cookies:
- `document.cookie = "key=value; expires=Date; path=/; secure; samesite=Strict";`

3. Reading Cookies:
- `document.cookie` returns all cookies as a single string: "key1=value1; key2=value2"

4. Deleting Cookies:
- Set the expiration date in the past:
  `document.cookie = "key=value; expires=Thu, 01 Jan 1970 00:00:00 GMT";`

5. Key Flags:
- `secure`: cookie sent only over HTTPS.
- `httpOnly`: accessible only by server, not JS (prevents XSS).
- `sameSite`: restricts cross-site requests; values: Strict, Lax, None.

2️⃣ Examples:

// Set a cookie
document.cookie = "username=Kaizer; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// Read cookies
console.log(document.cookie); // "username=Kaizer"

// Delete a cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

// Set secure and sameSite
document.cookie = "token=abc123; secure; samesite=Strict; path=/";

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Cookies = sticky notes on a desk with small info to remember.
- India-specific Analogy:
  - Cookies = chits given to a waiter to remember your order preferences.
- Web Analogy:
  - Cookies = browser memory for session ID or user preferences; sent with every request.

4️⃣ Code Explanation:

- `document.cookie` can create, read, and delete cookies.
- Each cookie is limited in size; multiple cookies can exist per domain.
- `secure`, `httpOnly`, and `sameSite` enhance security.
- Cookies are synchronous and sent automatically with HTTP requests.

5️⃣ Example / Usage:

// Set a cookie
document.cookie = "theme=dark; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// Read cookie
const cookies = document.cookie.split("; ");
const themeCookie = cookies.find(c => c.startsWith("theme="));
console.log(themeCookie); // "theme=dark"

// Delete cookie
document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

6️⃣ Follow-Up Interview Questions:

Q1: Difference between cookies, localStorage, and sessionStorage?  
A1: Cookies → sent with every HTTP request, small, server-readable.  
   localStorage → larger, persists, client-only.  
   sessionStorage → temporary, per tab, client-only.

Q2: What is HttpOnly flag?  
A2: Cookie not accessible via JavaScript; prevents XSS attacks.

Q3: What is SameSite flag?  
A3: Restricts cross-site requests to prevent CSRF attacks.

Q4: How to delete a cookie?  
A4: Set its expiration date to a past date.

Q5: Can cookies store large data?  
A5: No, ~4KB per cookie only; better use IndexedDB or Web Storage for large data.
*/
