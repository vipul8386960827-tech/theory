/*
==============================
USER PRESENCE FLOW (ONLINE → IDLE → OFFLINE)
==============================

GOAL:
- Track real-time presence of users
- Show green dot / last seen accurately
- Detect idle vs offline

--------------------------------
1️⃣ USER ONLINE
--------------------------------
- When user logs in and opens the app:
  - WebSocket connection established
  - Server marks user as ONLINE
  - Green dot visible to other users

--------------------------------
2️⃣ USER IDLE
--------------------------------
- User is still connected (WebSocket alive)
- No activity detected (mouse, keyboard, touch) for X seconds
- Server can optionally mark as IDLE internally
- Client may show subtle idle indicator
- Green dot may remain, depending on app design
- Presence status can include `lastActiveAt` timestamp

--------------------------------
3️⃣ USER OFFLINE
--------------------------------
Detected when:
- WebSocket connection closes (browser/tab closed)
- Network disconnects
- Heartbeat timeout (no ping received within interval)

Server actions:
- Mark user OFFLINE
- Update `lastSeen` timestamp
- Emit `USER_OFFLINE` event to relevant users

Client actions:
- Remove green dot or show "last seen at <timestamp>"

--------------------------------
4️⃣ HEARTBEAT / PING MECHANISM
--------------------------------
- Client sends periodic ping (e.g., every 30 seconds) via WebSocket
- Server updates last active timestamp
- If ping not received within timeout → user considered offline

--------------------------------
INTERVIEW ONE-LINER
--------------------------------
"User presence is tracked via a single WebSocket. Online is when the connection is open, idle is when no activity is detected, and offline is detected via WebSocket close or heartbeat timeout. The server updates lastSeen and broadcasts USER_OFFLINE events to relevant clients."
*/
// ==============================
// CLIENT-SIDE: Online / Offline for current chat
// ==============================

import { useEffect, useState } from "react";

export function useCurrentChatPresence(ws, chatUserId) {
  // chatUserId = the user in the currently opened chat
  const [isOnline, setIsOnline] = useState(false); // default offline

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);

      // Only track the user in the current chat
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

    // Cleanup
    return () => ws.removeEventListener("message", handleMessage);
  }, [ws, chatUserId]);

  return isOnline;
}

// -----------------------------
// Usage in ChatWindow
// -----------------------------
/*
const ws = new WebSocket("ws://chat.example.com");
const chatUserId = "userB"; // person you opened chat with
const isOnline = useCurrentChatPresence(ws, chatUserId);

<div>
  <h2>
    Chat with {chatUserId} {isOnline ? "🟢 Online" : "⚪ Offline"}
  </h2>
  <ChatMessages conversationId="c1" />
</div>
*/
