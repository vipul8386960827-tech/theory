/*
Cursor Synchronization in Collaborative Editors

1) Why cursor sync is needed:
- Multiple users can edit the same document at the same time.
- Without cursor sync:
  - Users see live content updates but cannot see where others are typing.
  - This can cause confusion or accidental overwrites.
- Cursor sync is a UX feature that improves collaboration clarity.
- Example: User A edits paragraph 1, User B edits paragraph 3; cursors show who is editing where.

2) What is synced:
- Each client sends minimal metadata about their cursor/selection:
  1. userId: identifies which user the cursor belongs to.
  2. anchorOffset / focusOffset: starting and ending positions of the selection/caret.
  3. node path or character index: to locate the cursor accurately in the DOM.
- Content is not sent; only cursor positions.

3) How it is implemented:
- Client side:
  - Listen for selection changes (mouseup, keyup).
  - Send cursor metadata via WebSocket to the server.
- Server side:
  - Broadcast cursor data to all other clients in the same document room.
- Receiving clients:
  - Render remote cursors at the received positions.
  - Adjust positions when incoming text edits occur (OT/CRDT) to maintain alignment.

4) Integration with OT/CRDT:
- When an insert/delete operation happens:
  - Update all remote cursors that are affected by the change.
  - Example: If a character is inserted before a cursor, increment its offset.
- Ensures cursors stay aligned with the text as edits happen.

5) Interview phrasing:
- “Cursor synchronization is separate from content updates.
  Each client sends only selection metadata via WebSocket.
  The server broadcasts it to others in the same room.
  Operations adjust remote cursors so all users see accurate positions.
  This provides real-time visibility of collaborators’ carets and selections.”
*/
