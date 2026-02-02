/* 
Key Points (Interviewer Keywords + Explanation):
1. File-based routing - Routes in Next.js App Router are created based on the folder 
   and file structure inside the 'app' directory.
2. Route segment - Each folder inside 'app' becomes a route segment in the URL.
3. Page Component - Each 'page.js' file inside a folder defines the component 
   rendered for that route.
4. Dynamic Routes - Use square brackets [param] to create dynamic route segments.
5. Nested Routes - Create nested folders to reflect nested URL paths.
6. Route Groups - Use parentheses () to group routes without affecting URL structure.
7. Catch-all routes - Use '[...param]' to capture multiple segments dynamically.

Definition (Using Specific Terms):
In Next.js App Router, routes are automatically created based on the **file and folder structure** 
inside the 'app' directory. Each folder represents a **route segment**, and each 'page.js' 
inside a folder defines the **Page Component** for that route. Dynamic routes can be created 
using square brackets [param], and nested routes are achieved through nested folders. 
**Route Groups** allow organizing components without changing the URL, and **catch-all routes** 
handle multiple dynamic segments.

Code Example:

// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Header</header>
        {children}
      </body>
    </html>
  )
}

// app/page.js
export default function HomePage() {
  return (
    <h1>Home Page</h1>
  )
}

// app/about/page.js
export default function AboutPage() {
  return (
    <h1>About Page</h1>
  )
}

// app/blog/[id]/page.js
export default function BlogPost({ params }) {
  return (
    <h1>Blog Post ID: {params.id}</h1>
  )
}

// app/dashboard/settings/page.js
export default function DashboardSettings() {
  return (
    <h1>Dashboard Settings</h1>
  )
}

// app/(admin)/users/page.js
export default function AdminUsers() {
  return (
    <h1>Admin Users (Route group example)</h1>
  )
}

// app/blog/[...slug]/page.js
export default function BlogCatchAll({ params }) {
  return (
    <h1>Slug path: {params.slug.join('/')}</h1>
  )
}

Follow-up Questions + Answers:

Q1: How do you create a dynamic route in App Router?
A1: Wrap the segment name in square brackets. 
    Example: '[id]' creates a dynamic route segment.

Q2: What is the difference between nested routes and route groups?
A2: Nested routes create additional URL segments reflecting folder hierarchy. 
    Route groups use parentheses () to organize files without affecting the URL structure.

Q3: How do you access parameters in a dynamic route?
A3: Next.js passes a 'params' object to the page component. 
    For example, params.id for '[id]' and params.slug for '[...slug]'.

Q4: What is a catch-all route?
A4: A catch-all route '[...param]' captures multiple URL segments dynamically, 
    returning them as an array.

Q5: Can you mix dynamic routes and static routes?
A5: Yes, you can have static routes, dynamic routes, and nested routes 
    in the same app directory structure.
*/
