/* 20_mongoose_middleware_hooks.js

=====================================================
Mongoose Middleware (Pre / Post Hooks)
=====================================================

Definition (What I should say in the interview):
- "Mongoose middleware are **functions that run before (pre) or after (post) certain
   operations**, like save, validate, find or deleteOne. The classic example is a **pre('save')
   hook that hashes the password** only when it was modified. There are four kinds - document,
   query, aggregate and model middleware - and the important catch is that **save hooks do not
   run on query updates** like findOneAndUpdate or updateOne; those trigger query middleware."

-----------------------------------------------------
Types of middleware
-----------------------------------------------------
| Type      | Hooks                                        | this =          |
|-----------|----------------------------------------------|-----------------|
| Document  | validate, save, deleteOne({document:true})   | the document    |
| Query     | find, findOne, updateOne, findOneAndUpdate,  | the Query       |
|           | deleteMany, countDocuments ...               |                 |
| Aggregate | aggregate                                    | the Aggregate   |
| Model     | insertMany                                   | the Model       |

-----------------------------------------------------
Example
-----------------------------------------------------
// 1. Hash password before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// 2. Query middleware: hide soft-deleted docs from every find
userSchema.pre(/^find/, function () {
  this.where({ isDeleted: { $ne: true } });
});

// 3. Query update hook: this.getUpdate() to inspect/modify the update
userSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();
  if (update.password) update.password = await bcrypt.hash(update.password, 12);
});

// 4. Post hook: logging or cleanup after delete
postSchema.post('findOneAndDelete', async function (doc) {
  if (doc) await Comment.deleteMany({ post: doc._id });
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Hooks must be registered BEFORE mongoose.model() compiles the schema.
- Use regular functions, not arrows, so this is bound correctly.
- In pre hooks, throwing (or a rejected promise) aborts the operation.
- insertMany does not run save middleware; bulkWrite and native driver calls run no hooks.
- Post error-handling middleware takes (error, doc, next) - useful to map E11000 to a clean message.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Your password hash hook did not run when updating a user. Why?
A1: The update used findByIdAndUpdate, which fires query middleware, not pre('save'). Fix:
    load the doc and call save(), or add a pre('findOneAndUpdate') hook.

Q2: pre vs post?
A2: pre runs before the operation (can modify or block); post runs after with the result
    (logging, side effects).
*/
