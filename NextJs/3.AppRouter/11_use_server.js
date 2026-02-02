/* 11_use_server */
/* 
Key Points (Interviewer Keywords + Explanation):
1. useServer / Server Components - Components in Next.js App Router that run on the **server** by default.
2. Server Rendering - Renders UI on the server, sends HTML to client, improving SEO and performance.
3. No 'use client' - Components without `'use client'` are **Server Components**.
4. Data Fetching - Server Components can fetch data directly from the database or APIs.
5. Props & State - Server Components receive props but **cannot use React hooks like useState or useEffect**.
6. Client Components - Use `'use client'` for interactivity; Server Components can include Client Components.
7. Benefits - Reduces bundle size, improves performance, and ensures sensitive data stays on the server.

Definition (Using Specific Terms):
**Server Components** in Next.js run only on the **server**, rendering HTML before sending it to the client. 
They **cannot use client-side hooks** like `useState` or `useEffect` but can fetch data directly from databases 
or external APIs. Components without `'use client'` are automatically considered **Server Components**. 
You can include **Client Components** inside Server Components for interactivity. Server Components reduce 
JavaScript bundle size and improve performance while keeping sensitive logic on the server.

Code Example:

// app/dashboard/page.js (Server Component by default)
import UserProfile from '../components/UserProfile'

export default async function Dashboard() {
  // Server-side data fetching
  const res = await fetch('https://api.example.com/user')
  const user = await res.json()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <UserProfile user={user} />
    </div>
  )
}

// app/components/UserProfile.js (Client Component)
'use client'
import { useState } from 'react'

export default function UserProfile({ user }) {
  const [likes, setLikes] = useState(0)

  return (
    <div>
      <p>Username: {user.name}</p>
      <p>Likes: {likes}</p>
      <button onClick={() => setLikes(likes + 1)}>Like</button>
    </div>
  )
}

Follow-up Questions + Answers:

Q1: What makes a component a Server Component in Next.js?
A1: Any component **without `'use client'`** is a Server Component by default.

Q2: Can Server Components use useState or useEffect?
A2: No, these hooks are only for Client Components.

Q3: Can Server Components fetch data directly?
A3: Yes, they can fetch from databases or APIs on the server.

Q4: Can Server Components include Client Components?
A4: Yes, you can embed Client Components inside Server Components for interactivity.

Q5: What are the benefits of Server Components?
A5: Reduced JavaScript bundle size, improved performance, better SEO, and sensitive logic stays on the server.
*/
