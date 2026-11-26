/* 1_sql_vs_nosql.js

=====================================================
SQL vs NoSQL
=====================================================

Definition (What I should say in the interview):
- "SQL databases like PostgreSQL and MySQL store data in **tables with a fixed schema** and use
   **joins** and strong **ACID transactions**, so they fit well when data is highly relational,
   like orders, payments and inventory. NoSQL databases like MongoDB store data as **flexible
   documents** (or key-value, graph, wide-column), scale horizontally more easily and are great
   when the shape of the data changes often or is read as a whole. I pick based on the data
   access pattern, not on hype."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. SQL -> schema-on-write, tables, rows, foreign keys, JOINs, SQL language.
2. NoSQL -> schema-flexible, documents/key-value/graph/columnar, query APIs differ per DB.
3. SQL usually scales **vertically** first (bigger machine, read replicas).
4. MongoDB scales **horizontally** with sharding built in.
5. MongoDB also supports ACID multi-document transactions now (since 4.0), but you design to
   need them less by embedding related data.

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature        | SQL (Postgres/MySQL)     | NoSQL (MongoDB)              |
|----------------|--------------------------|------------------------------|
| Data model     | Tables, rows             | Collections, documents (BSON)|
| Schema         | Fixed, migrations needed | Flexible (Mongoose adds one) |
| Relations      | JOINs, foreign keys      | Embedding or $lookup/populate|
| Scaling        | Vertical + replicas      | Horizontal (sharding)        |
| Best for       | Finance, ERP, reporting  | Catalogs, content, logs, apps|

-----------------------------------------------------
Example (same data)
-----------------------------------------------------
-- SQL: two tables + join
SELECT u.name, o.total FROM users u JOIN orders o ON o.user_id = u.id WHERE u.id = 1;

// MongoDB: one document can hold related data
{ _id: ObjectId("..."), name: "Vipul", addresses: [{ city: "Pune", zip: "411001" }] }

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Saying "NoSQL has no schema". The DB does not enforce one by default, but the application
  always has one. That is why we use Mongoose schemas or MongoDB $jsonSchema validation.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When would you NOT choose MongoDB?
A1: When the data is heavily relational with many-to-many joins and complex reporting, or
    strict cross-table consistency is core (banking ledgers). Postgres fits better there.

Q2: Can you use both in one project?
A2: Yes (polyglot persistence) - e.g. Postgres for payments, MongoDB for product catalog,
    Redis for caching/sessions.

Q3: Why did your project use MongoDB?
A3: JSON-like documents map naturally to JS objects in Node, the schema evolved quickly, and
    most reads fetched one entity with its nested data in a single query.
*/
