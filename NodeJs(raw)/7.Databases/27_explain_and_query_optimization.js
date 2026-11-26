/* 27_explain_and_query_optimization.js

=====================================================
explain() and Query Optimization
=====================================================

Definition (What I should say in the interview):
- "explain() shows **how MongoDB executed a query** - which plan the query planner chose,
   whether it used an index (**IXSCAN**) or scanned the whole collection (**COLLSCAN**), and with
   executionStats, how many keys and documents were examined and how long it took. When an API is
   slow, I check the slow query log or Atlas profiler, run explain on that query, and fix it
   with the right index, a projection, or a rewrite."

-----------------------------------------------------
What to look at in executionStats
-----------------------------------------------------
1. winningPlan.stage -> IXSCAN good; COLLSCAN bad on big collections; SORT = in-memory sort.
2. nReturned vs totalKeysExamined vs totalDocsExamined -> ideally all close to each other.
3. executionTimeMillis.
4. PROJECTION_COVERED / totalDocsExamined: 0 -> covered query.

-----------------------------------------------------
Example
-----------------------------------------------------
// Mongoose
const plan = await Order.find({ userId, status: 'paid' })
  .sort({ createdAt: -1 })
  .explain('executionStats');

// mongosh
db.orders.find({ userId: ObjectId('...'), status: 'paid' })
  .sort({ createdAt: -1 }).explain('executionStats');

// Before: COLLSCAN, totalDocsExamined: 500000, nReturned: 20, 900ms
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 });
// After:  IXSCAN, totalDocsExamined: 20, nReturned: 20, 3ms

-----------------------------------------------------
Optimization checklist
-----------------------------------------------------
1. Add indexes for filter + sort following ESR (Equality, Sort, Range).
2. Project only needed fields (.select('name price')) -> less network and memory.
3. Use .lean() for read-only queries.
4. Avoid unanchored regex, $where, and $ne/$nin-heavy filters (poor index use).
5. Avoid large skip(); use cursor/keyset pagination.
6. In aggregation: $match and $sort early, $project early, index $lookup fields.
7. Fix N+1 patterns; batch with $in.
8. Enable profiler: db.setProfilingLevel(1, { slowms: 100 }) or use Atlas Performance Advisor.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What do the three explain verbosity modes mean?
A1: queryPlanner (default, chosen plan only), executionStats (runs it and gives counts/time),
    allPlansExecution (stats for rejected candidate plans too).

Q2: Can you force an index?
A2: Yes with .hint({ field: 1 }), but usually it is better to fix the index design.

Q3: A query is fast in dev but slow in prod. Why?
A3: Dev has little data so COLLSCAN feels fast; prod has millions of docs. Check explain with
    realistic data, and also check index fits RAM and server load.
*/
