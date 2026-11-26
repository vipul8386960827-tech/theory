/* 16_stateless_servers.js

=====================================================
Stateless Servers
=====================================================

Definition (What I should say in the interview):
- "A **stateless server** does not keep any client-specific data in its own memory or local
   disk between requests. Every request carries what is needed (like a **JWT**), and any shared
   data lives in **external services** like the database, Redis or S3. Because of that, **any
   instance can handle any request**, so I can add or remove instances freely, restart them,
   and put them behind a load balancer without sticky sessions. Statelessness is basically
   the requirement for horizontal scaling."

-----------------------------------------------------
Stateful vs Stateless
-----------------------------------------------------
| Thing              | Stateful (bad for scaling)         | Stateless (good)                  |
|--------------------|------------------------------------|-----------------------------------|
| Sessions           | express-session MemoryStore        | JWT or Redis session store        |
| File uploads       | Saved to ./uploads on local disk   | S3 / blob storage                 |
| Cache              | Global JS object                   | Redis                             |
| Scheduled jobs     | setInterval in every instance      | Single scheduler / queue / lock   |
| Rate limit counter | In-memory counter                  | Redis INCR                        |
| WebSocket rooms    | Only on the local instance         | Redis adapter                     |

-----------------------------------------------------
Example
-----------------------------------------------------
// Stateful (breaks with 2+ instances)
const carts = {};
app.post('/cart', (req, res) => {
  carts[req.user.id] = req.body;             // only this instance knows the cart
  res.sendStatus(200);
});

// Stateless
app.post('/cart', async (req, res) => {
  await redis.set(`cart:${req.user.id}`, JSON.stringify(req.body), { EX: 86400 });
  res.sendStatus(200);
});

// Auth without server memory
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.sendStatus(401); }
});

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Stateless does not mean "no state" - it means state is not kept inside the app instance.
- Cron with setInterval in every replica -> job runs N times. Use a lock or a separate worker.
- Local in-memory caches are OK if losing them is fine (they are just a performance layer).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Downside of JWT for statelessness?
A1: Hard to revoke before expiry. Use short expiry + refresh tokens, or a Redis denylist.

Q2: How does statelessness help deployments?
A2: Instances can be killed and replaced at any time (rolling updates, autoscaling) without
    losing user data.
*/
