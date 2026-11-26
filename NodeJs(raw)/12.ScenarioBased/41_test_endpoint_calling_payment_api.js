/* 41_test_endpoint_calling_payment_api.js

=====================================================
Scenario: Testing an endpoint that calls an external payment API
=====================================================

The Question (how the interviewer asks it):
- "POST /orders/:id/pay calls Stripe to charge the card. How do you write
   tests for it? You cannot charge real cards in every test run."

What the interviewer is checking:
- Do you know the test pyramid (unit, integration, end-to-end)?
- Can you mock external services (jest mocks, nock, msw)?
- Do you design code for testability (dependency injection, service layer)?
- Do you test failure cases, not only the happy path?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Structure the code: route -> controller -> paymentService -> Stripe SDK.
   The Stripe call lives in one small module, so it is easy to replace.
2. Use dependency injection: pass the payment client into the service (or
   app factory) so tests can give a fake one.
3. Unit tests (jest): test the service with a mocked payment client. Check
   success, card declined, timeout, and that the order status is updated.
4. API tests (jest + supertest): call the real Express app, mock only the
   external boundary. Check status codes and response bodies.
5. HTTP-level mocking: nock or msw can intercept outgoing HTTP requests, so
   the real SDK code runs but no request leaves the machine.
6. Integration tests against the provider's sandbox/test mode (Stripe test
   keys, test card numbers) run less often, e.g. nightly or before release.
7. Test webhooks too: send a fake signed event to the webhook endpoint.
8. Never use real keys in tests; keep test keys in CI secrets.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// app.js - app factory with dependency injection
function createApp({ paymentClient, orderRepo }) {
  const app = express();
  app.use(express.json());
  app.post('/orders/:id/pay', async (req, res) => {
    const order = await orderRepo.findById(req.params.id);
    try {
      const charge = await paymentClient.charge({ amount: order.total, token: req.body.token });
      await orderRepo.markPaid(order.id, charge.id);
      res.json({ status: 'paid', chargeId: charge.id });
    } catch (err) {
      if (err.code === 'card_declined') return res.status(402).json({ error: 'Card declined' });
      res.status(502).json({ error: 'Payment provider error' });
    }
  });
  return app;
}

// pay.test.js - jest + supertest
const request = require('supertest');

test('marks order as paid on success', async () => {
  const paymentClient = { charge: jest.fn().mockResolvedValue({ id: 'ch_123' }) };
  const orderRepo = { findById: jest.fn().mockResolvedValue({ id: 1, total: 500 }),
                      markPaid: jest.fn() };
  const app = createApp({ paymentClient, orderRepo });

  const res = await request(app).post('/orders/1/pay').send({ token: 'tok_visa' });

  expect(res.status).toBe(200);
  expect(paymentClient.charge).toHaveBeenCalledWith({ amount: 500, token: 'tok_visa' });
  expect(orderRepo.markPaid).toHaveBeenCalledWith(1, 'ch_123');
});

test('returns 402 when card is declined', async () => {
  const err = Object.assign(new Error('declined'), { code: 'card_declined' });
  const app = createApp({
    paymentClient: { charge: jest.fn().mockRejectedValue(err) },
    orderRepo: { findById: jest.fn().mockResolvedValue({ id: 1, total: 500 }), markPaid: jest.fn() },
  });
  const res = await request(app).post('/orders/1/pay').send({ token: 'tok_bad' });
  expect(res.status).toBe(402);
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "I keep the payment call behind a small service and inject it, so tests
   can pass a fake. Unit tests mock that client with jest and cover success,
   declined card and provider errors. API tests use supertest against the
   real Express app with only the external call mocked, or with nock or msw
   intercepting HTTP. Then a few integration tests run against Stripe's
   sandbox with test keys, for example nightly, to check the real contract."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Calling the real payment API (or the sandbox) in every unit test - slow,
  flaky, and may hit rate limits.
- Testing only the happy path, not declined cards and timeouts.
- Hard-coding `new Stripe(key)` deep inside the route, so nothing can be
  mocked without hacks.
- Mocking so much that the test checks nothing real.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: jest.mock vs nock - what is the difference?
A1: jest.mock replaces a JS module (e.g. your paymentService). nock/msw
    intercept real HTTP requests, so the SDK code still runs but the network
    response is fake.

Q2: How do you avoid charging a customer twice if the request is retried?
A2: Use an idempotency key (Stripe supports the Idempotency-Key header),
    for example based on the order id, and check order status before charging.

Q3: How do you test a payment webhook?
A3: Build a test event, sign it with the test webhook secret (Stripe SDK has
    a helper for test signatures), send it with supertest, and check that
    invalid signatures get 400.
*/
