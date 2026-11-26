/* 28_aggregation_stages.js

=====================================================
Common Aggregation Stages
=====================================================

Definition (What I should say in the interview):
- "An aggregation pipeline is built from stages, and the ones I use most are **$match** to
   filter, **$group** to calculate totals, **$project / $addFields** to reshape, **$sort,
   $skip, $limit** for ordering and paging, **$lookup** to join another collection, **$unwind**
   to flatten arrays, and **$facet** to run several pipelines at once. Knowing what each stage
   does and putting them in the right order is what makes a pipeline both correct and fast."

-----------------------------------------------------
Stages cheat sheet
-----------------------------------------------------
| Stage       | Purpose                                   |
|-------------|-------------------------------------------|
| $match      | Filter docs (like find); uses indexes early|
| $project    | Include/exclude/compute fields            |
| $addFields  | Add computed fields, keep the rest ($set) |
| $group      | Group by _id with $sum, $avg, $max, $push |
| $sort       | Sort                                      |
| $skip/$limit| Pagination                                |
| $lookup     | Left outer join with another collection   |
| $unwind     | One doc per array element                 |
| $facet      | Multiple sub-pipelines on same input      |
| $count      | Count documents                           |
| $bucket     | Group into ranges (price buckets)         |
| $out/$merge | Write results to a collection             |

-----------------------------------------------------
Example (top 5 selling products with category name)
-----------------------------------------------------
Order.aggregate([
  { $match: { status: 'delivered' } },
  { $unwind: '$items' },
  { $group: {
      _id: '$items.productId',
      unitsSold: { $sum: '$items.qty' },
      revenue:   { $sum: { $multiply: ['$items.qty', '$items.price'] } },
  } },
  { $sort: { unitsSold: -1 } },
  { $limit: 5 },
  { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
  { $unwind: '$product' },
  { $project: { _id: 0, name: '$product.title', unitsSold: 1, revenue: 1 } },
]);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- $unwind drops docs with empty/missing arrays unless preserveNullAndEmptyArrays: true.
- $lookup "from" is the actual collection name ('products'), not the Mongoose model name.
- $sort + $limit next to each other lets MongoDB keep only top N in memory.
- $lookup with pipeline/let allows conditions and sub-projections in the join.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: $project vs $addFields?
A1: $project outputs only the fields you list (or excludes listed ones); $addFields keeps all
    existing fields and adds/overwrites the computed ones.

Q2: $push vs $addToSet in $group?
A2: $push collects all values including duplicates; $addToSet collects unique values only.

Q3: Why do the $limit before the $lookup here?
A3: So the join runs for only 5 documents instead of every grouped product.
*/
