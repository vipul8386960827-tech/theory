/* 25_heavy_loop_freezes_ui.js

=====================================================
Scenario: A heavy calculation freezes the page
=====================================================

The Question (how the interviewer asks it):
- "When the user clicks 'Generate report', we process 500,000 rows in the
  browser. For about 5 seconds the page freezes: buttons do not respond, the
  spinner does not even spin. Why, and how do you fix it?"

What the interviewer is checking:
- Do I understand that JavaScript runs on a single main thread.
- Do I understand the event loop: rendering and clicks wait for the current
  task to finish.
- Do I know the fixes: chunking, yielding, Web Workers, or moving work to the
  server.
- Do I know why making the function async does NOT fix it.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I explain the cause: the loop runs on the main thread as one long task.
   While it runs, the browser cannot paint, run click handlers, or animate.
   Anything over 50 ms is a "long task" and the user feels it.
2. I measure with the DevTools Performance panel to confirm which function is
   the long task, and check if the algorithm itself can be faster (for
   example an O(n^2) nested find that can become O(n) with a Map).
3. Option A, chunking: split the work into small pieces (for example 5,000
   rows) and yield back to the browser between them with setTimeout or
   scheduler.yield() (Chromium only for now, so I use a fallback).
4. Option B, Web Worker: move the calculation to a background thread. The
   main thread stays free, and the worker posts the result back with
   postMessage. This is best for truly CPU-heavy work.
5. Option C: if the data comes from the server anyway, do the aggregation on
   the server or paginate, and send only the result.
6. I show progress to the user and allow cancel (a flag or AbortController).

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: one long task, the UI is frozen until it ends
function buildReport(rows) {
  let total = 0;
  for (const r of rows) total += expensiveCalc(r);
  return total;
}

// FIXED A: chunking, yield to the browser between chunks
const yieldToMain = () =>
  globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0));

async function buildReportChunked(rows, onProgress) {
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    total += expensiveCalc(rows[i]);
    if (i % 5000 === 0) {
      onProgress(i / rows.length);
      await yieldToMain();              // browser can paint and handle clicks
    }
  }
  return total;
}

// FIXED B: Web Worker (report-worker.js runs on another thread)
// report-worker.js:
//   self.onmessage = (e) => {
//     let total = 0;
//     for (const r of e.data) total += expensiveCalc(r);
//     self.postMessage(total);
//   };
const worker = new Worker("report-worker.js");
worker.onmessage = (e) => showReport(e.data);
worker.postMessage(rows);                // data is copied (structured clone)

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "JavaScript runs on one main thread, so a long loop blocks painting and
  click handling until it finishes. First I profile and check if the
  algorithm can be faster. Then I either split the work into chunks and
  yield to the browser between chunks, or move the work to a Web Worker so
  it runs on another thread. Making the function async alone does not help,
  because the synchronous loop still blocks the thread."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Wrapping the loop in a Promise or async function and thinking it now runs
  "in the background". The code inside still runs on the main thread.
- Yielding with Promise.resolve() / queueMicrotask: microtasks run before
  rendering, so the page still does not paint.
- Trying to access the DOM or window inside a Web Worker (not available).
- Sending huge data to a worker many times; it is copied each time. Use
  transferable objects (ArrayBuffer) for large binary data.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does setTimeout(fn, 0) let the UI update but a resolved Promise does not?
A1: setTimeout schedules a new macrotask, and the browser can render between
    tasks. Promise callbacks are microtasks, and all microtasks run before
    the browser gets a chance to render.

Q2: What can a Web Worker not do?
A2: It has no access to the DOM, window or document. It talks to the main
    thread only with postMessage. It can use fetch, timers and IndexedDB.

Q3: When would you choose chunking over a worker?
A3: When the work needs the DOM, is only moderately heavy, or the data is
    hard to send to a worker. For pure heavy CPU work, a worker is better.
*/
