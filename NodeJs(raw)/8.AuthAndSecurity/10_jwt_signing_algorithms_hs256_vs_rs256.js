/* 10_jwt_signing_algorithms_hs256_vs_rs256.js

=====================================================
JWT Signing Algorithms: HS256 vs RS256
=====================================================

Definition (What I should say in the interview):
- "**HS256** is a symmetric algorithm: HMAC with SHA-256 using one **shared secret** for both
   signing and verifying. **RS256** is asymmetric: the auth server signs with a **private key**
   and other services verify with the **public key**. For a single monolith HS256 is simple and
   fine. When many services need to verify tokens, RS256 is better, because only the auth
   service holds the private key and the others cannot create tokens."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect            | HS256                         | RS256                              |
|-------------------|-------------------------------|------------------------------------|
| Type              | Symmetric (HMAC)              | Asymmetric (RSA signature)         |
| Keys              | One shared secret             | Private key signs, public verifies |
| Who can sign      | Anyone with the secret        | Only private key holder            |
| Key distribution  | Secret must be shared safely  | Public key can be shared openly    |
| Speed / size      | Faster, smaller signature     | Slower, bigger signature           |
| Typical use       | Single app / monolith         | Microservices, OAuth/OIDC (JWKS)   |

-----------------------------------------------------
Example
-----------------------------------------------------
const jwt = require('jsonwebtoken');
const fs = require('fs');

// HS256 - long random secret (at least 256 bits)
const t1 = jwt.sign({ sub: '1' }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '15m' });
jwt.verify(t1, process.env.JWT_SECRET, { algorithms: ['HS256'] });

// RS256 - auth service signs with private key
const privateKey = fs.readFileSync('./keys/private.pem');
const publicKey = fs.readFileSync('./keys/public.pem');
const t2 = jwt.sign({ sub: '1' }, privateKey, { algorithm: 'RS256', expiresIn: '15m' });

// other services only have the public key
jwt.verify(t2, publicKey, { algorithms: ['RS256'] });

// generate keys: openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
//                openssl rsa -pubout -in private.pem -out public.pem

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- **Algorithm confusion attack**: if the server accepts any alg, an attacker can sign an HS256
  token using the RS256 public key as the HMAC secret. Always pin algorithms in verify().
- Other options: ES256 (ECDSA, smaller keys), EdDSA.
- OAuth providers publish public keys at a JWKS endpoint and rotate them using the "kid" header.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is RS256 "more secure" than HS256?
A1: Both are strong. RS256 is safer for distribution because verifiers cannot forge tokens.

Q2: What makes HS256 weak in practice?
A2: Short or guessable secrets like "secret123" - they can be brute-forced offline from a token.

Q3: How do you rotate keys?
A3: Add a "kid" (key id) in the header, keep old and new keys active during a transition period.
*/
