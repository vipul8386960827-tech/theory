/*
========================================
30_when_choose_app_router (Next.js)
========================================

Definition:
App Router is the modern Next.js routing system using the /app folder.
It is server-first, supports React Server Components, nested layouts, 
streaming, and advanced data fetching. Choosing App Router depends on 
project requirements and modern best practices.

--------------------------------
When to choose App Router:

1) Server Components & Server-first Rendering:
- You want sensitive data (tokens, secrets) to remain on the server
- Fetch data directly in server components without exposing it to client JS
- Use HttpOnly cookies for auth
- Reduce client bundle size

2) Nested Layouts & Shared UI:
- Complex apps with repeated layout components (navbars, sidebars)
- Persistent layouts across route changes
- Avoid re-rendering shared components on navigation

3) Streaming & Suspense:
- You need partial page rendering for faster perceived load
- Use React Suspense with streaming to show parts of the UI while others load
- Improve Largest Contentful Paint (LCP)

4) Actions & Form Handling:
- Server-side form handling via actions
- Avoid writing separate API routes for every form
- Easier integration with server components and cookies

5) Incremental Adoption & Modern Patterns:
- Using latest React features: server components, async/await in server components
- Colocated data fetching
- Prefer modern patterns over legacy getServerSideProps or API route separation

6) Security:
- Storing tokens or sensitive info safely with HttpOnly cookies
- Avoid sending tokens to client JS unnecessarily
- Better protection against XSS attacks

--------------------------------
When NOT to choose App Router:
- Small, simple apps where Pages Router is sufficient
- Legacy projects already using Pages Router extensively
- When you require certain legacy lifecycle methods (getInitialProps)

--------------------------------
Interview-ready one-liner:
"Choose App Router when you want server-first rendering, React Server Components, nested layouts, streaming, secure token handling via HttpOnly cookies, and modern data-fetching patterns. Pages Router is sufficient only for small or legacy apps."
*/
