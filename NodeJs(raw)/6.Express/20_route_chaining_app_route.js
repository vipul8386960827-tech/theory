/* 20_route_chaining_app_route.js

=====================================================
Route Chaining with app.route() / router.route()
=====================================================

Definition (What I should say in the interview):
- "app.route(path) returns a single route object on which we can **chain handlers for
   different HTTP methods** - like .get().post().put(). Instead of writing the same path string
   three or four times, we write it once, which reduces typos and keeps all operations for one
   resource together. I use it with routers to define collection and single-item routes in a
   clean, readable way."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. app.route('/books') returns a Route instance; each method returns it again -> chainable.
2. Works on both app and express.Router().
3. route.all() runs for all methods on that exact path (good for path-specific middleware).
4. Each chained method can still take multiple middleware.

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const router = express.Router();
const auth = (req, res, next) => (req.headers.authorization ? next() : res.sendStatus(401));

router.route('/')
  .get((req, res) => res.json([{ id: 1, title: 'Clean Code' }]))
  .post(auth, (req, res) => res.status(201).json(req.body));

router.route('/:id')
  .all((req, res, next) => {             // runs for every method on /:id
    console.log('Book id:', req.params.id);
    next();
  })
  .get((req, res) => res.json({ id: req.params.id }))
  .put(auth, (req, res) => res.json({ id: req.params.id, ...req.body }))
  .patch(auth, (req, res) => res.json({ updated: Object.keys(req.body) }))
  .delete(auth, (req, res) => res.sendStatus(204));

const app = express();
app.use(express.json());
app.use('/books', router);
app.listen(3000);

-----------------------------------------------------
Without chaining (for comparison)
-----------------------------------------------------
router.get('/:id', getBook);
router.put('/:id', auth, replaceBook);
router.delete('/:id', auth, deleteBook);   // path repeated -> easier to make mistakes

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is there any performance difference?
A1: Not meaningful - it's mostly a readability and organisation choice.

Q2: What happens for an unsupported method on a chained route, e.g. PATCH /books?
A2: The route doesn't handle it, so it falls through to the 404 handler (you could add a 405 handler with .all()).
*/
