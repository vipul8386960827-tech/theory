/* 15_express_async_errors_and_express5.js

=====================================================
express-async-errors and Express 5
=====================================================

Definition (What I should say in the interview):
- "**Express 4** only catches errors thrown synchronously in handlers - a rejected promise from an
   async handler is ignored, so the request hangs. The **express-async-errors** package fixes this
   by patching Express's router: you just require it once at the top and rejections go to the
   error middleware. **Express 5** (stable since late 2024) fixes this natively: if a handler or
   middleware returns a rejected promise, Express calls next(err) for you automatically."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Approach              | How                                   | Notes                          |
|-----------------------|---------------------------------------|--------------------------------|
| try/catch + next(err) | Manual in every handler               | Verbose, easy to forget        |
| catchAsync wrapper    | Wrap each handler                     | Explicit, no dependency        |
| express-async-errors  | require('express-async-errors') once  | Monkey-patches Express 4       |
| Express 5             | Built-in                              | Cleanest, needs upgrade        |

-----------------------------------------------------
Example (Express 4 + express-async-errors)
-----------------------------------------------------
const express = require('express');
require('express-async-errors'); // must be required before defining routes

const app = express();

app.get('/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id); // rejection -> error middleware
  if (!order) throw new AppError('Order not found', 404); // throw works too
  res.json(order);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

-----------------------------------------------------
Example (Express 5 - no extra package)
-----------------------------------------------------
// npm install express@5
app.get('/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id); // forwarded automatically
  res.json(order);
});

Other Express 5 changes worth knowing: path syntax changed (wildcard must be named,
e.g. '/*splat'), req.query is a getter, app.del and res.send(status) removed.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Neither one catches errors thrown inside a plain callback (setTimeout, fs callback)
  within the handler - those still escape. Use promise APIs.
- Express 5 only handles the RETURNED promise; a promise you start but do not await is not tracked.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does Express 4 miss rejected promises?
A1: Its router wraps handlers in try/catch, which only catches sync throws. It ignores the return
    value, so a returned rejected promise is never observed.

Q2: Is express-async-errors safe to use?
A2: It is widely used, but it monkey-patches internals. For new projects I would prefer Express 5.

Q3: In Express 5, do I still need an error middleware?
A3: Yes - Express 5 only forwards the error; the (err, req, res, next) handler still formats the response.
*/
