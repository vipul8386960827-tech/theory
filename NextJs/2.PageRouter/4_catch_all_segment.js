/* 4_catch_all_segment */
/*
Key Points (Interviewer Keywords + Explanation):
1. Catch-All Segment – A type of dynamic route in Next.js that captures 
   multiple URL segments as an array.

2. Purpose – Allows a single route file to handle URLs with varying path lengths.

3. Features –
   - File name syntax `[...param].js`.
   - Captures all segments after the base route into an array.
   - Optional catch-all `[...[param]].js` allows zero or more segments.
   - Works with SSG, SSR, and getStaticPaths for pre-rendering.
   - Useful for blogs, nested categories, or flexible URL structures.

4. Benefits –
   - Handles deep nested routes with a single file.
   - Reduces the need to create multiple dynamic route files.
   - Supports SEO-friendly URLs.
*/

/*
Definition (Using Specific Terms):
Catch-all segments are dynamic route files using `[...param].js` syntax
that collect multiple URL segments into an array, enabling flexible
and nested routing in Next.js Pages Router.
*/

/*
Code Example (Catch-All Route):

// pages/blog/[...slug].js
import { useRouter } from "next/router";

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query; // slug is an array of segments

  return <h1>Blog Path: {slug?.join("/")}</h1>;
}

// Optional Catch-All Example
// pages/docs/[[...slug]].js
export default function DocsPage({ params }) {
  const slug = params?.slug || []; // Handles zero or more segments
  return <h1>Docs Path: {slug.join("/") || "Home"}</h1>;
}

/*
Important Notes:
- `[...param].js` requires at least one segment.
- `[[...param]].js` is optional and works even if no segment exists.
- router.query provides an array of all matched segments.
- Works with getStaticPaths for static pre-rendering.
- Useful for flexible nested routes like `/blog/2026/january/post1`.
*/

/*
Follow-up Questions + Answers:

Q1: What is a catch-all route?
A1: A dynamic route that captures multiple URL segments into an array using `[...param].js`.

Q2: How do optional catch-all routes work?
A2: `[[...param]].js` allows the route to match zero or more segments.

Q3: How do you access the segments in the component?
A3: Use `router.query.param` which returns an array.

Q4: When would you use catch-all routes?
A4: For blogs, nested categories, documentation pages, or flexible URLs.

Q5: Can catch-all routes be pre-rendered?
A5: Yes, using getStaticPaths with getStaticProps for SSG.
*/
