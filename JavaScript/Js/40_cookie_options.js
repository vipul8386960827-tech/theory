/* 
40_cookie_options.js – Interview-Ready Answer:

"In JavaScript, cookies can be configured with several options to control 
their behavior, security, and scope."

1️⃣ Key Points to Highlight:

1. Common Cookie Options:

- `expires`:
  - Sets the expiration date of the cookie.
  - Format: `Thu, 01 Jan 2026 00:00:00 GMT`.
  - If not set, cookie is a session cookie (deleted when browser closes).

- `max-age`:
  - Sets lifetime in seconds.
  - Overrides `expires` if both are set.

- `path`:
  - Limits the cookie to a specific path on the domain.
  - Default is `/` (entire domain).

- `domain`:
  - Specifies allowed domain for the cookie.
  - Can be subdomain or main domain.

- `secure`:
  - Cookie sent only over HTTPS.

- `httpOnly`:
  - Not accessible via JavaScript, reduces XSS attacks.

- `sameSite`:
  - Controls cross-site request sending.
  - Values: `Strict`, `Lax`, `None`.

2️⃣ Examples:

// Set a cookie with all options
document.cookie = "sessionID=xyz123; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/; secure; samesite=Strict";

// Using max-age instead of expires
document.cookie = "token=abc123; max-age=3600; path=/; secure; samesite=Lax";

// Read cookies
console.log(document.cookie); // "sessionID=xyz123; token=abc123"

// Delete cookie
document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Cookie options = labels and rules on a jar (expiry, location, access restrictions).
- India-specific Analogy:
  - Cookie options = instructions on a parcel (deliver to which address, handle securely).
- Web Analogy:
  - Cookie options = controlling where, how, and for how long the browser should store and send cookies.

4️⃣ Code Explanation:

- `expires` / `max-age` → control lifetime.
- `path` / `domain` → control scope.
- `secure` → ensures HTTPS only.
- `httpOnly` → prevents JS access.
- `sameSite` → prevents CSRF attacks.
- Setting options properly improves security and behavior consistency.

5️⃣ Example / Usage:

// Secure session cookie
document.cookie = "userID=101; max-age=86400; path=/; secure; samesite=Strict";

// Read cookie
const cookieList = document.cookie.split("; ");
console.log(cookieList);

// Delete cookie
document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

6️⃣ Follow-Up Interview Questions:

Q1: Difference between expires and max-age?  
A1: `expires` uses a fixed date; `max-age` uses seconds from now; `max-age` overrides `expires` if both set.

Q2: What does HttpOnly do?  
A2: Prevents JavaScript access to cookie, mitigating XSS attacks.

Q3: What is sameSite and why is it important?  
A3: Restricts cross-site request sending; prevents CSRF attacks.

Q4: Can cookies be restricted to a specific path?  
A4: Yes, using the `path` option.

Q5: How to make cookies secure?  
A5: Use `secure`, `httpOnly`, and appropriate `sameSite` settings.
*/
