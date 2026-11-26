/* 7_aggregation.js

=====================================================
Aggregation (Aggregation Framework)
=====================================================

Definition (What I should say in the interview):
- "The aggregation framework lets MongoDB **process and transform data on the server** using a
   **pipeline of stages**. Documents flow through each stage in order - filter, group, join,
   reshape, sort - and the output of one stage is the input of the next. I use it for reports
   and dashboards like total sales per month, because it is much faster than fetching all the
   documents into Node and calculating there."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Model.aggregate([...stages]) returns plain objects (no Mongoose documents, no hooks on docs).
2. Order of stages matters: put $match (and $sort using an index) as early as possible.
3. Each stage has a 100MB RAM limit; use { allowDiskUse: true } for big sorts/groups.
4. Mongoose does NOT cast types in pipelines -> convert string ids with new mongoose.Types.ObjectId(id).
5. Result documents are limited to 16MB each (BSON limit).

-----------------------------------------------------
Example (monthly revenue per user)
-----------------------------------------------------
const stats = await Order.aggregate([
  { $match: { status: 'paid', createdAt: { $gte: new Date('2026-01-01') } } },
  { $group: {
      _id: { month: { $month: '$createdAt' } },
      revenue: { $sum: '$total' },
      orders:  { $sum: 1 },
      avgOrder: { $avg: '$total' },
  } },
  { $sort: { '_id.month': 1 } },
  { $project: { _id: 0, month: '$_id.month', revenue: 1, orders: 1,
                avgOrder: { $round: ['$avgOrder', 2] } } },
]);

-----------------------------------------------------
Aggregation vs find()
-----------------------------------------------------
| find()                         | aggregate()                            |
|--------------------------------|----------------------------------------|
| Filter + project + sort        | Plus group, join, reshape, compute     |
| Returns Mongoose docs          | Returns plain objects                  |
| Casting by schema              | No automatic casting                   |

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Passing req.params.id as a string inside $match: { user: id } -> matches nothing, because the
  field is an ObjectId. find() would cast it, aggregate() does not.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you optimize a slow pipeline?
A1: $match and $sort first so they can use indexes, $project away unused fields early, index
    $lookup foreignField, and check with explain().

Q2: What is $facet?
A2: Runs multiple sub-pipelines on the same input in one stage - e.g. paginated data and the
    total count together.
*/
