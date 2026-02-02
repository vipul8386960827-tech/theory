/* 
Key Points (Interviewer Keywords + Explanation):
1. Auth Tokens - Tokens used to verify user identity and session in Next.js apps.
2. JWT (JSON Web Token) - Encoded token commonly used for authentication, containing user info and expiration.
3. Cookies - Browser storage to persist auth tokens for session management.
4. Access & Refresh Tokens - Access tokens validate requests; refresh tokens are used to get new access tokens when expired.
5. Server-side Validation - Tokens can be validated in **Server Components**, **Server Actions**, or API routes.
6. Client-side Usage - Tokens stored in cookies or localStorage can be used for conditional rendering or fetching protected data.
7. NextAuth.js Tokens - NextAuth.js handles JWT or database-backed tokens automatically.
8. Security - Tokens should be stored securely (httpOnly, secure, sameSite) to prevent XSS/CSRF attacks.

Definition (Using Specific Terms):
**Auth Tokens** are strings that represent an authenticated session or identity. 
**JWTs** are signed tokens containing user data and expiry, commonly used in Next.js for session validation. 
Tokens can be stored in **cookies** or **localStorage**. Access tokens allow API calls, while refresh tokens 
renew expired access tokens. **Server-side validation** ensures requests are secure, 
and **Client-side usage** manages UI changes and fetches protected data. Libraries like **NextAuth.js** 
handle token creation, storage, and validation automatically, ensuring secure authentication flows.

Code Example:

// Server-side token validation (Server Component)
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export default function Dashboard() {
  const token = cookies().get('authToken')?.value

  if (!token) return <p>Please login</p>

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    return <p>Welcome, {user.name}</p>
  } catch (err) {
    return <p>Invalid or expired token</p>
  }
}

// Client-side token usage (Client Component)
'use client'
import { useState, useEffect } from 'react'

export default function NavBar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken'))
      ?.split('=')[1]

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ name: payload.name })
      } catch (err) {
        console.error('Invalid token')
      }
    }
  }, [])

  return (
    <nav>
      <a href="/">Home</a>
      {user ? <span>Welcome, {user.name}</span> : <a href="/login">Login</a>}
    </nav>
  )
}

// NextAuth.js token handling (in [...nextauth]/route.js)
callbacks: {
  async jwt({ token, user }) {
    if (user) token.id = user.id
    return token
  },
  async session({ session, token }) {
    session.user.id = token.id
    return session
  },
}

Follow-up Questions + Answers:

Q1: What are auth tokens used for?
A1: To verify user identity and maintain authenticated sessions in Next.js.

Q2: What is the difference between access and refresh tokens?
A2: Access tokens validate requests and expire quickly; refresh tokens are used to obtain new access tokens.

Q3: How should tokens be stored securely?
A3: In **httpOnly**, **secure**, and **sameSite** cookies to prevent XSS/CSRF attacks. Avoid storing sensitive tokens in localStorage.

Q4: Can tokens be validated on the server?
A4: Yes, using Server Components, Server Actions, or API routes with libraries like jwt or NextAuth.js.

Q5: How does NextAuth.js handle tokens?
A5: NextAuth.js automatically creates, stores, and validates JWT or database-backed tokens and provides them in session objects.
*/
