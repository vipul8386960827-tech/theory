/* 330_event_listener_options.js

=====================================================
Event Listener Options in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Event listener options are an object or boolean parameter 
  passed to addEventListener that control how the listener behaves."

Key Points to Highlight:
- Syntax: element.addEventListener(type, handler, options)
- Options include:
  1. capture: true → listener in capturing phase, false → bubbling phase (default false)
  2. once: true → listener invoked at most once, then removed
  3. passive: true → indicates listener will not call preventDefault(), improves scrolling performance
- Previously, a boolean parameter was used for capture only

Examples:

const btn = document.querySelector('#myBtn');

function clickHandler(e) {
  console.log('Button clicked');
}

// Capturing phase
btn.addEventListener('click', clickHandler, { capture: true });

// Execute once
btn.addEventListener('click', clickHandler, { once: true });

// Passive listener
btn.addEventListener('scroll', (e) => {
  console.log('Scrolling');
}, { passive: true });

Code Explanation:
- Options provide fine control over when and how events are handled
- capture affects event flow; once auto-removes listener; passive improves performance

Real-Life Analogy:
- Like setting rules for a security guard: monitor before others (capture), only act once (once), or cannot block action (passive).

Example / Usage:

window.addEventListener('scroll', (e) => {
  console.log('Page scrolled');
}, { passive: true });

Follow-Up Interview Questions:
- Q1: What happens if capture is true?
  A1: Listener executes during capturing phase before reaching target.
- Q2: Difference between capture and bubbling?
  A2: Capturing goes top-down; bubbling goes bottom-up.
- Q3: Can you combine options?
  A3: Yes, e.g., { capture: true, once: true, passive: true }
- Q4: Why use passive listeners?
  A4: Improve scrolling performance by signaling that preventDefault() won’t be called.
- Q5: Can you remove a listener added with options?
  A5: Yes, must provide same type, handler, and capture option.
*/
