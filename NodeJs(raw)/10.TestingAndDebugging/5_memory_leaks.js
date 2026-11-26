/* 5_memory_leaks.js

=====================================================
Memory Leaks in Node.js
=====================================================

Definition (What I should say in the interview):
- "A memory leak in Node is when objects that are no longer needed are still **referenced**
   somewhere, so the garbage collector can't free them, and memory keeps growing until the
   process slows down or crashes with 'JavaScript heap out of memory'. Because a Node server is
   long-running, even a small leak per request adds up. The usual causes are unbounded global
   caches, timers that are never cleared, event listeners that are never removed, and closures
   holding on to large objects."

-----------------------------------------------------
Common Causes
-----------------------------------------------------
1. Global caches / maps without size limit or TTL.
2. setInterval / setTimeout never cleared (callback keeps its scope alive).
3. Event listeners added per request and never removed (emitter.on without off).
4. Closures capturing large objects that outlive their need.
5. Accidental globals (assigning to undeclared variable in sloppy mode).

-----------------------------------------------------
Example (leak and fix)
-----------------------------------------------------
// LEAK: cache grows forever
const cache = {};
app.get('/user/:id', async (req, res) => {
  cache[req.params.id] = await getUser(req.params.id);   // never evicted
  res.json(cache[req.params.id]);
});
// FIX: use an LRU cache with max size / TTL (e.g. lru-cache package), or Redis.

// LEAK: listener added on every request
app.get('/stream', (req, res) => {
  const onData = (d) => res.write(d);
  bus.on('data', onData);
  req.on('close', () => bus.off('data', onData));        // FIX: remove on close
});

// LEAK: interval never cleared
const id = setInterval(() => poll(bigConfig), 1000);
// FIX: clearInterval(id) when done / on shutdown

-----------------------------------------------------
How I detect it
-----------------------------------------------------
- Watch heapUsed over time (process.memoryUsage(), APM dashboards) -> keeps climbing, never drops.
- "MaxListenersExceededWarning" -> hint of a listener leak.
- Take heap snapshots at intervals and compare them (see 16_heap_snapshots.js).
- Reproduce with load (autocannon) locally while watching memory.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- High memory is not always a leak: V8 grows the heap lazily. A leak means it keeps growing
  even after GC under steady load.
- Increasing --max-old-space-size only delays the crash; it doesn't fix the leak.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How can WeakMap help?
A1: WeakMap keys are held weakly, so if the key object is no longer referenced elsewhere the
    entry can be garbage collected - good for attaching metadata to objects.

Q2: Have you fixed a leak?
A2: Example answer: memory grew steadily in an API; comparing two heap snapshots showed a
    growing Map used as a cache; replaced it with an LRU cache with max entries and TTL.
*/
