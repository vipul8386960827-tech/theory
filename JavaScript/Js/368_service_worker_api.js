/* 368_service_worker_api.js

=====================================================
Service Worker API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Service Workers are **scripts that run in the background** of the browser, separate from 
   the web page, enabling features like offline support, background sync, push notifications, 
   and network request interception. They act as a programmable network proxy for web apps."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Runs in a **separate thread** from the main UI thread.
2. Operates **independently of the web page**, surviving page reloads.
3. Can **intercept network requests** using the `fetch` event to implement caching.
4. Supports **Push API** for notifications and **Background Sync API** for deferred tasks.
5. Has a lifecycle with **install, activate, and fetch** events.
6. Works with HTTPS only (except localhost during development).

-----------------------------------------------------
Basic Example (Registering a Service Worker)
-----------------------------------------------------
// main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}

// sw.js
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request)); // Basic network pass-through
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Offline-first web applications using **cache strategies**.
- Background synchronization of user data.
- Push notifications and real-time messaging.
- Intercepting and modifying network requests for optimization.
- Progressive Web Apps (PWAs) to improve reliability and performance.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Service Workers do not have direct access to the DOM.
2. They require **HTTPS** due to security concerns.
3. Lifecycle events: `install`, `activate`, and `fetch` are critical for caching strategies.
4. Can communicate with pages via **postMessage** API.
5. Browser support is extensive but may vary for advanced features like background sync or push.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a Service Worker as a **personal assistant for your web app**:
  - Works behind the scenes (background thread).
  - Handles tasks like caching files, syncing data, or sending notifications.
  - Lets the main thread focus on UI and interactions while improving app reliability.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can Service Workers access the DOM?  
A1: No, they run in a separate thread and cannot manipulate DOM elements.

Q2: How do Service Workers handle offline scenarios?  
A2: By caching assets during installation and responding to fetch events with cached resources.

Q3: What are the key lifecycle events of a Service Worker?  
A3: `install`, `activate`, and `fetch`.

Q4: Why are Service Workers restricted to HTTPS?  
A4: For security, to prevent man-in-the-middle attacks when intercepting network requests.
*/
