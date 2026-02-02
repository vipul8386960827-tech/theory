/*
==============================
MESSAGE STATUS (OPTIMISTIC / SENT / DELIVERED / READ) - INTERVIEW EXPLANATION
==============================

Scope:
- Applies to the currently opened chat only
- Works for both 1:1 and group chats
- Uses the existing WebSocket connection

--------------------------------
1. OPTIMISTIC UI
--------------------------------
- Immediately show the message in the chat window as soon as the user sends it
- Status is set to SENT locally (single checkmark style)
- Improves perceived responsiveness and user experience
- Server will confirm actual delivery later

--------------------------------
2. SENT STATUS
--------------------------------
- Occurs after the server acknowledges receipt of the message
- Confirms that the message has successfully reached the server
- Client updates UI if needed (can remain SENT or transition to DELIVERED)

--------------------------------
3. DELIVERED STATUS
--------------------------------
- Triggered when the recipient’s client receives the message via WebSocket
- Recipient client notifies server that message is delivered
- Server broadcasts DELIVERED event back to the sender
- Client updates UI (e.g., double grey checkmarks)
- For groups, this can be tracked per recipient

--------------------------------
4. READ STATUS
--------------------------------
- Triggered when the recipient opens the chat and views the message
- Recipient client sends MESSAGE_READ event to the server
- Server broadcasts READ status to sender
- Client updates UI (e.g., double blue checkmarks)
- In group chats, status can be shown per user to reflect who has read

--------------------------------
5. Frontend Implementation Notes
--------------------------------
- Each message in state has a `status` field: OPTIMISTIC / SENT / DELIVERED / READ
- WebSocket events of type MESSAGE_STATUS are listened to in the chat component
- When an event arrives, update the corresponding message in state
- React re-renders the UI automatically
- Optimistic UI ensures messages appear instantly even before server confirmation

--------------------------------
6. Key Advantages
--------------------------------
- Fully event-driven; no repeated API calls
- Works for 1:1 and group chats
- Provides fast, responsive UI
- Keeps message status accurate in real-time

--------------------------------
7. Interview One-Liner
--------------------------------
*"We use an optimistic approach to show messages immediately, mark them SENT once server confirms, DELIVERED when recipients receive them, and READ when recipients open the chat. All updates happen in real-time via WebSocket, ensuring the UI is always accurate without additional API calls."*
*/
/*
==============================
CHAT MESSAGE OBJECT STRUCTURE
==============================

Each message in the frontend state will have the following fields:

{
  id: string,                // Unique message ID assigned by server
  tempId?: string,            // Temporary client-side ID for optimistic UI
  conversationId: string,     // ID of the chat (1:1 or group)
  senderId: string,           // User who sent the message
  text: string,               // Message content (text)
  mediaUrl?: string,          // Optional: image/audio/video URL
  timestamp: string,          // ISO timestamp of when message was created
  status: "OPTIMISTIC" | "SENT" | "DELIVERED" | "READ", // Message status
  readBy?: string[],          // Optional array of userIds who have read (for group)
  reactions?: {               // Optional reactions per user
    [userId: string]: string  // e.g., emoji per user
  }
}

--------------------------------
Notes:
1. tempId is used for optimistic UI:
   - When user sends a message, tempId is generated locally
   - Shows message immediately with status OPTIMISTIC
   - Replaced with server-assigned id once acknowledged

2. status field flows as:
   - OPTIMISTIC → SENT → DELIVERED → READ

3. readBy array (optional):
   - Useful in group chats to track which users have read the message

4. reactions (optional):
   - Allows per-user reactions (like emoji) without changing message content

5. mediaUrl (optional):
   - For image/audio/video messages

--------------------------------
Example:

{
  id: "m123",
  tempId: "temp-abc-1",
  conversationId: "c1",
  senderId: "userA",
  text: "Hey, are you coming?",
  timestamp: "2026-02-02T09:30:00Z",
  status: "SENT",
  readBy: ["userB"],
  reactions: {
    userB: "👍"
  }
}
*/
