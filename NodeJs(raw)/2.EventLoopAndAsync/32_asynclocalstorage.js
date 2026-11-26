/* 32_asynclocalstorage.js

=====================================================
AsyncLocalStorage
=====================================================

Definition (What I should say in the interview):
- "AsyncLocalStorage, from the async_hooks module, lets me store data that is **available
   throughout an async call chain** without passing it as a parameter everywhere. It is like
   thread-local storage, but for async contexts. The common use is a **request ID** or user info:
   I call als.run(store, callback) in a middleware, and anywhere deeper - services, DB layer,
   logger - I can call als.getStore() and get the data for the current request, even across
   awaits, timers and callbacks."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. const { AsyncLocalStorage } = require('async_hooks');  (stable since Node 16)
2. als.run(store, fn) -> store is visible inside fn and all async work it starts.
3. als.getStore() -> current store, or undefined outside any run().
4. Each concurrent request gets its own isolated store - no mixing.
5. Preferred over the low-level async_hooks createHook API.

-----------------------------------------------------
Example (request ID in logs)
-----------------------------------------------------
const http = require('http');
const { AsyncLocalStorage } = require('async_hooks');
const { randomUUID } = require('crypto');

const als = new AsyncLocalStorage();

function log(msg) {
  const store = als.getStore();
  console.log(`[${store ? store.requestId : '-'}] ${msg}`);
}

async function getUserFromDb() {
  await new Promise((r) => setTimeout(r, 50));
  log('db query finished');                 // still knows the request id
  return { name: 'Neha' };
}

http.createServer((req, res) => {
  als.run({ requestId: randomUUID() }, async () => {
    log(`incoming ${req.url}`);
    const user = await getUserFromDb();
    res.end(JSON.stringify(user));
  });
}).listen(3000);

// [3f2a...] incoming /
// [3f2a...] db query finished

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Context can be lost with some libraries that use custom callback queues or connection pools;
  AsyncResource.bind() can fix that.
- Do not store huge objects - it lives as long as the async chain.
- In Express, wrap next() inside als.run(...) in an early middleware.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not use a global variable for the request ID?
A1: Many requests run concurrently on one thread; a global would be overwritten by other requests.

Q2: Where is it used in real tools?
A2: Logging (pino/winston request context), APM tracing like OpenTelemetry, transaction context in ORMs.

Q3: Performance impact?
A3: Small in modern Node versions, acceptable for most apps, but not totally free.
*/
