/*
===============================================================================
NOTION — VIRTUALIZING A LONG PAGE (5,000+ BLOCKS)
===============================================================================

WHY: 5,000 blocks × several DOM nodes each = 20k+ nodes →
     slow first render, slow scrolling, high memory, worse INP.

IDEA: render only blocks in (or near) the viewport + an overscan buffer;
      use spacer heights for everything else so the scrollbar stays correct.

-------------------------------------------------------------------------------
WHY IT'S HARDER IN AN EDITOR THAN IN A FEED
-------------------------------------------------------------------------------
| Challenge                          | Solution                                  |
|------------------------------------|-------------------------------------------|
| Blocks have DIFFERENT heights      | Estimate height by type, then MEASURE     |
|  (heading vs image vs code)        |  with ResizeObserver and cache it by id   |
| Block being edited must NEVER      | "Pin" the focused block (and the blocks   |
|  unmount (caret/IME would be lost) |  in a multi-block selection) in the DOM   |
| Ctrl+F (browser find) can't find   | Provide our own in-page search over the   |
|  unrendered text                   |  store, scroll to and highlight the match |
| Nested blocks (tree)               | Flatten the visible tree into a list      |
|                                    |  [{id, depth}] and virtualize that list   |
| Scroll jumps when measured height  | Adjust scrollTop by the height difference |
|  differs from the estimate         |  for blocks ABOVE the viewport            |
| Remote cursor in an unrendered     | Show an indicator at the edge             |
|  block                             |  "Ravi is editing below ↓"                |

-------------------------------------------------------------------------------
WHEN TO TURN IT ON
-------------------------------------------------------------------------------
- Don't virtualize small pages (< ~300 blocks): extra complexity, no benefit,
  and it breaks native find.
- Turn on above a threshold.
- Alternative for medium pages: CSS `content-visibility: auto` +
  `contain-intrinsic-size` → the browser skips layout/paint of off-screen
  blocks, but keeps them in the DOM (Ctrl+F still works).

Library: @tanstack/react-virtual (supports dynamic measured heights).
*/

// Flatten the visible tree → list of { id, depth } for the virtualizer
export function flattenVisible(rootId, getBlock, collapsed) {
  const out = [];
  const walk = (id, depth) => {
    for (const childId of getBlock(id).childIds) {
      out.push({ id: childId, depth });
      if (!collapsed.has(childId)) walk(childId, depth + 1);
    }
  };
  walk(rootId, 0);
  return out;
}

/*
Interview line:
"For small pages I use content-visibility: auto, so browser find still works.
For very large pages I flatten the tree and virtualize with measured heights,
and I always keep the focused block mounted so the caret is never lost."
*/
