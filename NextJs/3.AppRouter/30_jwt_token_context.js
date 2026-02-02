/* 
Key Points (Interviewer Keywords + Explanation):
1. JWT Context - Using **React Context or Next.js Context** to share JWT or auth state across components.
2. Global Access - Allows Client Components to **access authentication info** (like user role, token) 
   without prop drilling.
3. Server vs Client - JWT is often **stored in HTTP-only cookies**, so Context usually stores a minimal 
   user state derived from server validation.
4. Refresh & Revalidation - Context can manage **token refresh, user info revalidation**, or trigger 
   server calls via **Server Actions** or API routes.
5. Security Considerations - Avoid storing raw JWT in client memory if sensitive; prefer storing 
   only non-sensitive user info or derived state in Context.

Definition (Using Specific Terms):
**JWT Context** is a way to provide authentication state, derived from JWT validation, to all 
Client Components using **React Context**. The JWT itself may reside in **HTTP-only cookies**, 
while the Context stores user information like username, role, and login status for UI rendering. 
It enables global access, simplifies state management, and can coordinate with **Server Actions or 
API routes** for secure operations.

Code Example:

// context/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({ user: null, setUser: () => {} })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Example: fetch user from server (token in HTTP-only cookie)
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setUser(data.user || null))
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// Usage in Client Component
'use client'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  return <div>Welcome, {user?.username || 'Guest'}</div>
}

Follow-up Questions + Answers:

Q1: Why use a JWT Context instead of reading the cookie everywhere?
A1: Cookies are HTTP-only and not accessible via JS. Context stores derived user info for **UI rendering** 
    and avoids repeated server calls.

Q2: Can sensitive tokens be stored in Context?
A2: No, do not store raw JWT in client memory; store only safe user info.

Q3: How does Context interact with Server Actions or API routes?
A3: Context can trigger API calls or Server Actions to update or revalidate user state without exposing secrets.

Q4: What problem does JWT Context solve in Client Components?
A4: Provides **global auth state** without prop drilling, enabling conditional rendering and UI changes.

Q5: How often should Context revalidate user state?
A5: Depends on app needs; typically on page load, after server actions, or periodically to refresh tokens.
*/
