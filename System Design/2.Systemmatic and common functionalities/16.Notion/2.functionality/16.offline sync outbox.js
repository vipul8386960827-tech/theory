/*
===============================================================================
NOTION — OFFLINE SUPPORT + OUTBOX (LOCAL-FIRST SYNC)
===============================================================================

GOAL: "Never lose a keystroke" — even if offline, tab closed, or laptop sleeps.

FLOW:
  Edit → applyOp (UI instant)
       → enqueue(ops) → write to IndexedDB "outbox"  (durable)
       → flush(): send over WebSocket
       → server "ack" { txId, version } → delete from outbox
  Offline? → ops wait in the outbox → flush on reconnect.

TWO IndexedDB STORES:
1. "blocks"  → cached pages for instant open + offline reading
2. "outbox"  → unsent transactions, in order

Why IndexedDB, not localStorage?
- localStorage: ~5MB, synchronous (blocks the main thread → hurts INP),
  strings only.
- IndexedDB: large quota, async, stores objects, works in workers.
*/

import { openDB } from "idb";

const dbPromise = openDB("notion-cache", 1, {
  upgrade(db) {
    db.createObjectStore("blocks", { keyPath: "id" });
    db.createObjectStore("outbox", { keyPath: "txId" });
  },
});

let pending = [];           // ops waiting for the debounce window
let debounceTimer = null;
const inFlight = new Set(); // txIds sent but not yet acked

// Called by commit() / undo() / redo()
export function enqueue(ops) {
  pending.push(...ops);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(createTransaction, 200);   // batch fast typing
  setSyncStatus("saving");
}

async function createTransaction() {
  if (pending.length === 0) return;
  const tx = {
    txId: crypto.randomUUID(),    // idempotency key
    pageId: currentPageId,
    baseVersion: currentVersion,
    ops: pending,
    createdAt: Date.now(),
  };
  pending = [];
  const db = await dbPromise;
  await db.put("outbox", tx);     // durable BEFORE sending
  flush();
}

export async function flush() {
  if (!socket.isOpen()) { setSyncStatus("offline"); return; }
  const db = await dbPromise;
  const all = await db.getAll("outbox");
  all.sort((a, b) => a.createdAt - b.createdAt);   // keep original order
  for (const tx of all) {
    if (inFlight.has(tx.txId)) continue;
    inFlight.add(tx.txId);
    socket.send(JSON.stringify({ type: "transaction", ...tx }));
  }
}

// Server confirmed
export async function onAck({ txId, version }) {
  const db = await dbPromise;
  await db.delete("outbox", txId);
  inFlight.delete(txId);
  currentVersion = Math.max(currentVersion, version);
  if ((await db.count("outbox")) === 0 && pending.length === 0) setSyncStatus("saved");
}

// Server rejected (e.g. permission removed while offline)
export async function onReject({ txId, reason }) {
  const db = await dbPromise;
  await db.delete("outbox", txId);
  inFlight.delete(txId);
  showToast(`Some changes couldn't be saved: ${reason}`);
  refetchPage();          // get back to the server's truth
}

// Connection dropped → anything in flight must be resent later
export function onDisconnect() {
  inFlight.clear();
  setSyncStatus("offline");
}

// Warn before closing the tab with unsaved changes
window.addEventListener("beforeunload", (e) => {
  if (pending.length > 0 || inFlight.size > 0) {
    e.preventDefault();
    e.returnValue = "";
  }
});

/*
-------------------------------------------------------------------------------
MULTI-TAB
-------------------------------------------------------------------------------
- Two tabs, same page → both write to the same IndexedDB outbox.
- Use BroadcastChannel to share ops between tabs instantly, and the Web
  Locks API (navigator.locks) so only ONE tab flushes the outbox.

-------------------------------------------------------------------------------
CONFLICTS AFTER LONG OFFLINE
-------------------------------------------------------------------------------
- Text: CRDT merges automatically (file 14).
- Properties: last-writer-wins.
- Block deleted by someone else while I edited it offline → keep it in
  trash + notify: "This block was deleted by Ravi. Restore?"

SYNC STATUS UI: "Saving…" → "Saved" → "Offline — changes will sync"

Interview line:
"Every change is written to an IndexedDB outbox before it's sent, and only
removed when the server acks it with the same idempotency key. So offline,
crashes and lost acks can never lose or duplicate an edit."
*/
