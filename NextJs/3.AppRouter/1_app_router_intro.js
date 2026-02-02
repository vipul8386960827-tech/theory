/* 
Key Points (Interviewer Keywords + Explanation):
1. App Router - New routing system in Next.js 13+, replaces Pages Router, supports nested layouts.
2. Server Components - Components rendered on server by default, reduces bundle size, improves performance.
3. Client Components - Components that run on the client, required for interactivity, marked with
   'use client'.
4. Layouts - Persistent UI wrappers that can be shared across nested routes.
5. Nested Routing - Allows creating complex UI hierarchies with folder-based routing.
6. Server Actions - New feature for handling form submissions or server mutations without API routes.
7. File-based routing - Routes are determined by folder/file structure inside 'app' directory.

Definition (Using Specific Terms):
App Router is the file-based routing system in Next.js 13+ where routes are defined inside the 'app'  
directory. 
It supports **nested layouts**, **Server Components** by default, 
and allows using **Client Components** when interactivity is needed. 
**Server Actions** can handle server-side operations directly from components.

Code Example:

// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  )
}

// app/page.js
export default function HomePage() {
  return (
    <h1>Welcome to Home Page</h1>
  )
}

// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <nav>Dashboard Navigation</nav>
      {children}
    </div>
  )
}

// app/dashboard/page.js
'use client'
export default function DashboardPage() {
  return (
    <button onClick={() => alert("Client Interaction")}>
      Click Me
    </button>
  )
}

Follow-up Questions + Answers:

Q1: What is the difference between Pages Router and App Router?
A1: Pages Router (pre Next.js 13) uses 'pages' folder, only supports client-side layouts. 
App Router uses 'app' folder, supports **Server Components**, nested layouts, 
and file-based routing with better performance.

Q2: When should you use a Client Component in App Router?
A2: Use Client Components when you need **interactivity**, **state management**, 
or **browser-only APIs** (like localStorage, event listeners).

Q3: Can layouts be nested in App Router?
A3: Yes, layouts can be nested at any level. 
Each folder in the 'app' directory can have its own layout, 
which wraps its child routes.

Q4: What are Server Actions and why are they useful?
A4: Server Actions are functions defined in Server Components to handle server-side logic like form submissions. 
They eliminate the need for separate API routes and allow **direct server mutation** from components.

Q5: Are all components in App Router server-rendered by default?
A5: Yes, unless you explicitly mark them with `'use client'` directive, 
they are **Server Components**.
*/
