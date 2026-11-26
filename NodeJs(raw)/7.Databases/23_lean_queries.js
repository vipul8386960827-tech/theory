/* 23_lean_queries.js

=====================================================
Lean Queries (.lean())
=====================================================

Definition (What I should say in the interview):
- "By default Mongoose **hydrates** every result into a full Mongoose document with change
   tracking, getters, setters, virtuals and methods like save(). Calling **.lean()** skips that
   and returns **plain JavaScript objects** straight from the driver. That uses less memory and
   is noticeably faster, so I use lean() on **read-only endpoints** like list APIs, and skip it
   when I need to modify and save the document."

-----------------------------------------------------
What you lose with lean()
-----------------------------------------------------
1. No save(), no instance methods, no isModified().
2. No getters/setters and no virtuals (including the 'id' virtual).
3. No defaults applied for fields missing in the stored doc.
4. No toJSON transforms from the schema (e.g. hiding password via transform).
5. Still kept: casting of the filter, populate (populated docs are lean too), select, sort.

-----------------------------------------------------
Example
-----------------------------------------------------
// Hydrated document
const doc = await Product.findById(id);
doc instanceof mongoose.Document;   // true
doc.price = 200;
await doc.save();                    // works

// Lean object
const obj = await Product.findById(id).lean();
obj instanceof mongoose.Document;   // false
obj.save;                            // undefined
obj._id;                             // still an ObjectId (not a string)

// Typical list API
const products = await Product.find({ isActive: true })
  .select('title price')
  .sort({ createdAt: -1 })
  .limit(50)
  .lean();

// Keep virtuals/getters with plugins
// schema.plugin(require('mongoose-lean-virtuals'));  .lean({ virtuals: true })

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature            | Normal query      | .lean()              |
|--------------------|-------------------|----------------------|
| Return type        | Mongoose Document | Plain JS object      |
| Memory / speed     | Heavier, slower   | Lighter, faster      |
| save() / methods   | Yes               | No                   |
| Virtuals/getters   | Yes               | No (without plugin)  |

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How much faster is lean?
A1: Mongoose docs say lean documents are several times smaller in memory; the speed gain is
    biggest on large result sets. I measure rather than quote a fixed number.

Q2: Does aggregate() need lean()?
A2: No. aggregate() already returns plain objects.
*/
