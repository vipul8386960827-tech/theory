/* 20_transfer_money_between_accounts.js

=====================================================
Scenario: Transfer Money Between Two Accounts
=====================================================

The Question (how the interviewer asks it):
- "Write a transfer API: take 100 from account A and add 100 to account B.
  What if the server crashes after the first update? Money must never
  disappear or be created."

What the interviewer is checking:
- Do you know ACID and when you need a transaction?
- Can you use MongoDB/Mongoose sessions and transactions correctly?
- Do you know the replica set requirement and retry behaviour?
- Do you also prevent negative balance and double requests (idempotency)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Two separate updates are not safe: if the process crashes between them,
   A loses money and B gets nothing. I need both changes to succeed or
   both to fail - that is a transaction (Atomicity in ACID).
2. In MongoDB multi-document transactions need a replica set or sharded
   cluster (Atlas is always a replica set). A standalone mongod does not
   support them. For local dev, run a single-node replica set.
3. Use mongoose.connection.transaction() (or session.withTransaction()).
   It commits at the end, aborts on error, and retries automatically on
   TransientTransactionError / UnknownTransactionCommitResult.
4. Pass { session } to EVERY operation inside. If I forget it on one
   query, that query runs outside the transaction.
5. Debit with a condition: { _id: from, balance: { $gte: amount } } so the
   balance can never go negative. If no doc matches, throw to abort.
6. Write a ledger/transfer record in the same transaction (audit trail),
   and use an idempotency key (unique index) so a retried HTTP request does
   not transfer twice.
7. Keep transactions short: no external API calls inside, because they hold
   locks and have a time limit (60 s default).

-----------------------------------------------------
Code Example
-----------------------------------------------------
import mongoose from "mongoose";

async function transfer({ fromId, toId, amount, idempotencyKey }) {
  if (amount <= 0) throw new Error("Invalid amount");

  // transaction() = startSession + withTransaction + endSession + retries
  return mongoose.connection.transaction(async (session) => {
    const from = await Account.findOneAndUpdate(
      { _id: fromId, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { session, new: true }
    );
    if (!from) throw new Error("Insufficient funds"); // aborts everything

    const to = await Account.findOneAndUpdate(
      { _id: toId },
      { $inc: { balance: amount } },
      { session, new: true }
    );
    if (!to) throw new Error("Target account not found");

    // unique index on idempotencyKey -> duplicate request fails
    await Transfer.create(
      [{ fromId, toId, amount, idempotencyKey }],
      { session }                 // create() needs an array to pass options
    );
  });
}
// Store money as integer cents (or Decimal128), never as float.

// SQL equivalent (PostgreSQL)
// BEGIN;
// UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;
// UPDATE accounts SET balance = balance + 100 WHERE id = 2;
// INSERT INTO transfers (...) VALUES (...);
// COMMIT;   -- or ROLLBACK on any error

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Both updates must be atomic, so I use a transaction. In Mongoose I use
  connection.transaction() and pass the session to every query. The debit
  has a balance >= amount filter so it cannot go negative; if anything
  fails I throw and everything rolls back. MongoDB transactions need a
  replica set. I also save a transfer record with a unique idempotency key
  so a retried request does not move money twice."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Forgetting { session } on one of the queries inside the transaction.
- Trying transactions on a standalone MongoDB and not knowing why it fails.
- Reading balance, checking in JS, then writing (race condition).
- Using JavaScript floats for money (0.1 + 0.2 !== 0.3).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Explain ACID in simple words.
A1: Atomicity - all or nothing. Consistency - rules (like no negative
    balance) stay true. Isolation - parallel transactions do not see each
    other's half work. Durability - after commit, data survives a crash.

Q2: Do you always need a transaction in MongoDB?
A2: No. A single-document update is already atomic. Good schema design
    (embedding related data) often avoids transactions. Use them only for
    multi-document changes that must be all-or-nothing.

Q3: What if the transfer involves two different services/databases?
A3: A DB transaction cannot cover both. Use the Saga pattern: a sequence of
    local transactions with compensating actions (refund) on failure, often
    with the outbox pattern and a message queue.
*/
