/* 372_web_socket_api.js

=====================================================
WebSocket API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WebSocket is a **protocol and API** that enables **full-duplex, persistent communication** 
   between a client (browser) and server. Unlike HTTP, WebSocket maintains a single connection 
   that allows both client and server to send messages independently in real-time."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Full-duplex**: Both client and server can send messages anytime.
2. **Persistent connection**: Single connection remains open until explicitly closed.
3. **Low latency**: Real-time communication without repeated HTTP requests.
4. **Standardized API**: Supported in modern browsers via `WebSocket` object.
5. Ideal for **chat apps, live notifications, gaming, and real-time dashboards**.

-----------------------------------------------------
Basic Example (Client-side)
-----------------------------------------------------
const socket = new WebSocket('wss://example.com/socketserver');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('WebSocket connected');
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

// Handle errors
socket.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});

// Close connection
socket.addEventListener('close', (event) => {
  console.log('WebSocket closed');
});

-----------------------------------------------------
Server-side Example (Node.js with ws)
-----------------------------------------------------
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log('Received:', message);
    socket.send(`Server received: ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Real-time chat applications.
- Live notifications and updates (news, stock tickers).
- Multiplayer online games.
- Collaborative editing tools (like Google Docs).
- Real-time dashboards and analytics.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WebSocket uses **ws://** or **wss://** (secure) URLs.
2. The connection starts with an HTTP handshake and upgrades to WebSocket.
3. Messages are sent as **text or binary data**.
4. Connection must be explicitly closed to free resources.
5. WebSocket is not suitable for every use case; fallback to HTTP for simple requests.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WebSocket like a **phone call**:
  - Once connected, both parties can talk freely at any time.
  - Unlike email (HTTP), you don’t have to repeatedly send requests and wait for responses.
  - The line remains open until one party hangs up (connection closed).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How is WebSocket different from HTTP?  
A1: HTTP is request-response and stateless; WebSocket is full-duplex, persistent, and allows real-time communication.

Q2: Can WebSocket handle binary data?  
A2: Yes, messages can be sent as text or binary (ArrayBuffer, Blob).

Q3: How does the WebSocket connection start?  
A3: It begins with an HTTP handshake, then upgrades the connection to the WebSocket protocol.

Q4: What are some scenarios where WebSocket is preferred?  
A4: Real-time apps like chat, gaming, live dashboards, collaborative editing, or live notifications.
*/
