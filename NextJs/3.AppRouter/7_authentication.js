/* 
Key Points (Interviewer Keywords + Explanation):
1. Authentication - Process of verifying user identity in a Next.js app.
2. Protecting Routes - Prevent unauthorized users from accessing certain pages or sections.
   Typically done in **Middleware** or **Server Components**.
3. Sensitive Operations - Actions that require authorization, e.g., editing/deleting data,
   accessing personal info, admin tasks, or payments.
4. Client-side Authentication / Manage UI - Dynamically show or hide UI elements (buttons, links, menus) 
   depending on user's login status.
5. Middleware Authentication - Use **middleware** to protect routes and redirect unauthorized users.
6. Server-side Authentication - Perform checks in **Server Components** or **Server Actions** 
   to secure sensitive operations.
7. JWT / Cookies - Common methods for storing authentication tokens.
8. Session Management - Keep track of logged-in users using **cookies**, **JWT**, or frameworks like NextAuth.js.
9. NextAuth.js - Popular library for authentication in Next.js that supports providers, sessions, and callbacks.

Definition (Using Specific Terms):
**Authentication** in Next.js can be handled at multiple levels:  
- **Protecting routes** ensures that only authorized users can access certain pages.  
- **Sensitive operations** are actions that require proper authorization like deleting accounts or accessing personal data.  
- **Client-side authentication / managing UI** allows dynamically showing or hiding UI elements depending on login state.  
Middleware checks can protect routes, while Server Components or Server Actions secure sensitive operations.  
Tokens (JWT/cookies) or libraries like **NextAuth.js** help manage sessions and simplify authentication flows.

Code Example:

// app/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('authToken')?.value

  // Protect /dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

// app/dashboard/page.js (Server Component example)
export default function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard - Protected Page</h1>
      <p>Welcome, {user?.name || 'Guest'}!</p>
      {/* Sensitive operation: delete user data }
      {user && <button>Delete Account</button>}
    </div>
  )
}

// app/components/NavBar.js (Client Component example for managing UI)
'use client'
import { useState, useEffect } from 'react'

export default function NavBar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch current user session or check cookie
    fetch('/api/session')
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  return (
    <nav>
      <a href="/">Home</a>
      {user ? (
        <>
          <a href="/dashboard">Dashboard</a>
          <button>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  )
}

// Using NextAuth.js in app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

Follow-up Questions + Answers:

Q1: What does it mean to "protect routes" in Next.js?
A1: Prevent unauthorized users from accessing certain pages using **Middleware** 
    or **Server-side checks**.

Q2: What are "sensitive operations"?
A2: Actions like deleting accounts, editing content, accessing personal or payment data, 
    or admin-only tasks.

Q3: What does "managing UI on the client side" mean?
A3: Dynamically showing or hiding UI elements (buttons, links, sections) based on 
    the user's authentication state.

Q4: How do you implement client-side authentication?
A4: Use a **Client Component**, fetch session data or cookies, and conditionally 
    render UI based on login status.

Q5: How do you combine client-side and server-side authentication?
A5: **Middleware** or **Server Components** secure routes and sensitive operations, 
    while **Client Components** manage dynamic UI changes for the user.
*/
