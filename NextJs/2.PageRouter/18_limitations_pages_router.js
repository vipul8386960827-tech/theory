/* 18_limitations_pages_router */
/*
========================================
18_limitations_pages_router (Next.js)
========================================

Definition:
The Pages Router is the older, traditional routing system in Next.js,
using the /pages folder. While widely used, it has several limitations
compared to the newer App Router.

--------------------------------
Key Limitations of Pages Router:

1) File-based Routing Limitations:
- No support for advanced layouts
- Nested layouts are cumbersome
- No built-in support for templates that persist across pages

2) Server Components:
- Pages Router does not support React Server Components (RSC)
- All components are client-side by default

3) Data Fetching:
- getServerSideProps, getStaticProps, getInitialProps are page-level only
- Cannot colocate data fetching with components
- No streaming support (SSR streaming not supported)

4) Partial/Incremental Rendering:
- Cannot do nested streaming or granular loading states
- The whole page is rendered on the server or client

5) API Route Co-location:
- Pages API routes are in /pages/api
- Cannot colocate server logic next to the page itself
- Leads to less organized code for complex apps

6) Edge Runtime:
- Limited support in Pages Router
- Only API routes can use experimental Edge runtime
- No RSC + Edge streaming combination

7) Middleware Integration:
- Middleware works globally
- Cannot easily scope to individual pages
- Less flexible compared to App Router

8) Code Splitting:
- Less granular than App Router
- Cannot split layouts independently
- Page-level bundles are larger

--------------------------------
Summary:
- Pages Router is simple, stable, and well-supported
- Not designed for modern React features:
  - Nested layouts
  - Server components
  - Streaming / suspense
- Better for small to medium apps or legacy projects
- For new apps requiring modern patterns, App Router is recommended

--------------------------------
Interview-friendly one-liner:
"The Pages Router works, but it lacks support for nested layouts,
React Server Components, streaming, and colocated data fetching,
making it less flexible for modern Next.js apps."
*/
