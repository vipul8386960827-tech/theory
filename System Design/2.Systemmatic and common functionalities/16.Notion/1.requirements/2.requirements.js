/*
===============================================================================
NOTION FRONTEND — FUNCTIONAL & NON-FUNCTIONAL REQUIREMENTS
===============================================================================

-------------------------------------------------------------------------------
FUNCTIONAL REQUIREMENTS (the "what")
-------------------------------------------------------------------------------
1. Pages made of BLOCKS: text, headings, bullet/number lists, to-dos,
   images, code, quotes, embeds, nested pages.
2. "/" slash command menu to insert or change a block.
3. Drag and drop to reorder / nest blocks.
4. Nested pages + sidebar page tree.
5. Real-time collaboration: see others' edits and cursors live.
6. Comments on a block or a text range, with @mentions.
7. Sharing & permissions: full access / edit / comment / view.
8. Search across pages.
9. Databases (lighter scope): table and board views of rows.
10. Undo / redo.

-------------------------------------------------------------------------------
NON-FUNCTIONAL REQUIREMENTS (the "how well")
-------------------------------------------------------------------------------
1. Performance
   - Typing feels instant (keystroke → paint < 50ms). Measured with INP.
   - Fast page switching (cached pages open instantly).
   - Big pages (5k blocks) scroll smoothly.
2. Reliability
   - NEVER lose user data (offline queue, retry, unload warning).
   - Works offline, syncs later.
3. Consistency
   - All collaborators eventually see the same document.
4. Security
   - No XSS from pasted content or embeds.
   - Permissions enforced on the server; UI reflects them.
5. Accessibility
   - Fully keyboard driven, screen-reader friendly menus.
6. SEO
   - Public / published pages server-rendered.
7. Observability
   - Track sync failures, editor crashes, INP from real users.

-------------------------------------------------------------------------------
OUT OF SCOPE (say it explicitly)
-------------------------------------------------------------------------------
- Backend storage design, AI features, integrations/API, billing.

Interview line:
"The hardest non-functional requirement is 'typing feels instant while
staying in sync with other people and working offline'. Most of my design
exists to satisfy that one sentence."
*/
