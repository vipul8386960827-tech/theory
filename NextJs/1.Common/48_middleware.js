/*
Key Points (Interviewer Keywords + Explanation):
1. Middleware – Next.js feature to run code before a request completes,
   at the edge (serverless or Vercel Edge).

2. Purpose – Allows routing, authentication, logging, or request modification
   before reaching the page or API route.

3. Implementation – Create a `middleware.js` or `middleware.ts` file
   in the project root or specific folder.

4. API – Middleware uses `NextResponse` to rewrite, redirect,
   or modify requests.

5. Benefits – Enables authentication, A/B testing, redirects,
   locale handling, and caching at the edge without extra server code.
*/

/*
Definition (Using Specific Terms):
Middleware in Next.js is code that intercepts requests before
they hit the route handler. It runs at the edge and can:
- Rewrite URLs
- Redirect users
- Set headers
- Perform checks like authentication
*/

/*
Code Example (middleware.js):

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Redirect to login if not authenticated
  const token = request.cookies.get("token");
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Add custom header
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "my-value");

  return response;
}

// Apply middleware only to specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
*/

/*
Important Notes:
- Middleware runs before request reaches page or API route.
- Runs on edge, avoid long blocking operations.
- Use NextResponse to redirect, rewrite, or modify response.
- Restrict paths using matcher.
- Works with both Pages Router and App Router.
*/

/*
Follow-up Questions + Answers:

Q1: What is middleware in Next.js?
A1: Code that runs before a request is completed, allowing redirects,
   rewrites, or checks.

Q2: Where do you create middleware?
A2: In middleware.js or middleware.ts at project root or folder level.

Q3: How do you control which routes middleware applies to?
A3: Using the matcher property in the middleware config.

Q4: Can middleware perform authentication?
A4: Yes, it’s ideal for auth checks at the edge.

Q5: Does middleware run on the client?
A5: No, it runs on the server/edge before the request reaches the route.
*/

/*
Definition:
In Next.js, middleware “runs on the edge” means it executes **on edge servers**
(or serverless functions) **before the request reaches your main app or page**.

1. Edge Servers:
   - These are lightweight servers deployed close to the user,
     often part of a Content Delivery Network (CDN).
   - Examples: Vercel Edge, Cloudflare Workers, Netlify Edge Functions.

2. Why “Edge” matters:
   - Reduced latency: Middleware executes **closer to the user**, so redirects,
     authentication checks, or header modifications happen faster.
   - Offloads your main server: The actual Next.js page or API route doesn’t
     need to handle these checks.
   - Scales automatically: Edge servers are distributed globally and
     handle lots of requests simultaneously.

3. Middleware vs API Route:
   - Middleware runs **before** the request reaches a page or API route.
   - It can modify requests, perform redirects, or add headers **at the edge**.
   - API routes run on the main server, not at edge locations by default.
*/

/*
Example:
- User requests: https://example.com/dashboard
- Middleware runs on the nearest edge server:
  - Checks cookie for authentication
  - Redirects to /login if not authenticated
- Only if allowed, the request proceeds to the actual dashboard page

Benefits:
- Faster response times
- Reduces load on origin server
- Enables global routing logic (auth, A/B testing, locale detection) at the edge
*/
