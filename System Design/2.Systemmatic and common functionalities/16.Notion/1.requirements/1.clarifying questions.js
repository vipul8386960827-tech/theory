/*
===============================================================================
NOTION — CLARIFYING QUESTIONS (first 2–3 minutes)
===============================================================================

Ask these BEFORE designing anything. Each answer changes the design.

| Question                                          | Why it matters                                  |
|---------------------------------------------------|-------------------------------------------------|
| Which features matter most: editor,               | Decides where to spend the deep-dive time       |
| collaboration, databases?                         |                                                 |
| Is real-time collaboration in scope?              | Yes → WebSocket + CRDT/OT. No → simple autosave |
| How many people edit one page at the same time?   | 2–10 → CRDT per page is fine. 1000s → different |
| Is offline editing required?                      | Yes → IndexedDB + outbox queue + merge logic    |
| Web only, or mobile too?                          | Shared core logic, touch drag-and-drop          |
| Do published public pages need SEO?               | Yes → SSR/SSG for public pages                  |
| How big can a page get? (blocks per page)         | 1000s → virtualization + lazy loading           |
| Do we need version history / page restore?        | Affects how we store operations                 |
| Permissions: view / comment / edit?               | Read-only mode in the editor UI                 |

-------------------------------------------------------------------------------
ASSUMPTIONS TO STATE (if the interviewer says "you decide")
-------------------------------------------------------------------------------
- Web app (desktop first, responsive).
- Real-time collaboration: YES, up to ~10 editors on one page.
- Offline: YES, edit offline and sync later.
- Pages up to ~5,000 blocks.
- Public pages need SEO.

Interview line:
"I'll assume real-time collaboration and offline support are in scope,
since those drive most of the interesting frontend decisions."
*/
