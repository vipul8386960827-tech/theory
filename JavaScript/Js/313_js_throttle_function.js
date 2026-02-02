/* 313_js_throttle_function.js

=====================================================
Throttle Function in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Throttle ensures a function executes at most once in a 
  specified time interval, limiting the rate of function calls."

Key Points to Highlight:
- Useful for high-frequency events (scroll, resize, mousemove)
- Executes function immediately, then ignores subsequent calls 
  until the interval passes
- Different from debounce (debounce waits for inactivity)
- Implemented using timestamps or setTimeout

Examples:

// Using timestamps
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Usage example
const handleScroll = () => console.log('Scroll event!');
window.addEventListener('scroll', throttle(handleScroll, 1000));

Code Explanation:
- `lastRan` tracks last execution timestamp
- `lastFunc` schedules delayed execution if function called too soon
- Ensures function runs at most once per `limit` interval

Real-Life Analogy:
- Like a security guard checking a gate: allows one person per interval, ignores others until interval passes

Example / Usage:

const button = document.querySelector('#btn');
button.addEventListener('click', throttle(() => {
  console.log('Button clicked!');
}, 2000));

Follow-Up Interview Questions:
- Q1: Difference between throttle and debounce?
  A1: Throttle limits execution to once per interval; debounce delays execution until no new calls.
- Q2: Can throttle be combined with debounce?
  A2: Yes, for precise control in some cases.
- Q3: Which events benefit more from throttle?
  A3: High-frequency events like scroll, resize, mousemove.
- Q4: Can you implement throttle with requestAnimationFrame?
  A4: Yes, for visual updates aligned with frame rate.
- Q5: What happens if interval is 0?
  A5: Function executes immediately on every call (no throttling effect).
*/
