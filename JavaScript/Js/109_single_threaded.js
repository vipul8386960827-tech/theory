/* 
109_single_threaded.js – Interview-Ready Answer

"In JavaScript, single-threaded means that it has a single call stack 
and executes one piece of code at a time. Asynchronous operations are handled 
via the event loop, not multiple threads."

1️⃣ Key Points to Highlight

1. Definition:
- JavaScript has a single thread of execution.
- Only one operation runs at a time on the main thread.
- Asynchronous tasks (like setTimeout, fetch) are handled via the event loop.

2. Syntax Example

console.log("Start");

setTimeout(() => {
    console.log("Timeout executed"); // Runs later asynchronously
}, 1000);

console.log("End");

// Output order:
// Start
// End
// Timeout executed

3. Real-Life Analogies

- Global Analogy: single-threaded = one cashier serving one customer at a time.
- India-specific Analogy: single-threaded = only one auto-rickshaw driver available; other passengers wait.
- Web Analogy: JS processes one line of code at a time; asynchronous tasks are queued.

4. Code Explanation

- Even though JS is single-threaded, non-blocking asynchronous operations allow 
  handling multiple tasks without freezing UI.
- The event loop checks the task queue and executes callbacks after main thread is free.

5. Example / Usage

console.log("Task 1");

setTimeout(() => {
    console.log("Task 2 (async)");
}, 0);

console.log("Task 3");

// Output order: Task 1, Task 3, Task 2

6️⃣ Follow-Up Interview Questions

Q1: How does JS handle multiple async tasks if it’s single-threaded?  
A1: Through the event loop and callback queue.

Q2: What is the call stack?  
A2: Stack where currently executing functions are stored.

Q3: Can single-threaded JS block the UI?  
A3: Yes, long synchronous code can block the main thread.

Q4: Difference between single-threaded and multi-threaded languages?  
A4: Multi-threaded can execute multiple instructions simultaneously; JS executes one at a time.

Q5: How do Web Workers relate to single-threaded JS?  
A5: Web Workers allow running code in separate threads without blocking main thread.
*/
