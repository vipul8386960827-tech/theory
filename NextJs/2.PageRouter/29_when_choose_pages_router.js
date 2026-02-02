/*
========================================
29_when_choose_pages_router (Next.js)
========================================

Definition:
Pages Router is the traditional routing system in Next.js using the /pages folder.
It provides simple file-based routing, page-level lifecycle methods, and API routes.
Choosing Pages Router depends on project simplicity, legacy support, and stability needs.

--------------------------------
When to choose Pages Router:

1) Small to Medium Projects:
- Apps with limited pages and simple layouts
- Minimal nested layouts or shared components
- Static or server-side rendering needs are straightforward

2) Legacy or Existing Projects:
- Maintaining older Next.js apps built with /pages
- Using getInitialProps, getServerSideProps, or getStaticProps
- Avoids migration effort to App Router

3) Stable, Proven Patterns:
- Familiar file-based routing
- Page-level API routes (/pages/api)
- Easy SSR and SSG without learning App Router features

4) Static Site Generation (SSG) & ISR:
- Use getStaticProps and getStaticPaths for blogs, docs, or marketing sites
- Supports Incremental Static Regeneration with revalidate

5) Server-side Authentication:
- Server-side auth checks in getServerSideProps
- Token validation using cookies or sessions
- Works well for page-level protected routes

--------------------------------
When NOT to choose Pages Router:

- Complex nested layouts that persist across pages
- Heavy use of React Server Components
- Streaming content or Suspense for partial rendering
- Modern data fetching colocated with components
- Large apps requiring advanced security patterns

--------------------------------
Interview-ready one-liner:
"Choose Pages Router for small to medium apps, legacy projects, and when you need stable
 page-level SSR/SSG with API routes. For modern apps with server components, nested layouts,
  and streaming, App Router is preferred."
*/
