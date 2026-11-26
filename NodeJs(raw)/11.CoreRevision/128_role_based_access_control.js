/* 15_role_based_access_control.js

=====================================================
Role-Based Access Control (RBAC)
=====================================================

Definition (What I should say in the interview):
- "RBAC means permissions are assigned to **roles**, like admin, editor or user, and users
   get roles - so instead of checking individual users, the code checks 'does this role have
   this permission?'. In Express I implement it as a middleware such as restrictTo('admin')
   placed after the authentication middleware. For real apps I also check **ownership**, because
   a role check alone does not stop a user from editing someone else's resource."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Simple RBAC: check req.user.role against allowed roles.
2. Better: map roles -> permissions ('order:read', 'order:delete') and check permissions,
   so adding a role does not require code changes on every route.
3. Ownership check (resource-level): order.userId === req.user.id OR admin.
4. Default deny: if a role is not explicitly allowed, reject.
5. Beyond RBAC: ABAC (attribute-based, e.g. same department, working hours).

-----------------------------------------------------
Example
-----------------------------------------------------
const permissions = {
  user:  ['order:create', 'order:read:own'],
  admin: ['order:create', 'order:read:any', 'order:delete', 'user:manage'],
};

const can = (perm) => (req, res, next) =>
  permissions[req.user.role]?.includes(perm)
    ? next()
    : res.status(403).json({ message: 'You do not have permission' });

app.delete('/api/orders/:id', protect, can('order:delete'), deleteOrder);

// ownership check inside the handler
app.get('/api/orders/:id', protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.sendStatus(404);
  const isOwner = order.userId.equals(req.user._id);
  if (!isOwner && req.user.role !== 'admin') return res.sendStatus(404); // hide existence
  res.json(order);
});

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Letting users set their own role during signup: User.create(req.body) with role: 'admin'.
  Always whitelist fields: User.create({ name, email, password }).
- Trusting an old role in a long-lived JWT after the role was changed in DB.
- Only hiding admin buttons in the frontend.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: 403 or 404 when a user accesses someone else's order?
A1: Both are used; 404 avoids revealing that the resource exists.

Q2: Should the role be inside the JWT?
A2: It is fine for quick checks, but the DB is the source of truth. With short-lived tokens
    the delay after a role change is small.

Q3: What OWASP category covers this?
A3: A01:2021 Broken Access Control - the number one risk in the 2021 list.
*/
