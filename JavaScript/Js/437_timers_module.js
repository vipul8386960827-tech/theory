/* 437_timers_module.js

=====================================================
Timers Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `timers` module in Node.js provides functions to **schedule the execution of code** 
   after a delay or at repeated intervals. It includes methods for one-time delays, 
   periodic execution, and immediate callbacks, allowing asynchronous operations 
   to be managed efficiently."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **setTimeout(callback, delay, ...args)** → Executes `callback` once after `delay` milliseconds.
2. **setInterval(callback, delay, ...args)** → Executes `callback` repeatedly every `delay` milliseconds.
3. **setImmediate(callback, ...args)** → Executes `callback` immediately after the current poll phase.
4. **clearTimeout(timeoutId)** → Cancels a timeout set by `setTimeout`.
5. **clearInterval(intervalId)** → Cancels an interval set by `setInterval`.
6. **clearImmediate(immediateId)** → Cancels a scheduled immediate callback.
7. Provides **efficient scheduling** of asynchronous tasks in the event loop.
8. Works seamlessly with Node.js **Event Loop** phases.

-----------------------------------------------------
Basic Example (setTimeout)
-----------------------------------------------------
setTimeout(() => {
  console.log('Executed after 2 seconds');
}, 2000);

-----------------------------------------------------
Example (setInterval & clearInterval)
-----------------------------------------------------
let count = 0;
const intervalId = setInterval(() => {
  console.log('Count:', ++count);
  if (count === 5) clearInterval(intervalId);
}, 1000);

-----------------------------------------------------
Example (setImmediate)
-----------------------------------------------------
setImmediate(() => {
  console.log('Executed immediately after current poll phase');
});

console.log('This runs before setImmediate callback');

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Scheduling delayed tasks like notifications, reminders, or timeouts.
- Periodic polling of resources or updates (setInterval).
- Immediate execution after I/O operations or current event loop phase (setImmediate).
- Managing timers in asynchronous operations and event-driven code.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `setTimeout` and `setInterval` have **minimum delay limitations** due to event loop throttling.
2. `setImmediate` executes before `setTimeout(..., 0)` in most cases because it runs after I/O events.
3. Always clear intervals/timeouts when not needed to prevent memory leaks.
4. Timers are executed in the **timers phase** of Node.js event loop.
5. Using timers properly improves **non-blocking code performance**.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of timers as a **kitchen timer or alarm clock**:
  - You can set a one-time reminder (`setTimeout`), a repeating alarm (`setInterval`), 
    or a "do this next" task immediately (`setImmediate`).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between `setImmediate` and `setTimeout(..., 0)`?  
A1: `setImmediate` executes after the current poll phase of event loop, usually before `setTimeout(..., 0)`.

Q2: How do you stop a running interval or timeout?  
A2: Use `clearInterval(intervalId)` or `clearTimeout(timeoutId)`.

Q3: Which event loop phase do timers run in?  
A3: The **timers phase**.

Q4: Can timers affect event loop performance?  
A4: Excessive timers or heavy callbacks can block the event loop, reducing responsiveness.

Q5: When would you use `setImmediate` over `setTimeout`?  
A5: When you want to execute a callback immediately after I/O operations, without waiting for a minimum timeout delay.
*/
