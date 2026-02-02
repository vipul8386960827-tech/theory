/* 239_event_queue.js

=====================================================
JavaScript Event Queue – Interview-Ready Answer
=====================================================

Definition:
- "The event queue (or task queue) is a data structure that stores 
  asynchronous callbacks (tasks) to be executed by the event loop 
  when the call stack is empty."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Manages asynchronous execution of code.  
   - Ensures that functions like `setTimeout`, `setInterval`, or DOM events 
     are executed after current synchronous code completes.

2. **Types of Queues**  
   - **Macro-task queue**: timers (`setTimeout`, `setInterval`), I/O, `setImmediate`.  
   - **Micro-task queue**: promises, `process.nextTick` (Node.js), `MutationObserver`.  
   - Micro-tasks have higher priority than macro-tasks.

3. **Relationship with Event Loop**  
   - Event loop continuously checks the call stack.  
   - If stack is empty, it picks tasks from the queue.

-----------------------------------------------------
Examples:

console.log("Start");

setTimeout(() => console.log("Timeout Task"), 0);

Promise.resolve().then(() => console.log("Promise Task"));

console.log("End");

// Output:
// Start
// End
// Promise Task
// Timeout Task

// Explanation:
// - "Start" and "End" execute first (synchronous).  
// - Promise goes to micro-task queue → executes before macro-task.  
// - setTimeout goes to macro-task queue → executes after micro-task.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Event queue stores asynchronous tasks until call stack is free.  
- Micro-task queue is emptied before macro-task queue on each event loop iteration.  
- Ensures predictable execution order for async operations.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Event queue = waiting line at a restaurant.  
- Chef (call stack) finishes current order, then picks next customer from the queue.  
- Priority customers (micro-tasks) served first.

-----------------------------------------------------
Example / Usage:

// Micro-task example
Promise.resolve().then(() => console.log("Micro-task"));

// Macro-task example
setTimeout(() => console.log("Macro-task"), 0);

// Output order:
// Micro-task
// Macro-task

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between event queue and call stack?  
A1: Call stack handles synchronous code; event queue stores async callbacks for later execution.

Q2: Which executes first, micro-tasks or macro-tasks?  
A2: Micro-tasks execute before macro-tasks.

Q3: Can event queue be blocked?  
A3: Yes, long-running synchronous code in call stack blocks processing of queued events.

Q4: Is every asynchronous callback placed in the event queue?  
A4: Yes, for non-blocking execution, but micro-task or macro-task queue differs based on type.

Q5: How does `async/await` relate to event queue?  
A5: `await` pauses async function, queues remaining code as a micro-task to run after promise resolves.
*/
