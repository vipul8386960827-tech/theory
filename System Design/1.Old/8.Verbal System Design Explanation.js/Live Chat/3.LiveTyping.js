/* 
---------------------------------------------------------
FRONTEND IMPLEMENTATION: DETECTING TYPING (UPDATED)
---------------------------------------------------------

1) Basic idea:
"We detect typing by listening to input events on the message box."

2) Common approach:
- "Attach an 'onChange' or 'onInput' handler to the text input (or textarea)."
- "When the user types, start a short debounce timer (e.g., 300–500ms)."
- "Send a 'typing' event to the server only after the debounce triggers,
to avoid sending events on every keystroke."

3) Stop typing detection:
- "If the user stops typing (no input for 2–3 seconds), send a 'stop typing' event to the server."
- "Alternatively, the server can auto-clear typing status after a timeout."

4) Example logic in React:
- onChange → update input state.
- start/reset debounce timer → send 'typing' event.
- timer expires → send 'stop typing' if no new input.

5) Multiple users typing:
- "Maintain a list of active typers per conversation."
- "Server broadcasts typing events for each user."
- "Frontend updates the indicator: 
  - show all users typing (e.g., 'Alice and Bob are typing…'), 
  - or rotate through users to avoid a long list."
- "Remove users from the list when 'stop typing' events arrive or timeout expires."

6) Optimization tips:
- Throttle or debounce typing events to reduce network traffic.
- Do not send events if the user presses only modifier keys (Shift/Ctrl).
- Optional: aggregate typing indicators per conversation for group chats.

7) How to explain in interview:
- "We detect typing on the frontend by listening to input changes,
debouncing events, and sending 'typing'/'stop typing' signals to the server.
- Server pushes updates to other clients, which maintain a list of active typers.
- Frontend displays either all users typing or rotates through them,
providing real-time feedback without overwhelming the UI."

---------------------------------------------------------
END OF FRONTEND TYPING DETECTION EXPLANATION
---------------------------------------------------------
*/
