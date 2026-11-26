/* 16_password_reset_flow.js

=====================================================
Password Reset Flow
=====================================================

Definition (What I should say in the interview):
- "For password reset, the user enters their email, and I generate a **random, single-use
   token** with crypto.randomBytes, store only its **SHA-256 hash** and an expiry of about
   10-15 minutes in the DB, and email the raw token as a link. When the user submits the new
   password with the token, I hash the incoming token, find a matching non-expired record,
   update the password with bcrypt, delete the token, and invalidate existing sessions."

-----------------------------------------------------
Flow
-----------------------------------------------------
1. POST /forgot-password { email } -> always respond "If the email exists, a link was sent".
2. Generate token -> store hash + expiry -> send link https://app.com/reset/<token>.
3. POST /reset-password/:token { password }.
4. Hash token -> find user with matching hash and expiry > now.
5. Set new password (bcrypt), clear token fields, set passwordChangedAt.
6. Revoke refresh tokens / bump tokenVersion -> notify user by email.

-----------------------------------------------------
Example
-----------------------------------------------------
const crypto = require('crypto');
const sha256 = (v) => crypto.createHash('sha256').update(v).digest('hex');

app.post('/api/auth/forgot-password', resetLimiter, async (req, res) => {
  const user = await User.findOne({ email: String(req.body.email) });
  if (user) {
    const raw = crypto.randomBytes(32).toString('hex');
    user.resetTokenHash = sha256(raw);
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    await sendEmail(user.email, `${process.env.APP_URL}/reset/${raw}`);
  }
  res.json({ message: 'If that email exists, a reset link has been sent' });
});

app.post('/api/auth/reset-password/:token', async (req, res) => {
  const user = await User.findOne({
    resetTokenHash: sha256(req.params.token),
    resetTokenExpires: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ message: 'Token invalid or expired' });

  user.password = req.body.password;          // pre-save hook hashes with bcrypt
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();
  res.json({ message: 'Password updated' });
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- SHA-256 (fast hash) is fine here because the token is 256 bits random, not a guessable password.
- Never use Math.random() for tokens - it is not cryptographically secure.
- Build the link from a configured APP_URL, not from the Host header (host header injection).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why the same response whether or not the email exists?
A1: To prevent user enumeration.

Q2: Why store a hash of the reset token?
A2: If the DB leaks, attackers cannot use active reset links to take over accounts.
*/
