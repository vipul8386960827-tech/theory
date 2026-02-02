/* 
Key Points (Interviewer Keywords + Explanation):
1. App Router - New routing system in Next.js 13+, uses **app/** folder. Supports 
   **Server Components, layouts, nested routing, Server Actions, and streaming**.
2. Pages Router - Traditional routing using **pages/** folder. Uses only **Client Components** 
   for interactivity and **getServerSideProps / getStaticProps** for server-side data.
3. Nested Layouts - App Router allows **per-page and nested layouts**, improving reusability.
4. Server Components - App Router supports **server-side components by default**, Pages Router 
   does not.
5. Data Fetching - App Router uses **async Server Components or fetch**, Pages Router uses 
   **getServerSideProps/getStaticProps/getInitialProps**.
6. File-based Routing - Both are file-based, but **App Router uses folders + files** for routes 
   and layouts, Pages Router uses only files.
7. Incremental Adoption - Both routers can coexist in the same project for gradual migration.

Definition (Using Specific Terms):
The **App Router** in Next.js 13+ is a modern routing system using the **app/** folder. 
It enables **Server Components**, **nested layouts**, **server actions**, and **streaming**, 
providing more control over rendering and data fetching.  
The **Pages Router** uses the traditional **pages/** folder and relies on **Client Components** 
with data fetching methods like **getServerSideProps** or **getStaticProps**. 
App Router is more flexible and modern, while Pages Router is simpler and widely adopted.

Code Example:

// App Router (app/dashboard/page.js)
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

// Pages Router (pages/dashboard.js)
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

Q1: What is the difference between App Router and Pages Router?
A1: App Router (app/) supports **Server Components, nested layouts, server actions**, and streaming. 
    Pages Router (pages/) uses **Client Components** with data fetching via **getServerSideProps**, 
    **getStaticProps**, or **getInitialProps**.

Q2: Can both routers coexist in the same project?
A2: Yes, you can incrementally adopt App Router while keeping Pages Router.

Q3: Which router supports Server Components?
A3: Only **App Router** supports Server Components natively.

Q4: How is nested layout handled differently?
A4: App Router allows **per-route nested layouts** via layout.js files. Pages Router uses only 
    _app.js for global layout.

Q5: How is data fetching different?
A5: App Router uses **async Server Components or fetch** inside components. Pages Router relies on 
    **getServerSideProps/getStaticProps** functions to fetch data before rendering.

*/
