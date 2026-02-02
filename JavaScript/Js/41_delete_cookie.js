/* 
41_delete_cookie.js – Interview-Ready Answer:

"Deleting a cookie in JavaScript involves setting its expiration date to a past date 
or setting its max-age to 0. This removes it from the browser."

1️⃣ Key Points to Highlight:

1. Deleting by Expiration:
- Set `expires` to a past date (e.g., `Thu, 01 Jan 1970 00:00:00 GMT`).
- Must match the same `path` and `domain` used when the cookie was set.

2. Deleting by Max-Age:
- Set `max-age=0` to expire the cookie immediately.

3. Important Notes:
- Cannot delete HttpOnly cookies via JavaScript; server must remove them.
- Path and domain must match original cookie to successfully delete.

2️⃣ Examples:

// Delete using expires
document.cookie = "sessionID=xyz123; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

// Delete using max-age
document.cookie = "token=abc123; max-age=0; path=/";

// Read cookies to confirm deletion
console.log(document.cookie); // Should not contain sessionID or token

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Deleting a cookie = removing a sticky note from your desk.
- India-specific Analogy:
  - Deleting a cookie = canceling a chit or token used for an order.
- Web Analogy:
  - Deleting a cookie = clearing a stored session or preference from the browser.

4️⃣ Code Explanation:

- Setting expiration in the past or max-age=0 signals the browser to remove the cookie.
- Always ensure `path` and `domain` match the original settings.
- HttpOnly cookies cannot be deleted via JS for security.

5️⃣ Example / Usage:

// Set cookie first
document.cookie = "userID=101; path=/";

// Delete cookie
document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

// Verify deletion
console.log(document.cookie); // Should not include userID

6️⃣ Follow-Up Interview Questions:

Q1: How do you delete a cookie in JavaScript?  
A1: Set `expires` to a past date or `max-age=0`.

Q2: Can you delete HttpOnly cookies via JS?  
A2: No, server must remove them.

Q3: Why is path important when deleting cookies?  
A3: Browser matches cookie by name, path, and domain; mismatch prevents deletion.

Q4: Difference between deleting using expires vs max-age?  
A4: `expires` sets a specific date; `max-age=0` removes immediately; both work similarly.

Q5: Can you delete cookies across subdomains?  
A5: Only if cookie `domain` was set to allow subdomain access.
*/
