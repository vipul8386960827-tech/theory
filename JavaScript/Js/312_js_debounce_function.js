/* 312_js_debounce_function.js

=====================================================
Debounce Function in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Debounce is a technique to limit the rate at which a function 
  can fire. It ensures the function executes only after a specified 
  delay since the last invocation."

Key Points to Highlight:
- Useful for optimizing performance (e.g., resize, scroll, keyup)
- Avoids multiple rapid calls to expensive operations
- Returns a function that delays execution using setTimeout
- Can include immediate execution option (leading/trailing)

Examples:

function debounce(func, delay) {
  let timer;
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Usage example
const handleResize = () => {
  console.log('Resized:', window.innerWidth);
};

window.addEventListener('resize', debounce(handleResize, 500));

Code Explanation:
- `timer` stores timeout ID
- clearTimeout prevents previous scheduled execution
- setTimeout schedules new execution after `delay`
- `func.apply(context, args)` ensures correct `this` and arguments

Real-Life Analogy:
- Like pressing a button repeatedly but action triggers only 
  after you stop pressing for a while

Example / Usage:

const searchInput = document.querySelector('#search');
const fetchResults = (query) => console.log('Fetching:', query);

searchInput.addEventListener('input', debounce((e) => {
  fetchResults(e.target.value);
}, 300));

Follow-Up Interview Questions:
- Q1: Difference between debounce and throttle?
  A1: Debounce delays execution until inactivity; throttle limits rate at which function executes.
- Q2: Can debounce be used for API calls?
  A2: Yes, prevents sending too many requests during rapid input.
- Q3: What happens if delay is 0?
  A3: Function executes on next event loop tick.
- Q4: Can debounce be implemented with Promises?
  A4: Yes, wrapping function returning Promise works.
- Q5: Leading vs trailing debounce?
  A5: Leading executes immediately; trailing executes after delay.
*/
