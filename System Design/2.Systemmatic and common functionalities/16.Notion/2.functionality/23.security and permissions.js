/*
===============================================================================
NOTION — SECURITY + PERMISSIONS
===============================================================================

-------------------------------------------------------------------------------
1. AUTH
-------------------------------------------------------------------------------
- Session in an httpOnly, Secure, SameSite=Lax cookie → JS can't read it,
  so XSS can't steal it.
- Short-lived access token + refresh token rotation.
- WebSocket: authenticate during the handshake (cookie is sent
  automatically) and CHECK THE Origin header on the server.
- Login: Email/OTP, Google OAuth (Authorization Code + PKCE), SSO (SAML)
  for enterprise. See the Authentication / Auth2.0 folders.

-------------------------------------------------------------------------------
2. XSS (the #1 risk in an editor)
-------------------------------------------------------------------------------
- Paste → DOMPurify allow-list (file 10).
- Store spans as JSON, render through React (auto-escaped) (file 4).
- Links: allow only http/https (block "javascript:" URLs).
- Content-Security-Policy: no inline scripts, restrict script sources.

-------------------------------------------------------------------------------
3. EMBEDS (YouTube, Figma, Google Maps ...)
-------------------------------------------------------------------------------
- Render in <iframe sandbox="allow-scripts allow-same-origin allow-popups">
  from an allow-list of providers only.
- Never give embeds access to our origin's cookies or DOM.
- User-uploaded files are served from a SEPARATE domain
  (e.g. files.notion-usercontent.com) so an uploaded HTML/SVG file can't
  run scripts on our main domain.

-------------------------------------------------------------------------------
4. CSRF
-------------------------------------------------------------------------------
- SameSite cookies + CSRF token on state-changing REST calls.

-------------------------------------------------------------------------------
5. PERMISSIONS
-------------------------------------------------------------------------------
Levels: Full access > Can edit > Can comment > Can view
- Set per page, INHERITED by sub-pages unless overridden.
- Share link: "Anyone with the link can view", optional expiry.

FRONTEND RESPONSIBILITY:
- Fetch my permission with the page: { role: "comment" }.
- Read-only mode: contentEditable={false}, hide the drag handle and
  slash menu, show "You can only comment".
- Permission changed while the page is open → server pushes an event →
  switch to read-only immediately; outbox ops get rejected → toast + refetch.

GOLDEN RULE: the frontend only HIDES controls. The SERVER enforces every
permission on every transaction. Never trust the client.

-------------------------------------------------------------------------------
6. PRIVACY ON SHARED DEVICES
-------------------------------------------------------------------------------
- Logout clears IndexedDB, localStorage, service-worker caches, Yjs docs.

Interview line:
"The main editor risk is XSS, so I sanitize on paste, store JSON instead of
HTML, sandbox embeds, serve uploads from a separate domain, and add CSP. For
permissions, the UI switches to read-only, but the server checks every
transaction."
*/
