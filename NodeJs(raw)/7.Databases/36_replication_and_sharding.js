/* 36_replication_and_sharding.js

=====================================================
Replication and Sharding
=====================================================

Definition (What I should say in the interview):
- "**Replication** keeps **copies of the same data on multiple servers** - in MongoDB a
   **replica set** has one primary that takes writes and secondaries that copy its oplog. It
   gives **high availability**: if the primary goes down, the members elect a new primary
   automatically. **Sharding** **splits the data across multiple servers** (shards) by a shard
   key, so the database can scale **horizontally** beyond one machine. Replication is for
   availability and redundancy; sharding is for scale."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature        | Replication (Replica Set)         | Sharding                          |
|----------------|-----------------------------------|-----------------------------------|
| Purpose        | High availability, redundancy     | Horizontal scaling                |
| Data           | Same data on every member         | Each shard holds part of the data |
| Writes         | Only primary                      | Spread across shards' primaries   |
| Components     | Primary, secondaries, (arbiter)   | Shards (each a replica set),      |
|                |                                   | mongos router, config servers     |
| Failover       | Automatic election (~seconds)     | Per shard via its replica set     |

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Minimum recommended replica set: 3 members (odd number for elections).
2. Reads go to primary by default; readPreference 'secondaryPreferred' can offload reads but
   may return slightly stale data (replication lag).
3. Write concern w: 'majority' -> write survives a failover.
4. Shard key choice is critical: high cardinality, even distribution, matches common queries.
   Bad key (e.g. monotonically increasing createdAt with ranged sharding) -> hot shard.
5. Hashed shard key spreads writes evenly but makes range queries scatter-gather.

-----------------------------------------------------
Example
-----------------------------------------------------
// Connection string to a replica set (driver discovers primary automatically)
mongoose.connect('mongodb://h1:27017,h2:27017,h3:27017/shop?replicaSet=rs0', {
  readPreference: 'secondaryPreferred',
  w: 'majority',
});

// Sharding (mongosh, via mongos)
sh.enableSharding('shop');
sh.shardCollection('shop.orders', { customerId: 'hashed' });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Replication is not a backup: a bad deleteMany is replicated instantly. Keep backups too.
- Atlas clusters are replica sets by default, which is also why transactions work there.
- Shard only when needed; it adds operational complexity.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens to the app during failover?
A1: Writes fail briefly until a new primary is elected; the driver retries (retryWrites is on
    by default) and reconnects automatically.

Q2: What is the oplog?
A2: A capped collection on the primary recording every write; secondaries replay it to stay in
    sync. Change streams are built on it too.
*/
