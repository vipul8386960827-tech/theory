/* 35_realtime_notifications_or_chat.js

=====================================================
Scenario: Real-time notifications / chat on multiple servers
=====================================================

The Question (how the interviewer asks it):
- "We need real-time notifications and a simple chat. We run 4 Node servers
   behind a load balancer. How would you build it?"

What the interviewer is checking:
- Can you compare polling, long polling, SSE and WebSockets?
- Do you know Socket.io and why it needs a Redis adapter with many servers?
- Do you authenticate the socket connection?
- Do you think about reconnects, rooms and persistence?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify the need. One-way updates (notifications, live scores) or
   two-way (chat)? How many users online at the same time?
2. Pick the transport:
   | Option        | Direction   | Good for                          |
   |---------------|-------------|-----------------------------------|
   | Short polling | client asks | very simple, low frequency        |
   | Long polling  | client asks | fallback, fewer empty responses   |
   | SSE           | server->client | notifications, feeds (HTTP)    |
   | WebSocket     | both ways   | chat, games, collaboration        |
   For chat I choose WebSockets, usually with Socket.io (rooms, reconnect,
   fallbacks).
3. Multi-server problem: user A is connected to server 1, user B to server 2.
   Server 1 cannot emit to B directly. Fix: Socket.io Redis adapter (Redis
   pub/sub) so an emit is broadcast to all servers.
4. Load balancer: enable WebSocket upgrade and sticky sessions (needed if
   the long-polling fallback is on), and raise idle timeouts.
5. Authenticate on connection: verify the JWT in the handshake middleware,
   reject if invalid, and join the user to a room like `user:<id>`.
6. Persist messages in the DB first, then emit. Real-time delivery is "best
   effort"; on reconnect the client fetches missed messages via REST.
7. Other parts of the system (workers, other services) can send a
   notification by emitting through the adapter / Redis.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const http = require('node:http');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const jwt = require('jsonwebtoken');

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: process.env.WEB_ORIGIN } });

const pub = createClient({ url: process.env.REDIS_URL });
const sub = pub.duplicate();
await Promise.all([pub.connect(), sub.connect()]);
io.adapter(createAdapter(pub, sub));     // broadcast across all servers

// Auth on connection (handshake)
io.use((socket, next) => {
  try {
    const user = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET);
    socket.data.user = user;
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});

io.on('connection', (socket) => {
  socket.join(`user:${socket.data.user.id}`);

  socket.on('chat:send', async ({ roomId, text }) => {
    const msg = await db.messages.create({ roomId, text, from: socket.data.user.id });
    io.to(`room:${roomId}`).emit('chat:new', msg);   // reaches every server
  });
});

// Anywhere in the app: notify one user, whichever server they are on
function notifyUser(userId, payload) {
  io.to(`user:${userId}`).emit('notification', payload);
}

httpServer.listen(3000);

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "For one-way notifications SSE is enough, but for chat I use WebSockets,
   usually with Socket.io. With several servers, a user connected to server
   1 cannot receive an event emitted on server 2, so I add the Socket.io
   Redis adapter, which uses Redis pub/sub to broadcast between servers. I
   verify the JWT in the connection handshake and put each user in their own
   room. Messages are saved in the database first, so clients can load
   missed messages after a reconnect."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Ignoring the multi-server problem (events only reach users on the same
  server).
- No authentication on the socket, or trusting a userId sent by the client.
- Keeping chat history only in memory.
- Using fast polling every second for thousands of users - wastes resources.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why do Socket.io deployments often need sticky sessions?
A1: The HTTP long-polling fallback sends several requests that must reach
    the same server. With WebSocket-only transport, stickiness is not needed.

Q2: SSE vs WebSocket - when would you choose SSE?
A2: When only the server sends data. SSE is plain HTTP, simple, and the
    browser reconnects automatically. WebSocket is for two-way traffic.

Q3: How do you scale to a very large number of connections?
A3: Each connection uses memory and a file descriptor, so I add more
    instances, tune OS limits, or use a managed service (e.g. AWS API
    Gateway WebSockets, Pusher, Ably).
*/
