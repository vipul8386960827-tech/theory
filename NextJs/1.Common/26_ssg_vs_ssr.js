/* 26_ssg_vs_ssr */
/*
Key Points (Interviewer Keywords + Explanation):
1. SSG (Static Site Generation) – Pre-renders pages at build time,
   generating static HTML files.

2. SSR (Server-Side Rendering) – Renders pages on the server
   at every request, sending HTML to the client.

3. Performance – SSG is faster at runtime because pages are static;
   SSR may be slower due to per-request rendering.

4. SEO – Both SSG and SSR are SEO-friendly since content is pre-rendered
   before reaching the browser.

5. Use Cases – SSG for static or rarely changing pages;
   SSR for dynamic or frequently updated pages.

6. Trade-offs – SSG requires rebuild for updates;
   SSR increases server load per request.
*/

/*
Definition (Using Specific Terms):
SSG and SSR are pre-rendering strategies in Next.js:

- SSG: Generates static HTML at build time.
- SSR: Generates HTML on the server per request.

SSG is optimal for performance and CDN caching.
SSR is optimal for frequently changing data and dynamic pages.
*/

/*
Comparison Table:

| Feature         | SSG                          | SSR                          |
|-----------------|-----------------------------|------------------------------|
| Rendering Time  | Build time                  | Request time                |
| Page Load       | Fast (served via CDN)       | Slower (server renders)     |
| Data Freshness  | Stale until rebuild         | Always fresh per request    |
| Use Case        | Blogs, docs, landing pages  | Dashboards, dynamic pages   |
| Server Load     | Low                          | High (per request)          |
| SEO             | Excellent                   | Excellent                   |
*/

/*
Code Example (Pages Router):

// SSG - pages/blog.js
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}

// SSR - pages/dashboard.js
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  return { props: { data } };
}
*/

/*
Follow-up Questions + Answers:

Q1: When should you use SSG over SSR?
A1: Use SSG for static pages or rarely changing content.

Q2: When is SSR necessary?
A2: For pages that need fresh data per request.

Q3: Which is faster for users?
A3: SSG, because pages are served from CDN as static HTML.

Q4: Can SSG pages be updated after build?
A4: Yes, using ISR (Incremental Static Regeneration).

Q5: Are both SEO-friendly?
A5: Yes, both pre-render content for search engines.
*/
