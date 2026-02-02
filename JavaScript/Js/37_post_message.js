/* 
37_post_message.js – Interview-Ready Answer:

"The `postMessage` API in JavaScript allows safe communication between different 
windows, iframes, or web workers, even across different origins."

1️⃣ Key Points to Highlight:

1. Use Cases:
- Communicate between:
  - Window and iframe
  - Parent window and child window (popup)
  - Web Worker and main thread
- Enables cross-origin messaging safely.

2. Syntax:
- Sending a message:
  targetWindow.postMessage(message, targetOrigin, [transfer]);

- Listening for a message:
  window.addEventListener("message", event => {
    // handle event.data
  });

3. Security:
- Always specify `targetOrigin` to restrict message reception.
- Check `event.origin` when receiving messages.

2️⃣ Examples:

// Parent window sending message to iframe
const iframe = document.getElementById("myIframe");
iframe.contentWindow.postMessage({ action: "hello" }, "https://example.com");

// Iframe receiving message
window.addEventListener("message", event => {
  if (event.origin !== "https://parent.com") return; // security check
  console.log(event.data); // { action: "hello" }
});

// Using Web Worker
// worker.js
self.addEventListener("message", e => {
  console.log("Message from main thread:", e.data);
  self.postMessage({ reply: "Received" });
});

// main.js
const worker = new Worker("worker.js");
worker.postMessage({ task: "processData" });
worker.onmessage = e => console.log(e.data); // { reply: "Received" }

3️⃣ Real-Life Analogies:

- Global Analogy:
  - postMessage = sending a letter via post office; must know recipient address.
- India-specific Analogy:
  - postMessage = WhatsApp message; verify the contact before sending.
- Web Analogy:
  - Main page sending message to iframe or worker to perform tasks asynchronously.

4️⃣ Code Explanation:

- `postMessage` allows data to be sent between contexts securely.
- `targetOrigin` ensures only intended recipient receives message.
- Event listener receives `event.data` and `event.origin` for validation.
- Enables asynchronous background processing via web workers.

5️⃣ Example / Usage:

// Parent window
iframe.contentWindow.postMessage({ cmd: "fetchData" }, "https://example.com");

// Iframe
window.addEventListener("message", event => {
  if (event.origin !== "https://parent.com") return;
  if (event.data.cmd === "fetchData") {
    console.log("Fetching data...");
  }
});

// Web Worker
worker.postMessage({ number: 5 });
worker.onmessage = e => console.log("Worker replied:", e.data);

6️⃣ Follow-Up Interview Questions:

Q1: What is postMessage in JavaScript?  
A1: API to send messages safely between different windows, iframes, or workers.

Q2: Why is `targetOrigin` important?  
A2: It ensures messages are sent only to trusted recipients for security.

Q3: Can postMessage send objects?  
A3: Yes, structured clone algorithm allows sending objects, arrays, etc.

Q4: How do you secure messages?  
A4: Validate `event.origin` when receiving messages and use correct `targetOrigin`.

Q5: Difference between postMessage to iframe vs Web Worker?  
A5: iframe communication is cross-window, may involve DOM; Web Worker runs in background thread without DOM access.
*/
