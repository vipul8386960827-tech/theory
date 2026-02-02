/* 76_prevent_api_access */
/*
Key Points (Interviewer Keywords + Explanation):
1. Prevent API Access – Techniques to restrict unauthorized access
   to Next.js API routes or backend endpoints.

2. Purpose – Secure sensitive endpoints, protect data, and enforce
   authentication and authorization.

3. Techniques / Best Practices –
   - Authentication: Check JWT tokens, session cookies, or OAuth tokens in API routes.
   - Middleware: Use Next.js middleware to block or redirect unauthorized requests.
   - Role-based Access: Restrict access to certain endpoints based on user roles.
   - Rate Limiting / Throttling: Prevent abuse or brute-force attacks.
   - Environment Variables: Keep secrets, API keys, and credentials out of client code.
   - HTTPS: Ensure secure communication.
   - CORS: Configure Cross-Origin Resource Sharing to allow only trusted origins.

4. Benefits – Protects APIs, prevents data leaks, improves security,
   and ensures only authorized users can access sensitive endpoints.
*/

/*
Definition (Using Specific Terms):
Preventing API access in Next.js involves implementing authentication,
authorization, middleware checks, and environment-based configurations
to secure serverless API routes and sensitive backend endpoints.
*/

/*
Code Example (API Route with Auth Check):

// pages/api/secure-data.js
export default function handler(req, res) {
  const token = req.cookies.authToken || req.headers.authorization;

  if (!token || token !== "valid-token-example") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(200).json({ data: "Sensitive Data Access Granted" });
}

/*
Code Example (Using Middleware for Access Control):

// app/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken")?.value;

  if (!token || token !== "valid-token-example") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/secure-data/:path*"],
};

/*
Important Notes:
- Always verify tokens or session cookies server-side.
- Use middleware for route-level protection before API logic runs.
- Role-based checks help control access for different users.
- Never expose secrets or API keys to the client.
- Combining HTTPS, CORS, and authentication improves security.
*/

/*
Follow-up Questions + Answers:

Q1: How do you restrict API access in Next.js?
A1: Use authentication checks, middleware, and role-based access control.

Q2: Can middleware block API requests?
A2: Yes, Next.js middleware runs before route handlers to allow or block requests.

Q3: How to secure API keys?
A3: Store them in environment variables and never expose to client-side code.

Q4: What is the role of CORS in API security?
A4: Restricts which origins can access your APIs, preventing unauthorized requests.

Q5: How to handle unauthorized access?
A5: Return 401/403 status or redirect to login using middleware or API logic.
*/
