/* 
61_sse_events.js – Interview-Ready Answer

"Server-Sent Events (SSE) can send different types of events from the server, 
and the client can listen to default or custom events using the EventSource API."

1️⃣ Key Points to Highlight

1. Default Event:
- Event name: "message"
- Received via `onmessage` handler.
- Every SSE message without a custom event type is considered a "message".

2. Custom Events:
- Server can define event types using "event:" prefix.
- Client listens using `addEventListener("eventName", callback)`.

3. Syntax Example

// Client-side JavaScript
const evtSource = new EventSource("/server-events");

// Listening to default "message" event
evtSource.onmessage = function(event) {
    console.log("Default message:", event.data);
};

// Listening to a custom event
evtSource.addEventListener("update", function(event) {
    console.log("Update received:", event.data);
});

4. Server-side Example (Node.js)
const express = require("express");
const app = express();

app.get("/server-events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    setInterval(() => {
        // Default message
        res.write(`data: Default event at ${new Date().toLocaleTimeString()}\n\n`);

        // Custom event
        res.write(`event: update\ndata: Update event at ${new Date().toLocaleTimeString()}\n\n`);
    }, 2000);
});

app.listen(3000, () => console.log("SSE server running on port 3000"));

5. Real-Life Analogies

- Global Analogy: Default event = general notifications; custom event = category-specific notifications.
- India-specific Analogy: Default = general train status; custom = platform change updates.
- Web Analogy: Stock market app: default = all stocks update, custom = specific stock alert.

6. Code Explanation

- onmessage handles messages without explicit event type.
- addEventListener allows handling multiple custom event types.
- Each event received includes `data` and optional `id` or `retry`.

7. Example / Usage

const source = new EventSource("/server-events");

source.onmessage = function(event) {
    console.log("Default:", event.data);
};

source.addEventListener("news", function(event) {
    console.log("News event:", event.data);
});

8️⃣ Follow-Up Interview Questions

Q1: Can SSE have multiple custom events?  
A1: Yes, the server can send multiple event types; client listens via addEventListener.

Q2: How do you differentiate default and custom events?  
A2: Default event uses onmessage; custom events require addEventListener with event name.

Q3: What happens if the client doesn’t listen to a custom event?  
A3: The event is ignored by the client.

Q4: Can SSE events carry complex data?  
A4: Only text data; you can send JSON as string and parse on client.

Q5: How do you stop listening to SSE events?  
A5: Use source.close() to terminate connection.
*/
