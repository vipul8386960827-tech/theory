/*
===============================================================================
NOTION — HIGH-LEVEL ARCHITECTURE
===============================================================================

DRAW THIS:

┌────────────────────────── Browser ──────────────────────────┐
│  UI LAYER                                                   │
│   Sidebar tree │ Page view (Block renderer) │ Menus/Popups  │
│                          ▲                                  │
│  STATE LAYER             │ subscribe by block id            │
│   Block store (normalized: blocksById)                      │
│   Undo/redo manager │ Presence store │ UI state (menus)     │
│                          ▲                                  │
│  SYNC LAYER              │                                  │
│   Transaction queue (outbox) ──► IndexedDB (offline cache)  │
│   WebSocket client (realtime) │ REST client (load pages)    │
│   Web Worker (search index, heavy diffs)                    │
└───────────────┬─────────────────────────────────────────────┘
                ▼
   API server │ Realtime server │ Search service │ CDN (images, files)

-------------------------------------------------------------------------------
1. UI LAYER
-------------------------------------------------------------------------------
- Pure rendering. Each block component reads ONLY its own block from the store.
- Menus: slash menu, block action menu, share dialog, comments panel.

-------------------------------------------------------------------------------
2. STATE LAYER
-------------------------------------------------------------------------------
- Normalized block store = single source of truth on the client.
- Every change goes through ONE function: applyOp(op). This makes undo,
  collaboration and offline sync all possible from the same place.

-------------------------------------------------------------------------------
3. SYNC LAYER
-------------------------------------------------------------------------------
- REST: initial page load, search, uploads (signed URLs).
- WebSocket: send my transactions, receive others' transactions + presence.
- IndexedDB: cached pages (instant open) + outbox of unsent changes.

-------------------------------------------------------------------------------
4. THE EDIT FLOW (most important sentence)
-------------------------------------------------------------------------------
User types
  → applyOp() updates the store         (UI updates instantly)
  → op saved in IndexedDB outbox        (survives tab close / offline)
  → op sent over WebSocket              (other users see it)
  → server acks with new version        (remove from outbox)

"The UI never waits for the network."

-------------------------------------------------------------------------------
5. RENDERING STRATEGY
-------------------------------------------------------------------------------
| Part                     | Strategy | Why                                  |
|--------------------------|----------|--------------------------------------|
| Logged-in editor (app)   | CSR      | Heavy, personalized, no SEO needed   |
| Public published pages   | SSR/SSG  | SEO + fast first paint, read-only    |
| Marketing / landing      | SSG      | Static content                       |

Tech stack to mention: React (Next.js for public pages), a small store
(Zustand or custom useSyncExternalStore), Yjs for CRDT text,
IndexedDB (via idb), DOMPurify for paste sanitization.
*/
