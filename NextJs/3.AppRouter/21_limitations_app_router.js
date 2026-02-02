/* 
Key Points (Interviewer Keywords + Explanation):
1. App Router Limitations - Despite its features, the **app/** folder has some restrictions 
   compared to Pages Router.
2. Edge Cases - Certain features or libraries may not fully support **Server Components** yet.
3. Middleware & API Routes - App Router routes cannot replace all **API routes**; some backend 
   logic still requires **pages/api** or **Server Actions**.
4. Client-side Only Libraries - Libraries that depend on **window, document, or browser-only APIs** 
   cannot run in Server Components.
5. No getServerSideProps / getStaticProps - App Router does not use traditional Pages Router 
   data fetching methods.
6. Learning Curve - Developers familiar with Pages Router may need time to adapt to **nested layouts, 
   Server Components, and Server Actions**.
7. Incremental Adoption Required - Projects often need **both routers** until migration is complete.

Definition (Using Specific Terms):
The **App Router** in Next.js 13+ introduces modern features like **Server Components, nested layouts, 
and Server Actions**, but it has limitations. It cannot directly replace **getServerSideProps / getStaticProps**, 
some **client-side libraries** may not work in Server Components, and **middleware or API routes** 
may still be required for certain server-side logic. Developers may need an **incremental migration strategy** 
when moving from Pages Router to App Router.

Code Example:

// Server Component limitation example
// app/dashboard/page.js
export default function Dashboard() {
  // Cannot use useState or useEffect in a Server Component
  // const [count, setCount] = useState(0) // ❌ This will throw an error

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Server Components cannot use client-side hooks like useState or useEffect
      </p>
    </div>
  )
}

// Using client-only library requires 'use client'
// app/dashboard/Interactive.js
'use client'
import { useState } from 'react'

export default function Interactive() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Click {count}
    </button>
  )
}

Follow-up Questions + Answers:

Q1: Can App Router completely replace Pages Router?
A1: Not always. Some features like **API routes, middleware, or certain client-side libraries** 
    may still require Pages Router or additional setup.

Q2: Can you use useState or useEffect in a Server Component?
A2: No, Server Components do not support **client-side hooks**. 
    You must use a Client Component for interactivity.

Q3: How do you handle client-side only libraries in App Router?
A3: Wrap them in **Client Components** using the `'use client'` directive.

Q4: Are getServerSideProps and getStaticProps available in App Router?
A4: No, App Router uses **async Server Components or fetch** for data fetching instead.

Q5: What is the recommended strategy for migrating to App Router?
A5: Use **incremental adoption**: keep Pages Router for legacy routes while moving new pages 
    to App Router with **Server Components and nested layouts**.
*/
