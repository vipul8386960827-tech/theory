/* 12_payment_webhook_received_twice.js

=====================================================
Scenario: Payment Webhook Received Twice
=====================================================

The Question (how the interviewer asks it):
- "A payment provider like Stripe sent the same webhook twice, and the user
  was credited twice. How do you stop this from happening?"

What the interviewer is checking:
- Do you know webhooks are "at-least-once" delivery, so duplicates are normal?
- Do you understand idempotency (same request many times = same result)?
- Can you use a DB unique constraint / atomic operation, not just an if-check?
- Do you verify the webhook signature and respond fast?

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Accept that duplicates WILL happen: providers retry on timeouts or non-2xx
   responses, and network issues can deliver the same event twice.
2. Verify the signature first (e.g. stripe.webhooks.constructEvent with the
   raw body), so fake events are rejected.
3. Use the provider's unique event id (event.id) as an idempotency key.
   Store it in a table with a UNIQUE index.
4. Insert the event id and do the business update in ONE transaction.
   If the insert fails with a duplicate-key error, it was already processed:
   return 200 and do nothing.
5. Do not use "check then insert" without a unique index - two requests can
   pass the check at the same time (race condition).
6. Also make the business action itself safe: e.g. order status update
   `WHERE status = 'pending'` so it can only move once.
7. Reply 2xx quickly; push heavy work to a background queue (with the job id
   = event id so the queue also dedupes).
8. For my own APIs, accept an `Idempotency-Key` header from clients for the
   same reason.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// MongoDB: processedEvents has a unique index on eventId
// db.processedEvents.createIndex({ eventId: 1 }, { unique: true })

app.post('/webhooks/stripe', express.raw({ type: 'application/json' }),
  async (req, res) => {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body, req.headers['stripe-signature'], process.env.WH_SECRET);
    } catch {
      return res.status(400).send('Invalid signature');
    }

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await ProcessedEvent.create([{ eventId: event.id }], { session });
        if (event.type === 'payment_intent.succeeded') {
          const orderId = event.data.object.metadata.orderId;
          await Order.updateOne(
            { _id: orderId, status: 'pending' },     // only moves once
            { $set: { status: 'paid' } }, { session });
        }
      });
    } catch (err) {
      if (err.code !== 11000) throw err;  // 11000 = duplicate key -> already done
    } finally {
      await session.endSession();
    }
    res.sendStatus(200);
  });

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "Webhooks are delivered at least once, so the handler must be idempotent.
  I verify the signature, then save the provider's event id in a table with
  a unique index, in the same transaction as the business update. If the
  insert hits a duplicate key, I know it was already processed and just
  return 200. I also make the update conditional, like 'set paid only if
  pending', and I return 2xx fast and move heavy work to a queue."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Check if it exists, then insert" with no unique index - race condition.
- Returning 500 for a duplicate - the provider keeps retrying it.
- Using express.json() before the webhook route, so the raw body is lost and
  signature verification fails.
- Doing slow work (emails, PDFs) before responding, causing timeouts and
  MORE retries.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does idempotent mean?
A1: Doing the same operation once or many times gives the same final result.
    GET, PUT and DELETE should be idempotent; POST usually is not unless you
    add an idempotency key.

Q2: Why is a unique index better than an if-check in code?
A2: Two requests can run the if-check at the same moment and both see
    "not found". The database enforces a unique index atomically, so only
    one insert can succeed.

Q3: What if the transaction fails after the event id is saved?
A3: Because both are in the same transaction, the event id is rolled back
    too. The provider retries later and the event is processed correctly.
*/
