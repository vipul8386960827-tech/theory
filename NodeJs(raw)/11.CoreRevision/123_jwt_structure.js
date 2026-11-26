/* 9_jwt_structure.js

=====================================================
JWT Structure
=====================================================

Definition (What I should say in the interview):
- "A JWT has three parts separated by dots: **header.payload.signature**. The header says the
   algorithm and type, the payload holds the claims like user id, role and expiry, and the
   signature is created by signing the first two parts with a secret or private key. The header
   and payload are only **base64url-encoded, not encrypted**, so anyone can read them. The
   signature only guarantees the token was not modified and was issued by someone with the key."

-----------------------------------------------------
Structure
-----------------------------------------------------
xxxxx.yyyyy.zzzzz
1. Header    -> { "alg": "HS256", "typ": "JWT" }
2. Payload   -> { "sub": "64f1...", "role": "user", "iat": 1700000000, "exp": 1700000900 }
3. Signature -> HMACSHA256(base64url(header) + "." + base64url(payload), secret)

-----------------------------------------------------
Standard (Registered) Claims
-----------------------------------------------------
| Claim | Meaning                          |
|-------|----------------------------------|
| sub   | Subject (user id)                |
| iat   | Issued at (seconds since epoch)  |
| exp   | Expiration time                  |
| nbf   | Not valid before                 |
| iss   | Issuer (who created the token)   |
| aud   | Audience (who the token is for)  |
| jti   | Unique token id (for denylist)   |

-----------------------------------------------------
Example (decoding vs verifying)
-----------------------------------------------------
const jwt = require('jsonwebtoken');
const token = jwt.sign({ sub: '123', role: 'user' }, 'secret', { expiresIn: '15m' });

// Anyone can read the payload without the secret:
const payloadPart = token.split('.')[1];
console.log(JSON.parse(Buffer.from(payloadPart, 'base64url').toString()));

jwt.decode(token);                 // reads payload, NO signature check
jwt.verify(token, 'secret', {      // checks signature + exp (+ iss/aud if given)
  algorithms: ['HS256'], issuer: 'my-api', audience: 'my-app',
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Never put secrets or PII (password, card number) in the payload.
- If a user edits the payload (role: "admin"), the signature no longer matches -> verify fails.
- exp/iat are in **seconds**, not milliseconds like Date.now().
- If you really need confidentiality, use JWE (encrypted JWT), but it is rare in typical APIs.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is a JWT encrypted?
A1: A normal JWT (JWS) is signed, not encrypted. Payload is readable by anyone.

Q2: What is the "alg: none" attack?
A2: Attacker sets alg to none and removes the signature. Prevent it by always passing an
    explicit algorithms list to jwt.verify.

Q3: Why base64url and not base64?
A3: base64url replaces + and / and removes padding so the token is safe in URLs and headers.
*/
