/* 25_old_tokens_work_after_password_change.js

=====================================================
Scenario: Old JWTs Still Work After Password Change
=====================================================

The Question (how the interviewer asks it):
- "A user thinks their account was hacked, so they change their password.
   But the attacker's old JWT still works. Why, and how do you fix it?"

What the interviewer is checking:
- Do you understand that a JWT stays valid until "exp", even after a password change
- passwordChangedAt check using the token's "iat" (issued at)
- Token version (tokenVersion) as an alternative
- Revoking refresh tokens / sessions too

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Clarify first: are we using only access tokens, or access + refresh
   tokens? Is there any session table in the DB?
2. Explain why: jwt.verify() only checks the signature and expiry. Nothing
   in the token is linked to the password, so changing the password does not
   affect it.
3. Fix 1 - passwordChangedAt: save a timestamp on the user when the password
   changes. In the auth middleware, load the user and reject the token if
   it was issued (iat) before passwordChangedAt.
4. Fix 2 - tokenVersion: store a number on the user and put it in the JWT.
   On password change (or "logout all devices") increase the number. A token
   with an old version is rejected. This is simple and very clear.
5. Also delete all refresh tokens for that user, or the attacker can just
   get a new access token.
6. Issue a fresh token to the current user, so they stay logged in on the
   device where they changed the password.
7. Mention the cost: this needs a DB (or cache) lookup per request, which is
   normal - most apps already load the user in the middleware.

-----------------------------------------------------
Code Example
-----------------------------------------------------
// Model
const userSchema = new mongoose.Schema({
  email: String,
  password: { type: String, select: false },
  passwordChangedAt: Date,
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  // minus 1s: the new token may be signed slightly before save finishes
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.changedPasswordAfter = function (jwtIat) {
  if (!this.passwordChangedAt) return false;
  const changedAt = Math.floor(this.passwordChangedAt.getTime() / 1000);
  return jwtIat < changedAt;                 // token is older than the change
};

// Middleware
async function protect(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies.access, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'User not found' });
    if (user.changedPasswordAfter(payload.iat)) {
      return res.status(401).json({ message: 'Please log in again' });
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Not authenticated' });
  }
}

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "JWTs are stateless, so the server accepts them until they expire, even
   after a password change. I fix it by saving passwordChangedAt on the user
   and, in the auth middleware, rejecting any token whose iat is older than
   that time. Another option is a tokenVersion number that I increase on
   password change. I also delete the user's refresh tokens so the attacker
   cannot get a new access token."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- "Change the JWT secret" - this logs out EVERY user, not just one.
- Only checking the signature and never checking the user still exists.
- Forgetting refresh tokens, so the attacker silently gets new access tokens.
- Comparing iat (seconds) with Date.getTime() (milliseconds) without
  converting. This is a very common bug.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: passwordChangedAt or tokenVersion - which is better?
A1: Both work. tokenVersion is simpler, has no timestamp edge cases, and can
    be reused for "log out all devices" or when an admin bans a user.

Q2: Doesn't this remove the benefit of stateless JWT?
A2: Partly. To reduce the cost, I can cache the user's tokenVersion in
    Redis, or rely on very short access tokens and only check on refresh.

Q3: What else should happen on a password change?
A3: Send an email notification to the user, invalidate password reset
    tokens, and log the event for security auditing.
*/
