/* 367_shared_worker.js

=====================================================
Shared Worker in JavaScript
=====================================================

Definition (What I should say in the interview):
- "A Shared Worker is a type of Web Worker that can be **accessed by multiple scripts, 
   even across different browser windows, tabs, or iframes**. It allows sharing data 
   or performing background tasks collaboratively without duplicating resources."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Can be **shared across multiple scripts**, tabs, or windows from the same origin.
2. Communicates with connected scripts via **MessagePort** (`port.postMessage` and `port.onmessage`).
3. Runs in a **background thread**, independent of the main UI thread.
4. Cannot access the DOM directly.
5. Lifecycle ends when all connections are closed or the browser is closed.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// sharedWorker.js
const connections = [];

onconnect = (e) => {
  const port = e.ports[0];
  connections.push(port);

  port.onmessage = (event) => {
    // Broadcast message to all connected ports
    connections.forEach(p => p.postMessage(`Received: ${event.data}`));
  };
};

// main.js (in multiple tabs)
const worker = new SharedWorker('sharedWorker.js');
worker.port.start(); // required to start message channel

worker.port.onmessage = (e) => {
  console.log('Message from worker:', e.data);
};

worker.port.postMessage('Hello Shared Worker');

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Sharing **real-time data** across multiple browser tabs (e.g., chat apps).
- Managing a **single background task** for multiple clients.
- Collaborative features like **synchronized notifications** or state.
- Avoiding duplicate workers when multiple tabs require the same task.
- Offloading computations that need **shared context**.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Shared Workers are scoped to the **same origin**.
2. Communication is asynchronous via **MessagePort**.
3. Unlike Dedicated Workers, Shared Workers can handle multiple connections.
4. Use `onconnect` event to manage incoming connections.
5. Browser support exists in most modern browsers, but check compatibility for older versions.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a Shared Worker as a **shared office assistant**:
  - Multiple tabs (scripts) can send tasks to the assistant.
  - The assistant works in the background and can respond to all tabs.
  - Helps avoid hiring multiple assistants for each tab (resource efficiency).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How does a Shared Worker differ from a Dedicated Worker?  
A1: Dedicated Worker is tied to a single script/tab; Shared Worker can be accessed by multiple scripts or tabs simultaneously.

Q2: How do scripts communicate with a Shared Worker?  
A2: Using `MessagePort` objects provided via the `onconnect` event (`port.postMessage` and `port.onmessage`).

Q3: Can a Shared Worker access the DOM?  
A3: No, it runs in a background thread and cannot access the DOM or window objects.

Q4: When does a Shared Worker's lifecycle end?  
A4: When all connected ports are closed or the browser session ends.
*/
