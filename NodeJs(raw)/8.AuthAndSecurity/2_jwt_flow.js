/* 2_jwt_flow.js

=====================================================
JWT Authentication Flow
=====================================================

Definition (What I should say in the interview):
- "In a JWT flow, the user logs in with credentials, the server verifies them and signs a
   token containing a small payload like the user id and role. The client sends that token on
   every request, usually in the Authorization header as 'Bearer <token>' or in a cookie. The
   server verifies the signature and expiry on each request, without a DB lookup for the
   session - that is why JWT is called **stateless**."

-----------------------------------------------------
Flow
-----------------------------------------------------
1. Client -> POST /login with email + password.
2. Server finds user, compares password with bcrypt.compare().
3. Server signs JWT: jwt.sign({ id, role }, secret, { expiresIn: '15m' }).
4. Server returns token (JSON body or HttpOnly cookie).
5. Client sends token on each request -> Authorization: Bearer <token>.
6. Middleware calls jwt.verify() -> checks signature + exp -> attaches req.user.
7. Invalid / expired -> 401; client refreshes token or logs in again.

-----------------------------------------------------
Example
-----------------------------------------------------
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email) }).select('+password');

  // same message for both cases -> do not reveal which emails exist
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  res.json({ token });
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- The server does not store the token; it only needs the secret/key to verify it.
- Keep the payload small and non-sensitive (no passwords, no card data).
- Always use jwt.verify(), never jwt.decode(), for authentication - decode does NOT check
  the signature.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why "stateless"?
A1: All info needed to authenticate is inside the signed token, so any server instance can
    verify it without shared session storage. Good for horizontal scaling.

Q2: What happens if the token is stolen?
A2: The attacker can use it until it expires. That is why access tokens are short-lived and
    we combine them with refresh tokens and secure storage.

Q3: What does jwt.verify throw?
A3: TokenExpiredError when exp has passed, JsonWebTokenError for a bad signature/malformed token.
*/
