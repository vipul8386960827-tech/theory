/* 
Key Points (Interviewer Keywords + Explanation):
1. Using Both Routers - Next.js allows **Pages Router (pages/)** and **App Router (app/)** to coexist in the same project.
2. Incremental Adoption - This enables gradual migration from Pages Router to App Router without rewriting the whole app.
3. File-based Routing - Both routers are file-based but use separate folder structures: 
   - pages/ for Pages Router
   - app/ for App Router
4. Data Fetching Differences - Pages Router uses **getServerSideProps/getStaticProps**, App Router uses **Server Components** or **fetch** in async components.
5. Nested Layouts - App Router supports **per-route and nested layouts**, Pages Router only supports **_app.js** for global layouts.
6. Coexistence Rules - Routes in app/ and pages/ should not conflict (same path); Next.js prioritizes **app/** routes if both exist.

Definition (Using Specific Terms):
Next.js allows developers to use **both App Router and Pages Router** in the same project for incremental migration. 
The **App Router** provides modern features like **Server Components, nested layouts, server actions**, and streaming, 
while the **Pages Router** continues to use **Client Components** with traditional data fetching methods. 
Routes in app/ and pages/ must not conflict; otherwise, app/ routes take precedence.

Code Example:

// pages/dashboard.js (Pages Router)
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

// app/dashboard/page.js (App Router)
export default async function DashboardApp() {
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

Q1: Can App Router and Pages Router coexist in the same Next.js project?
A1: Yes, they can coexist for incremental migration. App Router routes are prioritized if the same path exists in both.

Q2: Why would you use both routers in the same project?
A2: To gradually migrate legacy Pages Router routes to the modern App Router without rewriting the entire application at once.

Q3: How does data fetching differ between the two routers?
A3: Pages Router uses **getServerSideProps, getStaticProps, or getInitialProps**, 
    while App Router uses **Server Components** or **async fetch inside components**.

Q4: Can nested layouts be used in Pages Router?
A4: No, Pages Router only supports a global layout via **_app.js**. App Router supports **per-route and nested layouts**.

Q5: Are there any conflicts to avoid when using both routers?
A5: Yes, routes in **app/** and **pages/** should not have the same path; app/ routes take precedence.
*/
