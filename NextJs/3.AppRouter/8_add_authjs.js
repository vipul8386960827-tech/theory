/* 8_add_authjs */
/* 
Key Points (Interviewer Keywords + Explanation):
1. NextAuth.js - Popular authentication library for Next.js that simplifies user login, session, and provider management.
2. Providers - External services like Google, GitHub, Facebook used for OAuth login.
3. JWT / Session Strategy - NextAuth.js supports JWT-based or database-backed session management.
4. API Route - NextAuth.js is implemented in an API route (`app/api/auth/[...nextauth]/route.js`) to handle authentication.
5. Callbacks - Functions to customize token, session, and user data.
6. Client-side Session - Access the current session in Client Components using `useSession` hook.
7. Server-side Session - Access session in Server Components via `getServerSession` helper.
8. Middleware Integration - Protect routes based on NextAuth.js session.

Definition (Using Specific Terms):
**NextAuth.js** is a Next.js library that provides a complete authentication solution. 
It allows using multiple **providers** (Google, GitHub, etc.) for OAuth login, manages **sessions** 
via JWT or database, and can be integrated in **Client Components** and **Server Components**. 
Authentication logic is implemented in an **API Route** under `app/api/auth/[...nextauth]/route.js`, 
with optional **callbacks** for customizing token or session data. Middleware can use 
NextAuth.js sessions to **protect routes**.

Code Example:

// app/api/auth/[...nextauth]/route.js
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// Client-side session example
'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav>
      <a href="/">Home</a>
      {session ? (
        <>
          <a href="/dashboard">Dashboard</a>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn('github')}>Login with GitHub</button>
      )}
    </nav>
  )
}

// Server-side session example (Server Component)
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) return <p>Please login to access the dashboard</p>

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  )
}

Follow-up Questions + Answers:

Q1: What is NextAuth.js used for in Next.js?
A1: Provides a complete authentication solution including login, session management, 
    and OAuth providers integration.

Q2: Where is NextAuth.js implemented in App Router?
A2: In an **API Route** under `app/api/auth/[...nextauth]/route.js`.

Q3: How do you access session data on the client side?
A3: Use the `useSession` hook from `next-auth/react` in Client Components.

Q4: How do you access session data on the server side?
A4: Use the `getServerSession(authOptions)` helper in Server Components.

Q5: How can NextAuth.js be used with middleware?
A5: Middleware can read the session to **protect routes** and redirect unauthorized users.
*/
