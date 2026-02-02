/* 
58_server_sent_events.js – Interview-Ready Answer

"Server-Sent Events (SSE) allow a server to push real-time updates 
to the browser over a single HTTP connection, without the client 
having to request repeatedly."

1️⃣ Key Points to Highlight

1. Definition:
- SSE is a unidirectional communication from server to client.
- Uses EventSource API in JavaScript.
- Keeps a persistent connection; server can send updates anytime.

2. Key Features:
- Lightweight, text-based format.
- Automatic reconnection.
- Works over standard HTTP.
- Can send custom events.

3. Examples

Client-side JavaScript:
const evtSource = new EventSource("server-events.php");

evtSource.onmessage = function(event) {
    console.log("New message from server:", event.data);
};

// Optional: custom event
evtSource.addEventListener("update", function(event) {
    console.log("Update received:", event.data);
});

Server-side Node.js example using Express:
const express = require("express");
const app = express();

app.get("/server-events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    setInterval(() => {
        res.write("data: " + new Date().toLocaleTimeString() + "\n\n");
    }, 1000);
});

app.listen(3000, () => console.log("SSE server running on port 3000"));

4️⃣ Real-Life Analogies

- Global Analogy: SSE = subscribing to live notifications from a news channel.
- India-specific Analogy: SSE = getting live train status updates on your phone.
- Web Analogy: SSE = server pushes stock price updates to browser in real-time.

5️⃣ Code Explanation

- EventSource opens a persistent HTTP connection.
- Server sends messages with "data:" prefix and double newline.
- Client receives messages via onmessage or custom event listeners.
- Connection automatically reconnects if interrupted.

6️⃣ Example / Usage

const evtSourceExample = new EventSource("/server-events");

evtSourceExample.onmessage = function(event) {
    console.log("Server says:", event.data);
};

7️⃣ Follow-Up Interview Questions

Q1: How is SSE different from WebSockets?  
A1: SSE is unidirectional (server → client); WebSockets are bidirectional.

Q2: Can SSE send binary data?  
A2: No, SSE sends only text data.

Q3: Is SSE supported in all browsers?  
A3: Mostly modern browsers; IE does not fully support it.

Q4: How does SSE handle reconnections?  
A4: Automatically attempts to reconnect if connection drops.

Q5: Can SSE handle custom events?  
A5: Yes, using addEventListener("eventName", callback).
*/
