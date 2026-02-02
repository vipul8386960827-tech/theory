/* 
Key Points (Interviewer Keywords + Explanation):
1. Middleware - Functions in Next.js that run **before a request is completed**, used for routing,
   authentication, or headers.
2. app/middleware.js - File where middleware is defined, automatically executed for all routes.
3. Edge Runtime - Middleware runs on the **Edge Runtime**, not Node.js, for fast global execution.
4. Request & Response - Middleware receives a **Request** object and can return a **Response**,
   redirect, or next().
5. Redirects & Rewrites - Middleware can redirect users or rewrite paths before reaching the page.
6. Conditional Logic - Can run middleware conditionally based on URL, headers, cookies, or auth status.
7. Limitations - No access to Node.js APIs (like fs), only Web API features supported in Edge Runtime.

Definition (Using Specific Terms):
In Next.js App Router, **Middleware** is a function placed in **app/middleware.js** that runs 
on the **Edge Runtime** before a request reaches a page or API route. 
It receives a **Request** object, can perform authentication, logging, or URL rewrites, 
and can return **Response**, **redirect()**, or let the request continue. 
Middleware allows **conditional logic** and **global pre-processing** for all routes.

Code Example:

// app/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Example: Redirect /admin if user not authenticated
  const isAuthenticated = false // hypothetical check
  if (pathname.startsWith('/admin') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Example: Rewrite /old-path to /new-path
  if (pathname === '/old-path') {
    return NextResponse.rewrite(new URL('/new-path', request.url))
  }

  // Continue to next
  return NextResponse.next()
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/admin/:path*', '/old-path'],
}

Follow-up Questions + Answers:

Q1: Where is middleware defined in Next.js App Router?
A1: In **app/middleware.js**, automatically applied to all or matched routes.

Q2: What runtime does middleware use?
A2: Middleware runs on the **Edge Runtime**, not Node.js, for low-latency global execution.

Q3: Can you use Node.js APIs inside middleware?
A3: No, only Web APIs are available (Request, Response, URL, headers, cookies).

Q4: How do you conditionally apply middleware?
A4: Use the **matcher** configuration or check the request URL/headers inside the middleware function.

Q5: What can middleware do before a request?
A5: It can **redirect**, **rewrite**, **modify headers**, or perform **authentication checks**.
*/
