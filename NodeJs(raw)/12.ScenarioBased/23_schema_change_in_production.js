/* 23_schema_change_in_production.js

=====================================================
Scenario: Change A Field In Production Without Downtime
=====================================================

The Question (how the interviewer asks it):
- "We need to rename the field 'name' to 'fullName' in the users
  collection (5M documents). The app runs on several servers and must
  stay online. How do you do it?"

What the interviewer is checking:
- Do you know old and new code run at the same time during a deploy?
- Do you know the expand-and-contract (parallel change) pattern?
- Can you backfill data safely in batches?
- Do you use migration tools and have a rollback plan?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I would not do a single "rename + deploy". During a rolling deploy, old
   servers still read 'name' and new servers read 'fullName'. Also a
   rollback would bring back old code that cannot read new data.
2. Expand: deploy code that WRITES both fields (name and fullName) and
   READS fullName with a fallback to name. Now old and new code both work.
3. Backfill: run a migration script that copies name -> fullName for old
   documents in batches (e.g. 1,000 at a time), with a pause between
   batches so production load is not hurt. It must be idempotent (safe to
   run again) - filter only docs where fullName does not exist.
4. Verify: count documents where fullName is missing should be 0.
   Add an index on the new field before switching reads if needed.
5. Switch: deploy code that reads and writes only fullName.
6. Contract: after some days, when rollback is no longer needed, remove the
   old field ($unset name) and its index.
7. Use a migration tool (migrate-mongo, or Prisma/Knex/TypeORM migrations
   for SQL) so migrations are versioned in git and run once per env. Test
   on a copy of production data first and take a backup.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// Step 1 (expand): schema has both fields, read with fallback
const userSchema = new mongoose.Schema({ name: String, fullName: String });
userSchema.virtual("displayName").get(function () {
  return this.fullName ?? this.name;
});
// on write: await User.updateOne({ _id }, { $set: { fullName: v, name: v } });

// Step 2 (backfill): migrations/20261126-copy-fullname.js (migrate-mongo)
export async function up(db) {
  const users = db.collection("users");
  while (true) {
    const batch = await users
      .find({ fullName: { $exists: false } }, { projection: { _id: 1 } })
      .limit(1000).toArray();
    if (batch.length === 0) break;

    // pipeline update copies the value inside the DB
    await users.updateMany(
      { _id: { $in: batch.map(d => d._id) }, fullName: { $exists: false } },
      [{ $set: { fullName: "$name" } }]
    );
    await new Promise(r => setTimeout(r, 100));   // reduce load
  }
}
export async function down() { }  // keep 'name', nothing to undo

// Step 4 (contract, weeks later):
// await users.updateMany({ name: { $exists: true } }, { $unset: { name: "" } });

// SQL: ALTER TABLE users ADD COLUMN full_name text;  (fast, nullable)
//      UPDATE ... in batches;  deploy;  later ALTER TABLE DROP COLUMN name;
//      Avoid RENAME COLUMN while old code is running.

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I use expand and contract. First I deploy code that writes both the old
  and new field and reads the new one with a fallback. Then I backfill old
  documents in small batches with an idempotent migration script. When all
  data is migrated, I switch the code to use only the new field, and later
  I remove the old field. Each step is backward compatible, so there is no
  downtime and I can roll back at any step."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- One big updateMany($rename) on 5M docs during peak hours, then deploy.
- Forgetting that old and new app versions run at the same time.
- Deleting the old field in the same release - no safe rollback.
- Running a one-off script by hand from a laptop with no versioning,
  backup, or test on staging.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: MongoDB is schemaless, so why is this hard?
A1: The database does not care, but the CODE does. Documents with old and
    new shapes exist together, so the code must handle both until all data
    is migrated.

Q2: What does idempotent migration mean?
A2: Running it twice gives the same result as once. If the script crashes
    halfway, I can just run it again; it skips already migrated documents.

Q3: How would you change a field type, like price from string to number?
A3: Same pattern: add priceNumber, write both, backfill with conversion
    (and log bad values), switch reads, then remove the old field. Mongoose
    schema validation helps catch bad new writes.
*/
