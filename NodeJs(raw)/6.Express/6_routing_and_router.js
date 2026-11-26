/* 6_routing_and_router.js

=====================================================
Routing and express.Router()
=====================================================

Definition (What I should say in the interview):
- "Routing is how Express decides which handler runs for a given **HTTP method + URL path**.
   We define routes with app.get, app.post, etc. For bigger apps we use **express.Router()**,
   which is like a mini-app with its own routes and middleware. We create one router per
   resource, like users or orders, and mount it with app.use('/api/users', userRouter) - that
   keeps the code modular and the main app file clean."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Route = method + path + one or more handlers.
2. Routes are matched in the order they are defined - first match wins (unless next() is called).
3. Router paths are relative to where it's mounted.
4. Routers can be nested; use express.Router({ mergeParams: true }) to access parent params.

-----------------------------------------------------
Example
-----------------------------------------------------
// routes/user.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json([{ id: 1, name: 'Alice' }]));      // GET /api/users
router.get('/:id', (req, res) => res.json({ id: req.params.id }));          // GET /api/users/5
router.post('/', (req, res) => res.status(201).json(req.body));            // POST /api/users
router.delete('/:id', (req, res) => res.sendStatus(204));                  // DELETE /api/users/5

module.exports = router;

// app.js
const app = express();
app.use(express.json());
app.use('/api/users', require('./routes/user.routes'));
app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Order matters: define '/users/me' BEFORE '/users/:id', otherwise "me" is treated as an id.
- Optional params: Express 4 uses '/:id?'; Express 5 uses braces '/{:id}'.
- Inside a mounted router, req.baseUrl is '/api/users' and req.path is the remaining part.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you access a parent route's params in a nested router?
A1: Create the child with express.Router({ mergeParams: true }).

Q2: Difference between req.url, req.originalUrl and req.baseUrl?
A2: originalUrl is the full original URL; baseUrl is the router's mount path; url / path
    are relative to the mount point.

Q3: Why split routes into routers?
A3: Separation of concerns, easier testing, and per-resource middleware (e.g. auth on admin router).
*/
