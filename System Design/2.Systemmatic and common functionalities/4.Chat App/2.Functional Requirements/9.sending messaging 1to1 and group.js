/*
==============================
WEBSOCKET - SENDING MESSAGE
==============================

GOAL:
- Send a chat message instantly to server
- Works for both 1:1 and group conversations

--------------------------------
1️⃣ OPEN WEBSOCKET CONNECTION
--------------------------------
- Client opens a WebSocket after login:
  ws://chat.example.com
- Browser sends HttpOnly cookie automatically
- Server authenticates user from cookie

--------------------------------
2️⃣ CLIENT SENDS MESSAGE
--------------------------------
- Client emits a "SEND_MESSAGE" event:

{
  type: "SEND_MESSAGE",
  conversationId: "c1",  // 1:1 or group
  message: {
    text: "Hello!",
    timestamp: "2026-02-02T10:20:00Z"
  }
}

--------------------------------
3️⃣ SERVER RECEIVES MESSAGE
--------------------------------
- Server validates user from cookie
- Saves message in DB
- Determines recipients based on conversationId
- Prepares to emit to all relevant clients (receivers)

--------------------------------
KEY POINTS
--------------------------------
- Single WebSocket connection per client
- Sending is instant; no HTTP API needed for real-time
- Same logic applies to one-to-one and group chats
- Server uses conversationId to route message correctly

--------------------------------
INTERVIEW ONE-LINER
--------------------------------
"We send messages in real-time using a WebSocket event 'SEND_MESSAGE', including conversationId and message content. The server validates, stores, and routes the message instantly to the relevant clients."
*/
// ==============================
// CLIENT SIDE - Sending Message via WebSocket with UI Update
// ==============================

import { useState } from "react";

export function ChatInput({ conversationId, ws, messages, setMessages }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      timestamp: new Date().toISOString(),
      senderId: "me", // or get from user context
      id: `temp-${Date.now()}`, // temporary ID for optimistic UI
    };

    // 1️⃣ Update local UI immediately (optimistic)
    setMessages((prev) => [...prev, newMessage]);

    // 2️⃣ Build WebSocket payload
    const payload = {
      type: "SEND_MESSAGE",
      conversationId, // 1:1 or group chat
      message: newMessage,
    };

    // 3️⃣ Send via WebSocket
    ws.send(JSON.stringify(payload));

    // 4️⃣ Clear input
    setMessage("");
  };

  return (
    <div style={{ display: "flex" }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ flex: 1 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
