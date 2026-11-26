/* 16_objectid.js

=====================================================
ObjectId
=====================================================

Definition (What I should say in the interview):
- "ObjectId is the default type of the **_id** field in MongoDB. It is a **12-byte** value,
   usually shown as a 24-character hex string, made of a **4-byte timestamp** (seconds since
   epoch), a **5-byte random value** unique to the machine/process, and a **3-byte incrementing
   counter**. Because of that it is generated on the client without asking the DB, it is
   unique across servers, and it is **roughly sortable by creation time**."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. 12 bytes = 4 (timestamp) + 5 (random) + 3 (counter).
2. getTimestamp() gives the creation time -> sometimes no need for a createdAt field.
3. Sorting by _id is approximately sorting by insert time (second precision, across machines).
4. Not secret / not random enough for tokens; do not use it as a password reset token.
5. Comparing: use id1.equals(id2) or String(id1) === String(id2), not ===.

-----------------------------------------------------
Example
-----------------------------------------------------
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const id = new ObjectId();
id.toString();          // '6650f1c2a1b2c3d4e5f60718'
id.getTimestamp();      // 2026-05-24T10:00:02.000Z

mongoose.isValidObjectId('abc');                    // false
ObjectId.isValid('6650f1c2a1b2c3d4e5f60718');        // true

// Validate route params before querying
if (!mongoose.isValidObjectId(req.params.id)) {
  return res.status(400).json({ message: 'Invalid id' });
}

// Comparing ids (common bug)
post.author === req.user._id;            // false - different objects
post.author.equals(req.user._id);        // true

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Casting a bad string in findById throws CastError -> return 400, not 500.
- ObjectId.isValid() returns true for any 12-character string too; isValidObjectId in recent
  Mongoose versions is stricter.
- You can use your own _id (e.g. a UUID string or a slug) if it fits the domain.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can ObjectIds collide?
A1: Practically no: the random part and counter make collisions extremely unlikely; the unique
    index on _id would reject one anyway.

Q2: Can you filter documents by creation date using only _id?
A2: Yes, build an ObjectId from a timestamp (ObjectId.createFromTime(seconds)) and query
    _id: { $gte: thatId }.
*/
