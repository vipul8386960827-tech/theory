/* 31_find_vs_findone_vs_findbyid.js

=====================================================
find() vs findOne() vs findById()
=====================================================

Definition (What I should say in the interview):
- "**find()** returns an **array** of all documents that match the filter - an empty array if
   nothing matches. **findOne()** returns the **first matching document or null**. **findById(id)**
   is a shortcut for findOne({ _id: id }) that also **casts the id string to ObjectId**. So I use
   find for lists, findOne for lookups by a unique field like email, and findById for
   /resource/:id routes."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Method          | Returns            | No match | Typical use                 |
|-----------------|--------------------|----------|-----------------------------|
| find(filter)    | Array of docs      | []       | Lists, search               |
| findOne(filter) | One doc            | null     | Login by email, unique slug |
| findById(id)    | One doc            | null     | GET /users/:id              |

-----------------------------------------------------
Example
-----------------------------------------------------
const users = await User.find({ role: 'admin' });          // [] if none
if (users.length === 0) { }

const user = await User.findOne({ email: 'a@b.com' });      // null if none
if (!user) return res.status(404).end();

const byId = await User.findById(req.params.id);            // null if none
// findById(undefined) -> findOne({ _id: null }) -> returns null, a subtle bug source

// All return a Query, so chain before awaiting
const list = await User.find({ isActive: true }).select('name').sort({ name: 1 }).limit(10).lean();

// Faster alternatives when you only need existence / count
await User.exists({ email });            // { _id } or null
await User.countDocuments({ role: 'admin' });

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Checking if (!users) after find() -> an empty array is truthy; check users.length.
- findOne without sort when several docs match -> "first" is not guaranteed; add .sort().
- Invalid id string in findById throws CastError (400), it does not return null.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is findById faster than findOne({ _id })?
A1: Same query underneath (it uses the _id index). findById is just convenience plus casting.

Q2: How do you fetch a single random document?
A2: aggregate([{ $sample: { size: 1 } }]).
*/
