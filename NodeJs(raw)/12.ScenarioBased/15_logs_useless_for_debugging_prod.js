/* 15_logs_useless_for_debugging_prod.js

=====================================================
Scenario: Logs Are Useless for Debugging Production
=====================================================

The Question (how the interviewer asks it):
- "A customer reports that their order failed. You open the production logs,
  but there are thousands of console.log lines with no context, and you
  cannot find what happened. How would you improve logging?"

What the interviewer is checking:
- Do you know structured (JSON) logging with a library like pino or winston?
- Do you use log levels correctly (error, warn, info, debug)?
- Do you know request / correlation IDs to connect logs from one request?
- Do you know AsyncLocalStorage to carry context without passing it around?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Replace console.log with a structured logger (pino - fast, JSON output).
   JSON logs can be searched and filtered in tools like ELK, Datadog, Loki.
2. Use log levels: error for failures, warn for unusual cases, info for
   important business events, debug for details. Level comes from an env
   variable so I can turn on debug without code changes.
3. Give every request an ID (from the `x-request-id` header or a new UUID),
   return it in the response header, and add it to EVERY log line.
4. Use pino-http (or a middleware) to log each request: method, url, status,
   duration, request id.
5. Use AsyncLocalStorage so deep code (services, DB layer) can get the
   request id and user id without passing `req` everywhere.
6. Log useful context: userId, orderId, the error object with stack. Never log
   passwords, tokens or card data (use pino `redact`).
7. Send the request id to other services so I can follow one request across
   microservices (later: OpenTelemetry tracing).

-----------------------------------------------------
Code Example
-----------------------------------------------------
const pino = require('pino');
const { AsyncLocalStorage } = require('node:async_hooks');
const { randomUUID } = require('node:crypto');

const als = new AsyncLocalStorage();
const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.authorization', '*.password', '*.cardNumber'],
});

// logger that always includes the current request context
const logger = new Proxy(baseLogger, {
  get: (target, prop) => (als.getStore()?.log || target)[prop],
});

app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || randomUUID();
  res.setHeader('x-request-id', requestId);
  const log = baseLogger.child({ requestId, userId: req.user?.id });
  als.run({ log }, next);          // everything after this has the context
});

// deep inside a service - no req needed
async function createOrder(data) {
  logger.info({ orderId: data.id }, 'creating order');
  try {
    return await Order.create(data);
  } catch (err) {
    logger.error({ err, orderId: data.id }, 'order creation failed');
    throw err;
  }
}
// output: {"level":50,"requestId":"a1b2..","orderId":"o9","err":{...},"msg":"order creation failed"}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I replace console.log with a structured JSON logger like pino and use
  proper log levels controlled by an env variable. Every request gets a
  request id that is returned to the client and added to every log line, and
  I use AsyncLocalStorage so services deep in the code log with that id
  automatically. I log the error object with stack and business ids, redact
  secrets, and ship logs to a central tool, so with one request id I can see
  the whole story of that request."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Logging `err.message` only and losing the stack, or `'Error: ' + err`.
- Logging everything at info/debug in production - noise, cost, slow app.
- Logging passwords, JWTs or full card numbers.
- Writing logs to local files on containers that get deleted on restart,
  instead of stdout + a log collector.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is pino faster than console.log or winston?
A1: pino does very little work in the main thread: it writes JSON quickly and
    can move formatting/transport to a worker thread (pino.transport).
    console.log to a terminal/pipe can be synchronous and slow.

Q2: What is AsyncLocalStorage?
A2: A Node API (node:async_hooks) that stores data for one async "flow".
    Anything called inside als.run(store, fn) - including awaits, timers and
    callbacks - can read the same store with als.getStore(). It works like
    thread-local storage for async code.

Q3: What is the difference between logs, metrics and traces?
A3: Logs are detailed events ("order 9 failed"). Metrics are numbers over
    time (error rate, p95 latency) used for dashboards and alerts. Traces
    show one request's path and timing across services. Together they are
    called observability.
*/
