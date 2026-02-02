/* 
Key Points (Interviewer Keywords + Explanation):
1. Authorization - Process of verifying if a user has permission to access a specific route 
   or resource.
2. Middleware Authorization - Use **Next.js Middleware** to protect routes based on roles or 
   authentication state.
3. Protecting Routes - Middleware runs **before the request reaches the page**, redirecting 
   unauthorized users.
4. Sensitive Operations - Actions like updating/deleting data, accessing private user info, 
   or admin-only pages.
5. Client-side UI Management - Server can determine auth state and pass minimal data to the client 
   to control what UI elements are shown.
6. Tokens & Sessions - JWTs, cookies, or session data can be used to determine authorization.
7. Granular Access - Middleware can check **roles, permissions, or route patterns** to protect 
   specific pages or API endpoints.

Definition (Using Specific Terms):
**Authorization** in Next.js ensures that only users with proper permissions can access 
certain routes or perform sensitive operations. Using **Middleware**, routes can be protected 
before rendering, checking tokens, sessions, or roles. **Server Components** handle sensitive 
logic, while **Client Components** can manage UI based on the user's authorization state. 
This approach ensures secure access control and hides sensitive data from unauthorized users.

Code Example:

// app/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('authToken')?.value
  const userRole = request.cookies.get('role')?.value

  // Protect /admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect /dashboard for logged-in users
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}

// app/dashboard/page.js (Server Component)
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard - Protected</h1>
      <p>Only authorized users can see this content.</p>
    </div>
  )
}

Follow-up Questions + Answers:

Q1: What is the difference between authentication and authorization?
A1: Authentication verifies **who the user is**, while authorization verifies **what the user is allowed to do**.

Q2: How can you protect routes in Next.js App Router?
A2: Use **Middleware** to redirect unauthorized users before they reach the page or API route.

Q3: What are sensitive operations in Next.js?
A3: Operations like updating/deleting data, accessing admin pages, or viewing private user info.

Q4: How do you manage UI for authorized vs unauthorized users?
A4: Use **Server Components** to determine auth state and pass minimal props to **Client Components** 
    to conditionally render UI elements.

Q5: Can you use JWTs or cookies for authorization checks?
A5: Yes, JWTs or cookies are commonly used to determine user permissions and roles securely.

Q6: Can authorization logic be handled on the client?
A6: It can manage UI visibility, but **sensitive checks should always be done on the server** 
    to prevent bypassing.
*/
