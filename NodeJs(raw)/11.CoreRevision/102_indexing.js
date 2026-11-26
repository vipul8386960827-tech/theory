/* 4_indexing.js

=====================================================
Indexing
=====================================================

Definition (What I should say in the interview):
- "An index is a **separate sorted data structure** (a B-tree in MongoDB) that stores field
   values with pointers to documents, so the database can find matching documents **without
   scanning the whole collection**. Without an index MongoDB does a COLLSCAN; with one it does
   an IXSCAN. Indexes make reads much faster but cost **extra storage and slower writes**, so I
   create them based on the actual queries the app runs."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. _id has an automatic unique index.
2. Index the fields used in filters, sorts and joins ($lookup foreignField).
3. Each index slows insert/update/delete because it must be updated too.
4. Indexes should fit in RAM (working set) for best performance.
5. Compound index order matters -> follow the ESR rule (Equality, Sort, Range).

-----------------------------------------------------
Example
-----------------------------------------------------
// In Mongoose schema
userSchema.index({ email: 1 }, { unique: true });
orderSchema.index({ userId: 1, createdAt: -1 });     // compound

// Query that uses it
Order.find({ userId }).sort({ createdAt: -1 }).limit(20);

// Mongo shell
db.orders.createIndex({ userId: 1, createdAt: -1 });
db.orders.getIndexes();
db.orders.dropIndex('userId_1_createdAt_-1');

-----------------------------------------------------
ESR Rule (compound index design)
-----------------------------------------------------
Query: find({ status: 'paid', amount: { $gt: 100 } }).sort({ createdAt: -1 })
Good index: { status: 1, createdAt: -1, amount: 1 }
  E = status (equality) first, S = createdAt (sort) next, R = amount (range) last.

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Indexing every field "just in case" -> slow writes, wasted RAM.
- Low-selectivity indexes (e.g. only on a boolean) rarely help alone.
- Relying on Mongoose autoIndex in production; large index builds should be planned.
- Regex like /abc/ (not anchored) cannot use the index efficiently; /^abc/ can.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you know a query uses an index?
A1: Run .explain('executionStats') and check for IXSCAN and totalDocsExamined close to nReturned.

Q2: Does index { a: 1, b: 1 } help a query on b alone?
A2: No. Compound indexes support prefixes: a, or a+b. A query on b alone cannot use it well.

Q3: What is a covered query?
A3: A query where all filtered and returned fields are in the index, so MongoDB answers from
    the index alone without reading documents (project out _id unless it is in the index).
*/
