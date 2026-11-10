/*
===============================================================================
NOTION — DRAG AND DROP BLOCKS
===============================================================================

UX:
- Hover a block → "⋮⋮" handle appears on the left.
- Drag the handle → a blue line shows where the block will land.
- Drop ABOVE / BELOW a block → same parent, new sortKey.
- Drop to the RIGHT side of a block → make columns (Notion feature, optional).
- Drop onto a sidebar page → move the block into that page.
- Multi-select blocks (file 9) and drag them all at once.

IMPLEMENTATION OPTIONS:
| Option                 | Pros                          | Cons                          |
|------------------------|-------------------------------|-------------------------------|
| Native HTML5 DnD       | No library, works across tabs | Poor on touch, ugly ghost img |
| Pointer events (custom)| Full control, touch works     | More code                     |
| dnd-kit library        | Accessible, keyboard support  | Extra dependency              |
→ Pick dnd-kit or pointer events (touch + keyboard support matter).

-------------------------------------------------------------------------------
DROP POSITION LOGIC
-------------------------------------------------------------------------------
On pointermove:
1. Find the block under the pointer (elementFromPoint → closest [data-block-id]).
2. rect = block.getBoundingClientRect()
3. pointer Y in top half → drop BEFORE that block, bottom half → AFTER.
4. Pointer X indented further right than the block → drop as its CHILD.
5. Draw the indicator line (absolute positioned div, no re-render of blocks).

On drop:
  newSortKey = keyBetween(prevSibling.sortKey, nextSibling.sortKey)
  commit([{ type: "move", id, newParentId, newSortKey }])

ONE op, regardless of how far the block moved (thanks to fractional indexing).

-------------------------------------------------------------------------------
EDGE CASES
-------------------------------------------------------------------------------
- Don't allow dropping a block INTO ITS OWN DESCENDANT (would create a cycle).
  Check: walk up from target's parent; if we reach the dragged id → reject.
- Auto-scroll when dragging near the top/bottom edge of the page.
- Throttle pointermove work with requestAnimationFrame.
- Remote user deletes the block mid-drag → cancel the drag gracefully.

ACCESSIBILITY:
- Keyboard alternative: Ctrl/Cmd + Shift + ↑/↓ moves the block.
- Announce "Moved block to position 3" via an aria-live region.
*/
