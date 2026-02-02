/* 
39_why_cookie.js – Interview-Ready Answer:

"Cookies are used to store small pieces of data on the client side, mainly 
to manage sessions, remember user preferences, and track user behavior across visits."

1️⃣ Key Points to Highlight:

1. Session Management:
- Maintain login sessions by storing session IDs.
- Enables users to stay logged in between page reloads.

2. Personalization:
- Store user preferences such as theme, language, or layout.
- Customize user experience based on stored values.

3. Tracking & Analytics:
- Track user behavior for analytics or marketing purposes.
- Helps in remembering visited pages or actions.

4. Server Communication:
- Cookies are automatically sent with every HTTP request.
- Server can read and use cookie data to identify users or sessions.

5. Key Limitations:
- Small size (~4KB per cookie).
- Sent with every HTTP request (can impact performance).
- Vulnerable to XSS and CSRF attacks if not properly secured.

2️⃣ Examples:

// Set a cookie for session management
document.cookie = "sessionID=xyz123; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// Set a cookie for personalization
document.cookie = "theme=dark; path=/";

// Read cookies
console.log(document.cookie); // "sessionID=xyz123; theme=dark"

// Delete a cookie
document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Cookies = sticky notes remembering your preferences on a desk.
- India-specific Analogy:
  - Cookies = a token or chit given at a shop to remember your previous order.
- Web Analogy:
  - Cookies = browser memory to persist session ID, user settings, or tracking info.

4️⃣ Code Explanation:

- Cookies are key-value pairs stored in the browser.
- Automatically included in HTTP headers.
- Can store session info, preferences, and small tracking data.
- Use `secure`, `httpOnly`, and `sameSite` for safety.

5️⃣ Example / Usage:

// Store login session
document.cookie = "userID=101; secure; samesite=Strict; path=/";

// Store language preference
document.cookie = "lang=en; path=/";

// Read cookie
const userCookie = document.cookie.split("; ").find(c => c.startsWith("userID="));
console.log(userCookie); // "userID=101"

// Delete cookie
document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

6️⃣ Follow-Up Interview Questions:

Q1: Why do we need cookies?  
A1: For session management, personalization, and tracking user behavior.

Q2: Can cookies be used to store large data?  
A2: No, limited to ~4KB; for large data use IndexedDB or Web Storage.

Q3: How do cookies help servers recognize users?  
A3: Cookies are sent with HTTP requests; server reads cookie values to identify sessions.

Q4: How can you make cookies secure?  
A4: Use `secure`, `httpOnly`, and `sameSite` flags.

Q5: Difference between cookies and localStorage?  
A5: Cookies → sent with HTTP requests, small, can be server-readable.  
   localStorage → larger, client-only, persists without being sent to server.
*/
