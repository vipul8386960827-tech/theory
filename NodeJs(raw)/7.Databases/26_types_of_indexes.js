/* 26_types_of_indexes.js

=====================================================
Types of Indexes in MongoDB
=====================================================

Definition (What I should say in the interview):
- "MongoDB supports several index types for different query patterns. The common ones are
   **single-field** and **compound** indexes, **multikey** indexes that are created automatically
   on array fields, **text** indexes for keyword search, **geospatial (2dsphere)** for location
   queries, **hashed** indexes for hashed sharding, and special options like **unique, sparse,
   partial and TTL**. In my projects I mostly used compound, unique, TTL and text indexes."

-----------------------------------------------------
Index types and options
-----------------------------------------------------
| Type / option | Use case                                     | Example                          |
|---------------|----------------------------------------------|----------------------------------|
| Single field  | Filter/sort on one field                     | { email: 1 }                     |
| Compound      | Multiple fields together (order matters)     | { userId: 1, createdAt: -1 }     |
| Multikey      | Query inside arrays (auto)                   | { tags: 1 }                      |
| Text          | Keyword search with stemming                 | { title: 'text', body: 'text' }  |
| 2dsphere      | Near me / within area                        | { location: '2dsphere' }         |
| Hashed        | Even distribution for sharding               | { userId: 'hashed' }             |
| Unique        | No duplicates                                | { email: 1 }, { unique: true }   |
| Partial       | Index only docs matching a filter            | partialFilterExpression          |
| Sparse        | Skip docs missing the field                  | { sparse: true }                 |
| TTL           | Auto-delete after time (single Date field)   | { expireAfterSeconds: 3600 }     |
| Wildcard      | Unknown/dynamic field names                  | { 'attributes.$**': 1 }          |

-----------------------------------------------------
Example (Mongoose)
-----------------------------------------------------
orderSchema.index({ userId: 1, createdAt: -1 });
productSchema.index({ title: 'text', description: 'text' }, { weights: { title: 5 } });
shopSchema.index({ location: '2dsphere' });
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });          // OTP expires in 5 min
userSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $exists: true } } });

// Using them
Product.find({ $text: { $search: 'iphone case' } }, { score: { $meta: 'textScore' } });
Shop.find({ location: { $near: { $geometry: { type: 'Point', coordinates: [73.85, 18.52] } ,
                                 $maxDistance: 2000 } } });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Only one text index per collection; for serious search use Atlas Search / Elasticsearch.
- TTL deletion runs in a background job about every 60 seconds, not exactly on time.
- A compound index can have at most one array field (multikey limitation).
- Partial index is preferred over sparse for "unique if present" cases.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How would you allow unique email but many users without a phone?
A1: Unique index on phone with partialFilterExpression { phone: { $exists: true } } (or
    { $type: 'string' }), so documents without phone are not indexed.

Q2: Where did you use a TTL index?
A2: For OTPs, password reset tokens and session documents so they clean themselves up.
*/
