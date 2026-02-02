/* 301_cursor_wait.js

=====================================================
Cursor Wait in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Changing the cursor to a 'wait' state indicates to the user that a process 
  is ongoing and they should wait before interacting further."

Key Points to Highlight:
- Achieved using CSS `cursor: wait;`
- Commonly used during data fetching, heavy computations, or loading states
- Can be applied to specific elements or globally via `document.body`
- Improves user experience by providing visual feedback

Examples:

// Apply wait cursor to body
document.body.style.cursor = 'wait';

// Simulate a process
setTimeout(() => {
  document.body.style.cursor = 'default'; // revert to normal
  console.log('Process completed');
}, 2000);

// Apply to a button
const btn = document.querySelector('#myButton');
btn.style.cursor = 'wait';

Code Explanation:
- `cursor` CSS property controls mouse pointer appearance
- `wait` indicates that user input may be temporarily ignored
- Revert to `default` after process completion

Real-Life Analogy:
- Like a loading spinner; informs user that system is busy

Example / Usage:

const loader = document.querySelector('#loader');
loader.addEventListener('click', () => {
  loader.style.cursor = 'wait';
  setTimeout(() => {
    loader.style.cursor = 'default';
    console.log('Loading finished');
  }, 1500);
});

Follow-Up Interview Questions:
- Q1: Can we set wait cursor only for a section?
  A1: Yes, apply style to a specific element instead of body.
- Q2: Does cursor wait block JS execution?
  A2: No, it only changes appearance; execution continues.
- Q3: Other common cursor types?
  A3: pointer, default, text, crosshair, progress, not-allowed.
- Q4: Can we animate cursor changes?
  A4: Not directly; can combine with CSS animations for effects.
- Q5: Why is cursor feedback important?
  A5: Improves UX by signaling ongoing processes to users.
*/
