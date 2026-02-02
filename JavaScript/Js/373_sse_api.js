/* 373_sse_api.js

=====================================================
Server-Sent Events (SSE) API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Server-Sent Events (SSE) is a **unidirectional communication protocol** where the server 
   can push updates to the client over a single HTTP connection. It is useful for **real-time 
   streaming of data** such as notifications, live feeds, or stock updates, without requiring 
   the client to poll repeatedly."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Unidirectional**: Server → Client; client cannot send messages back over the same connection.
2. Uses **HTTP protocol**, usually with `text/event-stream` MIME type.
3. **Automatic reconnection**: The browser automatically reconnects if connection is lost.
4. **Event-driven**: Supports named events with `addEventListener`.
5. Works in **modern browsers** using the `EventSource` API.
6. Lightweight alternative to WebSocket for **one-way streaming**.

-----------------------------------------------------
Basic Example (Client-side)
-----------------------------------------------------
const eventSource = new EventSource('/events');

eventSource.onopen = () => {
  console.log('SSE connection opened');
};

eventSource.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

eventSource.onerror = (error) => {
  console.error('SSE error:', error);
};

-----------------------------------------------------
Server-side Example (Node.js with Express)
-----------------------------------------------------
const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let count = 0;
  const interval = setInterval(() => {
    count++;
    res.write(`data: Message ${count}\n\n`);
    if (count === 5) clearInterval(interval);
  }, 1000);
});

app.listen(3000, () => console.log('Server listening on port 3000'));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Live news or sports feeds.
- Real-time stock market updates.
- Notifications and alerts.
- Live chat or comment feeds (if unidirectional is sufficient).
- Updating dashboards with streaming data.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. SSE is **unidirectional**; use WebSockets for bidirectional communication.
2. Works only over **HTTP(S)**, no special protocol needed.
3. Automatic reconnection interval can be set using `retry:` field in server messages.
4. Supports **text-only data**; binary data requires encoding (like Base64).
5. Limited browser support for older browsers, but widely supported in modern browsers.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of SSE like a **live TV broadcast**:
  - The server is the TV station continuously sending content.
  - The client (browser) receives the updates as they happen.
  - The viewer cannot send content back through the broadcast channel.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How is SSE different from WebSocket?  
A1: SSE is unidirectional (server → client) over HTTP, WebSocket is bidirectional and full-duplex.

Q2: Can SSE automatically reconnect after disconnection?  
A2: Yes, browsers automatically reconnect, and the retry interval can be configured by the server.

Q3: What data types can be sent via SSE?  
A3: Only text data; binary data must be encoded (e.g., Base64).

Q4: When should you prefer SSE over WebSocket?  
A4: When you only need server-to-client updates, simpler setup, and lower overhead for streaming events.
*/
