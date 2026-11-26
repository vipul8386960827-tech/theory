/* 23_put_vs_patch.js

=====================================================
PUT vs PATCH
=====================================================

Definition (What I should say in the interview):
- "Both are used for updates, but **PUT replaces the whole resource** with the representation
   sent by the client - fields not included are removed or reset. **PATCH applies a partial
   update** - only the fields sent are changed. PUT is idempotent by definition; PATCH is not
   guaranteed to be idempotent, for example an operation like 'increment views by 1'. In
   practice I use PATCH for most edit forms because clients usually change only a few fields."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect           | PUT                               | PATCH                            |
|------------------|-----------------------------------|----------------------------------|
| Update type      | Full replacement                  | Partial modification             |
| Body             | Complete resource                 | Only changed fields / operations |
| Missing fields   | Removed / set to default          | Left unchanged                   |
| Idempotent       | Yes                               | Not guaranteed                   |
| Can create?      | Can, if client knows the ID       | Usually no                       |
| Typical status   | 200 / 204 (201 if created)        | 200 / 204                        |

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();
app.use(express.json());

const db = { 1: { id: 1, name: 'Alice', email: 'a@x.com', city: 'Pune' } };

// PUT -> replace entire document
app.put('/users/:id', (req, res) => {
  const { name, email, city } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'name and email required' });
  db[req.params.id] = { id: Number(req.params.id), name, email, city };  // city missing -> undefined
  res.json(db[req.params.id]);
});

// PATCH -> merge only allowed fields
app.patch('/users/:id', (req, res) => {
  const user = db[req.params.id];
  if (!user) return res.status(404).json({ message: 'Not found' });
  const allowed = ['name', 'email', 'city'];
  for (const key of allowed) if (key in req.body) user[key] = req.body[key];
  res.json(user);
});

app.listen(3000);
// PUT   { "name": "Al", "email": "al@x.com" }  -> city is gone
// PATCH { "city": "Mumbai" }                   -> name and email kept

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Mongoose: findByIdAndUpdate(id, body) is PATCH-like ($set); replaceOne / findOneAndReplace is PUT-like.
- Whitelist fields on PATCH to avoid mass assignment (role, isAdmin).
- Formal PATCH formats exist: JSON Merge Patch (RFC 7396) and JSON Patch (RFC 6902).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why isn't PATCH always idempotent?
A1: A patch can describe an operation (append item, increment counter) - repeating it changes state again.

Q2: Which would you use for toggling a single flag like isActive?
A2: PATCH /users/1 with { "isActive": false } - sending the whole user for one field is wasteful.
*/
