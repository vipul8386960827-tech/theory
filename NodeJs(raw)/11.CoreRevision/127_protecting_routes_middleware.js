/* 14_protecting_routes_middleware.js

=====================================================
Protecting Routes with Middleware
=====================================================

Definition (What I should say in the interview):
- "In Express I protect routes with an auth middleware, usually called protect or
   authenticate. It extracts the token, verifies it with jwt.verify, optionally loads the user
   from the database to make sure they still exist and are active, attaches the user to req,
   and calls next(). If anything fails it returns 401. I apply it per route or to a whole
   router with router.use(), and chain an authorization middleware after it for roles."

-----------------------------------------------------
Flow
-----------------------------------------------------
1. Read token from Authorization header ("Bearer ...") or cookie.
2. No token -> 401.
3. jwt.verify with pinned algorithm -> invalid/expired -> 401.
4. Load user -> deleted / disabled / password changed after iat -> 401.
5. req.user = user -> next().

-----------------------------------------------------
Example
-----------------------------------------------------
// middleware/protect.js
const jwt = require('jsonwebtoken');

module.exports = async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.accessToken;
    if (!token) return res.status(401).json({ message: 'Authentication required' });

    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

    const user = await User.findById(payload.sub).select('role active passwordChangedAt');
    if (!user || !user.active) return res.status(401).json({ message: 'User no longer valid' });
    if (user.passwordChangedAt && payload.iat * 1000 < user.passwordChangedAt.getTime()) {
      return res.status(401).json({ message: 'Password changed, log in again' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// routes
const router = require('express').Router();
router.get('/products', listProducts);          // public
router.use(protect);                            // everything below is protected
router.get('/me', getMe);
router.post('/orders', createOrder);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Placing router.use(protect) after the routes -> they stay public (order matters).
- Calling next() and then also sending a response -> "headers already sent" error.
- Sending err.message from jwt directly to the client in detail.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why query the DB if JWT is stateless?
A1: To handle deleted/banned users and password changes. It is a trade-off; some APIs skip
    it for speed and rely on short expiry.

Q2: How do you make an optional auth middleware?
A2: If no token, call next() without req.user; if a token exists, verify it normally.
*/
