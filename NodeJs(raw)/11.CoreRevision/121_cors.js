/* 6_cors.js

=====================================================
CORS (Cross-Origin Resource Sharing)
=====================================================

Definition (What I should say in the interview):
- "Browsers follow the **Same-Origin Policy**: JavaScript on one origin (scheme + host + port)
   cannot read responses from another origin. **CORS** is a set of response headers, like
   Access-Control-Allow-Origin, that lets the server tell the browser which other origins are
   allowed to read its responses. Important point: CORS is enforced by the **browser**, it is
   not a server security wall - curl or Postman ignore it, so the API still needs proper auth."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Simple requests (GET/POST with simple headers) -> sent directly, browser checks the response.
2. **Preflight**: for PUT/DELETE, JSON content-type, or custom headers like Authorization,
   the browser first sends an OPTIONS request; the server must answer with allowed methods/headers.
3. Credentials (cookies): server needs Access-Control-Allow-Credentials: true AND a specific
   origin - the wildcard origin is not allowed together with credentials.
4. Client must also send credentials: fetch(url, { credentials: 'include' }) / axios withCredentials.

-----------------------------------------------------
Example (cors package with whitelist)
-----------------------------------------------------
const cors = require('cors');

const allowed = ['https://app.example.com', 'http://localhost:5173'];

app.use(cors({
  origin(origin, cb) {
    // origin is undefined for server-to-server / curl requests
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,                 // cache preflight for 10 minutes
}));

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Reflecting any Origin header back with credentials: true -> any site can read user data.
- Thinking CORS protects against CSRF: it blocks READING the response, not SENDING the request.
- Fixing "CORS error" on the frontend - it is always a server-side header configuration.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does my request work in Postman but not in the browser?
A1: Postman is not a browser and does not enforce the Same-Origin Policy.

Q2: What is a preflight request?
A2: An automatic OPTIONS request the browser sends before a non-simple request to ask the server
    if the method and headers are allowed.

Q3: Is http://localhost:3000 same origin as http://localhost:5173?
A3: No, different port means different origin.
*/
