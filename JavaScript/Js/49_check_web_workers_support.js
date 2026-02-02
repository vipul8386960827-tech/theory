/* 
49_check_web_workers_support.js – Interview-Ready Answer

"In JavaScript, Web Workers allow running scripts in background threads. 
Before using them, it's important to check if the browser supports them."

1️⃣ Key Points to Highlight

1. Feature Detection:
- Not all browsers may support Web Workers, especially older ones.
- Use typeof Worker !== "undefined" to check support.
- Ensures your code doesn’t throw errors in unsupported environments.

2. Examples

- Basic check
if (typeof Worker !== "undefined") {
    console.log("Web Workers are supported");
} else {
    console.log("Web Workers are not supported");
}

- Function check
function isWebWorkerSupported() {
    return typeof Worker !== "undefined";
}

console.log(isWebWorkerSupported()); // true or false

3️⃣ Real-Life Analogies

- Global Analogy: Checking Web Worker support = checking if a helper is available to perform tasks in the background.
- India-specific Analogy: Web Worker = hiring an assistant to handle chores while you focus on main tasks; check if assistant is available.
- Web Analogy: Before spawning a background thread for data processing, verify that the browser can run it.

4️⃣ Code Explanation

- typeof Worker ensures the browser environment has Web Worker API.
- Prevents runtime errors in unsupported browsers.
- Can be used in progressive enhancement scenarios.

5️⃣ Example / Usage

if (isWebWorkerSupported()) {
    const worker = new Worker("worker.js");
    worker.postMessage("Hello Worker");
    worker.onmessage = (e) => console.log("Message from worker:", e.data);
} else {
    console.log("Web Workers not supported. Fallback to main thread.");
}

6️⃣ Follow-Up Interview Questions

Q1: Why check for Web Worker support?  
A1: To avoid runtime errors in browsers that don’t support it.

Q2: Can older browsers run Web Workers?  
A2: No, older browsers may not support the Worker API.

Q3: How do you safely handle unsupported browsers?  
A3: Use feature detection and provide fallback logic in main thread.

Q4: Are Web Workers synchronous or asynchronous?  
A4: Asynchronous; they run in background threads.

Q5: Can Web Workers access DOM directly?  
A5: No, they cannot manipulate DOM directly; must communicate via messages.
*/
