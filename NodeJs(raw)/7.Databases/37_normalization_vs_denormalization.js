/* 37_normalization_vs_denormalization.js

=====================================================
Normalization vs Denormalization
=====================================================

Definition (What I should say in the interview):
- "**Normalization** means organizing data so each fact is stored **once**, split across related
   tables linked by keys - it avoids duplication and update anomalies but needs joins to read.
   **Denormalization** intentionally **duplicates data** to make reads faster and simpler, at the
   cost of extra storage and keeping copies in sync. SQL schemas usually start normalized (3NF);
   in MongoDB we often denormalize based on the read patterns of the app."

-----------------------------------------------------
Normal forms (short version)
-----------------------------------------------------
1NF: Atomic values, no repeating groups (no "phone1, phone2" columns or comma lists).
2NF: 1NF + every non-key column depends on the whole primary key (no partial dependency).
3NF: 2NF + no non-key column depends on another non-key column (no transitive dependency).

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Factor        | Normalized                 | Denormalized                  |
|---------------|----------------------------|-------------------------------|
| Duplication   | Minimal                    | Intentional                   |
| Reads         | Joins needed, slower       | Fewer queries, faster         |
| Writes        | Update in one place        | Update all copies             |
| Consistency   | Easier                     | Risk of stale copies          |
| Fits          | OLTP, finance              | Read-heavy, dashboards, feeds |

-----------------------------------------------------
Example
-----------------------------------------------------
-- Normalized (SQL)
orders(id, customer_id, created_at)
customers(id, name, email)
SELECT o.id, c.name FROM orders o JOIN customers c ON c.id = o.customer_id;

// Denormalized (MongoDB) - store author name on each post
{ _id: ..., title: 'Node tips', author: { _id: ObjectId('...'), name: 'Vipul' } }

// Keep copies in sync when the source changes
await Post.updateMany({ 'author._id': userId }, { $set: { 'author.name': newName } });

// Precomputed counter (denormalized aggregate)
await Post.updateOne({ _id: postId }, { $inc: { commentCount: 1 } });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Denormalize fields that are read often and change rarely (names, avatars, prices at purchase).
- Some duplication is correct, not a bug: order line items must keep the price at order time.
- Sync options: updateMany in the same flow, a background job/queue, or MongoDB change streams.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When would you denormalize in SQL?
A1: For reporting tables, materialized views, or cached counters when joins become the
    bottleneck on read-heavy paths.

Q2: What is an update anomaly?
A2: When the same fact is stored in many rows and an update changes only some of them, leaving
    the data inconsistent.
*/
