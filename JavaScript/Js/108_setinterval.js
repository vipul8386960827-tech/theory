/* 
108_setinterval.js – Interview-Ready Answer

"In JavaScript, `setInterval()` is a browser (or Node.js) function that 
executes a callback function repeatedly at specified intervals in milliseconds."

1️⃣ Key Points to Highlight

1. Definition:
- setInterval(callback, delay, ...args)
- Executes callback every `delay` milliseconds until stopped.
- Returns an interval ID that can be used with clearInterval().

2. Syntax Example

// Basic usage
setInterval(() => {
    console.log("This runs every 2 seconds");
}, 2000);

// With arguments
function greet(name) {
    console.log("Hello " + name);
}
setInterval(greet, 1500, "Alice"); // Hello Alice every 1.5 seconds

// Stopping interval
let id = setInterval(() => console.log("Won't run"), 3000);
clearInterval(id); // stops interval

3. Real-Life Analogies

- Global Analogy: setInterval = setting a recurring alarm every hour.
- India-specific Analogy: setInterval = scheduling a daily train reminder at fixed times.
- Web Analogy: Used for auto-sliders, live clocks, repeated API polling.

4. Code Explanation

- Asynchronous: callback executes repeatedly after each interval.
- Delay is minimum time; actual execution depends on event loop and other tasks.
- Must use clearInterval() to stop execution when no longer needed.

5. Example / Usage

console.log("Start");

const intervalId = setInterval(() => {
    console.log("Repeated log every 2 seconds");
}, 2000);

setTimeout(() => {
    clearInterval(intervalId); // stop after 7 seconds
    console.log("Interval cleared");
}, 7000);

// Output:
// Start
// "Repeated log every 2 seconds" (3 times)
// "Interval cleared"

6️⃣ Follow-Up Interview Questions

Q1: Difference between setInterval and setTimeout?  
A1: setTimeout = executes once after delay; setInterval = executes repeatedly.

Q2: Does setInterval guarantee exact timing?  
A2: No, actual execution can be delayed due to call stack or event loop.

Q3: How to stop setInterval?  
A3: Use clearInterval(intervalId).

Q4: Can setInterval access outer variables?  
A4: Yes, closures allow it to access outer scope variables.

Q5: Alternative to setInterval for repeated tasks?  
A5: Recursive setTimeout calls can be used for better control over timing.
*/
