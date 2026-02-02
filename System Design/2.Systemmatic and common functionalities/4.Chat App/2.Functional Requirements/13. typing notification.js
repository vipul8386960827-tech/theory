/*
==============================
USER TYPING INDICATOR (FRONTEND)
==============================

1. Idea:
- When a user starts typing, we want to notify the other participant(s) in real-time.
- The other clients then show a "typing..." indicator in the chat window.

2. Mechanism:
- Use the same WebSocket connection.
- Client emits a "TYPING_START" event when typing begins.
- Client emits a "TYPING_STOP" event when typing stops (after a timeout or when input is cleared).

3. Frontend Implementation:
- Use a debounced approach to avoid sending too many events.
- Track typing state in local state for the current chat.

4. Example Snippet (Frontend Only):
*/

import { useState, useEffect } from "react";

export function useTypingIndicator(ws, chatUserId) {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.userId !== chatUserId) return;

      switch (data.type) {
        case "TYPING_START":
          setIsTyping(true);
          break;
        case "TYPING_STOP":
          setIsTyping(false);
          break;
        default:
          break;
      }
    };

    ws.addEventListener("message", handleMessage);

    return () => ws.removeEventListener("message", handleMessage);
  }, [ws, chatUserId]);

  // Function to emit typing events
  const notifyTyping = (typing) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: typing ? "TYPING_START" : "TYPING_STOP",
        userId: chatUserId // optional depending on your server structure
      }));
    }
  };

  return { isTyping, notifyTyping };
}

/*
5. Usage:
- Call `notifyTyping(true)` when input changes (start typing)
- Call `notifyTyping(false)` when input is empty or after a short debounce timeout
- Show "User is typing..." in the UI based on `isTyping` state

6. Key Points:
- Real-time via existing WebSocket (no extra connections)
- Use debounce to reduce network traffic
- Works for both 1:1 and group chats (send to relevant users)
- No API calls required; event-driven
*/
