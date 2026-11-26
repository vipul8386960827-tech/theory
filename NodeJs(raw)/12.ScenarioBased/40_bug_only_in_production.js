/* 40_bug_only_in_production.js

=====================================================
Scenario: A bug happens only in production
=====================================================

The Question (how the interviewer asks it):
- "Users report an error on checkout in production. You cannot reproduce it
   locally - everything works on your machine. How do you debug it?"

What the interviewer is checking:
- Do you have a calm, systematic process (not random guessing)?
- Do you know what differs between local and prod (env, data, versions)?
- Do you use logs, correlation ids and monitoring well?
- Do you debug production safely (no risky changes, no leaking data)?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Measure the impact first: how many users, since when, which endpoint?
   If it started after a deploy and is serious, roll back or turn off the
   feature flag first, then investigate.
2. Read the logs and error tracker (Sentry). Find the exact error and stack
   trace. Use a correlation/request id to follow one failing request across
   services.
3. Compare environments:
   - config/env vars (missing var, wrong URL, different timeout)
   - Node and package versions (lockfile, npm ci, Docker image)
   - data (real data has nulls, unicode, very large values, old records)
   - infra (multiple instances, proxy, HTTPS, timezone, memory limits)
   - traffic (concurrency -> race conditions that never happen locally)
4. Reproduce with prod-like conditions: staging with an anonymized copy of
   the data, the same Docker image, and the failing request input.
5. Add more targeted logging if needed (structured logs, no secrets or
   personal data), deploy it, and wait for the next failure.
6. Use source maps (node --enable-source-maps) for TypeScript/bundled code
   so stack traces show real file lines.
7. Use --inspect on production only as a last resort: on one instance taken
   out of the load balancer, bound to localhost, accessed via SSH tunnel.
   Breakpoints pause the whole process.
8. After the fix: write a test for that case, add an alert, and write a
   short post-mortem.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const { randomUUID } = require('node:crypto');
const { AsyncLocalStorage } = require('node:async_hooks');
const pino = require('pino');

const logger = pino({ redact: ['req.headers.authorization', '*.password'] });
const als = new AsyncLocalStorage();

// Correlation id for every request (reuse it if the gateway sent one)
app.use((req, res, next) => {
  const requestId = req.get('x-request-id') || randomUUID();
  res.set('x-request-id', requestId);
  als.run({ requestId }, next);
});

const log = () => logger.child({ requestId: als.getStore()?.requestId });

app.post('/checkout', async (req, res, next) => {
  try {
    log().info({ cartId: req.body.cartId }, 'checkout started');
    const order = await checkoutService.run(req.body);
    res.json(order);
  } catch (err) {
    log().error({ err, cartId: req.body.cartId }, 'checkout failed');
    next(err);
  }
});

// Start with real stack traces for TS/bundled code:
//   node --enable-source-maps dist/server.js
// Last resort, one isolated instance, never public:
//   node --inspect=127.0.0.1:9229 dist/server.js   (then SSH tunnel)

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "First I check the impact, and if a recent deploy caused it I roll back or
   switch off the feature flag. Then I use logs and the error tracker, and
   follow the failing request with its correlation id. I compare what is
   different in production: config and env vars, Node and package versions,
   real data, and concurrency. I try to reproduce it on staging with
   prod-like data and the same image, add targeted logs if needed, and after
   the fix I add a test and an alert."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "I would debug directly in production with console.log and hotfixes."
- Attaching a debugger to a live server that handles real traffic.
- Logging passwords, tokens or full card data while debugging.
- Fixing the symptom without a test, so the bug comes back.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does "works on my machine" happen so often?
A1: Different env vars, different versions (no lockfile or npm install
    instead of npm ci), different data, and only one user locally, so race
    conditions never appear. Docker and npm ci reduce these differences.

Q2: What is a correlation id?
A2: A unique id given to a request at the edge and passed to every log line
    and downstream service (x-request-id header). It lets you see the whole
    path of one request.

Q3: How do feature flags help here?
A3: You can turn a broken feature off instantly without a deploy, or enable
    it for a small percentage of users or only for your team to test in prod.
*/
