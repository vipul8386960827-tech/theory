/* 19_param_middleware.js

=====================================================
app.param() / router.param() Middleware
=====================================================

Definition (What I should say in the interview):
- "app.param() or router.param() lets us register a callback that runs **whenever a specific
   route parameter appears** in a matched route - for example every route that has :userId.
   It's useful for loading the resource once, like fetching the user from the database and
   attaching it to req, instead of repeating the same lookup in every handler. It runs
   **only once per request** for a given param, even if multiple routes match."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Signature: router.param('name', (req, res, next, value, name) => { ... }).
2. Runs before the route handlers that contain that param.
3. Params defined on a router only apply to routes on that router (not inherited by app).
4. Called once per request per param value, even across several matching routes.
5. Good for: loading resources, validating IDs (e.g. Mongo ObjectId), 404 early.

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();
const router = express.Router();

const users = { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } };

router.param('userId', (req, res, next, id) => {
  if (!/^\d+$/.test(id)) return res.status(400).json({ message: 'Invalid id' });
  const user = users[id];                     // normally: await User.findById(id)
  if (!user) return res.status(404).json({ message: 'User not found' });
  req.user = user;
  next();
});

router.get('/:userId', (req, res) => res.json(req.user));
router.get('/:userId/orders', (req, res) => res.json({ user: req.user.name, orders: [] }));
router.delete('/:userId', (req, res) => res.sendStatus(204));

app.use('/users', router);
app.listen(3000);

-----------------------------------------------------
Comparison with alternatives
-----------------------------------------------------
| Approach                     | Pros                          | Cons                           |
|------------------------------|-------------------------------|--------------------------------|
| router.param()               | Automatic for every :userId   | Less visible, "magic"          |
| Named middleware loadUser    | Explicit in route definition  | Must add to each route         |
| Lookup inside each handler   | Simple                        | Duplicated code                |

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does app.param work for params in a mounted router?
A1: No. Define router.param on the router that declares the route.

Q2: Can param callbacks be async?
A2: Yes, but in Express 4 you must catch errors and call next(err) yourself.
*/
