/* 329_remove_event_listener.js

=====================================================
removeEventListener in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "removeEventListener is a method used to remove an event handler 
  previously attached with addEventListener, stopping the function from being called on the event."

Key Points to Highlight:
- Syntax: element.removeEventListener(eventType, handler, options)
- Must provide the same:
  - eventType
  - handler function reference
  - options (like capture) if used during addEventListener
- Cannot remove anonymous functions
- Useful for cleanup to prevent memory leaks or unwanted behavior

Examples:

const btn = document.querySelector('#myBtn');

function handleClick(event) {
  console.log('Button clicked!');
}

// Add event listener
btn.addEventListener('click', handleClick);

// Remove event listener
btn.removeEventListener('click', handleClick);

// Attempting to remove anonymous function won't work
btn.addEventListener('click', () => console.log('Hi'));
btn.removeEventListener('click', () => console.log('Hi')); // Doesn't remove

Code Explanation:
- removeEventListener stops the specified handler from executing
- Handler must be the exact function reference used in addEventListener

Real-Life Analogy:
- Like unassigning a guard from a door; after removal, they no longer respond.

Example / Usage:

const inputBox = document.querySelector('#inputBox');

function logKey(e) {
  console.log('Key pressed:', e.key);
}

inputBox.addEventListener('keyup', logKey);

// Later, stop logging keys
inputBox.removeEventListener('keyup', logKey);

Follow-Up Interview Questions:
- Q1: Can you remove an event listener added with inline HTML?
  A1: No, inline handlers cannot be removed with removeEventListener.
- Q2: Can you remove a listener if it was added with once: true?
  A2: Already removed automatically after first call; no action needed.
- Q3: What happens if function reference is different?
  A3: removeEventListener will not remove it; function references must match.
- Q4: Difference between onclick and addEventListener removal?
  A4: onclick can be removed by setting element.onclick = null.
- Q5: Why removeEventListener is important in SPA?
  A5: Prevent memory leaks and duplicate event executions when components unmount.
*/
