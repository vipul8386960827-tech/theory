/* 1_authentication_vs_authorization.js

=====================================================
Authentication vs Authorization
=====================================================

Definition (What I should say in the interview):
- "**Authentication** answers 'who are you?' - it verifies identity, for example by checking
   an email and password or validating a JWT. **Authorization** answers 'what are you allowed
   to do?' - it checks permissions after the user is identified, like whether this user can
   delete a product. Authentication always comes first, and in Express I usually implement
   them as two separate middlewares: one that identifies the user and one that checks roles."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. AuthN = identity (login, token verification, 2FA).
2. AuthZ = permissions (roles, ownership, policies).
3. Failed authentication -> **401 Unauthorized** (name is misleading, it means unauthenticated).
4. Failed authorization -> **403 Forbidden** (we know who you are, but you cannot do this).
5. AuthZ must be enforced on the **server**; hiding a button in the UI is not authorization.

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect        | Authentication            | Authorization                    |
|---------------|---------------------------|----------------------------------|
| Question      | Who are you?              | What can you do?                 |
| Happens       | First                     | After authentication             |
| Based on      | Password, token, OTP      | Role, ownership, permissions     |
| Error code    | 401                       | 403                              |
| Example       | Login with email/password | Only admin can DELETE /users/:id |

-----------------------------------------------------
Example (Express)
-----------------------------------------------------
const jwt = require('jsonwebtoken');

// Authentication: who is this?
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not logged in' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Authorization: is this user allowed?
const authorize = (...roles) => (req, res, next) =>
  roles.includes(req.user.role) ? next() : res.status(403).json({ message: 'Forbidden' });

app.delete('/api/users/:id', authenticate, authorize('admin'), deleteUser);

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Checking only the role but not **ownership**: user A can edit user B's order by changing the
  id in the URL (IDOR / Broken Access Control). Always check resource.userId === req.user.id.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you have authorization without authentication?
A1: Not meaningfully for user-specific permissions. You need to know who the user is first.
    Public routes simply skip both.

Q2: 401 or 403 when a logged-in user accesses an admin route?
A2: 403. The user is authenticated, but lacks permission.

Q3: Where should the role come from - the request body or the token?
A3: Never from the body. Take it from the verified token or, better, load it from the DB.
*/
