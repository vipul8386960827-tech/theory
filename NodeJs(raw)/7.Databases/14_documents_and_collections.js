/* 14_documents_and_collections.js

=====================================================
Documents and Collections
=====================================================

Definition (What I should say in the interview):
- "A **document** is a single record in MongoDB, stored as BSON, made of field-value pairs that
   can include nested sub-documents and arrays. A **collection** is a group of documents, like a
   table in SQL, but documents inside it do not need the same fields. Every document must have
   a unique **_id** field, and MongoDB adds an ObjectId automatically if I do not provide one."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Document max size: 16MB. Max nesting depth: 100 levels.
2. _id is immutable and unique per collection (it can be any type except an array).
3. Field names are case-sensitive; avoid starting them with $ and avoid dots.
4. Collections are created automatically on the first insert, or explicitly with
   db.createCollection() when you need options (validation, capped, collation).
5. Special collections: capped (fixed size, insertion order, good for logs), time-series, views.

-----------------------------------------------------
Example
-----------------------------------------------------
// A document in the "orders" collection
{
  _id: ObjectId("6650f1c2a1b2c3d4e5f60718"),
  userId: ObjectId("6650f0aaa1b2c3d4e5f60001"),
  items: [
    { productId: ObjectId("..."), qty: 2, price: 499 },
    { productId: ObjectId("..."), qty: 1, price: 999 }
  ],
  shipping: { city: "Pune", pincode: "411001" },
  status: "paid",
  createdAt: ISODate("2026-05-24T10:00:00Z")
}

// Server-side validation on a collection
db.createCollection('users', {
  validator: { $jsonSchema: { required: ['email'], properties: { email: { bsonType: 'string' } } } }
});

// Capped collection for logs
db.createCollection('logs', { capped: true, size: 10485760 });   // 10MB

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Unbounded arrays inside a document (e.g. pushing every comment into a post). The document
  grows toward 16MB and updates get slower. Put such data in its own collection.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can two documents in the same collection have different fields?
A1: Yes. That is the flexible schema; but in practice we keep them consistent with Mongoose.

Q2: What is a sub-document?
A2: An embedded object inside a document. In Mongoose, embedded schemas get their own _id by
    default (disable with { _id: false }).
*/
