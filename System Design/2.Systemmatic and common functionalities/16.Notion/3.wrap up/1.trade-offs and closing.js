/*
===============================================================================
NOTION — WRAP-UP: TRADE-OFFS + CLOSING (last 3 minutes)
===============================================================================

-------------------------------------------------------------------------------
1. TRADE-OFFS I MADE (say them, interviewers love this)
-------------------------------------------------------------------------------
| Decision                         | Gain                      | Cost                     |
|----------------------------------|---------------------------|--------------------------|
| One contentEditable per block    | Isolation, small renders, | Must build cross-block   |
|                                  |  easy drag/virtualize     |  selection myself        |
| Spans (JSON) instead of HTML     | Safe, mergeable, portable | Convert DOM ↔ model      |
| CRDT for text, LWW for props     | Correct merges where they | Two strategies to        |
|                                  |  matter, simpler elsewhere|  maintain                |
| Fractional indexing              | Moves = 1 op, no shifting | Keys grow longer over    |
|                                  |                           |  time (rebalance rarely) |
| Local-first (IndexedDB outbox)   | Instant UI, offline, no   | Reconciliation, multi-tab|
|                                  |  data loss                |  coordination, storage   |
| Normalized store + per-block     | One keystroke = one       | More plumbing than a     |
|  subscriptions                   |  re-render                |  simple useState         |
| CSR editor, SSR public pages     | Best of both              | Two rendering paths      |

-------------------------------------------------------------------------------
2. WHAT I'D BUILD NEXT (if asked "what else?")
-------------------------------------------------------------------------------
- Version history: page snapshots every N minutes + op log → "restore".
- Comments & @mentions anchored to text with CRDT relative positions.
- Offline full-text search (index in a Web Worker over IndexedDB).
- Templates, synced blocks (one block shown in many pages).
- Mobile apps sharing the same core (store, ops, sync) as a shared package.

-------------------------------------------------------------------------------
3. LIKELY FOLLOW-UP QUESTIONS (prepare answers)
-------------------------------------------------------------------------------
Q: Two users edit the same word at the same time?
A: CRDT per block text → both edits are kept, all clients converge (file 14).

Q: User edits offline for 3 days?
A: Outbox in IndexedDB; on reconnect catch-up + CRDT merge; if server
   history is too old (410) → reload page, re-apply local CRDT updates (16, 17).

Q: Page with 10,000 blocks is slow?
A: Chunked loading + virtualization with a pinned focused block (18, 19).

Q: How do you avoid XSS?
A: Sanitize paste, JSON spans, React escaping, sandboxed embeds, CSP (10, 23).

Q: Undo with collaborators?
A: Per-user inverse operations; never undo others' work (11).

Q: How do you know users aren't losing data?
A: Monitor outbox length, rejected txs, sync failures (25).

-------------------------------------------------------------------------------
4. CLOSING LINE
-------------------------------------------------------------------------------
"To summarize: Notion is a tree of blocks, stored flat and normalized. Every
edit is a small operation applied locally first, saved to an IndexedDB
outbox, and synced over WebSocket, with a CRDT for text merges. That gives
instant typing, offline support and real-time collaboration, and the
per-block design keeps big pages fast."
*/
