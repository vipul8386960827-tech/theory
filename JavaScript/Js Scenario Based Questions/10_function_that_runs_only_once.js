/* 10_function_that_runs_only_once.js

=====================================================
Scenario: Function must run only once (double payment click)
=====================================================

The Question (how the interviewer asks it):
- "Users double-click the 'Pay' button and sometimes get charged twice.
  Also, our initAnalytics() is called from two places and runs twice.
  How do you make sure something runs only once?"

What the interviewer is checking:
- Can you write a once() helper using a closure?
- Do you handle async work (block while the request is in flight)?
- Do you know UI protection (disable the button) is not enough alone?
- Do you mention server-side idempotency for payments?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. For init-style functions, I write once(fn): a closure keeps a "called"
   flag and the first result. Later calls return the saved result.
2. For async init, I save the promise itself, so a second caller waits for
   the same work instead of starting it again.
3. For the Pay button, I disable it right away when clicked and show
   "Processing...". I re-enable it only if the request fails.
4. I also keep an "inFlight" flag in code, because disabling can be
   bypassed (Enter key, slow re-render, scripts).
5. Most important: the server must be idempotent. The client sends an
   idempotency key (a UUID made once per checkout). If the same key comes
   twice, the server returns the first result and does not charge again.
6. For simple listeners: addEventListener("click", fn, { once: true }).

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: each click sends a new payment
payBtn.addEventListener("click", () => pay(order));

// once() with a closure
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args); // for async fn, this saves the promise
    }
    return result;
  };
}
const initAnalytics = once(() => console.log("init")); // runs one time

// FIXED Pay button: UI guard + in-flight flag + idempotency key
const idempotencyKey = crypto.randomUUID(); // one per checkout
let inFlight = false;

payBtn.addEventListener("click", async () => {
  if (inFlight) return;
  inFlight = true;
  payBtn.disabled = true;
  try {
    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    showSuccess();
  } catch (err) {
    inFlight = false;          // allow retry only on failure
    payBtn.disabled = false;   // same key, so retry is still safe
    showError(err);
  }
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "For an init function I write once(): a closure keeps a flag and the
  first result, so later calls do nothing. For the Pay button I use an
  in-flight flag and disable the button immediately, and re-enable it only
  on error. But the client can never fully prevent duplicates, so the real
  fix is an idempotency key: the server sees the same key and does not
  charge twice."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Relying only on button.disabled. A fast double click, Enter key, or a
  network retry can still send two requests.
- Using debounce for payments. It delays the action and is not a
  guarantee.
- Making a new idempotency key on every click, which removes the
  protection.
- Writing once() so that it caches a rejected promise forever; for async
  init, consider resetting on failure so it can be retried.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why save the promise, not just a flag, for async init?
A1: If two callers call init at the same time, the second one gets the same
    promise and waits for the same work. With only a flag, the second
    caller would return early before init is finished.

Q2: How does the server use the idempotency key?
A2: It stores the key with the result (often with a unique constraint in
    the database). If the same key arrives again, it returns the stored
    response instead of running the payment again.

Q3: What is the difference between once() and { once: true }?
A3: { once: true } removes one event listener after its first call. once()
    wraps any function, works everywhere, and also remembers the result.
*/
