/* 
Key Points (Interviewer Keywords + Explanation):
1. JWT (JSON Web Token) - A **compact, self-contained token** used to securely transmit information 
   between client and server as a JSON object.
2. Structure - JWT consists of **Header, Payload, and Signature**.
   - Header: Algorithm and token type.
   - Payload: Claims like user ID, roles, or expiration.
   - Signature: Ensures token integrity using a secret key.
3. Stateless Authentication - JWT allows **server to verify identity** without storing session state.
4. Storage - Can be stored in **HTTP-only cookies** (secure) or **localStorage** (less secure).
5. Verification - Server verifies the signature and optionally checks claims like expiration.
6. Next.js Usage - JWTs are often used in **API routes, Middleware, and Server Actions** for authentication and authorization.

Definition (Using Specific Terms):
A **JWT (JSON Web Token)** is a stateless, compact token that securely transmits user information 
between client and server. It contains a **Header** specifying the algorithm, a **Payload** with claims 
like user ID or roles, and a **Signature** to ensure integrity. In Next.js, JWTs can be stored in 
**HTTP-only cookies** and verified in **Middleware, API routes, or Server Actions** to protect routes 
and sensitive operations.

Code Example:

// utils/jwt.js
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET

export function signToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (err) {
    return null
  }
}

// app/api/login/route.js
import { NextResponse } from 'next/server'
import { signToken } from '../../../utils/jwt'

export async function POST(request) {
  const { username } = await request.json()
  // Validate user (dummy example)
  if (username === 'admin') {
    const token = signToken({ username, role: 'admin' })
    const response = NextResponse.json({ success: true })
    response.cookies.set('authToken', token, { httpOnly: true, secure: true })
    return response
  }
  return NextResponse.json({ success: false }, { status: 401 })
}

Follow-up Questions + Answers:

Q1: What is the structure of a JWT?
A1: JWT has three parts: **Header, Payload, and Signature**.

Q2: How is JWT used in Next.js?
A2: For authentication and authorization in **API routes, Middleware, Server Actions**, 
    usually stored in **HTTP-only cookies** for security.

Q3: Can JWT be used for stateless authentication?
A3: Yes, the server can verify the token without storing session data.

Q4: Why use HTTP-only cookies for JWT?
A4: To prevent **XSS attacks**, as JavaScript cannot access the token.

Q5: How does the server verify a JWT?
A5: By checking the **signature** using the secret key and optionally validating claims like expiration.
*/
