/* 
---------------------------------------------------------
CONCISE WAY TO EXPLAIN MESSAGE READ/UNREAD INDICATORS IN INTERVIEW
---------------------------------------------------------

1) Start with purpose:
"Read/unread indicators show which messages the recipient has seen,
so the sender knows their message was received and read."

2) Explain the status flow simply:
"We track four states for a message:
sending → sent → delivered → read."

3) Real-time updates:
- "When a recipient reads a message, their client sends a 'read' event to the server."
- "Server pushes this event to the sender’s client via WebSocket."
- "Frontend updates the message UI instantly using the message’s unique ID."

4) Multi-device support:
- "The server tracks the last read message per user.
- When the same user opens chat on another device,
the frontend fetches the read status to stay consistent."

5) Optional optimization to mention:
- "Batch read events for multiple messages to reduce network calls."

6) Strong closing line:
"So, using unique message IDs, WebSocket events, and optional batching,
users always see accurate read/unread indicators in real-time."

---------------------------------------------------------
END OF CONCISE INTERVIEW EXPLANATION
---------------------------------------------------------
*/
