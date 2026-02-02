/* 63_security_app_router */
/*
Key Points (Interviewer Keywords + Explanation):
1. Security in App Router – Protecting Next.js app routes and API endpoints
   from unauthorized access and attacks.

2. Authentication – Use JWT, session cookies, or OAuth to secure pages.
   Check user identity before rendering sensitive pages.

3. Authorization – Control access based on roles or permissions
   inside layout or page components.

4. Server-Side Security – Use middleware to validate requests before
   they reach the page or API.

5. Best Practices –
   - Use HttpOnly & Secure cookies for authentication tokens.
   - Sanitize user inputs to prevent XSS/Injection.
   - Enable CORS properly for APIs.
   - Avoid exposing sensitive data in client-side code.
   - Use environment variables for secrets.
*/

/*
Definition (Using Specific Terms):
Security in App Router involves authentication, authorization, and
server-side request validation. Use middleware and secure headers
to ensure only authorized users can access certain routes or API endpoints.
*/

/*
Code Example (Protecting Page with Auth in App Router):

// app/dashboard/page.js
import { redirect } from "next/navigation";

export default function DashboardPage({ user }) {
  // Server-side check
  if (!user) {
    redirect("/login"); // Redirect unauthorized users
  }
  return <h1>Dashboard for {user.name}</h1>;
}

// Middleware (app/middleware.js)
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Optional: Verify JWT token here

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to dashboard routes
};
*/

/*
Important Notes:
- Use middleware for route protection.
- Authentication tokens should be stored in HttpOnly, Secure cookies.
- Input sanitization and CORS configuration are crucial.
- Environment variables should be used for secrets (JWT keys, API keys).
- Works with App Router pages and API routes.
*/

/*
Follow-up Questions + Answers:

Q1: How do you secure pages in App Router?
A1: Use middleware and server-side checks to authenticate users.

Q2: How do you store authentication tokens securely?
A2: Use HttpOnly, Secure cookies; avoid localStorage for sensitive tokens.

Q3: Can you restrict access based on roles?
A3: Yes, check user role in middleware or page and redirect if unauthorized.

Q4: How is middleware applied in App Router?
A4: Create app/middleware.js and define matcher for protected routes.

Q5: What other security practices should be followed?
A5: Input validation, CORS configuration, avoiding sensitive client-side exposure, and using environment variables for secrets.
*/
