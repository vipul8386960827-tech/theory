/*
==========================
🚫 HOW TO PREVENT XSS ATTACKS (FULL GUIDE)
==========================

XSS (Cross-Site Scripting) happens when attacker injects
malicious JavaScript into your app and it executes in the browser.

------------------------------------------------------------
1. NEVER RENDER UNSAFE HTML DIRECTLY
------------------------------------------------------------

❌ BAD:
element.innerHTML = userInput;

✔️ GOOD:
element.textContent = userInput;

👉 Why:
- innerHTML executes HTML + scripts
- textContent treats everything as plain text

------------------------------------------------------------
2. FRAMEWORK AUTO-ESCAPING (React, Vue, Angular)
------------------------------------------------------------

✔️ SAFE BY DEFAULT:
<div>{userInput}</div>

👉 React escapes HTML automatically:
- "<script>" becomes plain text
- not executed

❌ DANGER ONLY WHEN YOU BYPASS:
dangerouslySetInnerHTML

------------------------------------------------------------
3. IF YOU MUST RENDER HTML → SANITIZE IT
------------------------------------------------------------

Use DOMPurify:

import DOMPurify from "dompurify";

const cleanHTML = DOMPurify.sanitize(userInput);
element.innerHTML = cleanHTML;

👉 Removes:
- <script> tags
- onclick handlers
- malicious attributes (onerror, onload, etc.)

------------------------------------------------------------
4. USE CONTENT SECURITY POLICY (CSP)
------------------------------------------------------------

Set HTTP header:

Content-Security-Policy:
  default-src 'self';
  script-src 'self';

👉 This blocks:
- inline scripts
- unknown script sources
- injected external JS

👉 Even if XSS happens, it limits damage

------------------------------------------------------------
5. AVOID INLINE EVENT HANDLERS
------------------------------------------------------------

❌ BAD:
<button onclick="alert('hack')">Click</button>

✔️ GOOD:
button.addEventListener("click", handler);

👉 Why:
- inline JS is easy injection point

------------------------------------------------------------
6. NEVER TRUST URL OR USER INPUT
------------------------------------------------------------

❌ BAD:
document.write(location.search);

✔️ GOOD:
- parse input
- validate
- sanitize before using

------------------------------------------------------------
7. USE HTTPONLY COOKIES (LIMIT DAMAGE)
------------------------------------------------------------

Set cookies like:

HttpOnly; Secure; SameSite=Strict

👉 Benefit:
- JS cannot steal auth token

BUT:
- DOES NOT prevent XSS
- only reduces damage

------------------------------------------------------------
8. VALIDATE + SANITIZE ON SERVER TOO
------------------------------------------------------------

Frontend protection alone is NOT enough.

Always:
- validate input
- sanitize output
- treat all user input as untrusted

------------------------------------------------------------
9. MINIMIZE DANGEROUS APIs
------------------------------------------------------------

Avoid:
- eval()
- new Function()
- setTimeout("string code")

✔️ Always use functions instead

------------------------------------------------------------
💡 FINAL MENTAL MODEL

Prevent XSS by:

1. Never executing user input as code
2. Escaping output by default
3. Sanitizing HTML when needed
4. Using CSP as a safety net
5. Reducing blast radius with HttpOnly cookies
6. Using framework protections properly

==========================
*/
