/* 32_pagination_filtering_sorting_in_api.js

=====================================================
Pagination, Filtering and Sorting in an API
=====================================================

Definition (What I should say in the interview):
- "When a collection can be large, we never return everything at once. **Pagination** splits
   results into pages - usually with page and limit, or a cursor. **Filtering** narrows the
   data with query params like ?status=active, and **sorting** uses something like
   ?sort=-createdAt. All of these come from req.query, so I parse them, **whitelist** allowed
   fields, cap the limit, and return metadata like total count and total pages."

-----------------------------------------------------
Offset vs Cursor pagination
-----------------------------------------------------
| Aspect          | Offset (page/limit, skip)      | Cursor (after=lastId)            |
|-----------------|--------------------------------|----------------------------------|
| Jump to page N  | Yes                            | No (next/prev only)              |
| Performance     | Slow for large skip            | Fast, uses index                 |
| Data changes    | Can skip/duplicate items       | Stable                           |
| Use case        | Admin tables                   | Infinite scroll, feeds           |

-----------------------------------------------------
Example (Mongoose)
-----------------------------------------------------
// GET /api/products?category=books&minPrice=100&sort=-price,name&page=2&limit=20
const express = require('express');
const Product = require('./models/Product');
const router = express.Router();

router.get('/products', async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);   // cap the limit

    const filter = {};
    if (typeof req.query.category === 'string') filter.category = req.query.category;
    if (req.query.minPrice) filter.price = { $gte: Number(req.query.minPrice) };

    const allowedSort = ['price', 'name', 'createdAt'];
    const sort = String(req.query.sort || '-createdAt')
      .split(',')
      .filter((f) => allowedSort.includes(f.replace('-', '')))
      .join(' ');

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
      Product.countDocuments(filter),
    ]);

    res.json({ data: items, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (err) { next(err); }
});

module.exports = router;

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Passing req.query straight into find() -> NoSQL injection (?price[$ne]=0).
- No max limit -> ?limit=1000000 kills the DB.
- Sorting on a non-indexed field for big collections.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you implement cursor pagination?
A1: Sort by a unique indexed field (_id), return the last id, next request uses { _id: { $gt: lastId } }.

Q2: How do you do search?
A2: A text index ($text) or regex for small data, or a search engine like Elasticsearch for large data.
*/
