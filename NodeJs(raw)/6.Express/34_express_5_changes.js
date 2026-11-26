/* 34_express_5_changes.js

=====================================================
Express 5 - What Changed
=====================================================

Definition (What I should say in the interview):
- "Express 5 became stable in late 2024 after a long beta. The biggest change for me is
   **native promise support** - if an async handler throws or returns a rejected promise, the
   error goes to the error middleware automatically, so no more asyncHandler wrappers. It also
   upgraded **path-to-regexp to v8**, which changes route syntax - wildcards must be named and
   regex characters in route strings are no longer allowed. Several deprecated methods were
   removed, req.query is now a read-only getter, and it requires Node 18 or newer."

-----------------------------------------------------
Key Changes
-----------------------------------------------------
1. Rejected promises / async throws in handlers and middleware -> forwarded to next(err).
2. Route syntax (path-to-regexp v8):
   - Wildcard must be named:     Express 4 allowed a bare star after the slash; Express 5 needs
     a name after the star -> route is '/files/' followed by '*filepath'.
     The matched segments come back as an array in req.params.filepath.
   - Optional params use braces: '/:id?'  ->  '/{:id}'
   - No regex chars in strings:  '/user(s)?' or '/:id(\d+)' not supported -> use a RegExp or validate.
3. req.query is a getter - you can't assign to it (store parsed data elsewhere, e.g. req.validated).
4. Default query parser changed to "simple" (no nested objects unless set to 'extended').
5. req.body is undefined (not {}) when no body parser ran.
6. Removed: res.send(status) / res.json(status, obj) -> use res.status(code).send(); app.del() -> app.delete();
   req.param(name) removed; res.sendfile -> res.sendFile; res.redirect('back') removed.
7. Node.js 18+ required.

-----------------------------------------------------
Example (Express 5)
-----------------------------------------------------
const express = require('express');   // "express": "^5.0.0"
const app = express();
app.use(express.json());

app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id);       // if this rejects -> error middleware
  if (!user) throw Object.assign(new Error('Not found'), { status: 404 });
  res.json(user);
});

app.get('/docs/{:section}', (req, res) => res.json({ section: req.params.section || 'home' }));

app.use((err, req, res, next) => res.status(err.status || 500).json({ message: err.message }));

async function findUser(id) { return id === '1' ? { id: 1, name: 'Alice' } : null; }
app.listen(3000);

-----------------------------------------------------
Important Notes (migration)
-----------------------------------------------------
- Search the codebase for bare wildcard routes, '?' optional params and inline regex in paths.
- An SPA catch-all becomes a named wildcard like '/{*splat}' (written in braces so it also matches '/').
- Remove express-async-errors / asyncHandler once on v5 (they become unnecessary).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Do I still need try/catch in async handlers on Express 5?
A1: Only if you want to handle the error locally; otherwise Express forwards it to error middleware.

Q2: Why was the route syntax changed?
A2: To remove ReDoS-prone regex patterns and make route matching predictable and secure.
*/
