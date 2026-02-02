/* 
107_settimeout.js – Interview-Ready Answer

"In JavaScript, `setTimeout()` is a browser (or Node.js) function that 
executes a callback function once after a specified delay (in milliseconds)."

1️⃣ Key Points to Highlight

1. Definition:
- setTimeout(callback, delay, ...args)
- Executes the callback after the delay.
- Returns a timeout ID which can be used to cancel execution via clearTimeout().

2. Syntax Example

// Simple usage
setTimeout(() => {
    console.log("Executed after 2 seconds");
}, 2000);

// With arguments
function greet(name) {
    console.log("Hello " + name);
}
setTimeout(greet, 1500, "Alice"); // Hello Alice after 1.5 seconds

// Canceling timeout
let id = setTimeout(() => console.log("This won't run"), 3000);
clearTimeout(id);

3. Real-Life Analogies

- Global Analogy: setTimeout = setting an alarm to ring after X minutes.
- India-specific Analogy: setTimeout = scheduling a reminder for a meeting.
- Web Analogy: delaying pop-ups, animations, or API calls.

4. Code Explanation

- Asynchronous: callback executes after delay, main thread continues execution.
- Delay is minimum time; actual execution depends on event loop and other tasks.
- Useful for deferred actions or scheduling tasks.

5. Example / Usage

console.log("Start");
setTimeout(() => {
    console.log("Delayed log after 2 seconds");
}, 2000);
console.log("End");
// Output order: Start, End, Delayed log after 2 seconds

// Using timeout ID
const timerId = setTimeout(() => console.log("Will not run"), 5000);
clearTimeout(timerId); // cancel execution

6️⃣ Follow-Up Interview Questions

Q1: Is setTimeout synchronous or asynchronous?  
A1: Asynchronous, executed after the current call stack is clear.

Q2: Can setTimeout execute immediately with 0ms?  
A2: Yes, but still asynchronous; added to event loop queue.

Q3: Difference between setTimeout and setInterval?  
A3: setTimeout = executes once; setInterval = executes repeatedly at intervals.

Q4: What is the return value of setTimeout?  
A4: Timeout ID, used to cancel with clearTimeout().

Q5: Can setTimeout access variables from outer scope?  
A5: Yes, it forms a closure capturing outer variables.
*/
