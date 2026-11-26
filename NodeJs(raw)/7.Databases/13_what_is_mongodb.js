/* 13_what_is_mongodb.js

=====================================================
What is MongoDB?
=====================================================

Definition (What I should say in the interview):
- "MongoDB is an open-source **NoSQL document database**. It stores data as **BSON documents**
   (binary JSON) inside **collections**, so each record looks like a JSON object and can have
   nested objects and arrays. It is schema-flexible, supports rich queries, secondary indexes,
   aggregation, replication for high availability and sharding for horizontal scaling. It fits
   Node.js very well because documents map directly to JavaScript objects."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Document model -> nested data in one record, fewer joins.
2. Flexible schema -> fields can differ between documents.
3. Indexing -> single, compound, multikey, text, geospatial, TTL.
4. Aggregation pipeline for analytics.
5. Replica sets -> automatic failover.
6. Sharding -> horizontal scaling across machines.
7. ACID transactions across documents (4.0+ replica sets, 4.2+ sharded).
8. Default storage engine: WiredTiger (document-level locking, compression).

-----------------------------------------------------
Terminology mapping
-----------------------------------------------------
| SQL         | MongoDB                 |
|-------------|-------------------------|
| Database    | Database                |
| Table       | Collection              |
| Row         | Document                |
| Column      | Field                   |
| Primary key | _id                     |
| JOIN        | $lookup / embedding     |

-----------------------------------------------------
Example (mongosh)
-----------------------------------------------------
use shop
db.products.insertOne({ name: 'Phone', price: 15000, tags: ['electronics'], specs: { ram: '8GB' } })
db.products.find({ price: { $lt: 20000 } }, { name: 1, price: 1 })

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Max document size is 16MB; use GridFS for larger files.
- MongoDB Atlas is the managed cloud version (backups, monitoring, scaling).
- Databases and collections are created lazily on the first insert.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is MongoDB schema-less?
A1: Schema-flexible. The server does not force a schema unless you add $jsonSchema validation;
    in Node we usually enforce it with Mongoose.

Q2: What tools have you used with MongoDB?
A2: mongosh, MongoDB Compass for browsing and explain plans, Atlas for hosting, Mongoose in code.
*/
