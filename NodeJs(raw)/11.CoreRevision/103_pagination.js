/* 5_pagination.js

=====================================================
Pagination
=====================================================

Definition (What I should say in the interview):
- "Pagination means returning large result sets **in small pages** instead of all at once, to
   keep responses fast and memory low. The basic way in MongoDB is **skip and limit** with a
   page number, and I always add a **stable sort** so pages do not overlap. I also return
   metadata like total count, current page and total pages so the frontend can render the pager."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. skip = (page - 1) * limit.
2. Always sort on a unique/stable field (e.g. { createdAt: -1, _id: -1 }).
3. Cap the limit on the server (e.g. max 100) so clients cannot request 1 million rows.
4. Run the data query and countDocuments in parallel with Promise.all.
5. For very large collections or infinite scroll, prefer cursor-based pagination (see file 34).

-----------------------------------------------------
Example (Express + Mongoose)
-----------------------------------------------------
app.get('/products', async (req, res) => {
  const page  = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const skip  = (page - 1) * limit;
  const filter = { isActive: true };

  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  res.json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
});

// Aggregation version with one round trip
Product.aggregate([
  { $match: { isActive: true } },
  { $sort: { createdAt: -1 } },
  { $facet: {
      items: [{ $skip: skip }, { $limit: limit }],
      meta:  [{ $count: 'total' }],
  } },
]);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- No sort -> MongoDB returns natural order, pages may repeat or miss items.
- Trusting query params as numbers without parseInt/validation.
- Large skip values (page 5000) are slow because MongoDB still walks the skipped documents.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is countDocuments slow on big collections?
A1: It actually counts matching docs. For an approximate total of the whole collection use
    estimatedDocumentCount(), which reads metadata, or skip showing exact totals.

Q2: Where do you put pagination logic?
A2: In a reusable helper/service (or a plugin like mongoose-paginate-v2) so every list
    endpoint behaves the same way.
*/
