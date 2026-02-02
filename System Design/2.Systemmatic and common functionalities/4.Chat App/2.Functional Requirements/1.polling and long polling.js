/*
Realtime Updates (Messaging / Notifications)

Polling (NOT RECOMMENDED)
- How: Client sends repeated HTTP requests at fixed intervals (e.g., every 5s) 
to check for new messages.
- Why it's bad:
   1. High network overhead: Sends empty requests if no new messages.
   2. High latency: Messages might be delayed until next poll.
   3. Scalability issues: Servers have to handle many repeated requests.
- When okay: Very simple apps, low message volume, no real-time requirement.

Long Polling (IMPROVEMENT over polling but still not ideal)
- How: Client sends an HTTP request; server holds it open until a new message
 arrives or timeout.
  Once response is sent, client immediately opens a new request.
- Why it's better than polling:
   1. Reduces empty responses, lower network overhead.
   2. Slightly better latency: messages delivered as soon as they arrive.
- Why still not ideal:
   1. Server has to maintain many open connections (resource intensive).
   2. Hard to scale for thousands of users.
   3. More complex than WebSocket, but still less efficient.

Recommended Approach for Chat App: WebSocket / Duplex Connection
- How: Open a persistent connection between client & server.
- Benefits:
   1. Low latency, real-time updates.
   2. Less network & server overhead compared to polling/long polling.
   3. Can handle typing indicators, online status, and push notifications efficiently.
*/
