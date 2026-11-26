/* 9_route_params_vs_query.js

=====================================================
Route Params vs Query Params
=====================================================

Definition (What I should say in the interview):
- "**Route params** are part of the URL path, defined with a colon like /users/:id, and we
   read them from req.params. They identify a **specific resource**. **Query params** come after
   the question mark, like ?page=2&sort=name, and we read them from req.query. They are optional
   and used to **filter, sort, paginate or search** a collection. Both always arrive as strings,
   so I convert and validate them before using them."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect        | Route Params (req.params)   | Query Params (req.query)        |
|---------------|-----------------------------|---------------------------------|
| Location      | Path: /users/42             | After ?: /users?role=admin      |
| Defined in    | Route pattern (:id)         | Not defined in route            |
| Required?     | Yes (unless optional)       | Optional                        |
| Purpose       | Identify a resource         | Filter / sort / paginate        |
| Type          | Always string               | String, array or object (qs)    |

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();

// GET /users/42/posts/7
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;   // { userId: '42', postId: '7' }
  res.json({ userId: Number(userId), postId: Number(postId) });
});

// GET /products?category=books&page=2&limit=10
app.get('/products', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
  const { category } = req.query;
  res.json({ category, page, limit });
});

app.listen(3000);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Comparing req.params.id === 5 -> always false, because it's the string '5'.
- ?tag=a&tag=b gives an ARRAY ['a','b'] - code expecting a string can break.
- Passing req.query directly into a Mongo query -> NoSQL injection (?age[$gt]=0 becomes an object).
- In Express 5 the default query parser is "simple", so nested objects like ?a[b]=1 aren't parsed
  unless you set app.set('query parser', 'extended').

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When would you use params vs query for an ID?
A1: Params for the main resource identifier (/orders/12); query for optional filters (/orders?status=paid).

Q2: Can query params be used with POST?
A2: Yes, the URL can have a query string with any method, though data normally goes in the body.

Q3: How do you validate them?
A3: With a validation middleware like Joi, Zod or express-validator before the handler.
*/
