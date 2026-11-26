/* 6_third_party_api_slow_or_failing.js

=====================================================
Scenario: A Third-Party API Is Slow or Failing Intermittently
=====================================================

The Question (how the interviewer asks it):
- "Your service calls a payment/shipping API. Sometimes it takes 30 seconds, sometimes it
   returns 503. Because of this, your own API becomes slow and requests pile up. How do you
   make your service resilient?"

What the interviewer is checking:
- Timeouts: never wait forever for someone else.
- Retries done right: only for safe errors, with exponential backoff + jitter, limited count.
- Circuit breaker and fallback, so a failing dependency does not take you down.
- Idempotency for operations like payments.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Measure: log latency and status codes of the external calls (APM traces) to see how often
   and how badly it fails.
2. Add a timeout on every call (e.g. 2-3 seconds) with AbortSignal.timeout(). Without it,
   slow calls keep connections and memory busy and requests pile up.
3. Retry only temporary errors (timeouts, network errors, 429, 502/503/504), not 400/401/404.
   Use exponential backoff with jitter (200ms, 400ms, 800ms + random), max 2-3 retries.
   Respect the Retry-After header for 429.
4. For non-idempotent calls (payments), send an Idempotency-Key so a retry cannot charge twice.
5. Add a circuit breaker (e.g. `opossum`): after many failures, stop calling for a while and
   fail fast; then try again with a few test requests (half-open).
6. Fallback: return cached data, a default value, or a clear "try later" message. For
   non-urgent work, put it in a queue and process it when the API is back.
7. Monitor and alert on error rate and circuit state; talk to the provider if it is their SLA.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const RETRYABLE = new Set([429, 502, 503, 504]);

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, { ...options, signal: AbortSignal.timeout(2000) });
      if (res.ok) return res.json();
      if (!RETRYABLE.has(res.status) || attempt >= retries) {
        throw new Error(`Upstream error ${res.status}`);
      }
    } catch (err) {
      const isNetwork = err.name === 'TimeoutError' || err.name === 'TypeError';
      if (!isNetwork || attempt >= retries) throw err;
    }
    const delay = 200 * 2 ** attempt + Math.random() * 100; // backoff + jitter
    await sleep(delay);
  }
}

// Circuit breaker + fallback with opossum
const CircuitBreaker = require('opossum');
const breaker = new CircuitBreaker((id) => fetchWithRetry(`https://ship.api/rates/${id}`), {
  errorThresholdPercentage: 50,   // open if 50% of calls fail
  resetTimeout: 30_000,           // try again after 30s (half-open)
});
breaker.fallback((id) => cache.get(`rates:${id}`) ?? { rates: [], stale: true });

app.get('/rates/:id', async (req, res) => {
  res.json(await breaker.fire(req.params.id));
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I never trust an external API, so first I add a timeout to every call with
   AbortSignal.timeout. Then I retry only temporary errors like timeouts and 503, with
   exponential backoff and jitter and a small max count, and I use an idempotency key for
   payments. I wrap the call in a circuit breaker so that when the API is down we fail fast
   instead of piling up requests, and I return a fallback such as cached data or queue the
   work for later."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- No timeout at all ("fetch will eventually return").
- Retrying immediately, forever, or on every error including 400 - this makes the outage worse
  (retry storm).
- Retrying a payment without an idempotency key (double charge).
- Letting one failing dependency crash or slow the whole service with no fallback.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why add jitter to backoff?
A1: Without jitter, many clients retry at the exact same time and hit the API in waves. Random
    jitter spreads the retries out.

Q2: Explain the three circuit breaker states.
A2: Closed: calls go through normally. Open: too many failures, calls fail immediately for a
    time. Half-open: a few test calls are allowed; if they succeed the circuit closes again.

Q3: Retries happen in several layers (client, gateway, service). Is that a problem?
A3: Yes. 3 retries at 3 layers = up to 27 calls for one request. Retry in one layer only and
    keep a total time budget for the request.
*/
