/**
========================================================================
SIMPLE TECHNICAL THEORY: THE "BACKEND-AS-PROXY" FLOW
========================================================================

1. INITIALIZATION (Frontend)
- The UI redirects the user to Google with a "Client ID."
- Tech Term: "Authorization Request."
- Goal: Get permission from the user.

2. THE HANDOFF (Google -> Backend)
- Google sends a temporary "Authorization Code" to the BACKEND callback.
- Tech Term: "Authorization Code Grant."
- Why: The code is sent to the server, so the browser never sees the real "keys."



3. THE EXCHANGE (Backend -> Google)
- The Backend sends the Code + its "Client Secret" (private password) to Google.
- Google swaps them for an "Access Token."
- Tech Term: "Server-to-Server Exchange."
- Why: The "Client Secret" stays hidden on your server, safe from hackers.

4. THE SESSION (Backend -> Browser)
- The Backend creates a session and sends it back as an "HttpOnly Cookie."
- Tech Term: "Secure Session Management."
- Why: "HttpOnly" means JavaScript cannot read the cookie, which blocks
XSS (Cross-Site Scripting) attacks from stealing the session.

5. VALIDATION (Browser -> Backend)
- On every refresh, React calls `/api/me`.
- The Browser automatically attaches the cookie in the background.
- Tech Term: "Credentialed Request."
- Goal: The backend identifies the user and sends back their profile data.

========================================================================
THE CORE ADVANTAGE:
No tokens in LocalStorage = No way for malicious scripts to steal the login.
========================================================================
*/
