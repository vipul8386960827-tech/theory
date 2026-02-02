/*
==============================
OPEN CHAT - BAREBONES FLOW
==============================

GOAL:
- Show historical messages when user opens a chat
- No real-time updates yet
- Simple display of server data

--------------------------------
STEP 1: USER CLICKS A CHAT
--------------------------------
- Client sets activeConversationId = clicked conversation
- Optionally clear unread badge locally
- No server call yet

--------------------------------
STEP 2: FETCH MESSAGE HISTORY (HTTP)
--------------------------------
- Client calls:
  GET /api/messages?conversationId=XYZ&limit=20
- Purpose:
  - Load previous messages from the server
  - Support pagination in future if needed

Example response:
[
  { messageId: "m1", senderId: "userA", text: "Hi", timestamp: "2026-02-02T09:20:00Z" },
  { messageId: "m2", senderId: "userB", text: "Hello!", timestamp: "2026-02-02T09:21:00Z" }
]

--------------------------------
STEP 3: RENDER MESSAGES
--------------------------------
- Client renders messages in chat window
  - Text
  - Timestamp
  - Sender info
- Scrolls to bottom so latest messages are visible
- Chat is now ready for user interaction

--------------------------------
STEP 4: SUMMARY
--------------------------------
- Only HTTP is used
- No WebSocket or real-time logic
- Basic chat window displays historical messages from the server
*/
let currentController = null;

async function fetchMessages(conversationId) {
  // Abort previous request
  if (currentController) {
    currentController.abort();
  }

  // Create new controller
  currentController = new AbortController();

  try {
    const res = await fetch(`/api/messages?conversationId=${conversationId}`, {
      signal: currentController.signal,
    });
    const data = await res.json();

    // render messages
    renderMessages(data);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Previous fetch aborted");
    } else {
      console.error(err);
    }
  }
}
