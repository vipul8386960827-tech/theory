/*
===============================================================================
NOTION — SIDEBAR PAGE TREE
===============================================================================

WHAT IT SHOWS:
- Favorites, Workspace pages (Teamspaces), Private pages, Trash.
- Nested pages with expand/collapse arrows.
- Drag pages to reorder or nest them.

-------------------------------------------------------------------------------
1. DATA
-------------------------------------------------------------------------------
- Same block store! A sidebar item is a block with type "page".
- Only load what's visible:
    initial: top-level pages only (title, icon, hasChildren)
    expand:  GET /pages/:id/children-pages  → load children on demand
- `hasChildren: true` lets us show the ▶ arrow without loading children.

-------------------------------------------------------------------------------
2. LIVE UPDATES
-------------------------------------------------------------------------------
- Renaming a page in the editor updates the sidebar instantly
  (both read the same block from the store → no extra sync code).
- Another user creates a page → workspace-level WebSocket event
  { type: "page_created", parentId } → insert into the tree if the parent
  is loaded/expanded.

-------------------------------------------------------------------------------
3. STATE THAT BELONGS TO THE USER (UI state, not server data)
-------------------------------------------------------------------------------
- Which nodes are expanded, sidebar width, collapsed/hidden.
- Save in localStorage (small, per device) → restored on reload.

-------------------------------------------------------------------------------
4. PERFORMANCE
-------------------------------------------------------------------------------
- Big workspaces (10k pages): virtualize the flattened visible tree
  (same flattenVisible idea as file 19).
- Prefetch a page's content on hover (file 18).

-------------------------------------------------------------------------------
5. ACCESSIBILITY (WAI-ARIA tree pattern)
-------------------------------------------------------------------------------
- role="tree", items role="treeitem", aria-expanded, aria-level.
- Keys: ↑↓ move, → expand / go to child, ← collapse / go to parent,
  Enter opens the page.
- Roving tabindex: only one item has tabIndex=0 at a time.

Interview line:
"The sidebar reuses the same block store, so renames show up everywhere for
free. Children are loaded lazily on expand, and it follows the ARIA tree
pattern for keyboard users."
*/
