/*1. Definition
---------------------------------------------------------
React:
- A JavaScript library for building user interfaces.
- Focuses only on the "view layer".
- You decide routing, data fetching, bundling, SSR, etc.

Next.js:
- A full-fledged React framework built on top of React.
- Provides routing, SSR/SSG, API routes, image optimization,
  performance optimizations, and production defaults out of the box.
*/

/*
2. Core Difference (High-level)
---------------------------------------------------------
React answers: "How do I build UI components?"
Next.js answers: "How do I build a production-ready React app?"
*/

/*
3. Rendering Model
---------------------------------------------------------
React (CRA / Vite):
- Client-Side Rendering (CSR) by default
- HTML is mostly empty initially
- JS loads → React renders UI

Next.js:
- Supports multiple rendering strategies:
  - CSR (Client-Side Rendering)
  - SSR (Server-Side Rendering)
  - SSG (Static Site Generation)
  - ISR (Incremental Static Regeneration)
- Better SEO and faster initial load
*/

/*
4. Routing
---------------------------------------------------------
React:
- Needs external library (react-router-dom)
- Routes defined manually

Next.js:
- File-based routing (App Router / Pages Router)
- Folder structure = routes
- Built-in layouts and nested routing
*/

/*
5. Data Fetching
---------------------------------------------------------
React:
- Data fetching happens mostly in useEffect
- No standard pattern enforced

Next.js:
- Built-in data fetching patterns
- Server Components
- fetch() is optimized and cached automatically
- Easy server-side data fetching
*/

/*
6. Backend Capabilities
---------------------------------------------------------
React:
- Frontend only
- Needs separate backend

Next.js:
- Built-in API routes
- Can act as a fullstack framework
- Server Actions (no REST needed in many cases)
*/

/*
7. Performance
---------------------------------------------------------
React:
- Performance depends on how well developer optimizes
- No defaults for code splitting, image optimization

Next.js:
- Automatic code splitting
- Image optimization (<Image />)
- Font optimization
- Prefetching routes
*/

/*
8. SEO
---------------------------------------------------------
React:
- Poor SEO by default (CSR)
- Needs extra setup

Next.js:
- Excellent SEO
- Metadata API
- Server-rendered HTML
*/

/*
9. Deployment
---------------------------------------------------------
React:
- Can be deployed anywhere (static hosting)
- Simple build output

Next.js:
- Can be deployed as:
  - Static site
  - Server-rendered app
  - Edge functions
- Optimized for platforms like Vercel
*/

/*
10. When to Use React
---------------------------------------------------------
- Small to medium SPAs
- Internal dashboards
- When SEO is not critical
- When you want full control over architecture
*/

/*
11. When to Use Next.js
---------------------------------------------------------
- SEO-critical applications
- Production-grade apps
- SaaS products
- Blogs, e-commerce
- When you want frontend + backend together
*/

/*
12. Interview One-liner (Very Important)
---------------------------------------------------------
"React is a UI library, while Next.js is a framework built on top
of React that provides routing, rendering strategies, and backend
capabilities out of the box."
*/

/*
13. Possible Follow-up Interview Questions
---------------------------------------------------------
Q1: Is Next.js replacing React?
A: No, Next.js is built on top of React and uses React internally.

Q2: Can we use React without Next.js?
A: Yes, React can be used standalone with tools like Vite or CRA.

Q3: Is Next.js only for SSR?
A: No, it supports CSR, SSR, SSG, and ISR.

Q4: Does Next.js mean no backend is needed?
A: Not always, but many use cases can be handled with API routes
   and server actions.

Q5: Is Next.js good for large-scale apps?
A: Yes, it is designed for scalability and production readiness.
*/
