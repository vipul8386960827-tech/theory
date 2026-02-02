/*
Conflict Resolution in Collaborative Rich Text Editors

1) Why it’s needed:
- Multiple users can edit the same document simultaneously.
- Without a conflict resolution mechanism, edits can overwrite each other,
  resulting in lost data or inconsistent states across clients.

2) Two main approaches:

a) Operational Transformation (OT):
- Each client generates operations (insert, delete, format, etc.)
- Operations are transformed against concurrent operations received from other clients
  before being applied locally.
- Ensures all clients converge to the same final document state.
- Examples: Google Docs uses OT for text editing.

b) Conflict-free Replicated Data Types (CRDT):
- Each client maintains a local copy of the document.
- Operations (insert/delete) are designed to be commutative and idempotent.
- When merged, the document automatically converges without central transformation.
- Examples: Automerge, Yjs libraries.

3) How it works in practice:
- Each edit is represented as an operation (or delta).
- Clients send operations to the server via WebSocket.
- Server can optionally validate operations.
- Server broadcasts operations to all other clients.
- Receiving clients apply transformations (OT) or merge (CRDT) to integrate edits safely.

4) Key considerations:
- Undo/redo must remain local — do not sync undo stacks across clients.
- Cursor and selection positions need adjustments after transformations.
- Operations are generally small (per character or per formatting change) to minimize latency.
- Both OT and CRDT ensure **strong eventual consistency**.

5) Interview-level takeaway:
- “We represent each change as an operation and use OT or CRDT to ensure all clients converge
  to the same document state, even when edits happen concurrently.”
- Server mainly relays operations; client applies conflict resolution logic.
- Real-time collaborative editors rely on this for data integrity and consistency.
*/