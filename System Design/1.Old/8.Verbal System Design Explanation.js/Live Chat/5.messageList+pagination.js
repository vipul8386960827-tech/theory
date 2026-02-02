/* 
---------------------------------------------------------
MESSAGE LIST + PAGINATION
---------------------------------------------------------

1) Problem:
"In a chat app, new messages are appended at the bottom.
Users may want to scroll up to view older messages,
so we need a way to fetch and display older messages efficiently."

2) Basic approach:
- "We don’t load all messages at once to avoid heavy UI and network load."
- "Use pagination: fetch messages in chunks (pages) from the server."

3) Typical pagination flow:
- "Server API: `/messages?conversationId=123&beforeMessageId=xyz&limit=20`"
- "Frontend requests the first page (latest 20 messages)."
- "Messages are displayed from oldest at top → newest at bottom."
- "When user scrolls up near the top, fetch the previous page (older messages)."

4) Key implementation points:
- "Keep track of the earliest message ID in the loaded list."
- "Use this ID in `beforeMessageId` parameter for next fetch."
- "Prepend older messages to the existing list instead of appending."
- "Maintain scroll position so the UI doesn’t jump when older messages load."

5) Optimizations:
- "Use virtualization (react-window / react-virtualized) for large message lists to keep performance smooth."
- "Batch loads to reduce number of network calls."
- "Cache loaded messages locally for faster access when scrolling back."

6) Interview explanation flow:
- Start with the problem: new messages at bottom, need to scroll up.
- Introduce pagination: fetch older messages in chunks.
- Explain request logic: use `beforeMessageId` or timestamp.
- Mention frontend prepending and scroll position maintenance.
- Optional: talk about virtualization and caching for performance.

7) Strong closing line:
"This approach ensures the chat remains performant,
supports infinite scroll for older messages,
and provides a smooth user experience even with thousands of messages."

---------------------------------------------------------
END OF MESSAGE LIST + PAGINATION EXPLANATION
---------------------------------------------------------
*/
