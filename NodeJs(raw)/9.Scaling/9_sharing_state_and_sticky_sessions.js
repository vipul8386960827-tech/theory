/* 9_sharing_state_and_sticky_sessions.js

=====================================================
Sharing State Across Instances and Sticky Sessions
=====================================================

Definition (What I should say in the interview):
- "When I run multiple workers or servers, each one has **its own memory**, so anything stored
   in a JS variable, like sessions, rate-limit counters or a cache, is **not shared**. The fix
   is to move shared state to an **external store like Redis** or the database. **Sticky
   sessions** are another option: the load balancer sends the same client to the same instance
   every time. Stickiness is required for things like **Socket.io with long-polling**, but for
   normal HTTP I prefer external state, because sticky sessions cause uneven load and you lose
   the session if that instance dies."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Problem: user logs in on worker 1, next request hits worker 2 -> "not logged in".
2. Fix 1: **JWT** (stateless token, nothing stored on the server).
3. Fix 2: **express-session + connect-redis** (session data in Redis).
4. Fix 3: **sticky sessions** (cookie or IP hash at LB, @socket.io/sticky for cluster).
5. Socket.io across instances also needs the **Redis adapter** so events reach clients
   connected to other instances.

-----------------------------------------------------
Example (Redis-backed sessions)
-----------------------------------------------------
const session = require('express-session');
const { RedisStore } = require('connect-redis');
const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Socket.io across instances
const { createAdapter } = require('@socket.io/redis-adapter');
const pub = createClient({ url: process.env.REDIS_URL });
const sub = pub.duplicate();
await Promise.all([pub.connect(), sub.connect()]);
io.adapter(createAdapter(pub, sub));

# nginx sticky by IP
upstream ws { ip_hash; server 10.0.0.1:3000; server 10.0.0.2:3000; }

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Using the default MemoryStore of express-session in production -> leaks and not shared.
- Thinking the Redis adapter removes the need for stickiness -> it does not, if HTTP
  long-polling is enabled. Sticky is for the handshake; the adapter is for broadcasting.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you avoid sticky sessions with Socket.io?
A1: Yes, by forcing transports: ['websocket'] only, since one WebSocket connection stays on one
    server anyway. You still need the Redis adapter for cross-instance broadcast.

Q2: Why is JWT good for scaling?
A2: The server verifies the signature without looking up shared state, so any instance can serve.
*/
