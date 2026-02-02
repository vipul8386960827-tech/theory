/* 
32_service_worker.js – Interview-Ready Answer:

"A Service Worker is a background script in JavaScript that runs separately from the web page, 
allowing features like offline support, caching, background sync, and push notifications."

1️⃣ Key Points to Highlight:

1. Nature:
- Runs in a separate thread, independent of web page.
- Does not have access to DOM directly.
- Communicates with pages via the `postMessage` API.

2. Lifecycle:
- Installation: triggered when registering the service worker.
- Activation: happens after installation, usually used to clean old caches.
- Fetch: intercepts network requests to serve cached or network responses.

3. Advantages:
- Offline support by caching assets.
- Faster load times using cached resources.
- Background tasks like push notifications.
- Enables Progressive Web Apps (PWAs).

2️⃣ Examples:

// Registering a Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Service Worker Registered:', reg))
    .catch(err => console.error('Service Worker Registration Failed:', err));
}

// sw.js – Service Worker script
const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Service Worker = personal assistant who fetches resources and manages tasks in background.
- India-specific Analogy:
  - Service Worker = a helper who prepares groceries and keeps them ready even when you’re away.
- Web Analogy:
  - Service Worker = background worker that caches files, serves them offline, and handles push notifications.

4️⃣ Code Explanation:

- Registering the service worker tells the browser to install and manage the script.
- `install` event caches assets.
- `fetch` event intercepts network requests and serves cached assets if available.
- Enhances user experience and reduces network dependency.

5️⃣ Example / Usage:

// Registering in main JS
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js – caching assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => cache.addAll(['/index.html', '/app.js']))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

6️⃣ Follow-Up Interview Questions:

Q1: What is a Service Worker?  
A1: A background script that runs independently from the web page for offline caching, background tasks, and push notifications.

Q2: Can a Service Worker access the DOM?  
A2: No, it cannot directly access the DOM.

Q3: How do Service Workers improve performance?  
A3: By caching resources and serving them from cache, reducing network requests.

Q4: What events are available in a Service Worker?  
A4: `install`, `activate`, `fetch`, `message`, `push`, and `sync`.

Q5: Can Service Workers work without HTTPS?  
A5: No, Service Workers require secure contexts (HTTPS) for security reasons.
*/
