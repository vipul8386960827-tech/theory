/*
Latency Handling in Collaborative Rich Text Editors

1) What is latency here:
- Latency is the delay between a user's action (typing, formatting)
  and other users seeing it.
- It’s caused by network delays, server processing, or slow clients.

2) Why it matters:
- High latency breaks the “real-time” feel.
- Users may overwrite each other’s changes if the UI lags.
- Cursor positions may appear incorrectly to other collaborators.

3) How it is handled:

a) **Local echo / optimistic updates**:
- When a user types or formats text:
  - Update the local editor immediately (instant feedback)
  - Send the operation to the server asynchronously
- The user sees their own changes without waiting for the network.

b) **Operation queuing**:
- Keep a queue of unacknowledged operations sent to the server
- When the server responds with acknowledgment or transformation (OT/CRDT):
  - Adjust local state to account for other users’ edits
  - Replay queued operations in order
- Ensures consistency while masking network delays

c) **CRDT / OT algorithms**:
- Conflict resolution is done on operations rather than full document snapshots
- Character-level operations allow concurrent edits to merge automatically
- Reduces re-rendering and ensures all clients converge

d) **Cursor smoothing / prediction**:
- Apply slight animation or prediction for remote cursors
- Mitigates the jumpiness due to network latency

e) **Batching operations** (optional):
- Small edits (like fast typing) can be batched into a single operation
- Reduces number of WebSocket messages and backend load

4) Interview phrasing:
- “Latency is handled by updating the local editor immediately, sending operations
  asynchronously, and using OT/CRDT to merge remote operations.
  Remote cursors are adjusted based on transformed operations.
  This ensures all clients stay responsive and consistent in real-time.”
*/
