/* 12_avoid_blocking_event_loop.js

=====================================================
How to Avoid Blocking the Event Loop
=====================================================

Definition (What I should say in the interview):
- "Since all requests share one JS thread, any long synchronous work blocks every user. To avoid
   that I keep request handlers light: use async I/O APIs, avoid *Sync functions in hot paths,
   be careful with huge JSON.parse/stringify and risky regexes, and move CPU-heavy work like image
   processing or big calculations to **worker_threads**, a separate service, or a job queue. For
   medium work I can also **split it into chunks** and yield with setImmediate."

-----------------------------------------------------
Common Blockers
-----------------------------------------------------
1. fs.readFileSync / execSync / crypto.pbkdf2Sync inside request handlers.
2. Big loops over large arrays, sorting huge datasets.
3. JSON.parse / JSON.stringify on very large payloads.
4. Catastrophic regex backtracking (ReDoS), e.g. /(a+)+$/ on long input.
5. Heavy synchronous template rendering or compression with zlib.*Sync.

-----------------------------------------------------
Techniques
-----------------------------------------------------
- Use async APIs (fs.promises, crypto.pbkdf2 with callback).
- Offload CPU work -> worker_threads / child_process / queue (BullMQ) + worker service.
- Partition work -> process N items, then setImmediate to let I/O run.
- Stream large data instead of loading all into memory.
- Paginate DB queries instead of fetching 1 million rows.

-----------------------------------------------------
Example (partitioning with setImmediate)
-----------------------------------------------------
function sumInChunks(arr, chunk = 10000) {
  return new Promise((resolve) => {
    let i = 0, total = 0;
    function step() {
      const end = Math.min(i + chunk, arr.length);
      for (; i < end; i++) total += arr[i];
      if (i < arr.length) setImmediate(step);   // yield to event loop
      else resolve(total);
    }
    step();
  });
}

sumInChunks(Array.from({ length: 5e6 }, (_, i) => i)).then(console.log);
setTimeout(() => console.log('timer still gets a turn'), 0);

-----------------------------------------------------
Example (worker thread)
-----------------------------------------------------
// const { Worker } = require('worker_threads');
// new Worker('./heavy.js', { workerData: n }).on('message', (r) => res.json(r));

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why setImmediate and not process.nextTick for chunking?
A1: nextTick runs before I/O, so it would not let other requests in. setImmediate yields to the poll phase.

Q2: Does clustering solve blocking?
A2: Partly - other processes still serve requests, but the blocked process still freezes its own users.

Q3: How do you find what is blocking?
A3: Measure event loop lag, then profile with --cpu-prof or clinic.js to find hot synchronous code.
*/
