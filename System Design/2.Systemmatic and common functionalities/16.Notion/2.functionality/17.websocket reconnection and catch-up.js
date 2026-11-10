/*
===============================================================================
NOTION — WEBSOCKET RECONNECTION + CATCH-UP (PRODUCTION VERSION)
===============================================================================

What a 4-year answer must include (vs "retry every 2 seconds"):
1. EXPONENTIAL BACKOFF  → 1s, 2s, 4s, 8s ... capped at 30s
2. JITTER (randomness)  → 10,000 clients don't reconnect at the same instant
                           after a server restart ("thundering herd")
3. HEARTBEAT            → detect "zombie" connections that look open but
                           are dead (Wi-Fi switched, laptop slept)
4. RESUBSCRIBE          → re-join the open pages after reconnecting
5. CATCH-UP             → fetch ops missed while disconnected
6. FLUSH OUTBOX         → resend my unsent changes
7. LISTEN TO THE BROWSER → 'online' / 'offline' / 'visibilitychange'
*/

import { flush, onAck, onReject, onDisconnect } from "./16.offline sync outbox";

const MAX_DELAY = 30_000;
const HEARTBEAT_MS = 25_000;
const HEARTBEAT_TIMEOUT_MS = 10_000;

let ws = null;
let attempt = 0;
let heartbeatTimer = null;
let pongTimeout = null;
let reconnectTimer = null;

export function connect() {
  clearTimeout(reconnectTimer);
  ws = new WebSocket("wss://realtime.example.com");

  ws.onopen = async () => {
    attempt = 0;                                      // reset backoff
    startHeartbeat();
    for (const pageId of openPages) {
      ws.send(JSON.stringify({ type: "subscribe", pageId }));
      await catchUp(pageId);                          // fill the gap
    }
    flush();                                          // send my queued edits
    setSyncStatus("saved");
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "pong") { clearTimeout(pongTimeout); return; }
    if (msg.type === "ack") return onAck(msg);
    if (msg.type === "reject") return onReject(msg);
    if (msg.type === "transaction") return onRemoteTransaction(msg);
    if (msg.type === "presence") return onPresence(msg);
  };

  ws.onclose = () => {
    stopHeartbeat();
    onDisconnect();
    scheduleReconnect();
  };

  ws.onerror = () => ws.close();                      // onclose handles retry
}

function scheduleReconnect() {
  if (!navigator.onLine) return;                      // wait for 'online' event
  const base = Math.min(MAX_DELAY, 1000 * 2 ** attempt);
  const delay = Math.random() * base;                 // "full jitter"
  attempt++;
  reconnectTimer = setTimeout(connect, delay);
}

function startHeartbeat() {
  heartbeatTimer = setInterval(() => {
    ws.send(JSON.stringify({ type: "ping" }));
    // no pong in time → connection is dead even if readyState says OPEN
    pongTimeout = setTimeout(() => ws.close(), HEARTBEAT_TIMEOUT_MS);
  }, HEARTBEAT_MS);
}

function stopHeartbeat() {
  clearInterval(heartbeatTimer);
  clearTimeout(pongTimeout);
}

// Gap detection: fetch every op after the last version I have
async function catchUp(pageId) {
  const res = await fetch(`/pages/${pageId}/since?version=${versionOf(pageId)}`);
  if (res.status === 410) return refetchWholePage(pageId);  // too old → full reload
  const { transactions } = await res.json();
  transactions.forEach(onRemoteTransaction);
}

// Remote edits also check for gaps
function onRemoteTransaction(msg) {
  if (msg.version > versionOf(msg.pageId) + 1) return catchUp(msg.pageId);
  msg.ops.forEach(applyOp);                           // NOT commit() → not in my undo
  setVersion(msg.pageId, msg.version);
}

// Browser signals
window.addEventListener("online", () => { attempt = 0; connect(); });
window.addEventListener("offline", () => ws?.close());
document.addEventListener("visibilitychange", () => {
  // laptop woke up / tab came back → check the connection immediately
  if (document.visibilityState === "visible" && ws?.readyState !== WebSocket.OPEN) {
    attempt = 0;
    connect();
  }
});

/*
Interview line:
"I reconnect with exponential backoff plus jitter, detect dead connections
with a heartbeat, and after reconnecting I resubscribe, fetch missed
versions, and flush my outbox. The version number tells me whether I missed
anything."
*/
