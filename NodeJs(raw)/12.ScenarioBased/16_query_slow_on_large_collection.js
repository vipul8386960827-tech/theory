/* 16_query_slow_on_large_collection.js

=====================================================
Scenario: Query Became Slow On A Large Collection
=====================================================

The Question (how the interviewer asks it):
- "A query that took 20 ms last year now takes 8 seconds. The orders
  collection has grown to 10 million documents. How do you fix it?"

What the interviewer is checking:
- Do you MEASURE first (explain plan) instead of guessing?
- Do you understand indexes, COLLSCAN vs IXSCAN, and compound index order?
- Do you know cheap wins: projection, lean(), limit
- Do you know indexes also have a cost (writes, RAM)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Find the slow query first: MongoDB profiler / slow query log, Atlas
   "Query Profiler", or APM (Datadog, New Relic). Get the exact filter + sort.
2. Run .explain("executionStats") on it. I look at:
   - stage: COLLSCAN (bad, reads every doc) vs IXSCAN (uses an index)
   - totalDocsExamined vs nReturned (10,000,000 examined for 20 returned = bad)
   - SORT stage in memory (means the index does not cover the sort)
3. Create the right index. For compound indexes I follow the ESR rule:
   Equality fields first, then Sort fields, then Range fields.
4. Return only the fields I need (projection) so less data goes over the
   network, and use .lean() so Mongoose returns plain objects (no hydration).
5. Always limit results / paginate. Never return 10M docs to an API.
6. Re-run explain() and confirm IXSCAN and docsExamined close to nReturned.
7. Build the index safely in production (MongoDB 4.2+ builds do not block
   the collection for the whole time, but still do it in low traffic), and
   remove unused indexes ($indexStats) because every index slows writes.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// Query: orders of one user with status "paid", newest first, last 30 days
// BAD: no index -> COLLSCAN over 10M docs, full Mongoose documents
const orders = await Order.find({
  userId, status: "paid", createdAt: { $gte: since },
}).sort({ createdAt: -1 });

// GOOD: compound index following ESR (Equality, Sort, Range)
// userId + status = equality, createdAt = sort AND range
orderSchema.index({ userId: 1, status: 1, createdAt: -1 });

const fast = await Order.find(
  { userId, status: "paid", createdAt: { $gte: since } },
  { total: 1, createdAt: 1, status: 1 }      // projection
)
  .sort({ createdAt: -1 })
  .limit(20)
  .lean();                                    // plain JS objects, faster

// Check the plan
const plan = await Order.find({ userId, status: "paid" })
  .sort({ createdAt: -1 })
  .explain("executionStats");
console.log(plan.executionStats.totalDocsExamined,
            plan.executionStats.nReturned);

// In production set autoIndex: false and create indexes in a migration
// SQL equivalent: CREATE INDEX idx ON orders (user_id, status, created_at DESC);
//                 EXPLAIN ANALYZE SELECT ... (look for "Seq Scan")

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "First I measure. I take the slow query from the profiler and run
  explain('executionStats'). If I see COLLSCAN or docsExamined much bigger
  than nReturned, the query has no good index. I add a compound index that
  follows the ESR rule: equality fields, then sort, then range. I also add
  projection, lean() and a limit. Then I run explain again to confirm it
  uses IXSCAN."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Just add more RAM / a bigger server" without looking at the query plan.
- "Add an index on every field" - many single indexes do not help a
  compound filter + sort, and every index slows inserts and updates.
- Wrong compound order, e.g. { createdAt: 1, userId: 1 } for a query that
  filters by userId - the index is used badly or not at all.
- Forgetting that a regex like /abc/ or $ne / $nin cannot use an index well.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is a covered query?
A1: A query where all filter AND returned fields are in the index, so MongoDB
    answers from the index only and never reads the documents
    (totalDocsExamined = 0). You must exclude _id or include it in the index.

Q2: Why does field order matter in a compound index?
A2: The index is sorted by the first field, then the second, and so on. It
    can serve queries on a prefix ({a}, {a,b}) but not on {b} alone. Equality
    first, then sort, then range gives the smallest scan and no in-memory sort.

Q3: What does lean() actually do and when should I not use it?
A3: It skips creating Mongoose documents and returns plain objects - less
    memory and CPU. But you lose getters/setters, virtuals (unless a plugin),
    save() and instance methods. Use it for read-only responses.
*/
