/* 22_page_gets_slower_over_time_memory_leak.js

=====================================================
Scenario: Single-page app gets slower over time (memory leak)
=====================================================

The Question (how the interviewer asks it):
- "Users say our single-page app is fast in the morning, but after a few hours
  of use it becomes slow and sometimes the tab crashes. Refreshing fixes it.
  How do you investigate and fix this?"

What the interviewer is checking:
- Do I recognize the signs of a memory leak.
- Do I know the common leak sources in JavaScript and SPAs.
- Can I use Chrome DevTools (Memory and Performance panels) to prove it.
- Do I know cleanup patterns and WeakMap / WeakRef.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. "Refresh fixes it" is a strong sign of a memory leak: memory grows and is
   never released, so garbage collection runs more and the page gets slower.
2. I reproduce it: open DevTools > Performance monitor (JS heap size, DOM
   nodes, event listeners), then repeat one action many times, for example
   open and close a modal or switch routes 20 times.
3. I take heap snapshots in the Memory panel: one before, one after the
   repeated action (after clicking "collect garbage"). I use the
   "Comparison" view and search for "Detached" to find detached DOM nodes,
   and I read the "Retainers" to see what is holding the object.
4. I check the usual causes: event listeners on window/document that are
   never removed, setInterval that is never cleared, detached DOM nodes kept
   in variables, closures that hold big data, caches or arrays that only grow,
   and subscriptions (WebSocket, store, observers) that are not unsubscribed.
5. I fix with cleanup: removeEventListener or AbortController, clearInterval,
   unsubscribe, observer.disconnect(), and in React the useEffect cleanup.
6. For caches keyed by objects I use WeakMap, or a size-limited LRU cache.
   Then I repeat the test and confirm memory goes back down.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: every time the widget mounts, we add listeners and a timer
function mountWidgetBad(el) {
  const bigData = new Array(1_000_000).fill("x");
  window.addEventListener("resize", () => el.textContent = bigData.length);
  setInterval(() => console.log("poll"), 1000);
  // el is removed later, but the listener closure keeps el and bigData alive
}

// FIXED: one cleanup function removes everything
function mountWidget(el) {
  const controller = new AbortController();
  const onResize = () => { el.textContent = window.innerWidth; };
  window.addEventListener("resize", onResize, { signal: controller.signal });
  const timer = setInterval(() => console.log("poll"), 1000);

  return function unmount() {
    controller.abort();      // removes all listeners added with this signal
    clearInterval(timer);
  };
}

// React version
// useEffect(() => {
//   const id = setInterval(tick, 1000);
//   return () => clearInterval(id);        // cleanup on unmount
// }, []);

// Cache that does not prevent garbage collection
const metaCache = new WeakMap();           // key: DOM node or object
function getMeta(node) {
  if (!metaCache.has(node)) metaCache.set(node, { seen: Date.now() });
  return metaCache.get(node);
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "If refreshing fixes it, I suspect a memory leak. I reproduce it by
  repeating one action and watching JS heap and DOM node count in the
  Performance monitor, then compare heap snapshots to find detached nodes
  and what retains them. Common causes are listeners and intervals that are
  never removed, growing caches, and closures holding large data. I fix it
  with proper cleanup, like AbortController, clearInterval and useEffect
  cleanup, and I use WeakMap or a size limit for caches."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Saying "JavaScript has garbage collection, so leaks are impossible".
- Calling removeEventListener with a new arrow function; it must be the same
  function reference that was added.
- Guessing and changing random code instead of measuring with snapshots.
- Using a plain object or Map as a cache that only grows forever.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is a detached DOM node?
A1: A node that was removed from the document but is still referenced by
    JavaScript (a variable, array, or closure), so it cannot be collected.

Q2: Why does WeakMap help, and why can you not iterate it?
A2: WeakMap holds its keys weakly: if nothing else references the key object,
    the entry can be garbage collected. Because entries can vanish at any
    time, WeakMap has no size, keys() or forEach.

Q3: What is the difference between a memory leak and high memory usage?
A3: High usage can be normal (big data loaded once). A leak means memory keeps
    growing after repeated actions and never goes back down after GC.
*/
