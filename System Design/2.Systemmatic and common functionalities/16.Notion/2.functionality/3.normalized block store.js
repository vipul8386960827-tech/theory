/*
===============================================================================
NOTION — NORMALIZED BLOCK STORE (per-block subscriptions)
===============================================================================

WHY NORMALIZED?
- Tree stored as nested objects → updating a deep block means copying the
  whole path, and EVERY component on that path re-renders.
- Flat map blocksById → update one entry, only THAT block re-renders.
  (Same idea as the byId map in the Big Data Table data layer.)

WHY PER-BLOCK SUBSCRIPTIONS?
- Typing in block #2000 must not re-render the other 4,999 blocks.
- Each <Block id> subscribes to its own id using useSyncExternalStore.
*/

import { useSyncExternalStore } from "react";

let blocksById = {};                 // { [id]: Block }  (immutable entries)
const listeners = new Map();         // id -> Set<callback>

function notify(id) {
  listeners.get(id)?.forEach((cb) => cb());
}

function subscribe(id, cb) {
  if (!listeners.has(id)) listeners.set(id, new Set());
  listeners.get(id).add(cb);
  return () => listeners.get(id)?.delete(cb);
}

export function getBlock(id) {
  return blocksById[id];
}

// React hook: re-renders ONLY when this block changes
export function useBlock(id) {
  return useSyncExternalStore(
    (cb) => subscribe(id, cb),
    () => blocksById[id]
  );
}

// Keep a parent's childIds sorted by each child's sortKey
function insertChildSorted(parent, childId, sortKey) {
  const ids = parent.childIds.filter((c) => c !== childId);
  let i = ids.findIndex((c) => blocksById[c].sortKey > sortKey);
  if (i === -1) i = ids.length;
  ids.splice(i, 0, childId);
  return { ...parent, childIds: ids };
}

/*
-------------------------------------------------------------------------------
applyOp: THE ONLY WAY TO CHANGE STATE
Used by: local edits, remote edits (WebSocket), undo/redo, offline replay.
-------------------------------------------------------------------------------
*/
export function applyOp(op) {
  switch (op.type) {
    case "insert": {
      const { block } = op;
      blocksById = { ...blocksById, [block.id]: block };
      const parent = blocksById[block.parentId];
      blocksById[block.parentId] = insertChildSorted(parent, block.id, block.sortKey);
      notify(block.id);
      notify(block.parentId);
      break;
    }
    case "update": {
      const prev = blocksById[op.id];
      // path like ["properties", "checked"]
      const [k1, k2] = op.path;
      const next = k2
        ? { ...prev, [k1]: { ...prev[k1], [k2]: op.value } }
        : { ...prev, [k1]: op.value };
      blocksById = { ...blocksById, [op.id]: next };
      notify(op.id);
      break;
    }
    case "delete": {
      const block = blocksById[op.id];
      const parent = blocksById[block.parentId];
      blocksById = {
        ...blocksById,
        [op.id]: { ...block, deleted: true },        // soft delete → trash
        [parent.id]: { ...parent, childIds: parent.childIds.filter((c) => c !== op.id) },
      };
      notify(op.id);
      notify(parent.id);
      break;
    }
    case "move": {
      const block = blocksById[op.id];
      const oldParent = blocksById[block.parentId];
      const moved = { ...block, parentId: op.newParentId, sortKey: op.newSortKey };
      blocksById = {
        ...blocksById,
        [op.id]: moved,
        [oldParent.id]: { ...oldParent, childIds: oldParent.childIds.filter((c) => c !== op.id) },
      };
      blocksById[op.newParentId] = insertChildSorted(blocksById[op.newParentId], op.id, op.newSortKey);
      notify(op.id);
      notify(oldParent.id);
      notify(op.newParentId);
      break;
    }
  }
}

/*
Interview line:
"Every block component subscribes to its own id, so a keystroke re-renders
exactly one component. All writes go through a single applyOp function,
whether they come from the keyboard, another user, undo, or offline replay."
*/
