/* 
50_example_web_worker.js – Interview-Ready Answer

"This example demonstrates how to create and use a simple Web Worker 
in JavaScript to run tasks in a background thread."

1️⃣ Key Points to Highlight

1. Web Worker Basics:
- Runs in a separate thread from the main JavaScript execution.
- Cannot access DOM directly.
- Communicates with main thread via postMessage and onmessage events.
- Useful for heavy computations to avoid blocking UI.

2. Steps to Create and Use a Worker:

- Create a worker script (worker.js)
- Instantiate Worker in main script
- Send messages from main thread to worker
- Worker processes and sends messages back
- Listen for messages in main thread

3️⃣ Examples

- worker.js (background thread)
const workerCode = `
self.onmessage = function(e) {
    const result = e.data * 2; // simple computation
    self.postMessage(result);
};
`;

// main.js (main thread)
const blob = new Blob([workerCode], { type: "application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

worker.onmessage = function(e) {
    console.log("Result from worker:", e.data); // prints doubled value
};

worker.postMessage(10); // sends 10 to worker

4️⃣ Real-Life Analogies

- Global Analogy: Worker = assistant doing calculation while you continue other work.
- India-specific Analogy: Worker = helper making tea while you focus on cooking main dish.
- Web Analogy: Heavy computation (e.g., sorting large array) done in worker; UI stays responsive.

5️⃣ Code Explanation

- Blob used to create worker inline without separate file.
- postMessage sends data to worker.
- onmessage receives data back from worker.
- Worker runs independently, main thread remains non-blocking.

6️⃣ Example / Usage

const workerCode = `
self.onmessage = function(e) {
    const result = e.data * 2;
    self.postMessage(result);
};
`;

const blob = new Blob([workerCode], { type: "application/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

worker.onmessage = function(e) {
    console.log("Result from worker:", e.data); // expected output: 20
};

worker.postMessage(10); // send value to worker

7️⃣ Follow-Up Interview Questions

Q1: Can Web Workers access the DOM?  
A1: No, they run in separate threads and cannot manipulate DOM directly.

Q2: How do workers communicate with the main thread?  
A2: Using postMessage and onmessage events.

Q3: Can you create a worker without a separate file?  
A3: Yes, using Blob and URL.createObjectURL.

Q4: Are Web Workers synchronous or asynchronous?  
A4: Asynchronous; they run in background threads.

Q5: When should you use Web Workers?  
A5: For heavy computations, data processing, or tasks that would block the main thread.
*/
