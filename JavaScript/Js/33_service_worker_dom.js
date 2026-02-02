/* 
33_service_worker_dom.js – Interview-Ready Answer:

"Service Workers run in a separate thread and do not have direct access to the DOM. 
They are designed to handle network requests, caching, push notifications, and background sync, 
but cannot manipulate page elements directly."

1️⃣ Key Points to Highlight:

1. No DOM Access:
- Service Workers cannot use `document`, `window`, or any DOM API.
- Designed this way for security and performance reasons.

2. Communication with Pages:
- Can communicate with web pages using:
  - `postMessage` API
  - `MessageChannel`
- Web pages can send messages to the Service Worker, which can respond back.

3. Typical Tasks of Service Worker:
- Intercept network requests (`fetch`) and serve cached or network resources.
- Cache assets for offline use.
- Handle push notifications (`push` event).
- Perform background sync (`sync` event).

4. Examples:

// sw.js – Service Worker script
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Communicating with the page
// Page script
navigator.serviceWorker.controller.postMessage("Hello SW");

// Service Worker receives message
self.addEventListener('message', event => {
  console.log("Message from page:", event.data);
  // Cannot update DOM directly
});

// Service Worker responds
event.source.postMessage("Hello from SW");

5️⃣ Real-Life Analogies:

- Global Analogy:
  - Service Worker = back-office staff; cannot go into the shop (DOM) but can manage inventory (cache) and communicate via messages.
- India-specific Analogy:
  - Service Worker = a delivery person who prepares orders in the warehouse and communicates status without entering the kitchen (DOM).
- Web Analogy:
  - Service Worker = background script that handles caching, offline logic, and push notifications but cannot modify UI directly.

6️⃣ Code Explanation:

- Service Worker runs in a separate context from the page.
- Cannot access DOM methods like `document.getElementById`.
- Communication with the page is done via `postMessage`.
- Useful for offline support, caching, and background tasks without blocking the main thread.

7️⃣ Example / Usage:

// Sending message from page to SW
navigator.serviceWorker.controller.postMessage({ type: "SYNC_DATA" });

// Receiving message in SW
self.addEventListener('message', event => {
  if (event.data.type === "SYNC_DATA") {
    // perform background sync
  }
});

// Sending message back to page
event.source.postMessage({ status: "SYNC_COMPLETE" });

8️⃣ Follow-Up Interview Questions:

Q1: Can a Service Worker manipulate DOM elements?  
A1: No, it cannot access the DOM; communication must be done via messages.

Q2: Why can't Service Workers access the DOM?  
A2: For security and isolation; they run in a separate thread.

Q3: How do Service Workers communicate with the page?  
A3: Using `postMessage` or `MessageChannel`.

Q4: What tasks are suitable for Service Workers?  
A4: Caching, offline support, push notifications, background sync.

Q5: Can multiple pages communicate with the same Service Worker?  
A5: Yes, Service Worker can handle multiple clients via `clients` API.
*/
