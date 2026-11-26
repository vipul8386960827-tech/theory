/* 3_retry_failed_fetch_with_backoff.js

=====================================================
Scenario: Retry a flaky API safely
=====================================================

The Question (how the interviewer asks it):
- "One of our APIs fails sometimes with 503 or a network error, but works
  if you try again. Write a function that retries it. What should and
  should not be retried?"

What the interviewer is checking:
- Do you know fetch does NOT reject on 4xx/5xx (only on network errors)?
- Can you write retry with exponential backoff, jitter and a max limit?
- Do you know which errors are safe to retry (5xx, 429, network) and which
  are not (most 4xx)?
- Do you think about idempotency (retrying a POST can create duplicates)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. I check res.ok myself, because fetch resolves for 404 or 500. It only
   rejects for network failure, CORS problems or abort.
2. I decide what is retryable: network errors, 5xx, 408 and 429. I do not
   retry 400, 401, 403, 404 or 422, because trying again gives the same
   answer.
3. I use exponential backoff: wait 500 ms, then 1 s, then 2 s, with a cap.
4. I add jitter (random part of the delay) so many clients do not retry at
   the exact same moment and overload the server again.
5. I set max attempts (for example 3-4) and then throw the last error.
6. I retry only idempotent requests (GET, PUT, DELETE) or POSTs that send
   an idempotency key. If the server sends Retry-After on 429, I respect it.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BUGGY: no res.ok check, retries forever, no delay, retries 404 too
async function getData(url) {
  try { return await (await fetch(url)).json(); }
  catch { return getData(url); }
}

// FIXED
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const RETRYABLE = new Set([408, 429, 500, 502, 503, 504]);

async function fetchWithRetry(url, options = {}, maxAttempts = 4, baseMs = 500) {
  for (let attempt = 1; ; attempt++) {
    let res;
    try {
      res = await fetch(url, options);
    } catch (err) {
      if (err.name === "AbortError" || attempt >= maxAttempts) throw err;
      res = null; // network error: retry
    }
    if (res?.ok) return res;
    if (res && (!RETRYABLE.has(res.status) || attempt >= maxAttempts)) {
      throw new Error(`HTTP ${res.status}`); // 4xx or out of attempts
    }
    const backoff = Math.min(baseMs * 2 ** (attempt - 1), 10_000);
    const jitter = Math.random() * backoff; // "full jitter"
    await sleep(jitter);
  }
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "First, fetch does not throw on 500, so I check res.ok. I retry only
  network errors, 5xx, 408 and 429, never normal 4xx like 400 or 404. I wait
  with exponential backoff plus random jitter, and I stop after a few
  attempts and throw the last error. I only retry idempotent requests, or
  POSTs with an idempotency key, so we never charge a user twice."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Assuming fetch throws on 500, so the retry code never runs.
- Retrying without delay or forever; this makes an outage worse.
- Retrying 401/404/400 or retrying an AbortError the user caused.
- Blindly retrying POST /payments and creating duplicate orders.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why add jitter?
A1: Without it, thousands of clients that failed together retry at the same
    times (1 s, 2 s, 4 s) and hit the server in waves (thundering herd).
    Random delay spreads the load.

Q2: What do you do with a 429 and a Retry-After header?
A2: Read Retry-After (seconds or an HTTP date) and wait at least that long
    before the next attempt, instead of my own backoff.

Q3: What if the API keeps failing for minutes?
A3: Retries are for short failures. For long outages I would show an error
    with a manual "Try again" button, and on the backend use a circuit
    breaker that stops calling a dead service for a while.
*/
