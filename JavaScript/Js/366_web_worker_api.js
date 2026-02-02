/* 366_web_worker_api.js

=====================================================
Web Worker API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Web Workers provide a way to run **JavaScript code in a background thread**, separate 
   from the main UI thread. This allows heavy computations or long-running tasks to execute 
   without blocking the user interface, improving performance and responsiveness of web applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Runs scripts in a **background thread**, independent of the main thread.
2. **Communicates with main thread** via `postMessage` and `onmessage` events.
3. Supports **dedicated workers** (single script) and **shared workers** (shared between multiple scripts).
4. Web Workers do **not have access to the DOM**; they can only interact with data and messages.
5. Can perform CPU-intensive tasks like computations, image processing, or data parsing.

-----------------------------------------------------
Basic Example (Dedicated Worker)
-----------------------------------------------------
// worker.js
self.onmessage = (e) => {
  const result = e.data * 2;
  self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');

worker.onmessage = (e) => {
  console.log('Result from worker:', e.data); // e.g., 20
};

worker.postMessage(10); // Send data to worker

-----------------------------------------------------
Terminating Worker
-----------------------------------------------------
// Terminate when done
worker.terminate();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Performing heavy calculations without freezing the UI.
- Processing large datasets, JSON, or files.
- Handling real-time data transformations (e.g., video or image processing).
- Background tasks in web apps, like analytics or AI processing.
- Offloading computational tasks in PWA (Progressive Web Apps).

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Workers cannot access DOM, window, or document objects.
2. Communication is **asynchronous** using messages (`postMessage`).
3. Workers have their **own global scope** (self instead of window).
4. Can import scripts inside worker using `importScripts()`.
5. Shared Workers can be accessed by multiple scripts, while Dedicated Workers are single-use.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a Web Worker as a **helper in a separate room**:
  - You send it tasks (messages) to process.
  - It works independently and sends back results.
  - Meanwhile, you (the main thread) continue handling user interactions smoothly.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can Web Workers access the DOM?  
A1: No, they run in a separate thread and cannot access DOM, window, or document objects.

Q2: How do Web Workers communicate with the main thread?  
A2: Using `postMessage` to send data and `onmessage` to receive data asynchronously.

Q3: What is the difference between Dedicated and Shared Workers?  
A3: Dedicated Workers are linked to a single script and cannot be shared. Shared Workers can be accessed by multiple scripts.

Q4: How do you terminate a Web Worker?  
A4: Using `worker.terminate()` from the main thread or `close()` from inside the worker.
*/
