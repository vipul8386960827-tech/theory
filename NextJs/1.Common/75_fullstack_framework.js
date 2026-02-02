/* 75_fullstack_framework */
/*
Key Points (Interviewer Keywords + Explanation):
1. Fullstack Framework – Next.js is a React-based framework that supports
   both frontend and backend (API routes) capabilities.

2. Purpose – Enables building fullstack applications with React UI
   and server-side logic in the same project.

3. Features –
   - Frontend: Pages, components, layouts, and dynamic routes.
   - Backend: API routes (serverless functions) for handling requests,
     database operations, and authentication.
   - Data Fetching: Supports SSG, SSR, ISR, and client-side fetching.
   - Middleware: Server-side logic for authentication, redirects, etc.
   - Built-in Routing: Pages Router or App Router for structured navigation.
   - Integration: Works with databases (MongoDB, Prisma, PostgreSQL),
     third-party APIs, and authentication providers (NextAuth, Firebase).

4. Benefits –
   - Unified codebase for frontend and backend
   - Easy deployment on platforms like Vercel
   - Supports server-side rendering, static generation, and hybrid approaches
   - Reduces need for separate backend servers
*/

/*
Definition (Using Specific Terms):
Next.js is a fullstack framework because it allows developers to build
React-based frontend interfaces while also providing backend API routes,
middleware, and server-side logic in the same project.
*/

/*
Code Example (API Route and Frontend Component):

// pages/api/hello.js (Backend API Route)
export default function handler(req, res) {
  res.status(200).json({ message: "Hello from Next.js API!" });
}

// pages/index.js (Frontend Page)
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((json) => setData(json.message));
  }, []);

  return (
    <div>
      <h1>Fullstack Next.js Example</h1>
      <p>{data ? data : "Loading..."}</p>
    </div>
  );
}
*/

/*
Important Notes:
- API routes are serverless functions by default (can run on server or edge).
- Supports middleware for server-side logic like auth or redirects.
- Can fetch data server-side (SSR/SSG) or client-side.
- Integrates easily with databases and third-party services.
- Reduces the complexity of having separate backend and frontend projects.
*/

/*
Follow-up Questions + Answers:

Q1: Why is Next.js considered a fullstack framework?
A1: Because it allows building frontend UI and backend API routes
   within the same project.

Q2: How do you create backend functionality in Next.js?
A2: Use API routes under `pages/api/` or `app/api/`.

Q3: Can Next.js handle server-side authentication?
A3: Yes, using middleware, API routes, and third-party auth providers.

Q4: What data fetching strategies are available?
A4: SSG, SSR, ISR, and client-side fetching with fetch or axios.

Q5: Does Next.js require a separate backend server?
A5: No, API routes allow backend functionality inside the same project.
*/
