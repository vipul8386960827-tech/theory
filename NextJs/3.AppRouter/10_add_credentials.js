/* 
Key Points (Interviewer Keywords + Explanation):
1. Credentials Provider - NextAuth.js provider allowing authentication using **username/password** instead of OAuth.
2. NextAuth.js Integration - Implemented in **API Route** (`app/api/auth/[...nextauth]/route.js`).
3. Authorization Callback - Function to validate credentials and return user object.
4. JWT / Session Strategy - Credentials can use **JWT** or database sessions.
5. Server-side Validation - Verify credentials securely on the server to prevent exposure.
6. Client-side Usage - Use `signIn` function from NextAuth.js in Client Components for form submission.
7. Error Handling - Return errors if credentials are invalid.
8. Security - Never send plain passwords to the client; always hash and validate on the server.

Definition (Using Specific Terms):
The **Credentials Provider** in NextAuth.js allows **username/password authentication** 
without OAuth. Authentication logic is implemented in the **authorize callback** on the server, 
which verifies credentials and returns a user object. Tokens or sessions (JWT/database) manage the session. 
Client-side forms use the `signIn` function to submit credentials securely, and proper **error handling** 
ensures invalid credentials are rejected. Always perform server-side validation for security.

Code Example:

// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyPassword } from '../../../lib/auth' // hypothetical function

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate credentials on the server
        const user = await getUserByEmail(credentials.email) // hypothetical DB call
        if (!user) return null

        const isValid = await verifyPassword(credentials.password, user.hashedPassword)
        if (!isValid) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  session: { strategy: 'jwt' },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// Client-side form submission (Client Component)
'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
    if (res?.error) setError('Invalid credentials')
    else window.location.href = '/dashboard'
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

Follow-up Questions + Answers:

Q1: What is the Credentials Provider in NextAuth.js?
A1: A provider that allows authentication using **username/email and password** instead of OAuth.

Q2: How is the server-side validation done?
A2: Using the **authorize callback** to validate credentials against the database and return a user object.

Q3: How do you submit credentials from the client?
A3: Use the `signIn('credentials', { email, password })` function from NextAuth.js in a Client Component.

Q4: How do you handle invalid credentials?
A4: The authorize callback returns null, and client-side code checks `res.error` to show a message.

Q5: How is security ensured when using credentials?
A5: Validate passwords on the server, hash passwords in the database, never send plain passwords to the client, and use HTTPS.
*/
