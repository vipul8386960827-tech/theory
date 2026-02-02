/*
Introduction:

To implement collaboration in a rich text editor, multiple clients must see each other's
changes in real-time. Two common approaches are polling and WebSockets.

1) Polling:
- Each client repeatedly requests the current document state from the server
  at fixed intervals (e.g., 1–5 seconds).
- Server responds with the latest document or a diff, and the client updates its editor.

2) Drawbacks of polling:
- Latency: Changes appear delayed; not truly real-time.
- Bandwidth inefficiency: Repeated requests even when nothing changed.
- Scalability issues: High server load with many users polling simultaneously.
- Complex ordering: Hard to maintain correct order of concurrent edits.

Because of these drawbacks, polling is not suitable for collaborative rich text editors.

3) WebSockets (preferred solution):
- Provides a persistent connection where clients send operations as they happen
  and receive updates instantly.
- Low-latency, efficient, scalable, and preserves the order of operations.

---------------------------------------------------------------
WebSockets in Collaborative Rich Text Editor (Next.js)
---------------------------------------------------------------

1) Client connection:
- When a user opens /editor/{documentId}, the client establishes a WebSocket
  connection with the server.
- The client sends:
  - `documentId` (identifies the room/document)
  - HTTP-only auth cookie (sent automatically with withCredentials: true)
    - This lets the server verify the user and their permissions securely
    - No separate token in the payload is strictly necessary

2) Access control on connection:
- The server checks the cookie and verifies:
    a) Is the user authenticated?
    b) Does the user have permission to edit this document?
- If the user is not allowed:
    - Server emits a special "access-denied" event
    - Server may disconnect the socket immediately
- Frontend listens for "access-denied" and can:
    - Alert the user
    - Redirect to a /permission-denied page
- This ensures only authorized users can participate in real-time collaboration.

3) Joining a room:
- Authorized clients join a "room" associated with the documentId.
- All clients editing the same document share this room.
- Efficient broadcasting is achieved: server sends updates only to clients in the same room.

4) Initial document sync for new users:
- When a new client joins:
    - Server sends the latest snapshot (current document HTML)
    OR
    - Replays operations applied so far
- Client initializes local editor state from this data
- This guarantees that the new user sees the current content before typing.

5) Real-time updates:
- When a user types, formats text, inserts mentions/images:
    - Client generates an operation object (insert, delete, format, image)
    - Sends it via WebSocket to the server
- Server optionally validates operations (permissions, content rules)
- Server broadcasts the operation to all other clients in the same room

6) Receiving updates:
- Clients receive edits via socket.on("edit")
- Local editor state is updated
- Selection and cursor positions are preserved as much as possible
- Undo/redo stacks remain local to each client — never shared
- Collaboration converges consistently across all clients

7) User presence:
- When a client disconnects (component unmount or documentId change):
    - Socket disconnects
    - Server broadcasts a "user-left" event
    - Other clients update UI (remove cursor/presence indicators)

8) Important architectural notes:
- URL → source of truth for document identity
- HTTP-only cookie → source of truth for authentication & permissions
- WebSocket → real-time transport
- Server → central relay, validator, and presence manager
- Clients → local editor state + applying operations from others

Interview takeaway:
- Real-time collaboration is achieved without sharing undo/redo history
- Server enforces security and validates edits
- Frontend shows real-time updates, including new users joining and users leaving
- This is a scalable, low-latency, secure approach for collaborative rich text editing
*/
