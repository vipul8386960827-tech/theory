/* 10_callback_hell.js

=====================================================
Callback Hell
=====================================================

Definition (What I should say in the interview):
- "Callback hell, also called the pyramid of doom, is when async operations depend on each other
   and each one is nested inside the previous callback. The code drifts to the right, error
   handling gets repeated at every level, and it becomes hard to read, test and change. I avoid
   it by using **Promises and async/await**, and by splitting logic into small named functions."

-----------------------------------------------------
Problems it causes
-----------------------------------------------------
1. Deep nesting -> hard to read.
2. Error handling repeated at every level; easy to forget one.
3. Hard to run steps in parallel or add a new step.
4. Risk of calling a callback twice or never.

-----------------------------------------------------
Example (the problem)
-----------------------------------------------------
getUser(id, (err, user) => {
  if (err) return handle(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handle(err);
    getInvoice(orders[0].id, (err, invoice) => {
      if (err) return handle(err);
      sendEmail(user.email, invoice, (err) => {
        if (err) return handle(err);
        console.log('done');
      });
    });
  });
});

-----------------------------------------------------
Example (the fix with async/await)
-----------------------------------------------------
async function processUser(id) {
  try {
    const user = await getUser(id);
    const orders = await getOrders(user.id);
    const invoice = await getInvoice(orders[0].id);
    await sendEmail(user.email, invoice);
    console.log('done');
  } catch (err) {
    handle(err);                     // one place for all errors
  }
}

-----------------------------------------------------
Other Ways to Fix
-----------------------------------------------------
- Named functions instead of anonymous nested ones (flattens structure).
- util.promisify to convert callback APIs, then use await.
- Promise chains with a single .catch().

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is nesting itself the real problem?
A1: Mostly the problem is scattered error handling and poor control flow, nesting is the visible symptom.

Q2: Can Promises also become "hell"?
A2: Yes, if you nest .then inside .then instead of returning Promises to keep the chain flat.

Q3: What is "inversion of control" in callbacks?
A3: You hand your continuation to someone else's code and trust them to call it once, correctly.
*/
