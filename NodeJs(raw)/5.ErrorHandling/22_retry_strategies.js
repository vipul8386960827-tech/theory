/* 22_retry_strategies.js

=====================================================
Retry Strategies
=====================================================

Definition (What I should say in the interview):
- "Retrying is useful for **transient failures** - network blips, timeouts, 503s, DB failover,
   rate limits. The usual strategy is **exponential backoff with jitter**: wait 200ms, 400ms,
   800ms and so on, plus a random delay so many clients do not retry at the same moment. I always
   set a **max number of attempts**, only retry errors that are actually retryable, and only retry
   operations that are **idempotent** - otherwise a retry could charge a customer twice."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Retry only transient errors -> ETIMEDOUT, ECONNRESET, ECONNREFUSED, 429, 502, 503, 504.
2. Never retry 400/401/403/404 -> they will fail again.
3. Exponential backoff -> delay = base * 2^attempt (with a max cap).
4. Jitter -> add randomness to avoid "thundering herd".
5. Idempotency -> GET/PUT/DELETE are safe; for POST use an idempotency key.
6. Circuit breaker (e.g. opossum) -> stop calling a service that keeps failing.

-----------------------------------------------------
Example (retry with exponential backoff + jitter)
-----------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const RETRYABLE = new Set(['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED']);

function isRetryable(err) {
  const code = err.code || err.cause?.code; // fetch puts the system code in err.cause
  return RETRYABLE.has(code) || [429, 502, 503, 504].includes(err.status);
}

async function withRetry(fn, { retries = 3, baseDelay = 200, maxDelay = 5000 } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries || !isRetryable(err)) throw err;
      const delay = Math.min(maxDelay, baseDelay * 2 ** attempt) + Math.random() * 100;
      console.warn(`Attempt ${attempt + 1} failed (${err.code || err.status}), retry in ${Math.round(delay)}ms`);
      await sleep(delay);
    }
  }
}

// Usage
async function getRates() {
  return withRetry(async () => {
    const res = await fetch('https://api.example.com/rates');
    if (!res.ok) {
      const e = new Error(`HTTP ${res.status}`);
      e.status = res.status;
      throw e;
    }
    return res.json();
  });
}

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Retrying instantly in a tight loop -> makes an overloaded service even worse.
- Retrying at every layer (client, service, DB driver) -> 3 x 3 x 3 = 27 calls for one request.
- Retrying non-idempotent POSTs without an idempotency key -> duplicate orders/payments.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is jitter and why add it?
A1: A random extra delay. Without it, all clients that failed together retry together and overload
    the service again.

Q2: Retry vs circuit breaker?
A2: Retry handles short blips for one call. A circuit breaker tracks failures over time and fails fast
    (opens) when a service is down, then tests it again after a cooldown.

Q3: Libraries you would use?
A3: p-retry or async-retry for retries, axios-retry for HTTP, opossum for circuit breaking.
*/
