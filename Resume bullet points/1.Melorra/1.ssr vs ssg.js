/*

 SSR vs SSG (Next.js)
 SSR (Server-Side Rendering)
 - Page is generated on every request (at runtime on server)
 - Always shows fresh/latest data
 - Slower compared to SSG (because it runs on each request)
 - Good for dynamic data (dashboards, user-specific content)
 - Uses: getServerSideProps()

 SSG (Static Site Generation)
 - Page is generated once at build time
 - Very fast (served as static HTML)
 - Not real-time (data can become stale)
 - Good for static content (blogs, marketing pages)
 - Uses: getStaticProps()

 Key Differences

 1. Rendering time
 SSR -> Runtime (every request)
 SSG -> Build time (once)

 2. Performance
 SSR -> Slower
 SSG -> Faster

 3. Data freshness
 SSR -> Always fresh
 SSG -> Static (can use ISR to update)

 4. Use cases
 SSR -> Auth pages, dashboards, frequently changing data
 SSG -> Blogs, landing pages, docs

 5. Scalability
 SSR -> More server load
 SSG -> Highly scalable (CDN friendly)

 */
