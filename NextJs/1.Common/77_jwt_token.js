/* 77_jwt_token */
/*
Key Points (Interviewer Keywords + Explanation):
1. JWT Token – JSON Web Token, a compact, URL-safe way to securely
   transmit information between client and server.

2. Purpose – Authenticate users, authorize access, and verify identity
   without storing session state on the server.

3. Structure – A JWT consists of three parts:
   - Header: Metadata about the token (algorithm, type)
   - Payload: Contains claims like user ID, role, and expiration
   - Signature: Verifies that the token hasn’t been tampered with

4. Features –
   - Stateless authentication (no server-side session required)
   - Can include custom claims (roles, permissions)
   - Expiration time can be set
   - Can be stored in HttpOnly cookies or localStorage (better in HttpOnly cookies for security)

5. Benefits – Secure, scalable authentication mechanism,
   supports APIs and serverless functions, easy to verify and pass between client and server.
*/

/*
Definition (Using Specific Terms):
JWT is a secure token format that allows stateless authentication
by embedding user data in a signed token, which can be verified
without storing sessions on the server.
*/

/*
Code Example (Generate and Verify JWT):

import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

// Generate JWT
export function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

// Verify JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

/*
Code Example (API Route using JWT for Auth):

// pages/api/protected.js
import { verifyToken } from "../../lib/jwt";

export default function handler(req, res) {
  const token = req.cookies.authToken || req.headers.authorization;

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(200).json({ message: "Access granted", user });
}
*/

/*
Important Notes:
- Prefer storing JWT in HttpOnly, Secure cookies to prevent XSS.
- Always verify token server-side before providing access.
- Set expiration time to reduce security risks.
- Can be used with API routes, middleware, and serverless functions.
- Avoid storing sensitive info directly in the payload; use minimal claims.
*/

/*
Follow-up Questions + Answers:

Q1: What is a JWT token?
A1: A secure, stateless token used to authenticate and authorize users.

Q2: Where can JWT be stored on the client?
A2: HttpOnly cookies (recommended) or localStorage/sessionStorage.

Q3: How does JWT verify authenticity?
A3: Using the signature part with a secret key or public/private keys.

Q4: Can JWT be used in Next.js API routes?
A4: Yes, serverless API routes can verify JWT for protected endpoints.

Q5: Why use JWT over traditional sessions?
A5: Stateless, scalable, no server-side session storage needed, easy to use in APIs.
*/
