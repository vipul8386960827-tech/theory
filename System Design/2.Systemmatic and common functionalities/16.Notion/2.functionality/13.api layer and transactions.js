/*
===============================================================================
NOTION — API LAYER (REST + WEBSOCKET)
===============================================================================

-------------------------------------------------------------------------------
REST (request/response)
-------------------------------------------------------------------------------
GET  /pages/:id                         → page block + first 50 children
GET  /pages/:id/blocks?cursor=&limit=50 → next chunk of blocks (lazy load)
GET  /pages/:id/children-pages          → sidebar tree children (on expand)
GET  /pages/:id/since?version=120       → ops missed since version (reconnect)
POST /transactions                      → fallback when WebSocket is down
GET  /search?q=&cursor=                 → search results
POST /uploads/sign                      → signed S3 URL for images/files
GET  /pages/:id/permissions             → who can view/edit

-------------------------------------------------------------------------------
WEBSOCKET (real-time, one connection per tab)
-------------------------------------------------------------------------------
Client → Server:
  { type: "subscribe",   pageId }                   // when a page opens
  { type: "unsubscribe", pageId }                   // when it closes
  { type: "transaction", txId, pageId, baseVersion, ops: [...] }
  { type: "presence",    pageId, cursor: { blockId, offset } }
  { type: "ping" }                                  // heartbeat

Server → Client:
  { type: "ack",         txId, version }            // my tx was saved
  { type: "reject",      txId, reason }             // permission / conflict
  { type: "transaction", pageId, version, ops, userId } // someone else's edit
  { type: "presence",    userId, cursor, name, color }
  { type: "pong" }

-------------------------------------------------------------------------------
TRANSACTION DESIGN
-------------------------------------------------------------------------------
{
  txId: "tx_uuid",     // IDEMPOTENCY KEY → server ignores duplicates on retry
  pageId: "p_1",
  baseVersion: 120,    // page version the client had when it made the edit
  ops: [ ...ops ],
  createdAt: 1731300000000
}

- txId makes retries safe: if the ack is lost and we resend, the server
  sees the same txId and doesn't apply it twice.
- version lets the client detect gaps: if I have version 120 and receive
  123 → I missed 121–122 → fetch GET /pages/:id/since?version=120.

-------------------------------------------------------------------------------
WHY BATCH OPS INTO TRANSACTIONS?
-------------------------------------------------------------------------------
- Typing "hello" = 5 updates → debounce ~100–300ms → 1 transaction.
- Fewer messages, fewer server writes, atomic multi-op changes
  (Enter = update + insert must succeed or fail together).

Interview line:
"REST loads data, WebSocket syncs changes. Every transaction carries an
idempotency key and a base version, so retries are safe and gaps are
detectable."
*/
