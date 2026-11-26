/* 29_query_operators.js

=====================================================
Query Operators
=====================================================

Definition (What I should say in the interview):
- "Query operators are the **$-prefixed keywords used in filters** to express conditions beyond
   simple equality. There are **comparison** operators like $gt, $lt, $in, $ne, **logical**
   ones like $and, $or, $not, $nor, **element** ones like $exists and $type, **array** ones like
   $all, $elemMatch and $size, and **evaluation** ones like $regex and $expr. Together they let me
   build most API filters directly in find()."

-----------------------------------------------------
Operators by category
-----------------------------------------------------
Comparison : $eq $ne $gt $gte $lt $lte $in $nin
Logical    : $and $or $not $nor
Element    : $exists $type
Array      : $all $elemMatch $size
Evaluation : $regex $expr $text $mod

-----------------------------------------------------
Example
-----------------------------------------------------
// Price between 500 and 2000, in some categories, in stock
Product.find({
  price: { $gte: 500, $lte: 2000 },
  category: { $in: ['phone', 'tablet'] },
  stock: { $gt: 0 },
});

// OR condition
User.find({ $or: [{ email: input }, { username: input }] });

// Field exists
User.find({ deletedAt: { $exists: false } });

// Arrays
Post.find({ tags: { $all: ['node', 'mongodb'] } });        // has both tags
Order.find({ items: { $elemMatch: { productId: pid, qty: { $gte: 2 } } } });  // same element
Post.find({ tags: { $size: 3 } });

// Case-insensitive prefix search (escape user input first!)
const safe = input.replace(/[.*+?^${}()|[\]\]/g, '\$&');
Product.find({ title: { $regex: '^' + safe, $options: 'i' } });

// Compare two fields of the same doc
Product.find({ $expr: { $lt: ['$stock', '$reorderLevel'] } });

-----------------------------------------------------
Common Mistakes / Security
-----------------------------------------------------
- NoSQL injection: req.body.password = { "$ne": null } bypasses login if passed straight into
  a filter. Validate types, cast to String, or use express-mongo-sanitize.
- { items: { productId: pid, qty: 2 } } is an exact sub-document match; use $elemMatch or dot
  notation for field conditions.
- Two conditions on the same key in a JS object ({ price: ..., price: ... }) -> the second
  overwrites the first. Combine them in one object or use $and.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between { 'items.qty': { $gt: 2 }, 'items.color': 'red' } and $elemMatch?
A1: Dot notation can match different array elements for each condition; $elemMatch requires
    one element to satisfy all conditions.

Q2: Is $in or multiple $or better on the same field?
A2: $in - simpler and the planner handles it efficiently with one index.
*/
