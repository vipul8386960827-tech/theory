/*
==============================
FRONTEND HEARTBEAT & PRESENCE EXPLANATION
==============================

1. WebSocket Connection:
- After login, the client opens a WebSocket to the chat server.
- All real-time events (messages, presence, typing) flow through this single connection.

2. Online / Offline Detection:
- Server tracks which users are connected via WebSocket.
- When a user connects, server emits a "USER_ONLINE" event to relevant clients.
- When a user disconnects or heartbeat stops, server emits "USER_OFFLINE".
- Client updates the green dot in the chat window using this event.

3. Heartbeat (PING) Mechanism:
- Even if WebSocket is open, network issues or idle devices may leave the server unsure if the user is active.
- Client periodically sends a "PING" event (e.g., every 30 seconds).
- Server updates lastActive timestamp on each ping.
- If pings stop beyond a timeout, the server marks the user offline.
- Ensures the online/offline indicator is accurate and avoids stale green dots.

4. Frontend Implementation:
- `useHeartbeat` hook: sends periodic PING messages to server.
- `useCurrentChatPresence` hook: listens for USER_ONLINE / USER_OFFLINE events and updates local state.
- No extra API calls are required; everything is event-driven via WebSocket.

5. Interview One-Liner:
"To keep presence real-time and accurate, the client maintains a WebSocket and sends periodic heartbeat PINGs; the server emits USER_ONLINE/OFFLINE events based on connection and heartbeat, and the client updates the UI instantly without polling."

*/

// ==============================
// FRONTEND: WebSocket + Heartbeat
// ==============================

import { useEffect, useState } from "react";

// -----------------------------
// Hook for tracking current chat user presence
// -----------------------------
export function useCurrentChatPresence(ws, chatUserId) {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.userId !== chatUserId) return;

      switch (data.type) {
        case "USER_ONLINE":
          setIsOnline(true);
          break;

        case "USER_OFFLINE":
          setIsOnline(false);
          break;

        default:
          break;
      }
    };

    ws.addEventListener("message", handleMessage);

    return () => ws.removeEventListener("message", handleMessage);
  }, [ws, chatUserId]);

  return isOnline;
}

// -----------------------------
// Hook for sending heartbeat PING to server
// -----------------------------
export function useHeartbeat(ws, interval = 30000) {
  useEffect(() => {
    if (!ws) return;

    const heartbeatId = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "PING" }));
        console.log("PING sent to server");
      }
    }, interval);

    // Cleanup on WebSocket close or component unmount
    const handleClose = () => clearInterval(heartbeatId);
    ws.addEventListener("close", handleClose);

    return () => {
      clearInterval(heartbeatId);
      ws.removeEventListener("close", handleClose);
    };
  }, [ws, interval]);
}

// -----------------------------
// Usage in ChatWindow
// -----------------------------
/*
const ws = new WebSocket("ws://chat.example.com");
const chatUserId = "userB";

// Track presence of current chat user
const isOnline = useCurrentChatPresence(ws, chatUserId);

// Start heartbeat to server
useHeartbeat(ws);

// In JSX
<h2>
  Chat with {chatUserId} {isOnline ? "🟢 Online" : "⚪ Offline"}
</h2>
*/
