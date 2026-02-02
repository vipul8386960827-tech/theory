/* 
Key Points (Interviewer Keywords + Explanation):
1. Middleware - Code that runs **before a request reaches a route/page** in Next.js.
2. app/middleware.js - Middleware file in App Router that can intercept requests.
3. NextResponse - Object used to **redirect, rewrite, or modify requests/responses**.
4. Matcher - Defines which routes the middleware should run on.
5. Edge Runtime - Middleware runs in **Edge environment**, meaning fast global execution.
6. Use Cases - Authentication, logging, redirects, rate-limiting, feature flags.

Definition (Using Specific Terms):
**Middleware** in Next.js is a server-side function that executes **before routing occurs**.  
It lives in `app/middleware.js` and uses **NextResponse** to manipulate requests or responses.  
With **matcher**, you can limit middleware to specific routes.  
Middleware runs in **Edge Runtime** by default, giving **low-latency global execution**.  
Common uses include protecting routes, logging requests, redirecting users, or setting headers.

Code Example:

// app/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('authToken')?.value

  // Protect /dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Example: Add a custom header to all requests
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'my-middleware')
  return response
}

// Apply middleware only to /dashboard and /profile
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}

Follow-up Questions + Answers:

Q1: What is middleware in Next.js?
A1: Middleware is a server-side function that runs **before a request reaches a page or API route**, 
    allowing redirects, rewrites, or response modifications.

Q2: Where do you define middleware?
A2: In `app/middleware.js` (App Router).

Q3: What is NextResponse?
A3: NextResponse is used to **modify requests or responses**, such as redirecting, rewriting, or setting headers.

Q4: Can middleware be applied to specific routes?
A4: Yes, using the **matcher** property in the middleware config.

Q5: Where does middleware run?
A5: In **Edge Runtime**, providing fast, globally distributed execution.

Q6: Give a common use case for middleware.
A6: Protecting routes, logging requests, rate-limiting, adding headers, or feature flags.

*/
/* 
Key Points (Interviewer Keywords + Explanation):
1. Middleware - Code that runs **before a request reaches a route/page** in Next.js.
2. app/middleware.js - Middleware file in App Router that can intercept requests.
3. NextResponse - Object used to **redirect, rewrite, or modify requests/responses**.
4. Matcher - Defines which routes the middleware should run on.
5. Edge Runtime - Middleware runs in **Edge environment**, meaning fast global execution.
6. Use Cases - Authentication, logging, redirects, rate-limiting, feature flags.

Definition (Using Specific Terms):
**Middleware** in Next.js is a server-side function that executes **before routing occurs**.  
It lives in `app/middleware.js` and uses **NextResponse** to manipulate requests or responses.  
With **matcher**, you can limit middleware to specific routes.  
Middleware runs in **Edge Runtime** by default, giving **low-latency global execution**.  
Common uses include protecting routes, logging requests, redirecting users, or setting headers.

Code Example:

// app/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('authToken')?.value

  // Protect /dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Example: Add a custom header to all requests
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'my-middleware')
  return response
}

// Apply middleware only to /dashboard and /profile
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}

Follow-up Questions + Answers:

Q1: What is middleware in Next.js?
A1: Middleware is a server-side function that runs **before a request reaches a page or API route**, allowing redirects, rewrites, or response modifications.

Q2: Where do you define middleware?
A2: In `app/middleware.js` (App Router).

Q3: What is NextResponse?
A3: NextResponse is used to **modify requests or responses**, such as redirecting, rewriting, or setting headers.

Q4: Can middleware be applied to specific routes?
A4: Yes, using the **matcher** property in the middleware config.

Q5: Where does middleware run?
A5: In **Edge Runtime**, providing fast, globally distributed execution.

Q6: Give a common use case for middleware.
A6: Protecting routes, logging requests, rate-limiting, adding headers, or feature flags.

*/
