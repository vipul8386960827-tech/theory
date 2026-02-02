/* 302_create_infinite_loop.js

=====================================================
Infinite Loops in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "An infinite loop is a loop that never terminates on its own, 
  running endlessly until externally stopped or the program crashes."

Key Points to Highlight:
- Can occur with while, for, or do-while loops if exit condition is never met
- Useful in servers or continuous polling, but dangerous in UI/main thread
- Can freeze browser or Node.js process if not handled carefully
- Must have explicit break conditions in real applications

Examples:

// While loop example
while(true) {
  console.log('This will run forever'); 
  // unsafe in real code
}

// For loop example
for(let i = 0; ; i++) {
  console.log(i); // runs infinitely
}

// Safer alternative: break condition
let count = 0;
while(true) {
  console.log(count);
  count++;
  if(count >= 10) break; // exit after 10 iterations
}

Code Explanation:
- Infinite loops continue because their exit condition is always true
- Can use break or return statements to stop loop safely
- Avoid in UI thread to prevent freezing

Real-Life Analogy:
- Like a clock that keeps running without stopping until battery dies

Example / Usage:

// Infinite polling with delay
function pollServer() {
  setTimeout(() => {
    console.log('Polling server...');
    pollServer(); // recursive infinite loop with delay
  }, 1000);
}
// pollServer(); // Uncomment to start infinite polling

Follow-Up Interview Questions:
- Q1: How to stop an infinite loop in browser?
  A1: Close tab, use developer tools to pause script.
- Q2: How to prevent infinite loops in Node.js?
  A2: Implement proper exit conditions or max iterations.
- Q3: Difference between synchronous and asynchronous infinite loops?
  A3: Synchronous blocks main thread; asynchronous (setTimeout/setInterval) does not.
- Q4: Can infinite loops be useful?
  A4: Yes, in servers, polling, or real-time systems with proper control.
- Q5: How to detect infinite loops in code?
  A5: Code review, linters, or monitoring execution time/performance.
*/
