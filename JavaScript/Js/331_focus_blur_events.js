/* 331_focus_blur_events.js

=====================================================
Focus and Blur Events in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Focus and blur events are triggered when an element gains or loses focus, 
  typically on input, textarea, or focusable elements."

Key Points to Highlight:
- focus → occurs when element becomes active (clicked or tabbed into)
- blur → occurs when element loses focus
- These events do not bubble naturally; use capture or focusin/focusout to detect on parent
- Commonly used for validation, styling, or UX feedback

Examples:

const input = document.querySelector('#myInput');

input.addEventListener('focus', () => {
  console.log('Input focused');
  input.style.borderColor = 'blue';
});

input.addEventListener('blur', () => {
  console.log('Input blurred');
  input.style.borderColor = '';
});

Code Explanation:
- Adds event listeners for focus and blur
- Changes border color as visual cue
- Logs events for debugging

Real-Life Analogy:
- Focus → putting a pen to paper (ready to write)
- Blur → lifting pen away (finished writing)

Example / Usage:

// Validate on blur
const emailInput = document.querySelector('#email');
emailInput.addEventListener('blur', () => {
  if (!emailInput.value.includes('@')) {
    console.log('Invalid email');
  }
});

Follow-Up Interview Questions:
- Q1: Do focus/blur events bubble?
  A1: No, they do not; use focusin/focusout to bubble.
- Q2: How to programmatically focus an element?
  A2: element.focus()
- Q3: How to remove focus/blur listeners?
  A3: element.removeEventListener('focus', handler) and similar for blur
- Q4: Can non-input elements receive focus?
  A4: Yes, if they have tabindex attribute.
- Q5: Difference between focus and focusin?
  A5: focusin bubbles, focus does not.
*/
