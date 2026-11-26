/* 34_cursor_vs_offset_pagination.js

=====================================================
Cursor (Keyset) vs Offset Pagination
=====================================================

Definition (What I should say in the interview):
- "**Offset pagination** uses skip and limit with a page number; it is simple and supports
   jumping to page 7, but it gets **slower as the offset grows** because the database still walks
   all skipped documents, and results can **shift or duplicate** when new data is inserted.
   **Cursor (keyset) pagination** remembers the last item seen - usually its _id or createdAt -
   and asks for items **after** it, using an index directly. It stays fast at any depth and is
   stable, so I use it for feeds and infinite scroll."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature              | Offset (skip/limit)     | Cursor (keyset)              |
|----------------------|-------------------------|------------------------------|
| Request              | ?page=5&limit=20        | ?after=<lastId>&limit=20     |
| Performance deep page| Slow (O(skip))          | Fast (index seek)            |
| Jump to any page     | Yes                     | No (next/prev only)          |
| New inserts          | Duplicates / skipped    | Stable                       |
| Total pages          | Easy with count         | Usually not shown            |
| Use case             | Admin tables            | Feeds, infinite scroll, APIs |

-----------------------------------------------------
Example (cursor pagination by _id)
-----------------------------------------------------
app.get('/posts', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const filter = {};
  if (req.query.after) filter._id = { $lt: req.query.after };   // newest first

  const posts = await Post.find(filter).sort({ _id: -1 }).limit(limit + 1).lean();
  const hasMore = posts.length > limit;
  if (hasMore) posts.pop();

  res.json({ posts, nextCursor: hasMore ? posts[posts.length - 1]._id : null });
});

// Sorting by a non-unique field -> use a tie-breaker in both sort and filter
// sort({ createdAt: -1, _id: -1 })
// filter: { $or: [ { createdAt: { $lt: lastDate } },
//                  { createdAt: lastDate, _id: { $lt: lastId } } ] }

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Fetching limit + 1 is a cheap way to know if a next page exists.
- Encode the cursor (base64 of { createdAt, _id }) so clients treat it as opaque.
- Need an index matching the sort, e.g. { createdAt: -1, _id: -1 }.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not use createdAt alone as the cursor?
A1: Two documents can have the same timestamp, so some would be skipped or repeated; add _id
    as a tie-breaker.

Q2: Which does GraphQL Relay use?
A2: Cursor-based (edges, pageInfo.endCursor, hasNextPage).

Q3: Is this the same as a MongoDB driver cursor?
A3: No. A driver cursor iterates one query's results in batches (e.g. Model.find().cursor() for
    streaming exports); keyset pagination is an API design across separate requests.
*/
