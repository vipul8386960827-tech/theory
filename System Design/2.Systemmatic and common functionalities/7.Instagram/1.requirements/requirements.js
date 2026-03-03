/*
SYSTEM DESIGN: INSTAGRAM FRONTEND (60-MIN SESSION)

1. FUNCTIONAL SCOPE
- Auth: Login/Signup + Persistent session management (JWT/Cookies)
- Feed: Infinite scroll with cursor-based pagination
- Profile: User metadata + Grid view (reusing normalized feed data)
- Media: Lazy-loading images/videos + Auto-play logic
- Upload: Client-side compression + Progress tracking UI

2. NON-FUNCTIONAL GOALS
- Performance: Virtualized lists to handle 1000+ DOM nodes
- UX: Optimistic UI for Likes/Comments; Blur-up (LQIP) placeholders
- State: Normalized store to sync 'Like' states across all views
- Security: HttpOnly cookies to prevent XSS; Middleware for route protection

3. TECH STACK & ARCHITECTURE
- Framework: Next.js (App Router) + Middleware for Auth guards
- Data: Hybrid (Server Actions for Page 1/Auth, TanStack Query for Page 2+)
- Persistence: Persist auth state in a global store (Zustand) + LocalStorage
*/
