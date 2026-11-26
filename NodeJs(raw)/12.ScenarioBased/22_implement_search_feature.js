/* 22_implement_search_feature.js

=====================================================
Scenario: Implement Product Search (Regex Is Slow)
=====================================================

The Question (how the interviewer asks it):
- "We have 2 million products. Search uses find({ name: /phone/i }) and it
  is very slow and gives poor results. How would you build search?"

What the interviewer is checking:
- Do you know why an unanchored, case-insensitive regex cannot use an index?
- Do you know MongoDB text indexes and their limits?
- Do you know when to move to a search engine (Atlas Search, Elasticsearch)?
- Do you think about the client side (debounce) and security (regex injection)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify the needs: exact prefix? full words? typo tolerance? ranking?
   filters (category, price)? autocomplete? The answer picks the tool.
2. Explain the problem: /phone/i has no fixed start, so MongoDB must check
   every index key or document (scan). It also has no relevance ranking.
3. Small fix for autocomplete: an anchored, case-sensitive prefix regex
   like /^iph/ can use an index efficiently. For case-insensitive prefix,
   store a lowercase field (nameLower) and query /^iph/ on it.
4. Better: a MongoDB text index. $text search splits words, applies
   stemming ("phones" matches "phone"), and gives a textScore for ranking.
   Limits: one text index per collection, no partial word / typo match.
5. Real product search: Atlas Search (Lucene, $search stage) or
   Elasticsearch / OpenSearch - fuzzy matching, autocomplete, synonyms,
   facets. Keep it in sync with the DB (Atlas does it automatically; for
   Elasticsearch use change streams or a queue).
6. Client side: debounce input (~300 ms), minimum 2-3 characters, cancel
   old requests with AbortController. Server side: limit results, paginate,
   and cache popular queries.
7. Security: escape user input before building a RegExp (ReDoS and regex
   injection), and validate length.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: unanchored + case-insensitive regex -> scans everything
await Product.find({ name: new RegExp(req.query.q, "i") }); // also injection!

// GOOD 1: prefix autocomplete on a lowercase field (uses index)
productSchema.index({ nameLower: 1 });
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const q = escape(String(req.query.q).toLowerCase().slice(0, 50));
await Product.find({ nameLower: { $regex: "^" + q } }).limit(10).lean();

// GOOD 2: text index with relevance ranking
productSchema.index({ name: "text", description: "text" },
                    { weights: { name: 5, description: 1 } });
await Product.find(
  { $text: { $search: req.query.q }, category: "mobile" },
  { score: { $meta: "textScore" }, name: 1, price: 1 }
).sort({ score: { $meta: "textScore" } }).limit(20).lean();

// GOOD 3: Atlas Search (fuzzy, typo tolerant)
await Product.aggregate([
  { $search: { index: "products", text: { query: req.query.q,
      path: ["name", "description"], fuzzy: { maxEdits: 1 } } } },
  { $limit: 20 },
  { $project: { name: 1, price: 1, score: { $meta: "searchScore" } } },
]);

// SQL: ILIKE '%phone%' has the same problem. Use PostgreSQL full-text search
// (tsvector + GIN index) or pg_trgm trigram index for partial matches.

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "A case-insensitive regex without ^ cannot use an index, so it scans all
  products and has no ranking. For simple autocomplete I use an anchored
  prefix regex on a lowercase indexed field. For word search I use a text
  index with textScore sorting. For real product search with typos and
  facets I use Atlas Search or Elasticsearch. On the client I debounce the
  input, and on the server I escape user input and limit results."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Putting raw user input into new RegExp() - regex injection / ReDoS.
- Thinking a normal index fixes /phone/i.
- Thinking $text supports partial words ("pho") or typos - it does not.
- Sending a request on every keystroke with no debounce or limit.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you keep Elasticsearch in sync with MongoDB?
A1: Listen to MongoDB change streams (or publish events to a queue) and
    update the search index. Accept it is eventually consistent, and have
    a full re-index job for recovery.

Q2: What is debouncing?
A2: Waiting until the user stops typing for a short time (e.g. 300 ms)
    before calling the API, so we send one request, not one per key.

Q3: Can you use a collation index instead of a lowercase field?
A3: Yes. A case-insensitive collation index (strength: 2) works for exact
    matches and $eq queries, but $regex does not use collation, so for
    prefix search the lowercase field is simpler.
*/
