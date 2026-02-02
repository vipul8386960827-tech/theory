/* 237_event_loop.js

=====================================================
JavaScript Event Loop – Interview-Ready Answer
=====================================================

Definition:
- "The event loop is a mechanism in JavaScript that allows asynchronous 
  code (like callbacks, promises, timers) to execute while keeping the 
  language single-threaded, by continuously checking the call stack and 
  task queues."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Single-Threaded Nature**  
   - JavaScript runs on a single thread.  
   - Event loop enables non-blocking async behavior.

2. **Call Stack**  
   - Keeps track of function execution.  
   - Synchronous code executes first.

3. **Task Queues**  
   - **Macro-task queue**: setTimeout, setInterval, setImmediate, I/O callbacks.  
   - **Micro-task queue**: Promises, process.nextTick (Node.js), MutationObserver.  
   - Micro-tasks run before the next macro-task.

4. **Execution Flow**  
   - While call stack is empty, event loop picks tasks from micro-task queue first, then macro-task queue.

-----------------------------------------------------
Examples:

console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- "Start" and "End" are synchronous → executed immediately.  
- Promise callbacks go to micro-task queue → executed after stack is empty.  
- setTimeout goes to macro-task queue → executed after micro-tasks.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Imagine a chef (call stack) cooking orders.  
- Orders that need waiting (async) go to a separate line (task queue).  
- Chef finishes current dish (stack), then picks orders from queue according to priority.

-----------------------------------------------------
Example / Usage:

// Async function simulation
function asyncTask() {
  console.log("Async Task Start");
  setTimeout(() => console.log("Timeout Task"), 0);
  Promise.resolve().then(() => console.log("Promise Task"));
  console.log("Async Task End");
}

asyncTask();

// Output:
// Async Task Start
// Async Task End
// Promise Task
// Timeout Task

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between micro-task and macro-task?  
A1: Micro-tasks (promises) have higher priority and run before macro-tasks (timers).

Q2: Why JavaScript is non-blocking despite single-threaded?  
A2: Event loop with task queues allows async operations without blocking main thread.

Q3: What happens if call stack is never empty?  
A3: Event loop cannot process queued tasks → async tasks get delayed.

Q4: How do promises affect event loop?  
A4: `.then()` callbacks go to micro-task queue → executed immediately after stack is empty.

Q5: Can we block event loop?  
A5: Yes, long-running synchronous code blocks it, delaying async callbacks.
*/
