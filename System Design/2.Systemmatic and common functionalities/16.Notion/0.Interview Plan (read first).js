/*
===============================================================================
SYSTEM DESIGN: NOTION FRONTEND (60-MIN SESSION) — INTERVIEW PLAN
===============================================================================

Say this plan OUT LOUD at the start. Interviewers like candidates who manage
their own time.

| Time      | Phase                     | Files to revise                         |
|-----------|---------------------------|-----------------------------------------|
| 0–5 min   | Requirements              | 1.requirements/*                        |
| 5–12 min  | High-level architecture   | 2.functionality/1                       |
| 12–22 min | Data model (THE CORE)     | 2.functionality/2, 3, 4, 5              |
| 22–40 min | Deep dives                | 2.functionality/6 → 17                  |
|           |   a) Editor               |   6 → 12                                |
|           |   b) Collaboration        |   13 → 15                               |
|           |   c) Offline sync         |   16, 17                                |
| 40–50 min | Performance & loading     | 2.functionality/18 → 22                 |
| 50–57 min | Cross-cutting             | 2.functionality/23 → 25                 |
| 57–60 min | Wrap-up                   | 3.wrap up/*                             |

-------------------------------------------------------------------------------
OPENING LINE
-------------------------------------------------------------------------------
"Notion is a block-based editor. Every paragraph, heading, image, and even a
page itself is a block. So I'll start with requirements, then spend most of my
time on the block data model, the editor, and real-time collaboration, and
cover databases more lightly. Does that sound good?"

-------------------------------------------------------------------------------
WHAT MAKES THIS A 4-YEAR-LEVEL ANSWER
-------------------------------------------------------------------------------
1. Lead with the DATA MODEL, not the components.
2. Explain WHY at every choice (normalized store, spans not HTML,
   fractional indexing).
3. Know OT vs CRDT and pick a mixed approach with a reason.
4. Talk about FAILURE: offline, reconnect, conflicts, a broken block.
5. Tie choices to INP (typing latency), the metric that matters for an editor.

-------------------------------------------------------------------------------
WHAT TO DRAW (whiteboard / excalidraw)
-------------------------------------------------------------------------------
1. The 3-layer browser diagram (UI → State → Sync) + servers.
2. A block tree: Page → [Heading, Text, Todo → [Text]].
3. The edit flow: Edit → Store → IndexedDB outbox → WebSocket → ack.
*/
