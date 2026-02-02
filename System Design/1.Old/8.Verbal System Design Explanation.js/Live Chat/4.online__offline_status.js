/* 
---------------------------------------------------------
USER ONLINE/OFFLINE STATUS (PRESENCE)
---------------------------------------------------------

1) Definition:
"Presence indicators show whether a user is currently online, offline, or idle.
This helps other users know if they can expect immediate responses."

2) Why it’s important:
- Improves chat UX by showing real-time availability.
- Useful for features like showing green dots, last seen timestamps, or disabling message 
  input for offline users.

---------------------------------------------------------
FRONTEND IMPLEMENTATION
---------------------------------------------------------

3) Detecting online/offline:
- "Use WebSocket or Socket.IO connection to detect presence."
- "When a user connects, the server marks them as online."
- "When a user disconnects (WebSocket closes) or becomes idle, server marks them offline."
- "The client can also use the `navigator.onLine` API to detect network status."

4) Server-side tracking:
- "Server maintains a map of userId → connection status (online/offline/idle)."
- "For multi-device users, presence is considered online if at least one device is connected."

5) Broadcasting presence:
- "Server broadcasts presence changes to all relevant clients in real-time."
- "Clients update UI indicators (green dot, last seen, etc.) when events are received."

6) Optional idle detection:
- "Detect inactivity on client side (no keyboard/mouse input) and mark user as idle."
- "Server can broadcast idle state separately."

7) Optimization tips:
- "Throttle or debounce presence updates to avoid spamming clients."
- "Use heartbeats/pings to detect sudden disconnections."
- "Aggregate updates if multiple presence changes occur in a short period."

---------------------------------------------------------
EXAMPLE INTERVIEW EXPLANATION
---------------------------------------------------------

1) Start with purpose:
"Presence indicators show if users are online, offline, or idle, improving UX."

2) Real-time flow:
- "Client connects via WebSocket."
- "Server updates user status and broadcasts changes."
- "Frontend updates UI indicators accordingly."

3) Multi-device handling:
- "A user is online if at least one device is connected.
- Offline only if all devices disconnect."

4) Optional optimizations:
- "Throttle presence updates, detect idle users, and use heartbeats for reliability."

5) Strong closing line:
"This ensures users always see accurate online/offline status in real-time,
even across multiple devices and network changes."

---------------------------------------------------------
END OF PRESENCE EXPLANATION
---------------------------------------------------------
*/
