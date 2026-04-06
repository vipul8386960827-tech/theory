/*
==================================================
JWT vs Session Cookies (Frontend System Design)
==================================================

Core Difference:
- JWT → Token stored on client, manually sent in headers
- Session Cookie → Stored in browser, automatically sent with requests

--------------------------------------------------
🍪 SESSION COOKIES (Server-managed sessions)
--------------------------------------------------

Pros:
1. More secure by default
   - Can use HttpOnly cookies (not accessible via JS)
   - Safer against XSS attacks

2. Automatic handling
   - Browser sends cookies with every request
   - No need to manually attach tokens

3. Easy invalidation
   - Server can destroy session anytime (logout, revoke access)

Cons:
1. CSRF risk
   - Cookies are sent automatically → vulnerable to CSRF
   - Requires CSRF protection

2. Less flexible for APIs
   - Cross-domain handling is harder (CORS, SameSite)

3. Requires server-side storage
   - Sessions must be stored (not fully stateless)


--------------------------------------------------
🔐 JWT (JSON Web Tokens)
--------------------------------------------------

Pros:
1. Stateless
   - No need to store sessions on server
   - Scales well in distributed systems

2. Flexible
   - Sent via Authorization headers
   - Works well with SPAs, mobile apps, multiple clients

3. Cross-domain friendly
   - Avoids cookie restrictions

Cons:
1. Security risks
   - If stored in localStorage → vulnerable to XSS
   - Stolen token usable until expiry

2. Hard to revoke
   - Cannot easily invalidate before expiration
   - Needs blacklist or short expiry

3. Manual handling
   - Must attach token in every request
   - Requires refresh token logic


--------------------------------------------------
🎯 FRONTEND DECISION MAKING
--------------------------------------------------

Use Session Cookies when:
- Same-domain frontend + backend
- Security is critical (banking, admin apps)
- Want simpler frontend auth handling

Use JWT when:
- SPA with separate backend
- Mobile + web share same API
- Microservices architecture


--------------------------------------------------
🔥 ADVANCED FRONTEND BEST PRACTICE (JWT)
--------------------------------------------------

- Store access token in memory (NOT localStorage)
- Store refresh token in HttpOnly cookie
- Use interceptors to refresh tokens automatically

→ Reduces XSS risk + maintains scalability


--------------------------------------------------
🧠 FINAL TAKEAWAY
--------------------------------------------------

- Session Cookies → safer, simpler, better for traditional apps
- JWT → flexible, scalable, but needs careful handling

Frontend goal:
Balance security + usability + scalability
*/
