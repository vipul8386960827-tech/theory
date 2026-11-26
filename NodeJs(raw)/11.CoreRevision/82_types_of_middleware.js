/* 4_types_of_middleware.js

=====================================================
Types of Middleware
=====================================================

Definition (What I should say in the interview):
- "Express docs list five types of middleware: **application-level** (app.use / app.get),
   **router-level** (router.use), **error-handling** (four arguments), **built-in** like
   express.json and express.static, and **third-party** like cors or helmet. They all have the
   same shape - the difference is where they're mounted and what they're responsible for."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Type              | Bound to             | Example                          |
|-------------------|----------------------|----------------------------------|
| Application-level | app instance         | app.use(logger)                  |
| Router-level      | express.Router()     | router.use(requireAuth)          |
| Error-handling    | app/router, 4 args   | app.use((err, req, res, next))   |
| Built-in          | ships with Express   | express.json(), express.static() |
| Third-party       | npm packages         | cors(), helmet(), morgan('dev')  |

-----------------------------------------------------
Example (all five together)
-----------------------------------------------------
const express = require('express');
const cors = require('cors');                       // third-party
const app = express();
const adminRouter = express.Router();

app.use(cors());                                    // third-party
app.use(express.json());                            // built-in
app.use((req, res, next) => {                       // application-level
  req.requestTime = new Date().toISOString();
  next();
});

adminRouter.use((req, res, next) => {               // router-level
  if (req.headers['x-role'] !== 'admin') return res.sendStatus(403);
  next();
});
adminRouter.get('/stats', (req, res) => res.json({ users: 42, at: req.requestTime }));
app.use('/admin', adminRouter);

app.use((err, req, res, next) => {                  // error-handling
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Router-level middleware only runs for requests that reach that router.
- Error middleware is identified purely by having 4 parameters (fn.length === 4).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you write your own reusable configurable middleware?
A1: Yes, use a factory: const limit = (max) => (req, res, next) => {...}; app.use(limit(100)).

Q2: Where would you put auth middleware?
A2: Router-level on protected routers, or route-level on specific endpoints - not globally
    if public routes like /login exist.
*/
