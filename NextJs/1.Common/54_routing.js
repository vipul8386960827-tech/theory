/* 54_routing */
/*
Key Points (Interviewer Keywords + Explanation):
1. Routing – Next.js supports **file-system based routing** for pages.

2. Pages Router – Any file inside `pages/` becomes a route.
   - Example: pages/about.js → /about
   - Dynamic routes: pages/posts/[id].js → /posts/123

3. App Router – Uses `app/` folder with folders representing routes.
   - Example: app/about/page.js → /about
   - Dynamic routes: app/posts/[id]/page.js → /posts/123

4. Nested Routes – Folder structure defines nested paths.
   - pages/blog/first.js → /blog/first

5. Routing Methods – Use `next/link` for client-side navigation,
   `useRouter` or singleton Router for programmatic navigation.

6. Features – Supports dynamic segments, optional catch-all routes,
   nested layouts, and client-side navigation for faster UX.
*/

/*
Definition (Using Specific Terms):
Routing in Next.js is primarily **file-based**. The folder and file structure
determine the URLs. Client-side navigation is optimized using `next/link`
and programmatic navigation via `useRouter` or singleton router.
*/

/*
Code Example (Pages Router):

// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}

// pages/posts/[id].js
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>Post ID: {id}</h1>;
}

/*
Code Example (App Router):

// app/about/page.js
export default function AboutPage() {
  return <h1>About Page</h1>;
}

// app/posts/[id]/page.js
export default function PostPage({ params }) {
  return <h1>Post ID: {params.id}</h1>;
}
*/

/*
Important Notes:
- App Router supports nested layouts and layouts per folder.
- Dynamic routing works with brackets [param].
- Optional catch-all routes: [...slug].js
- Use next/link for client-side navigation to avoid full page reload.
- Programmatic navigation via useRouter.push or replace.
*/

/*
Follow-up Questions + Answers:

Q1: How does routing work in Next.js?
A1: File/folder structure inside pages/ or app/ defines the URL routes.

Q2: How do you create dynamic routes?
A2: Use square brackets: [id].js for Pages Router or [id]/page.js for App Router.

Q3: How do you navigate between pages?
A3: Use next/link for links or useRouter.push/replace for programmatic navigation.

Q4: Can routes be nested?
A4: Yes, folder structure defines nested paths.

Q5: Difference between Pages Router and App Router routing?
A5: Pages Router uses pages/ files, App Router uses app/ folders and supports layouts.
*/
