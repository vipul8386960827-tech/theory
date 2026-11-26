/* 35_acid_properties.js

=====================================================
ACID Properties
=====================================================

Definition (What I should say in the interview):
- "ACID is the set of guarantees a database gives for transactions: **Atomicity** - all
   operations succeed or none do; **Consistency** - the data moves from one valid state to another,
   respecting constraints; **Isolation** - concurrent transactions do not see each other's partial
   work; and **Durability** - once committed, data survives a crash. SQL databases are built
   around ACID, and MongoDB gives ACID for single-document writes always, and for
   multi-document writes through transactions."

-----------------------------------------------------
Each property with a bank-transfer example
-----------------------------------------------------
A - Atomicity  : Debit A and credit B both happen, or neither (rollback on error).
C - Consistency: Balance never goes negative if a CHECK/validation forbids it; FK constraints hold.
I - Isolation  : Another request reading balances mid-transfer does not see half the transfer.
D - Durability : After COMMIT, a power failure does not lose the transfer (write-ahead log / journal).

-----------------------------------------------------
Example (SQL)
-----------------------------------------------------
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1 AND balance >= 500;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;            -- or ROLLBACK on any error

-----------------------------------------------------
ACID in MongoDB
-----------------------------------------------------
- Single-document operations are atomic (even with nested arrays/sub-docs).
- Multi-document ACID via sessions + transactions (replica set required).
- Durability tuned with write concern: { w: 'majority', j: true } -> acknowledged by majority
  and written to the journal.
- Isolation: transactions use snapshot isolation; read concern 'snapshot'/'majority'.

-----------------------------------------------------
SQL isolation levels (often asked)
-----------------------------------------------------
| Level            | Prevents                                   |
|------------------|--------------------------------------------|
| Read Uncommitted | Nothing (dirty reads possible)             |
| Read Committed   | Dirty reads (Postgres default)             |
| Repeatable Read  | + Non-repeatable reads (MySQL InnoDB default)|
| Serializable     | + Phantom reads (strictest, slowest)       |

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is BASE?
A1: Basically Available, Soft state, Eventually consistent - the trade-off many distributed
    NoSQL systems make for availability and scale.

Q2: Is MongoDB ACID compliant?
A2: Yes for single documents always, and for multi-document transactions since 4.0 (replica
    sets) and 4.2 (sharded clusters), with some performance cost.
*/
