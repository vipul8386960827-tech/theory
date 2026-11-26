/* 19_salting.js

=====================================================
Salting (and Peppering)
=====================================================

Definition (What I should say in the interview):
- "A **salt** is a random value, unique per password, that is combined with the password before
   hashing. Because every user has a different salt, the same password gives different hashes,
   so attackers cannot use precomputed **rainbow tables** and cannot crack all users with the
   same password at once. The salt is not secret - it is stored together with the hash, and
   bcrypt does this automatically by embedding the salt in the hash string."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Salt must be **random and unique per password** (not one global salt, not the username).
2. Salt is stored in plain text next to the hash - that is fine.
3. Salt defeats: rainbow tables, identical-hash detection, batch cracking.
4. Salt does NOT make a weak password strong - a slow algorithm is still required.
5. **Pepper**: an extra secret value (same for all users) stored outside the DB (env / KMS).
   If only the DB leaks, hashes cannot be cracked without the pepper.

-----------------------------------------------------
Example
-----------------------------------------------------
const bcrypt = require('bcrypt');
const salt = await bcrypt.genSalt(12);
const hash = await bcrypt.hash('Secret123', salt);
// '$2b$12$' + 22-char salt + 31-char hash -> salt is inside

console.log(await bcrypt.hash('Secret123', 12) === await bcrypt.hash('Secret123', 12)); // false

// Manual salting with Node's built-in scrypt (what bcrypt does for you)
const crypto = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(crypto.scrypt);

async function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = await scrypt(pw, salt, 64);
  return `${salt}:${derived.toString('hex')}`;
}

async function verifyPassword(pw, stored) {
  const [salt, key] = stored.split(':');
  const derived = await scrypt(pw, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), derived);
}

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Use crypto.timingSafeEqual for manual comparisons to avoid timing attacks.
- Pepper idea: HMAC the password with the pepper first, then bcrypt it. Rotating a pepper
  is hard, so plan for it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Where is the salt stored with bcrypt?
A1: Inside the hash string itself, right after the cost factor.

Q2: Does the salt need to be secret?
A2: No. Its job is uniqueness, not secrecy. The pepper is the secret part.

Q3: What is a rainbow table?
A3: A precomputed lookup of hashes for common passwords. Unique salts make it useless.
*/
