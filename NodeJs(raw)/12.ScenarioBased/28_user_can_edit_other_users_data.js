/* 28_user_can_edit_other_users_data.js

=====================================================
Scenario: User Edited Another User's Order (IDOR)
=====================================================

The Question (how the interviewer asks it):
- "A user changed the order id in PATCH /api/orders/:id and was able to
   update another customer's order. What is the bug and how do you fix it?"

What the interviewer is checking:
- Authentication (who you are) vs authorization (what you can do)
- IDOR - Insecure Direct Object Reference (OWASP: Broken Access Control)
- Ownership checks and scoping DB queries by req.user.id
- Role-based access control (RBAC) for admins and staff

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify first: who should be allowed to edit an order - only the owner,
   or also admins/support? Which fields can a customer change?
2. Name the bug: this is IDOR. The route checks the user is logged in, but
   not that the order belongs to them. Being logged in is not permission.
3. Fix: scope the query by the owner. Use
   findOneAndUpdate({ _id: id, user: req.user.id }) instead of
   findByIdAndUpdate(id). If nothing matches, return 404.
4. Return 404 instead of 403, so attackers cannot learn which ids exist.
5. Add RBAC: a restrictTo('admin') middleware for admin routes; admins can
   skip the owner filter, but only on routes made for them.
6. Whitelist the fields a user can update (for example only address), so
   they cannot change price, status or user (mass assignment).
7. Apply this to EVERY route (GET, PATCH, DELETE, list endpoints), add tests
   "user A cannot access user B's data", and check the logs for other abuse.
   Random UUIDs make guessing harder, but they are NOT the fix.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// BAD: any logged-in user can edit any order
router.patch('/orders/:id', protect, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

// GOOD: scope by owner + whitelist fields
router.patch('/orders/:id', protect, async (req, res) => {
  const { shippingAddress } = req.body;      // only allowed field
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { shippingAddress },
    { new: true, runValidators: true }
  );
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// RBAC
const restrictTo = (...roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ message: 'Forbidden' });

router.patch('/admin/orders/:id', protect, restrictTo('admin', 'support'),
  async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  });

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "This is IDOR, a broken access control bug: we check authentication but
   not ownership. I fix it by scoping every query by the logged-in user, for
   example findOne with _id and user: req.user.id, and returning 404 if
   nothing matches. Admin actions go through separate routes protected by a
   role check. I also whitelist updatable fields and add tests that user A
   cannot read or change user B's data."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Use UUIDs so ids cannot be guessed" as the only fix - ids leak in URLs,
  emails and logs. Hiding is not authorization.
- Checking ownership only in the frontend (hiding the edit button).
- Trusting a userId sent in the body or query instead of req.user from the token.
- Passing req.body directly to update (mass assignment of role, price).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between 401 and 403?
A1: 401 = not authenticated (no or invalid token). 403 = authenticated but
    not allowed. For other users' resources, 404 is often used to hide them.

Q2: How do you avoid repeating ownership checks everywhere?
A2: A reusable middleware or a service layer method like
    getOrderForUser(id, user), or a policy library like CASL. Keep the
    rule in one place.

Q3: What about list endpoints like GET /orders?
A3: Same rule: Order.find({ user: req.user.id }). Never return all orders
    and filter in the frontend. Also do not allow filters like ?user=otherId.
*/
