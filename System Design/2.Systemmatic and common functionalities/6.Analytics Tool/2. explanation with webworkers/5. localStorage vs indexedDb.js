/*
---------- Why we need persistent storage for analytics ----------

When tracking user events (page views, clicks, etc.), the data is usually sent to a server.
However, in real-world scenarios:

1️⃣ Network might be down or unstable.
2️⃣ Users may close the tab before events are sent.
3️⃣ Multiple events can come in rapid succession.

If we don't persist events locally, some analytics events can be lost.
Hence, we need to **store events temporarily on the client** until they can be successfully sent.

---------- LocalStorage vs IndexedDB ----------

1) **localStorage**:
   - Simple key-value storage, synchronous API.
   - Each read/write blocks the main thread.
   - Limited storage (~5-10MB per origin).
   - Not suitable for storing large or complex data structures.
   - Bad for high-frequency events because synchronous writes can cause UI lag.

2) **IndexedDB**:
   - Asynchronous, non-blocking API.
   - Can store large amounts of structured data (objects, arrays).
   - Supports transactions and querying.
   - Ideal for queuing events and persisting them reliably.
   - Works well with web workers since operations don’t block the main thread.
*/
