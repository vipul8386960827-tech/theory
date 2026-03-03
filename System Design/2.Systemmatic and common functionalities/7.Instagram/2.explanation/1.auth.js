/*
AUTHENTICATION & MIDDLEWARE LOGIC

1. SESSION MANAGEMENT
- Storage: HttpOnly, Secure, SameSite=Strict Cookies (JWT).
- Cache Control: 'cache: no-store' on Auth/Feed APIs to prevent session leaks.

2. MIDDLEWARE (SERVER-SIDE REDIRECTS)
- Private Routes (/feed, /profile): 
    - If cookie is missing/expired -> Redirect to /login.
- Auth Routes (/login, /register): 
    - If cookie exists -> Redirect to /feed.
- Result: Handles authorization before rendering, preventing UI flicker.

3. SESSION EXPIRY
- If a client-side request (e.g., fetching Page 2) returns a 401:
    - Global handler triggers redirect to /login.
*/
