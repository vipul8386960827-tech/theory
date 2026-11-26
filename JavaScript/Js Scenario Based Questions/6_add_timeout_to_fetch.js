/* 6_add_timeout_to_fetch.js

=====================================================
Scenario: A fetch can hang forever; add a timeout
=====================================================

The Question (how the interviewer asks it):
- "Sometimes our API does not respond and the spinner runs forever. fetch
  has no timeout option. How do you stop the request after 5 seconds and
  show an error?"

What the interviewer is checking:
- Do you know fetch has no "timeout" option, but supports an AbortSignal?
- Do you know AbortSignal.timeout() and AbortSignal.any()?
- Do you know Promise.race and its downside (it does not cancel)?
- Do you clean up timers and show a good error to the user?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I say fetch has no built-in timeout, and the browser default can be very
   long, so I add my own.
2. Modern way: pass signal: AbortSignal.timeout(5000). After 5 s the fetch
   rejects with a DOMException named "TimeoutError".
3. If the user can also cancel, I combine signals with
   AbortSignal.any([userSignal, AbortSignal.timeout(5000)]).
4. Older way: new AbortController + setTimeout(() => c.abort(), 5000), and
   clearTimeout in finally.
5. I mention Promise.race with a timer promise: it rejects on time, but the
   real request keeps running in the background. It does not cancel.
6. In the UI I always stop the spinner in finally and show "Request timed
   out, try again".

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: can wait forever, spinner never stops
const res = await fetch("/api/report");

// FIX 1 (modern browsers and Node 18+)
async function getReport(userSignal) {
  const signal = userSignal
    ? AbortSignal.any([userSignal, AbortSignal.timeout(5000)])
    : AbortSignal.timeout(5000);
  try {
    const res = await fetch("/api/report", { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (err.name === "TimeoutError") throw new Error("Request timed out");
    throw err; // AbortError = user cancelled, or other errors
  }
}

// FIX 2 (older style, works everywhere AbortController exists)
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer); // always clean up
  }
}

// Promise.race: times out, but the request is NOT cancelled
const timeout = (ms) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));
const res2 = await Promise.race([fetch("/api/report"), timeout(5000)]);

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "fetch has no timeout option, so I pass an AbortSignal. Today I use
  AbortSignal.timeout(5000); it rejects with a TimeoutError, which I turn
  into a friendly message. If I also need user cancel, I combine signals
  with AbortSignal.any. Promise.race with a timer also works, but it only
  stops waiting; the request still runs and uses the connection. I always
  stop the spinner in finally."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Writing fetch(url, { timeout: 5000 }). That option does not exist in
  fetch (it is an axios option).
- Using Promise.race and thinking the request is cancelled.
- Forgetting clearTimeout, so a timer fires later and aborts nothing, or
  leaks in tests.
- Clearing the manual timer as soon as fetch resolves: fetch resolves when
  headers arrive, so a slow body in res.json() is no longer covered. Keep
  the timer until the body is read if that matters.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you tell a timeout from a user cancel?
A1: With AbortSignal.timeout the error name is "TimeoutError". With a
    manual controller.abort() it is "AbortError". You can also call
    controller.abort(reason) and check signal.reason.

Q2: Should the timeout be retried?
A2: For a GET, yes, with a retry limit and backoff (scenario 3). For a
    POST, be careful: the server may have done the work, so use an
    idempotency key.

Q3: How does axios do it?
A3: axios has a timeout option (it rejects with code "ECONNABORTED") and
    also supports signal from an AbortController.
*/
