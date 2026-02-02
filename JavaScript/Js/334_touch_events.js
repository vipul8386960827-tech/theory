/* 334_touch_events.js

=====================================================
Touch Events in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Touch events are triggered by user interactions on touch-enabled devices, 
  such as tapping, swiping, or pinching the screen."

Key Points to Highlight:
- Common touch events:
  - touchstart → when finger touches the screen
  - touchmove → when finger moves across the screen
  - touchend → when finger is lifted
  - touchcancel → when system cancels the touch (e.g., alert)
- Event object properties:
  - touches → list of all current touch points
  - targetTouches → touches on the specific element
  - changedTouches → touches that changed in current event
- Useful for mobile interactions, gestures, and custom controls

Examples:

const box = document.querySelector('#touchBox');

box.addEventListener('touchstart', (e) => {
  console.log('Touch started', e.touches.length);
});

box.addEventListener('touchmove', (e) => {
  console.log('Touch moved');
  e.preventDefault(); // prevent scrolling if needed
});

box.addEventListener('touchend', () => {
  console.log('Touch ended');
});

Code Explanation:
- touchstart logs number of fingers touching
- touchmove can track finger movement
- touchend indicates finger lift
- preventDefault used to prevent scrolling or zoom

Real-Life Analogy:
- Touchstart → putting finger on touchscreen
- Touchmove → sliding finger across screen
- Touchend → lifting finger from screen

Example / Usage:

// Detect swipe left/right
let startX = 0;
box.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
box.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) console.log('Swipe Right');
  else if (startX - endX > 50) console.log('Swipe Left');
});

Follow-Up Interview Questions:
- Q1: Difference between touches, targetTouches, and changedTouches?
  A1: touches = all touches, targetTouches = touches on element, changedTouches = touches changed in current event.
- Q2: Can touch events trigger mouse events?
  A2: Yes, touch events can simulate mouse events after delay (300ms historically).
- Q3: How to prevent default scrolling?
  A3: Call e.preventDefault() inside touchmove or touchstart.
- Q4: Are touch events supported on desktop?
  A4: No, but pointer events may unify input handling.
- Q5: How to detect multi-touch gestures?
  A5: Use touches array to track multiple touch points.
*/
