/*
==================================================
HTTP-ONLY COOKIES (Frontend System Design)
==================================================


/*
Cookies are sent by browser when:

1. Same-origin request
   → cookies are sent automatically (no need for credentials: 'include')

2. Cross-origin request
   → cookies are sent ONLY if:
      credentials: 'include' is set


Definition:
- HttpOnly cookies are cookies that cannot be accessed via JavaScript
- They are only sent automatically by the browser with HTTP requests

Example:
Set-Cookie: token=abc123; HttpOnly


--------------------------------------------------
🔐 WHY ARE THEY USED?
--------------------------------------------------

 1. Protection against XSS attacks
 - JavaScript cannot read HttpOnly cookies
 - Even if attacker injects script → cannot steal token


 2. Secure storage for sensitive data
 - Used for:
   → Session IDs
   → Refresh tokens
   → Auth tokens (in simpler systems)
 - Keeps sensitive data hidden from frontend JS


 3. Automatic handling by browser
 - Browser automatically sends cookies with requests
 - No need to manually attach tokens in headers


--------------------------------------------------
⚠️ TRADEOFF / DRAWBACK
--------------------------------------------------

 CSRF (Cross-Site Request Forgery) risk
 - Cookies are automatically sent by browser
 - Malicious site can trigger requests on behalf of user

 Requires protection:
 - CSRF tokens
 - SameSite cookie attribute


--------------------------------------------------
🧠 FRONTEND SYSTEM DESIGN USAGE
--------------------------------------------------

 Common modern pattern:

 Refresh Token → HttpOnly cookie (secure, long-lived)
 Access Token  → Memory (short-lived, controlled)

 Reason:
 - Protect from XSS (HttpOnly)
 - Avoid CSRF + maintain control (memory)


--------------------------------------------------
🎯 FINAL SUMMARY
--------------------------------------------------

 HttpOnly cookies:
 ✔ Protect against XSS
 ✔ Good for sensitive data
 ❌ Need CSRF protection

*/
