/*
===============================================================================
NOTION — SELECTION ACROSS MULTIPLE BLOCKS
===============================================================================

PROBLEM:
- Each block is its own contentEditable. The browser's native selection
  can't properly span separate editable elements.
- But users drag-select across 5 paragraphs and press Delete / Ctrl+C / Bold.

SOLUTION: OUR OWN SELECTION MODEL
*/

const selection = {
  // mode 1: text selection inside ONE block → let the browser handle it
  // mode 2: text selection across blocks → our model
  anchor: { blockId: "b1", offset: 4 },   // where the drag started
  focus:  { blockId: "b5", offset: 2 },   // where the drag is now
};

// mode 3: BLOCK selection (Esc, or drag in the margin) → whole blocks
const blockSelection = new Set(["b2", "b3", "b4"]);

/*
-------------------------------------------------------------------------------
HOW IT WORKS
-------------------------------------------------------------------------------
1. On mousedown, record anchor = { blockId, offset } (from the DOM caret).
2. On mousemove, find the block under the pointer (data-block-id) and its
   offset → update focus.
3. Blocks fully between anchor and focus are highlighted with a CSS class
   (we draw our own highlight, not the browser's).
4. Blocks are ordered by DOCUMENT ORDER (depth-first walk of the tree),
   so selecting "up" or "down" both work.

-------------------------------------------------------------------------------
ACTIONS ON A MULTI-BLOCK SELECTION
-------------------------------------------------------------------------------
- Delete / typing:
    first block keeps text before anchor.offset
    last block keeps text after focus.offset → merged into the first
    middle blocks → delete ops
    ALL in ONE transaction (one undo step).
- Copy:
    write BOTH formats to the clipboard:
    text/html  → for pasting into other apps
    text/plain → fallback
    plus our own JSON in a custom attribute → lossless paste back into Notion
- Bold: apply the mark to the selected range in every block.

Interview line:
"Per-block editing gives me isolation and speed, and the price is that I own
the multi-block selection model. I store selection as two points,
blockId + offset, and turn each action into a single transaction."
*/
