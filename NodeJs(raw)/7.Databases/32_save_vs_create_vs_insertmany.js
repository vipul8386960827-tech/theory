/* 32_save_vs_create_vs_insertmany.js

=====================================================
save() vs create() vs insertMany()
=====================================================

Definition (What I should say in the interview):
- "**save()** is a document method: I build a document with new Model(), maybe change it, and
   save() inserts it if it is new or updates the changed fields if it already exists. **create()**
   is a model shortcut that does new Model(data).save() for one or many documents, so it runs
   validation and save hooks for each one. **insertMany()** validates and sends all documents in
   **one bulk insert**, which is much faster for large imports, but it **does not run save
   middleware**."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature          | doc.save()          | Model.create()        | Model.insertMany()     |
|------------------|---------------------|-----------------------|------------------------|
| Called on        | Document            | Model                 | Model                  |
| Insert / update  | Both                | Insert only           | Insert only            |
| Validation       | Yes                 | Yes (each doc)        | Yes (each doc)         |
| pre('save') hook | Yes                 | Yes (calls save)      | No (insertMany hook)   |
| DB round trips   | 1 per doc           | 1 per doc             | 1 bulk (batched)       |
| Best for         | Modify loaded doc   | Single insert in API  | Seeding, CSV import    |

-----------------------------------------------------
Example
-----------------------------------------------------
// save(): insert
const user = new User({ name: 'Vipul', password: 'secret' });
await user.save();                         // pre('save') hashes password

// save(): update only changed fields ($set name)
user.name = 'Vipul S';
await user.save();

// create(): one or many
await User.create({ name: 'A', password: 'x' });
await User.create([{ name: 'B' }, { name: 'C' }]);

// insertMany(): bulk
await Product.insertMany(rowsFromCsv, { ordered: false });
// ordered: false -> continues after a failed doc (e.g. duplicate) and reports errors

// Need hooks for bulk data? hash in code first, or loop with create in chunks

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- If you insertMany users, passwords will NOT be hashed by a pre('save') hook.
- insertMany has its own model middleware: schema.pre('insertMany', ...).
- { lean: true } on insertMany skips hydration/validation for maximum speed (use carefully).
- save() uses __v version checks for array modifications to detect conflicts.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How does save() know whether to insert or update?
A1: doc.isNew. New documents get insertOne; loaded ones send updateOne with only modified paths.

Q2: What about bulkWrite?
A2: Mixes inserts, updates and deletes in one round trip; skips document middleware. Good for
    syncing large batches.
*/
