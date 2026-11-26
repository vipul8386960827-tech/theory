/* 25_abortcontroller.js

=====================================================
AbortController
=====================================================

Definition (What I should say in the interview):
- "AbortController is the standard way to **cancel async operations** in Node and the browser.
   I create a controller, pass its **signal** to an API that supports it - like fetch,
   fs.promises.readFile, timers/promises or events.once - and call controller.abort() when I no
   longer need the result. The operation then rejects with an **AbortError**. It is a global in
   Node since v15, and AbortSignal.timeout(ms) makes request timeouts really simple."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. const ac = new AbortController(); ac.signal is an AbortSignal.
2. ac.abort(reason) -> signal.aborted = true, 'abort' event fires, APIs reject.
3. AbortSignal.timeout(ms) -> auto-aborts after ms (rejects with TimeoutError).
4. AbortSignal.any([s1, s2]) -> aborts when any signal aborts (Node 20+).
5. A controller is one-shot: once aborted, create a new one.

-----------------------------------------------------
Example 1 (timeout for fetch, Node 18+)
-----------------------------------------------------
async function getData() {
  try {
    const res = await fetch('https://example.com', { signal: AbortSignal.timeout(2000) });
    return await res.text();
  } catch (err) {
    if (err.name === 'TimeoutError') console.log('request took too long');
    else throw err;
  }
}

-----------------------------------------------------
Example 2 (cancel a timer)
-----------------------------------------------------
const { setTimeout: sleep } = require('timers/promises');

const ac = new AbortController();
sleep(5000, 'done', { signal: ac.signal })
  .then(console.log)
  .catch((err) => console.log(err.name));       // AbortError

setTimeout(() => ac.abort(), 100);

-----------------------------------------------------
Example 3 (supporting cancellation in your own function)
-----------------------------------------------------
function longTask(signal) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => resolve('finished'), 3000);
    signal.addEventListener('abort', () => {
      clearTimeout(t);
      reject(signal.reason);
    }, { once: true });
  });
}

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does abort() stop work that is already happening on the server?
A1: No, it stops the client side waiting/connection; the server may still finish processing.

Q2: Real use case in an API?
A2: Cancel downstream calls when the client disconnects (req 'close') or when a timeout hits.

Q3: Why prefer it over Promise.race for timeouts?
A3: race only ignores the slow result; abort actually cancels the request and frees resources.
*/
