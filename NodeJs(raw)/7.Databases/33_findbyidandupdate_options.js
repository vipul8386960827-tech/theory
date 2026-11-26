/* 33_findbyidandupdate_options.js

=====================================================
findByIdAndUpdate() Options
=====================================================

Definition (What I should say in the interview):
- "findByIdAndUpdate(id, update, options) finds a document by _id, applies the update
   atomically and returns a document. The key gotcha is that by default it returns the **document
   as it was BEFORE the update**, so I pass **{ new: true }** (or returnDocument: 'after') to get
   the updated one. Also, schema validators **do not run** on updates unless I pass
   **runValidators: true**, and pre('save') hooks never run because this is a query, not save()."

-----------------------------------------------------
Important options
-----------------------------------------------------
| Option                  | Default  | Meaning                                         |
|-------------------------|----------|-------------------------------------------------|
| new / returnDocument    | false / 'before' | Return updated doc if true / 'after'    |
| runValidators           | false    | Run schema validators on update fields          |
| upsert                  | false    | Insert if no document matches                   |
| setDefaultsOnInsert     | true*    | Apply defaults when upsert inserts (*Mongoose 6+)|
| projection / select     | -        | Fields to return                                |
| session                 | -        | Run inside a transaction                        |
| lean                    | false    | Return plain object                             |
| context: 'query'        | -        | (Old versions) this in validators = query       |

-----------------------------------------------------
Example
-----------------------------------------------------
const updated = await User.findByIdAndUpdate(
  req.params.id,
  { $set: { name: req.body.name, age: req.body.age } },
  { new: true, runValidators: true, select: '-password' }
);
if (!updated) return res.status(404).json({ message: 'User not found' });

// Without new: true
const old = await User.findByIdAndUpdate(id, { name: 'New' });
old.name;     // still the OLD name - DB is updated though

// Upsert
await Profile.findOneAndUpdate({ userId }, { $set: { bio } }, { upsert: true, new: true });

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Returning the old document to the client and thinking the update failed.
- Expecting enum/min validators to block a bad value without runValidators.
- Expecting the password-hash pre('save') hook to run -> use pre('findOneAndUpdate') or save().
- Passing the whole req.body -> users can change fields like role (whitelist fields).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: findByIdAndUpdate vs updateOne?
A1: findByIdAndUpdate returns the document (old or new); updateOne returns only counts
    (matchedCount, modifiedCount). Use updateOne when you do not need the doc back.

Q2: findByIdAndUpdate vs find + modify + save?
A2: The query version is atomic and one round trip but skips save hooks and full-doc
    validation. find + save runs hooks and validation but is two round trips and not atomic.
*/
