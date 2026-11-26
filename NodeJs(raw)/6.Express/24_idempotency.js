/* 24_idempotency.js

=====================================================
Idempotency in HTTP / REST APIs
=====================================================

Definition (What I should say in the interview):
- "An operation is **idempotent** if making the same request once or many times leaves the
   server in the **same state**. GET, PUT, DELETE, HEAD and OPTIONS are idempotent; **POST is
   not**, because sending it twice usually creates two records. This matters for retries -
   if a network call times out, the client can safely retry an idempotent request. For POST
   operations like payments, we make them safe with an **Idempotency-Key** header."

-----------------------------------------------------
Safe vs Idempotent
-----------------------------------------------------
| Method  | Safe (no state change) | Idempotent |
|---------|------------------------|------------|
| GET     | Yes                    | Yes        |
| HEAD    | Yes                    | Yes        |
| OPTIONS | Yes                    | Yes        |
| PUT     | No                     | Yes        |
| DELETE  | No                     | Yes        |
| POST    | No                     | No         |
| PATCH   | No                     | Not guaranteed |

-----------------------------------------------------
Example (Idempotency-Key for POST /payments)
-----------------------------------------------------
const express = require('express');
const app = express();
app.use(express.json());

const processed = new Map();   // in production: Redis with a TTL

app.post('/payments', (req, res) => {
  const key = req.get('Idempotency-Key');
  if (!key) return res.status(400).json({ message: 'Idempotency-Key header required' });

  if (processed.has(key)) {
    return res.status(200).json(processed.get(key));   // replay stored result, no double charge
  }

  const payment = { id: Date.now(), amount: req.body.amount, status: 'captured' };
  processed.set(key, payment);
  res.status(201).json(payment);
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Idempotency is about server STATE, not the response. DELETE /users/1 twice:
  first -> 204, second -> 404, but the state (user gone) is the same -> still idempotent.
- GET being idempotent depends on us: a GET that increments a counter breaks the rule.
- Real implementations must handle concurrent requests with the same key (locks / unique index).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is PUT idempotent even though it modifies data?
A1: Yes - sending the same full representation repeatedly results in the same final state.

Q2: How do you prevent duplicate orders on double-click?
A2: Idempotency key from the client, a unique DB constraint, and disabling the button on the UI.
*/
