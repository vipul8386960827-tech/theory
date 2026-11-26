/* 6_populate_vs_joins.js

=====================================================
Populate vs SQL Joins
=====================================================

Definition (What I should say in the interview):
- "In SQL a **JOIN** is done **by the database engine in one query**. Mongoose **populate()**
   looks similar but it is an **application-level join**: Mongoose runs the first query, collects
   the referenced ObjectIds, then runs **a second query with $in** and stitches the results in
   Node. Inside MongoDB itself the real join is the **$lookup** aggregation stage, which runs on
   the server in a single pipeline."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature           | SQL JOIN          | populate()             | $lookup              |
|-------------------|-------------------|------------------------|----------------------|
| Where it runs     | DB engine         | Node (Mongoose)        | MongoDB server       |
| Queries           | 1                 | 1 + 1 per populated path| 1 pipeline          |
| Filter on joined  | Yes (WHERE)       | Only within match option| Yes ($match after)  |
| Returns           | Rows              | Mongoose docs          | Plain objects        |
| Ease of use       | SQL               | Very easy              | More verbose         |

-----------------------------------------------------
Example
-----------------------------------------------------
-- SQL
SELECT o.id, o.total, u.name FROM orders o JOIN users u ON u.id = o.user_id;

// Mongoose populate (2 queries under the hood)
const orders = await Order.find().populate('user', 'name email');

// $lookup (1 aggregation)
const orders2 = await Order.aggregate([
  { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
  { $unwind: '$user' },
  { $match: { 'user.country': 'IN' } },          // filter on joined field
  { $project: { total: 1, 'user.name': 1 } },
]);

-----------------------------------------------------
When to use which
-----------------------------------------------------
- populate -> simple CRUD endpoints, few related docs, readability matters.
- $lookup  -> reports, filtering/sorting by joined fields, grouping across collections.
- Both     -> if you join constantly, maybe the data should be embedded instead.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you filter parent docs by a populated field?
A1: Not directly. populate's match only filters the populated docs (non-matching become null).
    To filter parents by a child field, use $lookup + $match or query the child first.

Q2: Is $lookup slow?
A2: It can be on large collections. Make sure foreignField is indexed and $match early to
    reduce documents before the lookup.
*/
