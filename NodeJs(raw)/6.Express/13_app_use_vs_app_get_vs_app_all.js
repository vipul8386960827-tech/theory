/* 13_app_use_vs_app_get_vs_app_all.js

=====================================================
app.use() vs app.get() vs app.all()
=====================================================

Definition (What I should say in the interview):
- "**app.use()** mounts middleware and matches **any HTTP method** on a **path prefix** - so
   app.use('/api', fn) runs for /api, /api/users and /api/users/5. **app.get()** matches only
   **GET requests** on the **exact route** pattern. **app.all()** is in between: it matches the
   **exact route** like app.get, but for **every HTTP method**. I use app.use for middleware and
   routers, app.get/post for endpoints, and app.all for things like auth on one specific route."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature             | app.use()            | app.get()            | app.all()            |
|---------------------|----------------------|----------------------|----------------------|
| HTTP methods        | All                  | GET (and HEAD)       | All                  |
| Path matching       | Prefix               | Exact route pattern  | Exact route pattern  |
| Path optional?      | Yes (defaults to /)  | No                   | No                   |
| Mount routers?      | Yes                  | No                   | No                   |
| req.url inside      | Mount path stripped  | Full path            | Full path            |
| Typical use         | Middleware, routers  | Read endpoints       | Route-wide checks    |

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();

app.use('/api', (req, res, next) => {
  console.log('use:', req.method, req.originalUrl, '| req.url =', req.url);
  next();   // runs for GET /api, POST /api/users, DELETE /api/users/5 ...
});

app.all('/api/orders', (req, res, next) => {
  console.log('all: any method, but ONLY /api/orders');  // not /api/orders/5
  next();
});

app.get('/api/orders', (req, res) => res.json([]));      // only GET /api/orders
app.post('/api/orders', (req, res) => res.status(201).json(req.body || {}));

app.listen(3000);
// GET  /api/orders/5 -> app.use runs; app.all and app.get do not match -> 404

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- app.get also responds to HEAD requests automatically if no app.head is defined.
- app.get('setting') with ONE argument is a getter for app settings, not a route.
- Inside app.use('/api', fn), req.url is '/users' for /api/users, but req.originalUrl is full.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Will app.use('/user', fn) match /users?
A1: No. Prefix matching works on path segments - it matches /user and /user/..., not /users.

Q2: How would you write a 404 handler?
A2: app.use((req, res) => res.status(404).json({ message: 'Not found' })) after all routes.
*/
