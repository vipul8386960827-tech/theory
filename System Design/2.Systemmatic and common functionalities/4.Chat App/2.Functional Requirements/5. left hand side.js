/*
==============================
CHAT LIST (LEFT SIDEBAR) FLOW
WITH REAL-TIME (WEBSOCKET)
==============================

GOAL:
- Show list of users + groups the authenticated user has chatted with
- Show REAL-TIME updates:
  - New messages
  - Online / offline (green dot)
  - Unread count changes
  - Chat reordering (move to top)

--------------------------------
AFTER AUTHENTICATION
--------------------------------
- User is already logged in
- Session token exists in HttpOnly cookie
- Browser automatically sends cookie with:
  - API requests
  - WebSocket handshake

--------------------------------
STEP 1: INITIAL CHAT LIST (HTTP)
--------------------------------
- Client calls a dedicated API:
  GET /api/conversations

WHY HTTP FIRST?
- Initial snapshot of data
- Fast page load
- No need to wait for WebSocket events

WHAT THIS API RETURNS (SUMMARY ONLY):
[
  {
    conversationId: "c1",
    type: "one-to-one",
    name: "Rahul",
    avatarUrl: "/dp/rahul.png",
    lastMessage: "Hey, are you coming?",
    lastMessageTime: "2026-02-02T09:30:00Z",
    unreadCount: 2
  }
]

NOTE:
- NO real-time logic here
- Just initial state

--------------------------------
STEP 2: OPEN WEBSOCKET CONNECTION
--------------------------------
- Immediately after login (or app load)
- Client opens WebSocket:

  ws://chat.example.com

- Cookie is automatically sent
- Server authenticates user from cookie

SERVER ACTIONS:
- Marks user as ONLINE
- Stores presence in Redis
- Starts listening for events related to this user

--------------------------------
STEP 3: PRESENCE (ONLINE / OFFLINE)
--------------------------------
- Presence is NOT fetched via API repeatedly
- Presence is pushed via WebSocket events

SERVER → CLIENT EVENTS:

{
  type: "USER_ONLINE",
  userId: "u2"
}

{
  type: "USER_OFFLINE",
  userId: "u2",
  lastSeen: "2026-02-02T10:15:00Z"
}

CLIENT ACTION:
- Update green dot instantly
- No API re-fetch needed

--------------------------------
STEP 4: NEW MESSAGE REAL-TIME UPDATE
--------------------------------
WHEN SOMEONE SENDS A MESSAGE:
- Server saves message in DB
- Server emits WebSocket event to receiver

EVENT:
{
  type: "NEW_MESSAGE",
  conversationId: "c1",
  message: {
    text: "On my way",
    timestamp: "2026-02-02T10:20:00Z"
  }
}

CLIENT ACTION:
- Update lastMessage text
- Update lastMessageTime
- Increase unreadCount (if chat not open)
- Move conversation to TOP of sidebar

--------------------------------
IMPORTANT:
--------------------------------
- We DO NOT re-call GET /api/conversations
- WebSocket keeps sidebar in sync
- This is why WhatsApp feels instant

--------------------------------
STEP 5: USER CLICKS A CHAT
--------------------------------
- Client calls:
  GET /api/messages?conversationId=c1

WHY STILL HTTP?
- Message history can be large
- Supports pagination / infinite scroll
- WebSocket is only for real-time changes

--------------------------------
STEP 6: REAL-TIME WHILE CHAT IS OPEN
--------------------------------
- Incoming message via WebSocket:
  - Append to message list
  - unreadCount stays 0
- Typing indicator via WebSocket:
  - typing_start / typing_stop

--------------------------------
STEP 7: UNREAD COUNT LOGIC
--------------------------------
SERVER:
- Stores lastReadMessageId per user per conversation

CLIENT:
- When chat opens:
  - Sends "MESSAGE_READ" event via WebSocket

SERVER:
- Updates lastReadMessageId
- Emits unreadCount update to sidebar

--------------------------------
STEP 8: USER GOES OFFLINE
--------------------------------
WHEN DOES THIS HAPPEN?
- App closed
- Browser tab closed
- Network disconnect
- Heartbeat timeout

SERVER:
- Marks user OFFLINE in Redis
- Emits USER_OFFLINE event to relevant users

CLIENT:
- Green dot disappears
- Shows "last seen"

--------------------------------
WHY WEBSOCKET IS REQUIRED
--------------------------------
- Presence changes frequently
- Messages arrive unpredictably
- HTTP polling is expensive and slow
- WebSocket enables server PUSH

--------------------------------
INTERVIEW ONE-LINER
--------------------------------
"We load the sidebar initially via an HTTP conversations API, then keep it fully in sync using WebSocket events for presence, new messages, unread counts, and reordering—similar to WhatsApp’s real-time architecture."
*/
