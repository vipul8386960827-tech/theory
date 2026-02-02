/* 430_crypto_module.js

=====================================================
Crypto Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `crypto` module in Node.js provides cryptographic functionalities, 
  including hashing, encryption, decryption, signing, and verifying data. 
  It uses OpenSSL under the hood to ensure strong and secure cryptography."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides **hashing algorithms** (SHA256, SHA512, MD5, etc.).
2. Supports **HMAC** (hash-based message authentication codes).
3. Offers **symmetric encryption/decryption** (AES, etc.).
4. Supports **asymmetric encryption** (RSA, EC keys).
5. Enables **digital signing and verification**.
6. Includes **key generation** and **password-based key derivation** (PBKDF2, scrypt).
7. Supports **random data generation** for cryptographic use.

-----------------------------------------------------
Basic Example (Hashing with SHA256)
-----------------------------------------------------
const crypto = require('crypto');

const hash = crypto.createHash('sha256')
                   .update('Hello World')
                   .digest('hex');

console.log('SHA256 Hash:', hash);

-----------------------------------------------------
Example (HMAC)
-----------------------------------------------------
const hmac = crypto.createHmac('sha256', 'secret-key')
                   .update('Authenticate this')
                   .digest('hex');

console.log('HMAC:', hmac);

-----------------------------------------------------
Example (Symmetric Encryption / Decryption)
-----------------------------------------------------
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const encryptedText = encrypt('Sensitive Data');
const decryptedText = decrypt(encryptedText);

console.log('Encrypted:', encryptedText);
console.log('Decrypted:', decryptedText);

-----------------------------------------------------
Example (Key Derivation with PBKDF2)
-----------------------------------------------------
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Derived Key:', derivedKey.toString('hex'));
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Password hashing and secure storage.
- Encrypting sensitive data like tokens or API keys.
- Signing data to ensure authenticity.
- Verifying integrity of files or messages.
- Generating secure random numbers for tokens.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Always use strong algorithms like **SHA-256/512** (avoid MD5, SHA-1).
2. Use `crypto.randomBytes()` for secure random values (not `Math.random()`).
3. For password storage, use PBKDF2, bcrypt, scrypt, or Argon2.
4. Ensure IVs (initialization vectors) are unique and random for each encryption.
5. TLS and HTTPS internally rely on this module for cryptographic operations.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the crypto module as a **digital safe**:
  - Hashing is like making a fingerprint of a document.
  - Encryption is like locking data in the safe with a key.
  - Digital signatures are like notarized seals ensuring authenticity.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between hashing and encryption?  
A1: Hashing is one-way and irreversible, used for integrity. Encryption is two-way and reversible with a key, used for confidentiality.

Q2: Why shouldn’t we use MD5 or SHA-1?  
A2: They are broken (collision attacks exist), making them insecure for cryptographic purposes.

Q3: What is the purpose of an initialization vector (IV)?  
A3: It ensures uniqueness in encryption outputs, even for identical inputs.

Q4: How can you securely store user passwords?  
A4: By hashing with a strong algorithm and salt, using PBKDF2, bcrypt, or Argon2.

Q5: How does HMAC differ from hashing?  
A5: HMAC adds a secret key to hashing, providing both data integrity and authentication.
*/
