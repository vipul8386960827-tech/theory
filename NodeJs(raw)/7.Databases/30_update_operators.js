/* 30_update_operators.js

=====================================================
Update Operators
=====================================================

Definition (What I should say in the interview):
- "Update operators tell MongoDB **how to change** a document instead of replacing it. **$set**
   and **$unset** change or remove fields, **$inc** increments numbers atomically, **$push,
   $addToSet and $pull** modify arrays, and the positional **$** operator updates a matched array
   element. Because these run atomically on the server, they are safer than reading a document,
   changing it in Node and writing it back, especially for counters and stock."

-----------------------------------------------------
Operators cheat sheet
-----------------------------------------------------
| Operator     | Use                                         |
|--------------|---------------------------------------------|
| $set         | Set field value                             |
| $unset       | Remove field                                |
| $inc         | Increment/decrement number                  |
| $mul         | Multiply                                    |
| $min / $max  | Update only if new value is lower/higher    |
| $rename      | Rename field                                |
| $setOnInsert | Set only when upsert inserts                |
| $push        | Append to array ($each, $slice, $sort)      |
| $addToSet    | Append if not present                       |
| $pull        | Remove matching elements                    |
| $pop         | Remove first (-1) or last (1)               |
| $, $[], $[x] | Positional: matched / all / filtered element|

-----------------------------------------------------
Example
-----------------------------------------------------
// Atomic stock decrement only if enough stock (no race condition)
await Product.updateOne({ _id: pid, stock: { $gte: qty } }, { $inc: { stock: -qty } });

// Arrays
await Post.updateOne({ _id }, { $addToSet: { likes: userId } });          // like once
await Post.updateOne({ _id }, { $pull: { likes: userId } });              // unlike
await User.updateOne({ _id }, { $push: { recent: { $each: [item], $slice: -10 } } }); // keep last 10

// Update a specific array element
await Order.updateOne(
  { _id: orderId, 'items.productId': pid },
  { $set: { 'items.$.qty': 3 } }
);

// Filtered positional
await Order.updateOne({ _id: orderId },
  { $set: { 'items.$[i].status': 'shipped' } },
  { arrayFilters: [{ 'i.status': 'packed' }] });

// Upsert
await Stats.updateOne({ day: '2026-05-24' },
  { $inc: { views: 1 }, $setOnInsert: { createdAt: new Date() } }, { upsert: true });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Mongoose wraps plain objects in $set: updateOne({}, { name: 'x' }) becomes $set. The native
  driver requires operators (or use replaceOne for full replacement).
- Read-modify-save is not atomic: two requests can overwrite each other (lost update).
- Same field cannot appear in two operators in one update (conflict error).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: $push vs $addToSet?
A1: $push always appends (duplicates allowed); $addToSet appends only if the value is not
    already in the array.

Q2: How do you implement a view counter?
A2: updateOne with $inc: { views: 1 } - atomic, no need to read the document first.
*/
