/*
===============================================================================
NOTION — PRESENCE (WHO'S HERE) + REMOTE CURSORS
===============================================================================

WHAT USERS SEE:
- Avatar stack at the top: "3 people viewing".
- Coloured caret + name tag where each collaborator is typing.
- Coloured highlight on their text selection.

PRESENCE IS EPHEMERAL:
- NOT saved to the database, NOT part of undo, NOT in the outbox.
- If a presence message is lost, the next one fixes it.
*/

const presenceMessage = {
  type: "presence",
  pageId: "p_1",
  userId: "u_2",
  name: "Ravi",
  color: "#e5484d",           // assigned per user, stable
  cursor: { blockId: "b_7", offset: 12 },        // NOT pixel x/y!
  selection: { anchor: { blockId: "b_7", offset: 5 }, focus: { blockId: "b_7", offset: 12 } },
  lastActive: 1731300000000,
};

/*
-------------------------------------------------------------------------------
KEY DESIGN POINTS
-------------------------------------------------------------------------------
1. SEND blockId + offset, NOT pixel coordinates.
   Screen sizes / zoom / fonts differ → pixels would point to the wrong place.
   Each client converts (blockId, offset) → its own pixels with a DOM Range.

2. THROTTLE: send at most every ~50–100ms while the cursor moves.
   (Throttle, not debounce: we want steady updates, not just the last one.)

3. TIMEOUT: if no presence/heartbeat from a user for ~30s → remove them.
   Mark "idle" after 2–5 min with no activity (or tab hidden via
   document.visibilityState).

4. RENDER IN AN OVERLAY LAYER
   - Draw remote carets as absolutely positioned divs above the page.
   - Do NOT inject them into the contentEditable (it would break typing
     and the CRDT text).
   - Recompute positions in requestAnimationFrame when text changes or
     the window resizes.

5. KEEP MY OWN CURSOR STABLE when remote edits arrive
   - Save my selection as (blockId, offset) → apply remote op →
     shift my offset if text was inserted/removed BEFORE it → restore.
   - With Yjs: use Y.RelativePosition, which does this automatically.

6. SCALE: with 50+ viewers, show only ~5 avatars + "+45", and only
   render cursors for users near my viewport.
*/

function throttle(fn, ms) {
  let last = 0;
  let timer = null;
  return (...args) => {
    const now = Date.now();
    const remaining = ms - (now - last);
    clearTimeout(timer);
    if (remaining <= 0) {
      last = now;
      fn(...args);
    } else {
      // trailing call so the FINAL cursor position is always sent
      timer = setTimeout(() => { last = Date.now(); fn(...args); }, remaining);
    }
  };
}

export const sendPresence = throttle((cursor) => {
  socket.send(JSON.stringify({ type: "presence", pageId, cursor }));
}, 80);

/*
Interview line:
"Presence is throttled, ephemeral, and sent as blockId plus offset, never
pixels. Remote cursors are drawn in an overlay so they never touch the
editable DOM."
*/
