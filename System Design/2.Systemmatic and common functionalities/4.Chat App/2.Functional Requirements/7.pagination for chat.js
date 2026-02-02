/*
==============================
OPEN CHAT - BAREBONES FLOW WITH INFINITE SCROLL
==============================

GOAL:
- Show historical messages when user opens a chat
- Implement infinite scroll to fetch older messages
- No real-time updates yet (WebSocket handled separately later)
- Messages fetched via server actions

--------------------------------
STEP 1: USER CLICKS A CHAT
--------------------------------
- Client sets activeConversationId = clicked conversation
- Optionally clear unread badge locally
- No server call yet

--------------------------------
STEP 2: FETCH INITIAL MESSAGE BATCH (SERVER ACTION)
--------------------------------
- Client calls server action to fetch messages:
  fetchMessages({ conversationId, limit: 20 })
- Server returns:
  - messages: latest N messages
  - nextCursor: ID or timestamp of the oldest message fetched
- Smart terms used:
  - **limit**: number of messages per batch
  - **cursor**: pointer to fetch the next older batch
  - **server-side pagination**: server decides how many messages to send

Example response:
{
  messages: [
    { messageId: "m1", senderId: "userA", text: "Hi", timestamp: "2026-02-02T09:20:00Z" },
    { messageId: "m2", senderId: "userB", text: "Hello!", timestamp: "2026-02-02T09:21:00Z" }
  ],
  nextCursor: "m1"
}

--------------------------------
STEP 3: RENDER MESSAGES
--------------------------------
- Client renders messages in chat window
  - Text
  - Timestamp
  - Sender info
- Scroll to bottom so latest messages are visible
- Messages are stored locally in state

--------------------------------
STEP 4: INFINITE SCROLL FOR OLDER MESSAGES
--------------------------------
- Attach scroll listener to chat container
- When user scrolls to top:
  1. Check if nextCursor exists
  2. Call server action:
     fetchMessages({ conversationId, limit: 20, cursor: nextCursor })
  3. Prepend returned messages to existing message list
  4. Update nextCursor for the next batch
- Smart terms used:
  - **prepend**: add older messages to the top of the message list
  - **infinite scroll / lazy loading**: fetch older messages incrementally as user scrolls
  - **cursor-based pagination** ensures correct ordering even if new messages arrive

--------------------------------
STEP 5: SUMMARY
--------------------------------
- Initial batch fetched via server action
- Older messages fetched incrementally using **cursor** and **limit**
- Client handles scroll detection and prepends messages
- Server enforces pagination boundaries
- No WebSocket or real-time logic included yet
*/

// ==============================
// CLIENT SIDE - ChatWindow with Infinite Scroll
// ==============================

import { useState, useEffect, useRef } from "react";

// Assume fetchMessages is a server action / API call imported here
import { fetchMessages } from "@/app/actions/fetchMessages";

export function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [cursor, setCursor] = useState(null); // for pagination
  const chatContainerRef = useRef(null);
  const controllerRef = useRef(null); // for aborting previous fetch

  // -----------------------------
  // STEP 1: Load initial messages
  // -----------------------------
  useEffect(() => {
    async function loadInitialMessages() {
      // Abort any previous fetch
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const { messages: fetched, nextCursor } = await fetchMessages({
          conversationId,
          limit: 20,
          cursor: null, // initial load
        });
        setMessages(fetched.reverse()); // oldest at top
        setCursor(nextCursor);
        scrollToBottom();
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }

    loadInitialMessages();
  }, [conversationId]);

  // -----------------------------
  // STEP 2: Infinite scroll for older messages
  // -----------------------------
  async function handleScroll() {
    const container = chatContainerRef.current;
    if (!container || container.scrollTop > 10 || !cursor) return;

    // Abort previous fetch if any
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const { messages: older, nextCursor: newCursor } = await fetchMessages({
        conversationId,
        limit: 20,
        cursor,
      });
      setMessages((prev) => [...older.reverse(), ...prev]); // prepend older messages
      setCursor(newCursor);
    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    }
  }

  // -----------------------------
  // Utility: scroll to bottom
  // -----------------------------
  function scrollToBottom() {
    const container = chatContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }

  return (
    <div
      ref={chatContainerRef}
      onScroll={handleScroll}
      style={{ height: "500px", overflowY: "scroll" }}
    >
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.senderId}</strong>: {msg.text}{" "}
          <small>{msg.timestamp}</small>
        </div>
      ))}
    </div>
  );
}
