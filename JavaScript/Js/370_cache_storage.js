/* 370_cache_storage.js

=====================================================
Cache Storage API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The Cache Storage API allows web applications, particularly Progressive Web Apps (PWAs), 
   to **store and retrieve network requests and responses** programmatically. It works with 
   Service Workers to enable offline access, faster load times, and efficient resource caching."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides **persistent storage** for Request/Response objects.
2. Works seamlessly with **Service Workers** to intercept network requests.
3. Supports **multiple named caches** for organizing resources.
4. Enables **offline-first strategies**, serving cached content when offline.
5. Allows **adding, matching, and deleting** resources programmatically.

-----------------------------------------------------
Basic Example (Creating and Using Cache)
-----------------------------------------------------
// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/style.css',
        '/script.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve cached response if available, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Offline-first web applications.
- Reducing **network requests** for frequently used assets.
- Improving **load performance** and reliability.
- Storing API responses for **offline or slow network scenarios**.
- Implementing versioned caching strategies for assets.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Cache Storage works only in **secure contexts (HTTPS)** or localhost.
2. Caches are **persistent but not infinite**; browsers may evict under storage pressure.
3. Each cache is **keyed by name**; you can have multiple versions for updates.
4. Resources must be explicitly **added to the cache**; they are not cached automatically.
5. Use `caches.match()`, `caches.open()`, `cache.add()`, `cache.put()`, and `cache.delete()` APIs.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Cache Storage as a **personal pantry**:
  - You store frequently used items (network responses) in the pantry (cache).
  - When you need them, you grab them directly instead of going to the market (network).
  - You can organize the pantry into sections (named caches) and update or remove items as needed.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between Cache Storage and localStorage?  
A1: Cache Storage stores Request/Response objects and works with Service Workers for offline strategies, while localStorage stores string key-value pairs synchronously.

Q2: Can cached responses become outdated?  
A2: Yes, developers should implement cache versioning or strategies to update resources.

Q3: How do you retrieve a cached response?  
A3: Using `caches.match(request)` which returns a Promise resolving to the cached Response.

Q4: Is Cache Storage synchronous or asynchronous?  
A4: Cache Storage is **asynchronous** and uses Promises for all operations.
*/
