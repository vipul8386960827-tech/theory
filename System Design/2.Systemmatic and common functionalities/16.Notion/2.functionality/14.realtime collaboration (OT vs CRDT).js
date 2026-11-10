/*
===============================================================================
NOTION — REAL-TIME COLLABORATION: OT vs CRDT
===============================================================================

THE PROBLEM:
Text = "cat". At the SAME time:
  User A inserts "s" at position 3  → "cats"
  User B inserts "!" at position 0  → "!cat"
If each side blindly applies the other's op:
  A: "cats" + insert "!" at 0 → "!cats"  ✅
  B: "!cat" + insert "s" at 3 → "!cas t"?? → "!cast"  ❌ (positions shifted)
The two users now see DIFFERENT documents. We need conflict resolution.

-------------------------------------------------------------------------------
OPTION 1: OT (Operational Transformation) — Google Docs
-------------------------------------------------------------------------------
- The SERVER orders all ops. Before applying an op, it is TRANSFORMED
  against ops that happened concurrently.
  (B's "insert s at 3" becomes "insert s at 4" because A inserted before it.)
+ Small memory footprint, battle-tested.
- Needs a central server to order ops.
- Offline for a long time = lots of transforming, hard to get right.
- Transform functions for every pair of op types = complex.

-------------------------------------------------------------------------------
OPTION 2: CRDT (Conflict-free Replicated Data Type) — Yjs, Automerge
-------------------------------------------------------------------------------
- Each character gets a UNIQUE ID (clientId + counter) and points to the
  character it was inserted after. Positions are never used.
- Any two copies that received the same ops end up identical, IN ANY ORDER.
+ Works offline and peer-to-peer; server is just a relay + storage.
+ Libraries (Yjs) do the hard parts.
- More memory (metadata per character, tombstones for deleted text).

-------------------------------------------------------------------------------
MY CHOICE (hybrid — this is the senior answer)
-------------------------------------------------------------------------------
| Data                          | Strategy                       | Why               |
|-------------------------------|--------------------------------|-------------------|
| Text inside a block           | CRDT (one Y.Text per block)    | Char-level merges |
| Block properties (type,       | Last-writer-wins per property  | Conflicts rare,   |
|  checked, color)              |  (server timestamp/version)    |  easy to reason   |
| Block order / structure       | Fractional index + parentId    | No index shifting |
| Delete vs concurrent edit     | Soft delete; edit is kept in   | Nothing is lost   |
|                               |  trash, restore possible       |                   |

Why hybrid: a CRDT for the WHOLE page tree is heavy and makes moves tricky
(two users moving blocks into each other can create cycles). Most block
properties rarely conflict, so last-writer-wins is fine there.
*/

import * as Y from "yjs";

// One Y.Doc per page, one Y.Text per text block
const ydoc = new Y.Doc();

function getBlockText(blockId) {
  return ydoc.getMap("texts").get(blockId);   // Y.Text
}

// LOCAL edit → Yjs creates a small binary update
ydoc.on("update", (update, origin) => {
  if (origin === "remote") return;            // don't echo remote changes back
  socket.send(update);                        // Uint8Array, very small
});

// REMOTE edit → merge (order doesn't matter, CRDT guarantees convergence)
socket.onmessage = (event) => {
  Y.applyUpdate(ydoc, new Uint8Array(event.data), "remote");
};

// After applying, re-render ONLY the affected block:
//   yText.observe(() => updateStore(blockId, yText.toDelta()))
// toDelta() returns [{ insert: "Hello", attributes: { bold: true } }]
// → which maps 1:1 to our spans model (file 4).

/*
Interview line:
"I'd use a CRDT like Yjs for the text inside each block, because that's where
character-level conflicts happen, and last-writer-wins for simple block
properties. Structure uses fractional indexing. This gives correct merges
where they matter without the cost of a CRDT for everything."
*/
