/* 15_middleware_order.js

=====================================================
Middleware Order (Why order matters)
=====================================================

Definition (What I should say in the interview):
- "Express runs middleware and routes **in the exact order they are registered**, top to
   bottom. So the order in app.js is effectively the request pipeline. Security and parsing
   middleware like helmet, cors and express.json must come first, then auth, then the routes,
   then the 404 handler, and finally the error handler. If I put express.json after a route,
   that route gets undefined body; if I put the error handler first, it never catches anything."

-----------------------------------------------------
Recommended order
-----------------------------------------------------
1. Security headers / CORS          -> helmet(), cors()
2. Rate limiting                    -> express-rate-limit
3. Logging                          -> morgan()
4. Body / cookie parsing            -> express.json(), cookie-parser
5. Static files                     -> express.static()
6. Public routes                    -> /auth/login, /health
7. Auth middleware                  -> verify JWT
8. Protected routes                 -> /api/...
9. 404 handler                      -> app.use((req, res) => ...)
10. Error handler (4 args)          -> always LAST

-----------------------------------------------------
Example (spot the bugs)
-----------------------------------------------------
const express = require('express');
const app = express();

// BUG 1: route before body parser -> req.body is undefined here
app.post('/early', (req, res) => res.json({ body: req.body }));

app.use(express.json());

app.get('/health', (req, res) => res.send('ok'));     // public, before auth

app.use((req, res, next) => {                          // auth applies to everything BELOW
  if (!req.headers.authorization) return res.status(401).json({ message: 'No token' });
  next();
});

app.get('/api/orders', (req, res) => res.json([]));   // protected

app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, req, res, next) => res.status(500).json({ message: err.message }));

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- A global auth middleware also blocks the 404 handler -> unknown routes return 401, not 404.
  Better: mount auth on a router: app.use('/api', auth, apiRouter).
- express.static early means static files skip auth and logging placed after it.
- Routes defined with the same path: the first one that sends a response wins.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why should cors() come before routes?
A1: Preflight OPTIONS requests must get CORS headers before any route or auth rejects them.

Q2: Does order matter between routers?
A2: Yes - app.use('/api', a) then app.use('/api', b): b only runs if a calls next() or has no match.
*/
