/* 3_pages_or_app_directory */
/* 
Key Points (Interviewer Keywords + Explanation):
1. Pages Directory (pages/) - Legacy Next.js routing system using **getServerSideProps, getStaticProps, getInitialProps**. 
   Routes are based on file names; simple and widely supported.
2. App Directory (app/) - Modern Next.js routing with **Server Components by default**, 
   **nested layouts**, and **Server Actions** support.
3. Server vs Client Components - App directory allows **Server Components** for backend logic and 
   **Client Components** for interactivity.
4. Nested Layouts - App router supports **layout.js** for shared layouts per route or nested route.
5. File-based Routing - Both routers use **file/folder names for routing**, but App Router has more flexibility.
6. Data Fetching - App router allows async **Server Components** to fetch data directly; Pages Router uses lifecycle methods.
7. Migration - App Router is recommended for new apps; Pages Router is still supported for legacy projects.

Definition (Using Specific Terms):
Next.js provides two routing systems: **Pages Router** (pages/) and **App Router** (app/). Pages Router 
is legacy, uses **client components**, and lifecycle data-fetching methods. App Router is modern, 
supports **Server Components**, **nested layouts**, **Server Actions**, and **streaming**, making it 
better for new, complex apps while still allowing incremental migration.

Code Example:

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

// App Router example
// app/dashboard/page.js
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

Follow-up Questions + Answers:

Q1: What is the main difference between Pages Router and App Router?
A1: Pages Router uses **client components** and lifecycle methods; App Router uses **Server Components**, 
    nested layouts, and Server Actions.

Q2: Can both routers coexist in a Next.js app?
A2: Yes, incremental adoption is possible, but routes should not conflict.

Q3: Why use App Router for new projects?
A3: Supports **Server Components, nested layouts, streaming, Server Actions**, and reduces client JS.

Q4: How does data fetching differ?
A4: Pages Router: getServerSideProps/getStaticProps. App Router: async Server Components fetch data directly.

Q5: Does App Router support nested layouts?
A5: Yes, layouts can be defined in **layout.js** per route or nested route.
*/
