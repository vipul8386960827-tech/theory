/* 27_crypto_module.js

=====================================================
crypto Module
=====================================================

Definition (What I should say in the interview):
- "The crypto module provides cryptographic functionality built on OpenSSL: **hashing** (SHA-256),
   **HMAC** for signing data with a secret, **secure random values** (randomBytes, randomUUID),
   **password hashing** with scrypt or pbkdf2, and **encryption** with ciphers like AES-256-GCM.
   Heavy functions like pbkdf2 and scrypt run on the libuv thread pool, so I use their async
   versions to avoid blocking the event loop."

-----------------------------------------------------
Key Concepts
-----------------------------------------------------
| Need                       | Use                                         |
|----------------------------|---------------------------------------------|
| Checksum / fingerprint     | createHash('sha256')                        |
| Sign webhook / token       | createHmac('sha256', secret)                |
| Random token / ID          | randomBytes(32).toString('hex'), randomUUID()|
| Store passwords            | scrypt / pbkdf2 with a random salt (or bcrypt lib) |
| Encrypt + decrypt data     | createCipheriv('aes-256-gcm', key, iv)      |
| Compare secrets            | timingSafeEqual(a, b)                       |

- Hashing is one-way; encryption is two-way (needs a key to decrypt).

-----------------------------------------------------
Example
-----------------------------------------------------
const crypto = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(crypto.scrypt);

// 1. Hash
const hash = crypto.createHash('sha256').update('hello').digest('hex');

// 2. HMAC - verify a webhook signature
function verify(body, signature, secret) {
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  const a = Buffer.from(expected), b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// 3. Password hashing
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, 64);
  return `${salt}:${key.toString('hex')}`;
}
async function checkPassword(password, stored) {
  const [salt, keyHex] = stored.split(':');
  const key = await scrypt(password, salt, 64);
  return crypto.timingSafeEqual(key, Buffer.from(keyHex, 'hex'));
}

// 4. Random values
console.log(hash, crypto.randomUUID(), crypto.randomBytes(8).toString('hex'));
hashPassword('s3cret').then((s) => checkPassword('s3cret', s)).then(console.log); // true

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Storing passwords with plain sha256/md5 -> too fast, easy to brute-force. Use scrypt/bcrypt/argon2.
- Comparing secrets with === -> timing attack. Use timingSafeEqual.
- Math.random() for tokens -> not cryptographically secure.
- Reusing the same IV with the same key in AES-GCM -> breaks security.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Hash vs HMAC?
A1: A hash only uses the data; HMAC mixes in a secret key, so only someone with the key can produce
    a valid signature (used in JWT HS256, webhooks).

Q2: Why is pbkdf2Sync bad in a server?
A2: It is deliberately slow and blocks the event loop; the async version runs on the thread pool.
*/
