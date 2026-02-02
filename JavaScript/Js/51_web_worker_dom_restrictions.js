/* 
51_web_worker_dom_restrictions.js – Interview-Ready Answer

"Web Workers run in a separate thread and have restrictions on accessing 
the main thread resources, especially the DOM."

1️⃣ Key Points to Highlight

1. DOM Restrictions:
- Web Workers cannot directly access:
  - document
  - window
  - parent
  - DOM elements
- They cannot manipulate HTML, CSS, or UI directly.

2. Allowed Operations:
- Can perform:
  - Computations
  - Network requests (fetch, XMLHttpRequest)
  - Timers (setTimeout, setInterval)
  - IndexedDB access
- Communicate with main thread using postMessage/onmessage.

3. Examples

// Worker script (worker.js)
self.onmessage = function(e) {
    // Cannot do: document.getElementById("demo")
    // Allowed:
    const doubled = e.data * 2;
    self.postMessage(doubled);
};

// Main thread
const workerCode = `
self.onmessage = function(e) {
    const doubled = e.data * 2;
    self.postMessage(doubled);
};
`;

const blob = new Blob([workerCode], { type: "application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

worker.onmessage = function(e) {
    console.log("Result from worker:", e.data); // prints 20 if input 10
};

worker.postMessage(10);

4️⃣ Real-Life Analogies

- Global Analogy: Worker = lab technician who can process chemicals but cannot enter office area.
- India-specific Analogy: Worker = street vendor cooking food, cannot rearrange your kitchen at home.
- Web Analogy: Worker can compute large array operations, fetch data, but UI updates must be done in main thread.

5️⃣ Code Explanation

- Worker operates independently; no DOM access.
- Data processed in worker is sent back via messages.
- Main thread receives messages and updates DOM/UI accordingly.
- Ensures heavy computations do not block UI rendering.

6️⃣ Example / Usage

/*
const workerCode = `
self.onmessage = function(e) {
    const result = e.data * 2;
    self.postMessage(result);
};
`;

const blob = new Blob([workerCode], { type: "application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

worker.onmessage = function(e) {
    document.getElementById("output").textContent = e.data; // DOM updated in main thread
};

worker.postMessage(15);


7️⃣ Follow-Up Interview Questions

Q1: Can Web Workers modify DOM directly?  
A1: No, they must send data to main thread for DOM updates.

Q2: Can Web Workers use window or document objects?  
A2: No, these objects are not available inside workers.

Q3: What kind of tasks are suitable for workers?  
A3: Heavy computations, data processing, network calls, offline calculations.

Q4: How do workers communicate with the main thread?  
A4: Using postMessage/onmessage.

Q5: Can a worker access localStorage directly?  
A5: No, localStorage is synchronous and tied to main thread; use IndexedDB instead for storage in worker.
*/
