/* 17_what_is_mongoose.js

=====================================================
What is Mongoose?
=====================================================

Definition (What I should say in the interview):
- "Mongoose is an **ODM (Object Document Mapper)** library for MongoDB in Node.js, built on top
   of the official MongoDB driver. It adds what the raw driver does not give: **schemas, type
   casting, validation, default values, middleware hooks, virtuals, instance/static methods and
   populate** for references. It makes the data layer consistent and easier to maintain, while
   still letting me drop down to the native driver when I need raw speed."

-----------------------------------------------------
What Mongoose adds over the native driver
-----------------------------------------------------
1. Schema + Model -> structure on a schema-flexible database.
2. Casting -> '25' becomes 25, string id becomes ObjectId.
3. Validation -> required, min/max, enum, match, custom validators.
4. Middleware -> pre/post hooks for save, validate, find, delete, aggregate.
5. Populate -> reference other collections.
6. Query builder -> chainable find().where().sort().limit().
7. Plugins -> reusable schema logic (soft delete, pagination, timestamps).

-----------------------------------------------------
Example (native driver vs Mongoose)
-----------------------------------------------------
// Native driver
const { MongoClient } = require('mongodb');
const client = await MongoClient.connect(uri);
await client.db('shop').collection('users').insertOne({ age: 'abc' });   // stored as-is

// Mongoose
const User = mongoose.model('User', new mongoose.Schema({ age: Number }));
await User.create({ age: 'abc' });   // throws ValidationError (Cast to Number failed)

// Dropping to the driver when needed
await User.collection.insertMany(bigArray);     // skips Mongoose validation and hooks

-----------------------------------------------------
Pros / Cons
-----------------------------------------------------
+ Clean, consistent models; less validation code in controllers.
+ Hooks for hashing passwords, audit fields, etc.
- Overhead of hydrating documents (use lean() for read-heavy endpoints).
- Some hooks/validators behave differently for query updates (common source of bugs).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is strictQuery?
A1: Controls whether filter fields not in the schema are removed from queries. In Mongoose 7+
    the default is false (unknown filter fields are passed through to MongoDB).

Q2: Is Mongoose required to use MongoDB with Node?
A2: No, the native driver works fine. Mongoose is a convenience layer for structure.

Q3: Which version have you used?
A3: Be honest - e.g. "Mongoose 7/8, async/await only, since callbacks were removed in v7."
*/
