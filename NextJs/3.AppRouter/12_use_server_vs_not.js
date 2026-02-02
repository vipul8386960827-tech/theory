/* 
Key Points (Interviewer Keywords + Explanation):
1. Server Components - Components that run **only on the server** and render HTML before sending it to the client.
2. Client Components - Components marked with `'use client'` that run in the **browser** and support interactivity.
3. useState / useEffect - Only available in **Client Components**, not Server Components.
4. Data Fetching - Server Components can fetch from APIs or databases directly; Client Components fetch via useEffect or SWR.
5. Props - Both Server and Client Components can receive props.
6. Performance - Server Components reduce bundle size and improve performance, Client Components handle interactivity.
7. Combination - Server Components can include Client Components for UI interactivity.

Definition (Using Specific Terms):
In Next.js App Router, components **without `'use client'`** are **Server Components**: they run on the server, fetch data, and render HTML.  
Components with `'use client'` are **Client Components**: they run in the browser, handle interactivity, and can use hooks like `useState` 
and `useEffect`.  
Server Components improve performance and reduce JS bundle size, but any **dynamic UI or state** must be handled in Client Components.
Props can be passed from Server Components to Client Components seamlessly.

Code Example:

// Server Component (default)
export default async function Dashboard() {
  const user = await fetchUser() // server-side fetch
  return (
    <div>
      <h1>Dashboard</h1>
      <ClientProfile user={user} /> {/* Client-side state handled here }
    </div>
  )
}

// Client Component
'use client'
import { useState } from 'react'

export default function ClientProfile({ user }) {
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

Q1: What is the difference between Server and Client Components?
A1: Server Components run on the server and render HTML; Client Components run in the browser and handle interactivity.

Q2: Can Server Components use useState or useEffect?
A2: No, only Client Components can use these hooks.

Q3: Can Client Components fetch data?
A3: Yes, but they fetch on the client using hooks like useEffect or libraries like SWR.

Q4: Can Server Components include Client Components?
A4: Yes, Server Components can embed Client Components for interactivity.

Q5: Why use Server Components instead of Client Components?
A5: To reduce JavaScript bundle size, improve performance, enhance SEO, and keep sensitive logic on the server.
*/
