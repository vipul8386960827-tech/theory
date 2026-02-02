/*
In a QR-based login flow, the desktop or web app first requests a unique, 
short-lived QR code from the server, which encodes a one-time token or session ID. 
The user scans this QR code using their already-authenticated mobile app, which then sends 
the scanned token back to the server over a secure HTTPS request. The server validates the 
token, ensures it hasn’t expired or been used before, and then links the desktop session to 
the user’s account. Once validated, the desktop or web app is logged in instantly. 
This approach is secure because the token is short-lived, unpredictable, and single-use, 
and it provides a convenient login method without typing credentials. For better security,
the mobile app can prompt the user to confirm the login, and the server can notify the user 
of all active sessions.
*/
/*
QR Login Workflow with HttpOnly Cookie (Post-Scan)

1. Mobile app scans the QR code displayed on the desktop.
   - QR contains only a short session ID or token hash, never the real session token.

2. Mobile app sends the scanned session ID along with its authenticated mobile token to the server over HTTPS.

3. Server validates the QR token:
   - Checks that the token exists, is unexpired, unused.
   - Confirms the mobile user is authenticated.
   - Marks the QR token as used to prevent replay attacks.

4. Upon successful validation, the server responds to the desktop's HTTP request with a Set-Cookie header:
   - Example: Set-Cookie: session_token=abc123; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600
   - HttpOnly → prevents JavaScript from reading or modifying the cookie.
   - Secure → cookie only sent over HTTPS.
   - SameSite=Strict → prevents CSRF.
   - Max-Age → sets cookie expiration.

5. Browser automatically stores the HttpOnly cookie:
   - Desktop JS cannot access it.
   - All subsequent requests from the desktop include the cookie automatically.

6. Desktop session is now fully authenticated:
   - User can chat securely.
   - Server trusts the HttpOnly cookie for session authentication.
   - Session token never leaves the server or becomes exposed to JavaScript.

Key Security Points:
- Server is responsible for setting the HttpOnly cookie.
- Token is short-lived, single-use, and validated server-side.
- HttpOnly + Secure + SameSite protects against XSS and CSRF attacks.
- Desktop session is secure immediately after QR scan without exposing sensitive data.
*/
