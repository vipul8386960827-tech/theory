/* 333_keyboard_events.js

=====================================================
Keyboard Events in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Keyboard events are triggered when a user interacts with the keyboard, 
  such as pressing or releasing a key."

Key Points to Highlight:
- Common keyboard events:
  - keydown → triggered when key is pressed down
  - keyup → triggered when key is released
  - keypress → triggered when a key that produces a character is pressed (deprecated)
- Properties of event object:
  - event.key → value of the key pressed
  - event.code → physical key code
  - event.altKey, event.ctrlKey, event.shiftKey → modifier keys
- Useful for shortcuts, input validation, and game controls

Examples:

const input = document.querySelector('#textInput');

input.addEventListener('keydown', (e) => {
  console.log('Key down:', e.key);
});

input.addEventListener('keyup', (e) => {
  console.log('Key up:', e.key);
});

Code Explanation:
- Logs key value when key is pressed or released
- keydown triggers repeatedly if key is held
- keyup triggers once when key is released

Real-Life Analogy:
- Keydown → pressing a piano key
- Keyup → releasing the piano key

Example / Usage:

// Shortcut example
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    console.log('Save shortcut triggered');
  }
});

Follow-Up Interview Questions:
- Q1: Difference between keydown and keypress?
  A1: keydown triggers for all keys; keypress only for character keys and is deprecated.
- Q2: Can keyboard events bubble?
  A2: Yes, they bubble up to parent elements.
- Q3: How to detect modifier keys?
  A3: Use event.altKey, event.ctrlKey, event.shiftKey, event.metaKey.
- Q4: How to prevent default action?
  A4: Use event.preventDefault().
- Q5: How to detect specific physical key vs character?
  A5: event.key gives character, event.code gives physical key code.
*/
