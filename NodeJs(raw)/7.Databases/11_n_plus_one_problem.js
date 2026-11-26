/* 11_n_plus_one_problem.js

=====================================================
N+1 Query Problem
=====================================================

Definition (What I should say in the interview):
- "The N+1 problem happens when the code runs **1 query to fetch a list** and then **1 extra
   query for each item** in that list to get related data - so 100 posts become 101 database
   round trips. It usually hides inside loops or resolvers and works fine in dev with small
   data but becomes slow in production. The fix is to **batch** the related lookups into one
   query using $in, populate, $lookup, a JOIN, or DataLoader in GraphQL."

-----------------------------------------------------
Example (the problem)
-----------------------------------------------------
const posts = await Post.find().limit(100);           // 1 query
for (const post of posts) {
  post.author = await User.findById(post.authorId);   // +100 queries
}

-----------------------------------------------------
Fixes
-----------------------------------------------------
// 1. Batch with $in (2 queries total)
const posts = await Post.find().limit(100).lean();
const ids = [...new Set(posts.map(p => String(p.authorId)))];
const users = await User.find({ _id: { $in: ids } }).lean();
const byId = new Map(users.map(u => [String(u._id), u]));
posts.forEach(p => { p.author = byId.get(String(p.authorId)); });

// 2. populate (Mongoose does the $in batch for you)
await Post.find().limit(100).populate('authorId', 'name');

// 3. $lookup (1 aggregation) or SQL JOIN
// 4. GraphQL -> DataLoader batches all user loads in one tick
const userLoader = new DataLoader(async ids => {
  const users = await User.find({ _id: { $in: ids } }).lean();
  const map = new Map(users.map(u => [String(u._id), u]));
  return ids.map(id => map.get(String(id)) || null);   // keep input order
});

-----------------------------------------------------
How to detect it
-----------------------------------------------------
- mongoose.set('debug', true) and watch the logs repeat the same query shape.
- APM tools (New Relic, Datadog) showing many short DB calls per request.
- In SQL ORMs: enable query logging (Sequelize logging, Prisma log: ['query']).

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Nested populate on deep paths (populate inside populate) creates one query per level per
  path; not N+1, but still many queries. Keep populate shallow or denormalize.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is populate itself N+1?
A1: No. populate collects all ids and does one $in query per path, so it is 1 + 1.

Q2: Why is N+1 bad if each query is fast?
A2: Network round-trip latency adds up per query, and it consumes pool connections; 100 x 5ms
    is 500ms of pure waiting.
*/
