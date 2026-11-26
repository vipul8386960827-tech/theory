/* 2_mongoose_schema_model.js

=====================================================
Mongoose Schema and Model
=====================================================

Definition (What I should say in the interview):
- "A **Schema** in Mongoose defines the **shape of a document** - fields, types, defaults,
   validation, indexes, virtuals, methods and hooks. A **Model** is the **compiled class** built
   from the schema with mongoose.model(); it is bound to a MongoDB collection and is what we use
   to query and create documents. An instance of a model is a **document**."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Schema = blueprint (no DB access). Model = constructor with query methods (find, create...).
2. mongoose.model('User', schema) -> collection name becomes 'users' (lowercase, pluralized).
3. Schema options: timestamps, versionKey, strict, toJSON, collection.
4. strict: true (default) -> fields not in the schema are silently dropped on save.
5. Model compiled once; re-compiling the same name throws OverwriteModelError.

-----------------------------------------------------
Example
-----------------------------------------------------
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role:  { type: String, enum: ['user', 'admin'], default: 'user' },
    age:   { type: Number, min: 18 },
  },
  { timestamps: true }            // adds createdAt, updatedAt
);

const User = mongoose.model('User', userSchema);   // collection: users

const user = new User({ name: 'Vipul', email: 'V@Mail.com' });  // document
await user.save();
const admins = await User.find({ role: 'admin' });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- unique: true is NOT a validator; it creates a unique index. Duplicate inserts fail with a
  MongoServerError code 11000, which you should handle and turn into a 409 response.
- In production set autoIndex: false and create indexes via migrations/scripts.
- Avoid "export the model twice" in hot-reload setups: use mongoose.models.User || mongoose.model(...).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is __v?
A1: The versionKey used for optimistic concurrency on arrays. It increments when arrays change.
    It can be disabled with { versionKey: false }, but it is useful to keep.

Q2: Difference between a model and a document?
A2: Model = class (User.find). Document = instance (user.save(), user.name).

Q3: How to point a model to an existing collection name?
A3: mongoose.model('User', schema, 'app_users') or the schema option { collection: 'app_users' }.
*/
