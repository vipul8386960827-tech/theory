/* 3_next_function.js

=====================================================
The next() Function
=====================================================

Definition (What I should say in the interview):
- "next is the third argument Express passes to every middleware. Calling **next()** hands
   control to the next matching middleware or route in the stack. Calling **next(err)** with any
   value skips all normal middleware and goes straight to the error-handling middleware. There
   are also two special strings: next('route') skips the remaining handlers of the current route,
   and next('router') exits the current router instance."

-----------------------------------------------------
Variants of next
-----------------------------------------------------
next()          -> go to next matching middleware / handler
next(err)       -> skip to error-handling middleware (4 args)
next('route')   -> skip remaining callbacks of THIS route (only in app.METHOD / router.METHOD)
next('router')  -> leave the current router, continue in the parent app

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();

app.get('/users/:id',
  (req, res, next) => {
    if (req.params.id === 'me') return next('route'); // jump to next route definition
    next();
  },
  (req, res) => res.send(`User ${req.params.id}`)
);

app.get('/users/:id', (req, res) => res.send('Current logged-in user'));

app.get('/fail', (req, res, next) => {
  const err = new Error('Something broke');
  err.status = 500;
  next(err);                                    // goes to error handler
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- next() does NOT stop execution of the current function. Use "return next()" to be safe.
- In Express 4, errors thrown in async code are NOT caught - you must catch and call next(err).
  Express 5 forwards rejected promises automatically.
- next('route') does not work inside app.use() middleware.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens if you call next() twice?
A1: The next handler runs twice, often causing "headers already sent" errors.

Q2: What if no middleware matches after next()?
A2: Express's default final handler sends a 404 "Cannot GET /path".

Q3: Does next() return a promise?
A3: No. It's a normal callback; you can't await it to wait for later middleware.
*/
