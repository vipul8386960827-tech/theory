/*
WebSockets (Recommended for Chat Apps)

- How it works:
  1. Client opens a single persistent connection to the server (usually via ws:// or wss://).
  2. Both client and server can send messages anytime over this connection (full-duplex).
  3. Connection stays open until explicitly closed by client or server.

- Why it’s more efficient than Polling / Long Polling:

  1. Low latency:
     - Messages are delivered instantly, no need to wait for the next request (unlike polling).
     - Long polling waits for a timeout or response, so still slightly slower.

  2. Less network overhead:
     - Single connection carries all messages.
     - No repeated HTTP headers or empty requests like polling/long polling.

  3. Scalability:
     - Server doesn’t have to handle thousands of repeated HTTP requests.
     - Persistent connections can be efficiently managed with event-driven servers 
     (Node.js, Nginx push, etc.).

  4. Supports real-time features easily:
     - Typing indicators
     - Online/offline status
     - Read receipts
     - Presence updates
     - Group messaging

- Additional Benefits:
  - Works well with binary data (images, audio, video) via the same connection.
  - Reduces battery/network usage on mobile devices.
  - Can integrate with fallback mechanisms (like HTTP fallback) if WebSocket is unavailable.

- When to use:
  - Any app that requires real-time updates, low latency, and high scalability.
  - Chat apps, live notifications, multiplayer games, collaborative apps.
*/
