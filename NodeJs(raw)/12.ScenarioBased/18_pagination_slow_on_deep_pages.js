/* 18_pagination_slow_on_deep_pages.js

=====================================================
Scenario: Deep Pages Are Very Slow
=====================================================

The Question (how the interviewer asks it):
- "Our products list uses page and limit. Page 1 loads in 30 ms, but page
  5000 takes several seconds. Why, and how would you fix it?"

What the interviewer is checking:
- Do you know why skip / OFFSET gets slower with bigger pages?
- Do you know cursor (keyset) pagination and its trade-offs?
- Do you think about stable sort order and the countDocuments cost?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Explain the cause: skip(N) does not jump. The database still walks over
   N index entries (or documents) and throws them away. Page 5000 with
   limit 20 = skip 99,980 entries on every request. SQL OFFSET is the same.
2. Fix with cursor / keyset pagination: instead of "skip 99,980", say
   "give me 20 items after the last one I saw". With an index this is
   always a fast index seek, no matter how deep.
3. Use a unique, stable sort. If I sort by createdAt, I add _id as a
   tie-breaker, because two docs can have the same createdAt.
4. Create a compound index that matches the sort: { createdAt: -1, _id: -1 }.
5. Return a nextCursor to the client (often base64 of the last values). The
   client sends it back for the next page. This fits infinite scroll well.
6. Avoid countDocuments() on every request on big collections; it is also
   expensive. Use estimatedDocumentCount() or cache the total, or show
   "load more" instead of exact page numbers.
7. If the product really needs "jump to page 5000", keep skip but limit the
   max page, or cache results. Most users never go that deep.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: offset pagination, cost grows with page number
const page = Number(req.query.page) || 1;
const items = await Product.find()
  .sort({ createdAt: -1 })
  .skip((page - 1) * 20)
  .limit(20)
  .lean();

// GOOD: cursor / keyset pagination
productSchema.index({ createdAt: -1, _id: -1 });

async function listProducts(cursor, limit = 20) {
  const filter = {};
  if (cursor) {
    const { createdAt, id } = JSON.parse(
      Buffer.from(cursor, "base64url").toString());
    filter.$or = [
      { createdAt: { $lt: new Date(createdAt) } },
      { createdAt: new Date(createdAt), _id: { $lt: id } }, // tie-breaker
    ];
  }
  const items = await Product.find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit + 1)                 // fetch 1 extra to know if more exist
    .lean();

  const hasMore = items.length > limit;
  if (hasMore) items.pop();
  const last = items.at(-1);
  const nextCursor = hasMore ? Buffer.from(JSON.stringify(
    { createdAt: last.createdAt, id: last._id })).toString("base64url") : null;
  return { items, nextCursor };
}
// SQL: SELECT * FROM products WHERE (created_at, id) < ($1, $2)
//      ORDER BY created_at DESC, id DESC LIMIT 20;

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "skip and OFFSET are slow on deep pages because the database still reads
  all the skipped rows and then discards them. I would switch to cursor or
  keyset pagination: sort by an indexed, unique key like createdAt plus _id,
  and ask for items after the last seen value. Every page is then a fast
  index seek. The trade-off is that you cannot jump directly to page 5000."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Add an index" only - an index helps, but skip still walks N entries.
- Sorting by a non-unique field without a tie-breaker - items get
  duplicated or skipped between pages.
- Running countDocuments({}) on 10M docs on every page request.
- Using page numbers as the cursor (that is still offset pagination).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens with offset pagination if new items are inserted?
A1: Items shift. The user can see the same item twice or miss one. Cursor
    pagination is stable because it is based on values, not positions.

Q2: Can you go to the previous page with a cursor?
A2: Yes - reverse the comparison ($gt) and the sort, then reverse the
    result in code. Or keep a stack of previous cursors on the client.

Q3: Why base64 encode the cursor?
A3: It makes the cursor opaque, so clients do not depend on its internal
    format and I can change it later. It is not security - validate it.
*/
