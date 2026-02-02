/* 4_file_based_routing */
/* 
Key Points (Interviewer Keywords + Explanation):
1. File-based Routing - Next.js automatically generates routes based on **file and folder names** in `pages/` or `app/`.
2. Pages Router Routing - Uses `pages/` folder. Each `.js/.ts/.tsx` file corresponds to a route. Nested folders create nested routes.
3. App Router Routing - Uses `app/` folder with **page.js** files for routes. Supports **nested layouts** and **colocated components**.
4. Dynamic Routes - Use **[param]** syntax for route parameters (e.g., `[id].js`).
5. Optional Catch-all Routes - Use `[...param]` or `[[...param]]` for nested or optional paths.
6. Route Groups - Use `(group)` folders in App Router to **organize routes** without affecting the URL.
7. API Routes - API routes can follow similar file-based routing in `pages/api/` or `app/api/`.

Definition (Using Specific Terms):
**File-based routing** in Next.js automatically maps files in the **pages/** or **app/** directory to URLs. 
Nested folders define subroutes, and dynamic segments can be created using **[param]** syntax. App Router 
adds **nested layouts**, **route groups**, and improved structure for scalable applications.

Code Example:

// Pages Router
// pages/about.js
export default function About() {
  return <h1>About Page</h1>
}

// pages/blog/[id].js (Dynamic Route)
export default function Blog({ params }) {
  return <h1>Blog Post ID: {params.id}</h1>
}

// App Router
// app/dashboard/page.js
export default function Dashboard() {
  return <h1>Dashboard Page</h1>
}

// app/dashboard/(admin)/settings/page.js (Route Group, URL stays /dashboard/settings)
export default function Settings() {
  return <h1>Admin Settings</h1>
}

Follow-up Questions + Answers:

Q1: What is file-based routing in Next.js?
A1: Routing is automatically generated from file and folder structure in **pages/** or **app/** directories.

Q2: How do you create dynamic routes?
A2: Use `[param]` for required parameters or `[...param]`/`[[...param]]` for catch-all routes.

Q3: What are route groups?
A3: In App Router, folders like `(group)` can organize routes without affecting the URL path.

Q4: Can API routes follow file-based routing?
A4: Yes, `pages/api/` or `app/api/` mirrors the folder structure for route URLs.

Q5: How do nested layouts work in App Router?
A5: Nested **layout.js** files define shared UI per route segment and allow layouts to be reused efficiently.
*/
