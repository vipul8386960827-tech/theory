/* 17_n_plus_one_in_list_endpoint.js

=====================================================
Scenario: N+1 Queries In A List Endpoint
=====================================================

The Question (how the interviewer asks it):
- "GET /posts returns 100 posts with the author name. In the logs we see
  101 database queries for one request. What is happening and how do you
  fix it?"

What the interviewer is checking:
- Can you recognise the N+1 query problem?
- Do you know batching options: populate, $in, $lookup, SQL JOIN?
- Do you know how to detect it (query logs, APM)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Confirm it: turn on mongoose.set("debug", true) locally or check the APM
   trace. One query for the list + one query per item = N+1.
2. Find the cause: usually a loop with await inside (for...of or map) that
   loads a related record for each item.
3. Fix with batching: collect all ids, run ONE query with $in, and join the
   data in memory with a Map. That is 2 queries instead of 101.
4. Or use Mongoose populate(). populate also does one $in query per path
   (not one per document), so it is fine for this case. Select only needed
   fields: populate("author", "name").
5. If I need filtering/sorting on the joined data, use one aggregation with
   $lookup (and an index on the foreign field).
6. Also consider schema design: if the author name is read very often and
   changes rarely, I can store (denormalize) it inside the post.
7. For GraphQL, I would use DataLoader to batch and cache per request.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: N+1 -> 1 query for posts + 100 queries for authors
const posts = await Post.find().limit(100).lean();
for (const post of posts) {
  post.author = await User.findById(post.authorId).lean(); // query in loop
}

// GOOD 1: populate (1 query for posts + 1 query with $in for users)
const posts1 = await Post.find().limit(100)
  .populate("authorId", "name avatar")
  .lean();

// GOOD 2: manual $in batching (same 2 queries, full control)
const posts2 = await Post.find().limit(100).lean();
const ids = [...new Set(posts2.map(p => p.authorId.toString()))];
const users = await User.find({ _id: { $in: ids } }, "name avatar").lean();
const byId = new Map(users.map(u => [u._id.toString(), u]));
const result = posts2.map(p => ({ ...p, author: byId.get(p.authorId.toString()) }));

// GOOD 3: one aggregation with $lookup
const posts3 = await Post.aggregate([
  { $sort: { createdAt: -1 } },
  { $limit: 100 },
  { $lookup: { from: "users", localField: "authorId",
               foreignField: "_id", as: "author",
               pipeline: [{ $project: { name: 1 } }] } },
  { $unwind: "$author" },
]);

// SQL equivalent: one JOIN instead of a loop
// SELECT p.*, u.name FROM posts p JOIN users u ON u.id = p.author_id LIMIT 100;

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "This is the N+1 problem: one query for the list and then one more query
  for every item, usually because of an await inside a loop. I fix it by
  batching: collect the ids and load them with one $in query, or use
  populate, which does the same thing for me. If I need to filter on the
  related data I use $lookup, or a JOIN in SQL. So 101 queries become 1 or 2."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Use Promise.all to run the 100 queries in parallel" - it is faster but
  still 100 queries and 100 pool connections busy. It does not fix N+1.
- Thinking populate makes one query per document (it batches per path).
- Nested populate on many levels without select - huge payloads.
- Using $lookup without an index on the foreign field (slow on big data).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: populate vs $lookup - which is better?
A1: populate runs separate queries in Node and merges results; it is simple
    and works across databases. $lookup is a server-side join in one
    aggregation; better when you must filter, sort or group by joined fields.

Q2: How would you detect N+1 in production?
A2: APM traces show many identical small queries for one request. I can also
    log query count per request (Mongoose debug / middleware) and alert on
    high numbers.

Q3: What is DataLoader?
A3: A small library (used a lot with GraphQL) that collects all .load(id)
    calls in one tick of the event loop and sends one batched query, with a
    per-request cache.
*/
