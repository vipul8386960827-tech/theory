/* 
59_receive_sse_notifications.js – Interview-Ready Answer

"Receiving Server-Sent Events (SSE) notifications in the browser allows 
the client to get real-time updates from the server using the EventSource API."

1️⃣ Key Points to Highlight

1. Setting up SSE on Client:
- Use EventSource to open a persistent connection to the server endpoint.
- Handle incoming messages using onmessage or addEventListener.
- Automatic reconnection is built-in.

2. Syntax:
const eventSource = new EventSource("server-endpoint");

eventSource.onmessage = function(event) {
    console.log("Message from server:", event.data);
};

eventSource.addEventListener("customEvent", function(event) {
    console.log("Custom event:", event.data);
});

3. Real-Life Analogies

- Global Analogy: Like subscribing to a live sports score feed.
- India-specific Analogy: Like receiving live train or metro status updates on your phone.
- Web Analogy: Server pushes notifications like stock price updates to your dashboard in real-time.

4. Code Explanation

- EventSource establishes a persistent HTTP connection.
- The server pushes messages with the "data:" prefix and double newline.
- onmessage handles default messages.
- addEventListener can handle custom event types.
- Connection reconnects automatically if interrupted.

5. Example / Usage

const evtSource = new EventSource("/server-events");

evtSource.onmessage = function(event) {
    console.log("Server says:", event.data); // Default event
};

evtSource.addEventListener("news", function(event) {
    console.log("News update:", event.data); // Custom event
});

6. Best Practices

- Always handle connection errors using evtSource.onerror.
- Close the connection when no longer needed using evtSource.close().
- Use custom events to categorize different types of updates.

7️⃣ Follow-Up Interview Questions

Q1: Can you receive multiple types of events using SSE?  
A1: Yes, by using addEventListener with custom event names.

Q2: How does SSE differ from WebSockets?  
A2: SSE is unidirectional (server → client); WebSockets are bidirectional.

Q3: Does SSE automatically reconnect if the connection drops?  
A3: Yes, the browser automatically attempts to reconnect.

Q4: Can SSE send binary data?  
A4: No, SSE only supports text data.

Q5: How do you stop receiving SSE notifications?  
A5: Call evtSource.close() to terminate the connection.
*/
