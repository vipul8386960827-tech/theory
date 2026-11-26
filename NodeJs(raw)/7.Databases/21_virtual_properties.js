/* 21_virtual_properties.js

=====================================================
Virtual Properties
=====================================================

Definition (What I should say in the interview):
- "Virtuals are **document properties that are not stored in MongoDB**; they are computed on
   the fly with a getter, and optionally a setter. A typical example is fullName from firstName
   and lastName. There are also **virtual populate** fields, which let a parent show its children
   (like a user's posts) without storing an array of ids. By default virtuals are **not included
   in JSON output**, so I enable them with toJSON: { virtuals: true }."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Not saved in the DB -> cannot query or sort on them.
2. Getter: computed on read. Setter: split a value into real fields.
3. Mongoose adds an 'id' virtual (string of _id) by default.
4. Not available with lean() (plain objects) unless you use the mongoose-lean-virtuals plugin.
5. Virtual populate needs ref, localField and foreignField.

-----------------------------------------------------
Example
-----------------------------------------------------
const userSchema = new mongoose.Schema(
  { firstName: String, lastName: String, dob: Date },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual('fullName')
  .get(function () { return `${this.firstName} ${this.lastName}`; })
  .set(function (v) { [this.firstName, this.lastName] = v.split(' '); });

userSchema.virtual('age').get(function () {
  return this.dob ? new Date().getFullYear() - this.dob.getFullYear() : null;
});

// Virtual populate: user -> posts (posts store author id, user stores nothing)
userSchema.virtual('posts', { ref: 'Post', localField: '_id', foreignField: 'author' });

const user = await User.findById(id).populate('posts');
user.fullName;          // 'Vipul Sharma'
res.json(user);         // includes fullName, age, posts because of toJSON option

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Using an arrow function in the getter -> this is undefined.
- Expecting User.find({ fullName: 'x' }) to work -> virtuals are not in the database.
- Forgetting toJSON virtuals option and wondering why the API response does not show them.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Virtual vs storing a computed field?
A1: Virtual = always up to date, no storage, not queryable. Stored field = queryable and
    indexable but must be kept in sync (e.g. with a pre-save hook).

Q2: Why use virtual populate instead of an array of child ids?
A2: Avoids unbounded arrays in the parent and keeps a single source of truth on the child side.
*/
