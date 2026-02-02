/* 72_security_practices */
/*
Key Points (Interviewer Keywords + Explanation):
1. Security Practices – Measures to protect Next.js applications
   from attacks and data breaches.

2. Purpose – Ensure safe data handling, prevent vulnerabilities,
   and protect user information.

3. Techniques / Best Practices –
   - Authentication & Authorization: Use secure tokens, sessions, and role-based access.
   - Use HttpOnly & Secure cookies for sensitive data.
   - Input Validation & Sanitization: Prevent XSS, SQL injection, and other attacks.
   - Enable CORS properly for APIs.
   - Avoid exposing secrets in client-side code; use environment variables.
   - HTTPS: Serve all pages over HTTPS to protect data in transit.
   - Content Security Policy (CSP): Restrict sources of scripts, images, etc.
   - Keep dependencies updated to avoid known vulnerabilities.
   - Rate limiting & throttling API endpoints to prevent abuse.
   - Use middleware to handle security checks server-side.
*/

/*
Definition (Using Specific Terms):
Security practices in Next.js involve authentication, authorization,
data validation, secure storage (cookies, environment variables),
CORS configuration, HTTPS, CSP, and general precautions to prevent
attacks like XSS, injection, and data leaks.
*/

/*
Code Example (Middleware for Authentication & Role Check):

// app/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Example role-based authorization
  const userRole = decodeJWT(token)?.role; // decodeJWT is hypothetical
  if (request.nextUrl.pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};

/*
Code Example (Setting Secure Cookies in API Route):

import { serialize } from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("authToken", "secureToken123", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    })
  );
  res.status(200).json({ message: "Secure cookie set" });
}
*/

/*
Important Notes:
- Always store sensitive tokens in HttpOnly, Secure cookies.
- Validate and sanitize all user inputs.
- Use middleware for route protection and authorization.
- Use environment variables for secrets, not client-side code.
- Serve the app over HTTPS.
- Regularly update dependencies to avoid vulnerabilities.
*/

/*
Follow-up Questions + Answers:

Q1: How do you protect routes in Next.js?
A1: Use middleware, server-side checks, and role-based access control.

Q2: How should you store sensitive tokens?
A2: In HttpOnly, Secure cookies; avoid localStorage for auth tokens.

Q3: What is CORS and why is it important?
A3: Cross-Origin Resource Sharing; it controls which origins can access your APIs to prevent unwanted requests.

Q4: How can you prevent XSS attacks?
A4: Sanitize inputs, escape outputs, and use safe rendering practices.

Q5: Should secrets be in client-side code?
A5: No, use environment variables and server-side logic for sensitive information.
*/
