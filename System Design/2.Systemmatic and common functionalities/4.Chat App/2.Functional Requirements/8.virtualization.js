/*
==============================
INFINITE SCROLL + VIRTUALIZATION - INTERVIEW TALKING POINTS
==============================

1️⃣ Initial Load:
- When a user opens a chat, we fetch the latest N messages from the server using a 
  paginated server action.
- No cursor is sent for the first load, so we get the most recent messages.

2️⃣ Infinite Scroll for Older Messages:
- As the user scrolls to the top of the chat window, we detect this with a scroll listener.
- If there is a cursor (pointer to the oldest loaded message), we call the same server action 
  with the cursor to fetch the next batch of older messages.
- These older messages are prepended to the existing message list.
- This approach avoids loading all messages at once and keeps the initial load fast.

3️⃣ Cursor-Based Pagination:
- We use a cursor (message ID or timestamp) instead of offset-based pagination.
- Server returns messages before the cursor plus a new cursor for the next batch.
- This ensures correct ordering even if new messages arrive while fetching older ones.

4️⃣ Limit / Batch Size:
- Each fetch returns a fixed number of messages (limit), e.g., 20.
- Controls network usage and ensures fast API response.

5️⃣ Virtualization for Optimization:
- If a chat contains thousands of messages, rendering all of them in the DOM would make the
  UI slow and laggy.
- We use virtualization (e.g., react-window) to render only the messages visible on screen plus a small buffer.
- Messages that scroll out of view are removed from the DOM, while still stored in state.
- This drastically reduces memory usage and keeps the chat performant.

6️⃣ Combined Approach:
- Infinite scroll ensures we load older messages incrementally.
- Virtualization ensures we render only visible messages.
- Together, this makes large chats **efficient both in network and UI performance**.

7️⃣ Smart Terms to Use:
- Cursor, limit, prepend, infinite scroll / lazy loading, virtualization, batch size, server-side pagination.

✅ Interview One-Liner:
"We implement infinite scroll using cursor-based server-side pagination to fetch older messages as the user scrolls up. To handle very long chats efficiently, we combine this with virtualization so only visible messages are rendered, keeping the UI smooth and memory usage low."
*/

// ==============================
// CLIENT SIDE - ChatWindow with Infinite Scroll + Virtualization
// ==============================

import { useState, useEffect, useRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window"; // virtualization library
import { fetchMessages } from "@/app/actions/fetchMessages";

export function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [cursor, setCursor] = useState(null); // for pagination
  const [containerHeight, setContainerHeight] = useState(500); // example height
  const listRef = useRef(null);
  const controllerRef = useRef(null); // for aborting previous fetch

  // -----------------------------
  // STEP 1: Load initial messages
  // -----------------------------
  useEffect(() => {
    async function loadInitialMessages() {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const { messages: fetched, nextCursor } = await fetchMessages({
          conversationId,
          limit: 20,
          cursor: null,
        });
        setMessages(fetched.reverse()); // oldest at top
        setCursor(nextCursor);

        // scroll to bottom after initial load
        setTimeout(() => {
          if (listRef.current) listRef.current.scrollToItem(fetched.length - 1);
        }, 0);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }

    loadInitialMessages();
  }, [conversationId]);

  // -----------------------------
  // STEP 2: Infinite scroll for older messages
  // -----------------------------
  const handleScroll = useCallback(
    async ({ scrollOffset }) => {
      if (scrollOffset > 10 || !cursor) return; // top reached only
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const { messages: older, nextCursor: newCursor } = await fetchMessages({
          conversationId,
          limit: 20,
          cursor,
        });
        setMessages((prev) => [...older.reverse(), ...prev]); // prepend
        setCursor(newCursor);

        // Maintain scroll position after prepending
        if (listRef.current) {
          listRef.current.scrollTo(scrollOffset + older.length * 50); // 50 = itemSize
        }
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    },
    [conversationId, cursor],
  );

  // -----------------------------
  // Render each message (virtualized)
  // -----------------------------
  const Row = ({ index, style }) => {
    const msg = messages[index];
    return (
      <div style={style} key={msg.id}>
        <strong>{msg.senderId}</strong>: {msg.text}{" "}
        <small>{msg.timestamp}</small>
      </div>
    );
  };

  return (
    <List
      height={containerHeight}
      width="100%"
      itemCount={messages.length}
      itemSize={50} // fixed height per message, adjust if needed
      ref={listRef}
      onScroll={handleScroll}
    >
      {Row}
    </List>
  );
}
