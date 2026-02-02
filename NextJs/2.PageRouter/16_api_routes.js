/* 16_api_routes */
/* 
===========================
16_api_routes (Next.js)
===========================

Definition:
API Routes in Next.js allow you to build backend endpoints directly inside
your Next.js project. They run on the server (Node.js or Edge) and are mainly
used to handle data fetching, authentication, form submissions, and server-side logic.

Where they live:
1) Pages Router (legacy / still widely used):
   /pages/api/*.js

   Example:
   /pages/api/users.js  →  /api/users

2) App Router (modern Next.js):
   /app/api/<route>/route.js

   Example:
   /app/api/users/route.js  →  /api/users

--------------------------------
How API Routes work:
- They are NOT part of the client bundle
- Code runs only on the server
- You can safely use:
  - Environment variables
  - Database credentials
  - Secrets / tokens
- They respond with JSON (most common) but can return other responses too

--------------------------------
Pages Router API Route:
- Export a default function
- Receives (req, res)
- Similar to Express-style handlers

Use cases:
- Simple REST APIs
- Form handling
- Auth callbacks
- Proxying external APIs

--------------------------------
App Router API Route:
- Uses HTTP method exports
  (GET, POST, PUT, DELETE, etc.)
- Uses Web Fetch API (Request, Response)
- Better tree-shaking and structure
- Preferred in modern Next.js apps

--------------------------------
Execution environment:
- Can run in:
  1) Node.js runtime (default)
  2) Edge runtime (if specified)

Edge is faster and closer to users but has limitations
(no full Node APIs, limited libraries).

--------------------------------
Typical use cases:
- Authentication (JWT, sessions, OAuth callbacks)
- Database CRUD operations
- Secure server-side logic
- Server-to-server communication
- Avoid exposing API keys on the client

--------------------------------
Important limitations:
- Not meant for heavy backend logic like large monoliths
- Cold starts possible (serverless behavior)
- Not a replacement for full backend frameworks in very large systems

--------------------------------
Frontend Interview Talking Points:
- API Routes reduce the need for a separate backend
- Help keep frontend + backend tightly integrated
- Improve security by keeping secrets on the server
- Work seamlessly with SSR, SSG, and ISR

--------------------------------
Follow-up Interview Questions:
Q: Are API routes server-side or client-side?
A: Server-side only.

Q: Can API routes access cookies and headers?
A: Yes, both request and response cookies/headers are accessible.

Q: When would you choose Edge API routes?
A: For low-latency, lightweight logic like auth checks or redirects.

Q: Are API routes cached?
A: By default no, but caching can be controlled via headers.

--------------------------------
One-line summary:
API Routes let you write backend APIs inside Next.js, securely and efficiently,
without setting up a separate server.
*/
