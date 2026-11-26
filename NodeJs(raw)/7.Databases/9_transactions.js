/* 9_transactions.js

=====================================================
Transactions (MongoDB / Mongoose)
=====================================================

Definition (What I should say in the interview):
- "A transaction groups multiple operations so they **all succeed or all fail together**. In
   MongoDB a single-document write is always atomic, but when I need to update **multiple
   documents or collections** consistently - like debiting one wallet and crediting another -
   I use a **multi-document transaction** with a session. They require a **replica set or
   sharded cluster** (Atlas works out of the box; a standalone local mongod does not)."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Start a session -> run operations with { session } -> commit or abort.
2. session.withTransaction() handles commit and retries on transient errors automatically.
3. Every operation inside must receive the session, otherwise it runs outside the transaction.
4. Default transaction time limit is 60 seconds (transactionLifetimeLimitSeconds).
5. Transactions have a performance cost; good schema design (embedding) reduces the need.

-----------------------------------------------------
Example (money transfer)
-----------------------------------------------------
const session = await mongoose.startSession();
try {
  await session.withTransaction(async () => {
    const from = await Account.findOneAndUpdate(
      { _id: fromId, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true, session }
    );
    if (!from) throw new Error('Insufficient balance');   // aborts the transaction

    await Account.updateOne({ _id: toId }, { $inc: { balance: amount } }, { session });
    await Transfer.create([{ fromId, toId, amount }], { session }); // array form with session
  });
} finally {
  await session.endSession();
}

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Model.create() with options needs an array as the first argument: create([doc], { session }).
- Do not run operations inside the same transaction in parallel with Promise.all; run them
  sequentially.
- Do not call external APIs (payment gateway, email) inside the callback; withTransaction may
  retry it.
- Local dev: run mongod with --replSet rs0 and rs.initiate(), or use Docker / Atlas.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why do transactions need a replica set?
A1: They rely on the oplog and the replication protocol for commit/abort and read/write
    concerns. A standalone server has no oplog.

Q2: What happens if the server crashes mid-transaction?
A2: Uncommitted changes are never visible and are discarded; either everything committed or
    nothing did.

Q3: Alternatives without transactions?
A3: Atomic single-document updates ($inc with a condition), embedding related data, or a
    two-phase / saga pattern with compensating actions.
*/
