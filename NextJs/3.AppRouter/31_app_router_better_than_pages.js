/* 
Key Points (Interviewer Keywords + Explanation):

1. App Router Advantages:
   - **Server Components by default** - reduces client JS bundle and improves performance.
   - **Nested layouts** - per-route and hierarchical layouts for better UI composition.
   - **Server Actions** - secure, server-side event handling without exposing secrets.
   - **Streaming & Suspense** - incremental rendering for faster perceived load.
   - **Simplified data fetching** - use async Server Components instead of getServerSideProps/getStaticProps.
   - **Colocation** - components, styles, and routes are colocated for better maintainability.

2. Pages Router Advantages:
   - **Stable and mature** - battle-tested and widely used in existing apps.
   - **Familiar lifecycle methods** - getServerSideProps, getStaticProps, getInitialProps.
   - **Easier to integrate with some third-party libraries** - libraries expecting client-side usage or legacy SSR patterns.
   - **Simpler for small apps** - straightforward routing without nested layouts or advanced features.
   - **Ecosystem support** - more examples, tutorials, and packages designed around Pages Router.

Definition (Using Specific Terms):
The **App Router** is modern, optimized for **Server Components, nested layouts, streaming, and Server Actions**, 
making it ideal for new apps with complex UI and secure server-side logic.  
The **Pages Router** is traditional, using **Client Components, getServerSideProps/getStaticProps**, and 
is more mature and widely supported, which can be simpler for small or legacy apps.  
Choosing depends on **project size, complexity, and adoption strategy**.

Code Example:

// App Router example
// app/dashboard/page.js (Server Component with nested layout)
export default async function Dashboard() {
  const users = await fetch('https://api.example.com/users').then(res => res.json())
  return (
    <div>
      <h1>Dashboard (App Router)</h1>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  )
}

// Pages Router example
// pages/dashboard.js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/users')
  const users = await res.json()
  return { props: { users } }
}

export default function Dashboard({ users }) {
  return (
    <div>
      <h1>Dashboard (Pages Router)</h1>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  )
}

Follow-up Questions + Answers:

Q1: Why is App Router considered better for new apps?
A1: It supports **Server Components, nested layouts, Server Actions, streaming**, and reduces client-side JS, 
    which improves performance and security.

Q2: Why might someone still choose Pages Router?
A2: **Maturity, simpler lifecycle methods, third-party library compatibility, and ease for small apps**.

Q3: Can both routers coexist?
A3: Yes, Next.js allows **incremental adoption**, but routes should not conflict; App Router takes precedence.

Q4: What is the main performance benefit of App Router?
A4: Server Components reduce client-side JS, enable **streaming with Suspense**, and allow **partial updates**.

Q5: Is Pages Router still supported in Next.js 13+?
A5: Yes, it is fully supported for legacy apps and gradual migration.
*/
