/* 27_cors_error_from_frontend.js

=====================================================
Scenario: CORS Error When Frontend Calls the API
=====================================================

The Question (how the interviewer asks it):
- "Our React app on https://app.example.com calls our API on
   https://api.example.com and the browser shows a CORS error. Postman works
   fine. What is happening and how do you fix it?"

What the interviewer is checking:
- What CORS and the same-origin policy actually are
- Preflight (OPTIONS) requests and when they happen
- Correct cors middleware config, especially with credentials (cookies)
- Knowing CORS is a browser rule, not server-side security

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify first: read the exact error in the browser console. Is it the
   preflight that fails? Are we sending cookies or an Authorization header?
2. Explain: an origin is scheme + host + port. The browser blocks JS from
   reading a response from another origin unless the server allows it with
   Access-Control-Allow-Origin. Postman is not a browser, so it does not care.
3. Preflight: for "non-simple" requests (PUT/DELETE/PATCH, JSON content
   type, custom headers like Authorization) the browser first sends an
   OPTIONS request. The server must answer it with the right headers.
4. Fix: use the cors middleware with an allow-list of origins, the methods
   and headers we need. Register it BEFORE the routes and auth middleware,
   so OPTIONS requests are not rejected with 401.
5. Cookies: set credentials: true on the server AND credentials: 'include'
   (fetch) or withCredentials (axios) on the client. With credentials, the
   origin cannot be "*" - it must be the exact origin.
6. Check the other usual causes: the server crashed (500 without CORS
   headers looks like a CORS error), wrong URL, or http vs https mismatch.
7. Alternative: in development, use a dev-server proxy (Vite/CRA) so the
   browser sees the same origin.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const cors = require('cors');

const allowedOrigins = [
  'https://app.example.com',
  'http://localhost:5173',                   // local dev
];

// BAD: allows every site, and "*" does not work with cookies anyway
// app.use(cors());

// GOOD: allow-list, before routes and auth
app.use(cors({
  origin(origin, callback) {
    // no origin = server-to-server, curl, Postman
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);            // no CORS headers -> browser blocks
  },
  credentials: true,                         // allow cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,                               // cache preflight for 10 min
}));

app.use('/api', authRouter, ordersRouter);

// Frontend
// fetch('https://api.example.com/api/orders', { credentials: 'include' });

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "CORS is a browser rule: by default, JavaScript cannot read responses from
   another origin unless the server sends Access-Control-Allow-Origin.
   Postman works because it is not a browser. I fix it with the cors
   middleware, an allow-list of origins, and I register it before auth so
   the OPTIONS preflight succeeds. If we use cookies, I set credentials: true
   with an exact origin, never '*', and the client sends credentials:
   'include'."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Thinking CORS protects the API. curl or a script can still call it; you
  still need authentication and authorization.
- Fixing it with origin: '*' everywhere, or reflecting any origin with
  credentials - this lets any site make authenticated requests.
- Putting cors() after the auth middleware, so preflight gets 401.
- Trying to "fix" it in the frontend with a header like
  Access-Control-Allow-Origin in the request. It is a response header.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What makes a request "simple" (no preflight)?
A1: GET, HEAD or POST, only basic headers, and Content-Type of
    text/plain, multipart/form-data or application/x-www-form-urlencoded.
    application/json always triggers a preflight.

Q2: Does CORS stop CSRF?
A2: Not fully. A simple form POST from another site is still sent; the
    browser only blocks reading the response. Use SameSite cookies and CSRF
    tokens for that.

Q3: The frontend cannot read a custom response header. Why?
A3: By default only safe headers are exposed. Add exposedHeaders (for
    example ['X-Total-Count']) in the cors config.
*/
