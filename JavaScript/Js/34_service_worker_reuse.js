/* 
34_service_worker_reuse.js – Interview-Ready Answer:

"Service Workers are designed to be reusable and persistent in the background. 
They are installed once per scope and can handle multiple pages or tabs of the same origin."

1️⃣ Key Points to Highlight:

1. Single Worker per Scope:
- Only one active Service Worker per scope (usually per origin or folder path).
- Handles multiple pages under that scope.

2. Persistence:
- Service Worker stays alive in the background even after the page is closed, 
  though the browser may terminate it when idle and restart it on events.

3. Reusability:
- Can serve cached resources to multiple pages.
- Can intercept fetch requests from different tabs simultaneously.
- Can maintain shared state (e.g., cache, IndexedDB) across pages.

4. Lifecycle Events:
- `install`: runs once when SW is installed.
- `activate`: runs once when SW is activated.
- `fetch`: triggered whenever pages under scope make network requests.
- `message`: handles messages from any page.

5️⃣ Examples:

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log("SW registered", reg))
    .catch(err => console.error(err));
}

// sw.js – reusable caching
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => cache.addAll(['/index.html', '/style.css']))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Communicate with multiple clients
self.addEventListener('message', event => {
  event.source.postMessage({ status: "Received by SW" });
});

6️⃣ Real-Life Analogies:

- Global Analogy:
  - Service Worker = a receptionist who manages requests for all offices in a building.
- India-specific Analogy:
  - Service Worker = a single post office that handles multiple houses in a colony efficiently.
- Web Analogy:
  - Service Worker = background script that serves multiple tabs or windows, reusing cached resources.

7️⃣ Code Explanation:

- A single Service Worker instance can serve multiple pages.
- Persistent cache allows resource reuse across pages.
- Messages from different clients can be handled individually.
- Browser may terminate inactive SW but will restart on events like fetch or message.

8️⃣ Example / Usage:

// Page 1
navigator.serviceWorker.controller.postMessage({ msg: "Hello from page1" });

// Page 2
navigator.serviceWorker.controller.postMessage({ msg: "Hello from page2" });

// SW responds to both
self.addEventListener('message', event => {
  console.log("Message from client:", event.data.msg);
  event.source.postMessage({ reply: "SW received your message" });
});

9️⃣ Follow-Up Interview Questions:

Q1: Can a Service Worker serve multiple tabs?  
A1: Yes, one SW per scope can handle multiple pages/tabs under that scope.

Q2: How does a Service Worker persist across pages?  
A2: It stays in the background, intercepting fetch and message events.

Q3: Can you reuse cached resources for multiple pages?  
A3: Yes, caches are shared across all pages under the SW scope.

Q4: Will the Service Worker always stay alive?  
A4: No, the browser may terminate it when idle and restart it on events.

Q5: How do multiple pages communicate with the same SW?  
A5: Via `postMessage` API; SW can respond using `event.source.postMessage`.
*/
