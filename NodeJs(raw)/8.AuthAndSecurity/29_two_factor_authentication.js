/* 29_two_factor_authentication.js

=====================================================
Two-Factor Authentication (2FA)
=====================================================

Definition (What I should say in the interview):
- "2FA requires two different types of factors: something you **know** (password), something
   you **have** (phone, authenticator app, security key), or something you **are** (biometrics).
   Even if a password leaks, the attacker still needs the second factor. The most common
   implementation is **TOTP**: the server and the user's authenticator app share a secret
   (scanned via QR code), and both generate the same 6-digit code every 30 seconds. SMS OTP is
   easier for users but weaker because of SIM swapping."

-----------------------------------------------------
Flow
-----------------------------------------------------
Enrollment:
1. User enables 2FA -> server generates TOTP secret -> shows QR (otpauth:// URI).
2. User scans with Google Authenticator / Authy and submits a code to confirm.
3. Server stores the secret **encrypted** and generates one-time backup codes (hashed).
Login:
1. Email + password OK -> server returns a short-lived "2FA pending" token, NOT a full session.
2. User submits 6-digit code -> server verifies -> issues real access/refresh tokens.

-----------------------------------------------------
Example (otplib + qrcode)
-----------------------------------------------------
const { authenticator } = require('otplib');
const QRCode = require('qrcode');

app.post('/api/2fa/setup', protect, async (req, res) => {
  const secret = authenticator.generateSecret();
  const uri = authenticator.keyuri(req.user.email, 'MyApp', secret);
  await User.updateOne({ _id: req.user.id }, { twoFactorTempSecret: encrypt(secret) });
  res.json({ qr: await QRCode.toDataURL(uri) });
});

app.post('/api/auth/login/2fa', twoFaLimiter, async (req, res) => {
  const pending = jwt.verify(req.body.pendingToken, process.env.PENDING_2FA_SECRET);
  const user = await User.findById(pending.sub);
  const ok = authenticator.verify({
    token: String(req.body.code),
    secret: decrypt(user.twoFactorSecret),
  });
  if (!ok) return res.status(401).json({ message: 'Invalid code' });
  issueTokens(res, user);
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- **Rate limit** code attempts - a 6-digit code has only 1,000,000 combinations.
- Prevent code reuse within the same time window (store last used time-step).
- Phishing-resistant option: **WebAuthn / passkeys** (FIDO2) - the browser binds the
  credential to the real domain.
- Re-ask for the code (step-up auth) before sensitive actions like disabling 2FA.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why not issue the full JWT after the password step?
A1: Then the second factor could be skipped by calling APIs directly with that token.

Q2: TOTP vs SMS?
A2: TOTP works offline and is not affected by SIM swapping; SMS is easier but less secure.

Q3: What if the user loses their phone?
A3: Backup recovery codes (single-use, stored hashed) or a verified support process.
*/
