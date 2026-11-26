/* 3_crud_operations.js

=====================================================
CRUD Operations (Mongoose)
=====================================================

Definition (What I should say in the interview):
- "CRUD means **Create, Read, Update, Delete** - the four basic operations every API does on
   data. In Mongoose I create with create() or new Model().save(), read with find/findOne/
   findById, update with updateOne/findByIdAndUpdate or by modifying a document and calling
   save(), and delete with deleteOne/findByIdAndDelete. In a REST API they map to POST, GET,
   PUT/PATCH and DELETE."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Create  -> Model.create(), doc.save(), Model.insertMany()
2. Read    -> find(), findOne(), findById(), countDocuments(), exists()
3. Update  -> updateOne(), updateMany(), findByIdAndUpdate(), doc.save()
4. Delete  -> deleteOne(), deleteMany(), findByIdAndDelete()
5. Query methods return a Mongoose Query (thenable); use await or .exec().

-----------------------------------------------------
Example (Express + Mongoose)
-----------------------------------------------------
// CREATE
app.post('/products', async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// READ
app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// UPDATE (partial)
app.patch('/products/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, { $set: req.body },
    { new: true, runValidators: true });
  res.json(updated);
});

// DELETE
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Passing req.body directly -> mass assignment (user sets role: 'admin'). Whitelist fields.
- Forgetting a 404 check: findById returns null, it does not throw, when nothing matches.
- An invalid id string throws CastError -> validate with mongoose.isValidObjectId().

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Soft delete vs hard delete?
A1: Soft delete sets a flag like isDeleted/deletedAt and filters it out in queries (often via a
    pre-find hook). Useful for audit and restore. Hard delete removes the document.

Q2: What does updateOne return?
A2: A result object ({ acknowledged, matchedCount, modifiedCount }), not the document.
*/
