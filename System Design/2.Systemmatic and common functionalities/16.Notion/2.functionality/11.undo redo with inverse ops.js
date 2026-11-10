/*
===============================================================================
NOTION — UNDO / REDO WITH INVERSE OPERATIONS
===============================================================================

WHY NOT SNAPSHOTS (saving innerHTML on every change)?
- Memory: a 5k-block page × 100 undo steps = huge.
- COLLABORATION BREAKS: undoing to a snapshot also wipes out OTHER users'
  changes made after it.

SOLUTION:
- For every transaction, compute the INVERSE ops before applying.
- Undo = apply the inverse. Redo = apply the original again.
- The stack is PER USER: undo only reverts MY changes.

  insert(block)              ⇄  delete(block.id)
  delete(id)                 ⇄  insert(original block)
  update(id, path, new)      ⇄  update(id, path, old)
  move(id, newParent, newKey) ⇄ move(id, oldParent, oldKey)
*/

import { applyOp, getBlock } from "./3.normalized block store";
import { enqueue } from "./16.offline sync outbox";

const undoStack = [];   // each entry = { ops, inverse }
const redoStack = [];
let lastCommitTime = 0;
const MERGE_WINDOW_MS = 500;   // fast typing = one undo step

function inverseOf(op) {
  const block = getBlock(op.id ?? op.block?.id);
  switch (op.type) {
    case "insert": return { type: "delete", id: op.block.id };
    case "delete": return { type: "insert", block: { ...block, deleted: false } };
    case "update": {
      const [k1, k2] = op.path;
      const old = k2 ? block[k1][k2] : block[k1];
      return { type: "update", id: op.id, path: op.path, value: old };
    }
    case "move":
      return { type: "move", id: op.id, newParentId: block.parentId, newSortKey: block.sortKey };
  }
}

// ALL local edits go through commit() (see keyboard handlers in file 7)
export function commit(ops, { mergeable = false } = {}) {
  // compute each inverse BEFORE its op is applied
  const inverse = [];
  for (const op of ops) {
    inverse.unshift(inverseOf(op));  // reverse order: undo last op first
    applyOp(op);
  }
  enqueue(ops);                      // → outbox → server

  const now = Date.now();
  const top = undoStack.at(-1);
  if (mergeable && top?.mergeable && now - lastCommitTime < MERGE_WINDOW_MS) {
    // merge consecutive typing into one undo step
    top.ops.push(...ops);
    top.inverse.unshift(...inverse);
  } else {
    undoStack.push({ ops, inverse, mergeable });
  }
  lastCommitTime = now;
  redoStack.length = 0;              // a new edit clears redo history
}

export function undo() {
  const entry = undoStack.pop();
  if (!entry) return;
  entry.inverse.forEach(applyOp);
  enqueue(entry.inverse);            // undo is ALSO a normal change for others
  redoStack.push(entry);
}

export function redo() {
  const entry = redoStack.pop();
  if (!entry) return;
  entry.ops.forEach(applyOp);
  enqueue(entry.ops);
  undoStack.push(entry);
}

/*
-------------------------------------------------------------------------------
NOTES
-------------------------------------------------------------------------------
- Remote ops (from other users) are applied with applyOp directly, NOT
  commit(), so they never enter MY undo stack.
- Edge case: I undo the creation of a block that someone else has since
  typed into. Options: skip that undo step, or keep the block. Mention it.
- With Yjs, use Y.UndoManager with trackedOrigins = local origin; it does
  exactly this per-user behaviour for text.
- Cap the stack (e.g. 200 entries) to bound memory.

Interview line:
"Undo stores the inverse of each operation, not snapshots. It's per-user,
so undoing never erases a collaborator's work, and typing within 500ms is
grouped into one step."
*/
