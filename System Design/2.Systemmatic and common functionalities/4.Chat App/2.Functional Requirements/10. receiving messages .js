/*
==============================
WEBSOCKET - RECEIVING MESSAGES (Sidebar Update)
==============================

SCENARIO:
- User is in conversation A (chat window open)
- Another user sends a message in conversation B
- Sidebar must reflect:
  - Last message text
  - Updated timestamp
  - Incremented unread count
  - Optional: move conversation B to top

--------------------------------
1️⃣ SERVER EMITS NEW_MESSAGE
--------------------------------
Server sends a WebSocket event:

{
  type: "NEW_MESSAGE",
  conversationId: "B",       // conversation where message was sent
  message: {
    id: "m102",
    senderId: "userB",
    text: "Hey, are you free?",
    timestamp: "2026-02-02T11:00:00Z"
  }
}

--------------------------------
2️⃣ CLIENT RECEIVES EVENT
--------------------------------
- Check if `conversationId` matches currently open chat:
  - If yes → append to chat window
  - If no  → update sidebar

--------------------------------
3️⃣ UPDATE LEFT SIDEBAR (CONVERSATIONS)
--------------------------------
- Find the conversation in sidebar array (state)
- Update:
  - `lastMessage` = message.text
  - `lastMessageTime` = message.timestamp
  - `unreadCount` += 1
- Move conversation to top if needed (optional, like WhatsApp)

Example update in React:
setConversations(prev =>
  prev
    .map(conv =>
      conv.conversationId === message.conversationId
        ? { ...conv, lastMessage: message.text, lastMessageTime: message.timestamp, unreadCount: conv.unreadCount + 1 }
        : conv
    )
    .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
);

--------------------------------
KEY POINTS
--------------------------------
- No need to re-call `/api/conversations`
- Sidebar state is **live updated** via WebSocket events
- Works for both 1:1 and group chats
- Ensures instant feedback for new messages while chatting elsewhere

--------------------------------
INTERVIEW ONE-LINER
--------------------------------
"When a new message arrives for a conversation other than the currently open chat, the client updates the left sidebar in real-time: last message, timestamp, unread count, and optionally reorders conversations, all using the WebSocket event without re-fetching the API."
*/
