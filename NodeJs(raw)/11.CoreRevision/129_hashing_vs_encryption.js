/* 18_hashing_vs_encryption.js

=====================================================
Hashing vs Encryption
=====================================================

Definition (What I should say in the interview):
- "**Hashing** is one-way: it turns input into a fixed-length digest and you cannot get the
   original back - you can only hash again and compare. **Encryption** is two-way: data is
   encrypted with a key and can be decrypted with the right key. So passwords are hashed,
   because we only need to verify them, while data we must read later, like an API key for a
   third-party service or a user's phone number, is encrypted. Encoding like base64 is neither -
   it is just a format change with no key."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect        | Hashing                      | Encryption                     | Encoding        |
|---------------|------------------------------|--------------------------------|-----------------|
| Reversible?   | No (one-way)                 | Yes, with key                  | Yes, no key     |
| Key           | No (optional HMAC key)       | Yes (symmetric / asymmetric)   | No              |
| Output size   | Fixed                        | Depends on input               | Depends         |
| Purpose       | Integrity, password storage  | Confidentiality                | Data transport  |
| Examples      | bcrypt, argon2, SHA-256      | AES-256-GCM, RSA               | base64, hex     |

-----------------------------------------------------
Example (Node crypto)
-----------------------------------------------------
const crypto = require('crypto');

// Hash (integrity check, e.g. file checksum)
crypto.createHash('sha256').update('hello').digest('hex');

// HMAC = hash + secret key (e.g. webhook signature verification)
crypto.createHmac('sha256', process.env.WEBHOOK_SECRET).update(rawBody).digest('hex');

// Encrypt / decrypt with AES-256-GCM
const key = Buffer.from(process.env.ENC_KEY, 'hex');   // 32 bytes
function encrypt(text) {
  const iv = crypto.randomBytes(12);                   // unique per encryption
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), enc].map((b) => b.toString('hex')).join(':');
}
function decrypt(payload) {
  const [iv, tag, enc] = payload.split(':').map((h) => Buffer.from(h, 'hex'));
  const d = crypto.createDecipheriv('aes-256-gcm', key, iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(enc), d.final()]).toString('utf8');
}

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- "Encrypting" passwords -> if the key leaks, all passwords leak. Hash them instead.
- Reusing an IV with the same key in AES-GCM -> breaks security.
- Calling base64 "encryption".

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is a JWT hashed or encrypted?
A1: Signed. The signature uses an HMAC (HS256) or RSA signature (RS256); payload is just encoded.

Q2: Why is SHA-256 bad for passwords but fine for checksums?
A2: It is designed to be fast. For passwords we want slow, salted hashes like bcrypt/argon2.
*/
