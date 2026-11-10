/*
===============================================================================
NOTION — KEYBOARD BEHAVIOUR THAT CREATES / MERGES / NESTS BLOCKS
===============================================================================

| Key                      | What happens                                     |
|--------------------------|--------------------------------------------------|
| Enter                    | Split block at cursor → new block below          |
| Enter on empty list item | Turn it back into a plain text block             |
| Backspace at start       | Merge with the block above                       |
| Tab / Shift+Tab          | Nest under previous sibling / un-nest            |
| ↑ / ↓ at first/last line | Move focus to previous / next block              |
| "/"                      | Open slash menu (file 8)                         |
| Ctrl/Cmd + B / I / U     | Toggle mark on selection                         |
| Ctrl/Cmd + Z / Shift+Z   | Undo / redo (file 11)                            |

Every action = ONE TRANSACTION (list of ops), so undo reverts it in one step.
*/

import { getBlock } from "./3.normalized block store";
import { splitSpans } from "./4.rich text spans";
import { keyBetween } from "./5.fractional indexing";
import { commit } from "./11.undo redo with inverse ops";

function nextSiblingKey(block) {
  const parent = getBlock(block.parentId);
  const i = parent.childIds.indexOf(block.id);
  const nextId = parent.childIds[i + 1];
  return nextId ? getBlock(nextId).sortKey : null;
}

// --------------------------------------------------------------------------
// ENTER: split current block at the cursor offset
// --------------------------------------------------------------------------
export function handleEnter(blockId, caretOffset) {
  const block = getBlock(blockId);
  const [left, right] = splitSpans(block.properties.text, caretOffset);

  const newBlock = {
    id: crypto.randomUUID(),
    // list items continue as list items; headings continue as plain text
    type: block.type.startsWith("heading") ? "text" : block.type,
    properties: { text: right },
    parentId: block.parentId,
    sortKey: keyBetween(block.sortKey, nextSiblingKey(block)),
    childIds: [],
    version: 0,
  };

  commit([
    { type: "update", id: blockId, path: ["properties", "text"], value: left },
    { type: "insert", block: newBlock },
  ]);

  return newBlock.id;     // caller moves focus to the start of the new block
}

// --------------------------------------------------------------------------
// BACKSPACE at offset 0: merge into previous sibling
// --------------------------------------------------------------------------
export function handleBackspaceAtStart(blockId) {
  const block = getBlock(blockId);
  const parent = getBlock(block.parentId);
  const i = parent.childIds.indexOf(blockId);
  if (i === 0) return null;                      // nothing above to merge into

  const prev = getBlock(parent.childIds[i - 1]);
  const caretOffset = prev.properties.text.reduce((n, s) => n + s.text.length, 0);

  commit([
    { type: "update", id: prev.id, path: ["properties", "text"],
      value: [...prev.properties.text, ...block.properties.text] },
    { type: "delete", id: blockId },
  ]);

  return { focusId: prev.id, caretOffset };      // cursor sits at the join point
}

// --------------------------------------------------------------------------
// TAB: nest under previous sibling (becomes its LAST child)
// --------------------------------------------------------------------------
export function handleTab(blockId) {
  const block = getBlock(blockId);
  const parent = getBlock(block.parentId);
  const i = parent.childIds.indexOf(blockId);
  if (i === 0) return;                           // can't nest the first child

  const newParent = getBlock(parent.childIds[i - 1]);
  const lastChildId = newParent.childIds.at(-1);
  const lastKey = lastChildId ? getBlock(lastChildId).sortKey : "";

  commit([
    { type: "move", id: blockId, newParentId: newParent.id, newSortKey: keyBetween(lastKey, null) },
  ]);
}

/*
-------------------------------------------------------------------------------
IMPORTANT DETAILS TO MENTION
-------------------------------------------------------------------------------
- Always e.preventDefault() on these keys, otherwise the browser inserts
  its own <div>/<br> into the contentEditable.
- IME / composition (Chinese, Japanese, Hindi keyboards): ignore keydown
  while e.isComposing is true, otherwise Enter confirms a word AND splits
  the block.
- After the transaction, restore focus + caret in requestAnimationFrame
  (the new block must be in the DOM first).
*/
