/* 5_memory_keeps_growing_until_crash.js

=====================================================
Scenario: Memory Keeps Growing Until the Process Crashes
=====================================================

The Question (how the interviewer asks it):
- "In production, the memory of our Node service grows slowly and steadily. Every few hours
   the process crashes with 'heap out of memory' and restarts. How do you investigate?"

What the interviewer is checking:
- Can you tell a real memory leak from normal memory usage?
- Do you know how to take and compare heap snapshots?
- Do you know common leak sources: global caches, listeners, timers, closures.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Confirm it is a leak: graph heapUsed over time (process.memoryUsage() or APM). Normal
   memory goes up and down with GC (saw-tooth). A leak keeps growing even after GC.
2. Check which number grows: heapUsed (JS objects) vs rss/external (Buffers, native addons).
3. Reproduce: run the service locally or in staging with a load test (autocannon) on the
   suspicious endpoints, and watch heapUsed.
4. Take heap snapshots: start with `node --inspect`, open Chrome DevTools > Memory.
   Take snapshot 1, run load, take snapshot 2, run more load, take snapshot 3.
   Use the "Comparison" view to see which objects keep increasing and their "Retainers".
   (In production you can use `node --heapsnapshot-signal=SIGUSR2` or v8.writeHeapSnapshot(),
   but snapshots pause the process and are big - take them on one instance only.)
5. Look for usual causes: an unbounded in-memory cache/Map, arrays that only grow, event
   listeners added per request and never removed, setInterval never cleared, closures that
   keep big objects alive, global variables storing request data.
6. Fix: use an LRU cache with max size + TTL (lru-cache) or Redis, remove listeners
   (once / off / AbortSignal), clear timers, avoid storing per-request data globally.
7. Verify with the same load test that memory becomes flat. Keep memory alerts, and set a
   container memory limit + restart policy as a safety net (not as the fix).

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: cache that grows forever + listener added on every request
const cache = new Map();
app.get('/user/:id', async (req, res) => {
  if (!cache.has(req.params.id)) cache.set(req.params.id, await getUser(req.params.id));
  eventBus.on('user-updated', () => cache.delete(req.params.id)); // new listener EVERY call
  res.json(cache.get(req.params.id));
});

// GOOD: bounded cache, listener registered once
const { LRUCache } = require('lru-cache');
const userCache = new LRUCache({ max: 5000, ttl: 1000 * 60 * 5 }); // 5000 items, 5 min

eventBus.on('user-updated', (id) => userCache.delete(id));          // once, at startup

app.get('/user/:id', async (req, res) => {
  let user = userCache.get(req.params.id);
  if (!user) {
    user = await getUser(req.params.id);
    userCache.set(req.params.id, user);
  }
  res.json(user);
});

// Simple memory logging
setInterval(() => {
  const { heapUsed, rss } = process.memoryUsage();
  console.log(`heapUsed=${(heapUsed / 1e6).toFixed(0)}MB rss=${(rss / 1e6).toFixed(0)}MB`);
}, 30_000).unref();

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "First I confirm it is a real leak by watching heapUsed over time - if it keeps growing
   after GC, it is a leak. Then I reproduce it with a load test and take three heap
   snapshots with --inspect and Chrome DevTools, and compare them to see which objects keep
   growing and what retains them. Usual causes are unbounded caches, event listeners or
   timers that are never removed, and global arrays. I fix the code, for example with an LRU
   cache, and verify that memory stays flat under the same load."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Increase the heap size" or "PM2 restarts it anyway" as the solution.
- Calling any high memory a leak without checking if it drops after GC.
- Not knowing heap snapshots or the Comparison/Retainers view.
- Using a plain object/Map as a cache with no size limit or TTL.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between rss and heapUsed?
A1: heapUsed is memory used by JS objects in the V8 heap. rss is the total memory of the
    process (heap, code, stack, Buffers and native memory). If rss grows but heapUsed does
    not, look at Buffers or native modules.

Q2: What does the warning "MaxListenersExceededWarning" tell you?
A2: More than 10 listeners were added to one event on one emitter. Often it is a sign that
    listeners are added repeatedly (e.g. per request) and never removed - a likely leak.

Q3: How can WeakMap help?
A3: A WeakMap holds keys weakly. When the key object is no longer used anywhere else, the
    entry can be garbage collected, so metadata attached to objects does not leak.
*/
