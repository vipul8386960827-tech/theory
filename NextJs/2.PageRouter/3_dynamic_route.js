/* 3_dynamic_route */
/*
Key Points (Interviewer Keywords + Explanation):
1. Dynamic Route – A route in Next.js Pages Router that can accept variable parameters.

2. Purpose – Allows creating URLs that depend on dynamic data like user IDs, product IDs, etc.

3. Features –
   - File name with square brackets `[param].js` becomes dynamic.
   - Supports multiple parameters using nested dynamic routes.
   - Catch-all routes `[...param].js` handle multiple segments.
   - Compatible with getStaticProps, getServerSideProps, and getStaticPaths.

4. Benefits –
   - Enables flexible routing based on data.
   - Supports pre-rendering for SEO (SSG/SSR).
   - Clean and predictable URL structure.
*/

/*
Definition (Using Specific Terms):
Dynamic routes in Pages Router are files with names wrapped in square brackets,
which allow the route to accept dynamic parameters from the URL.
*/

/*
Code Example (Dynamic Routing):

// pages/products/[id].js
import { useRouter } from "next/router";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query; // Get dynamic parameter from URL

  return <h1>Product ID: {id}</h1>;
}

// pages/blog/[...slug].js (Catch-all Route)
import { useRouter } from "next/router";

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query; // slug is an array of segments

  return <h1>Blog Path: {slug?.join("/")}</h1>;
}

/*
Important Notes:
- `[param].js` handles a single dynamic segment.
- `[...param].js` handles multiple segments (catch-all).
- Use router.query to access dynamic parameters on the client side.
- getStaticPaths is required for SSG to pre-render dynamic routes.
- Works seamlessly with SSR, SSG, and ISR.
*/

/*
Follow-up Questions + Answers:

Q1: How do you create a dynamic route in Next.js Pages Router?
A1: Name the file with square brackets `[param].js`.

Q2: How do you access the dynamic parameter?
A2: Use useRouter().query on the client or params in getStaticProps/getServerSideProps.

Q3: What is a catch-all route?
A3: `[...param].js` matches multiple segments in the URL.

Q4: Do dynamic routes support pre-rendering?
A4: Yes, using getStaticPaths with getStaticProps (SSG) or SSR.

Q5: Can you nest dynamic routes?
A5: Yes, create folders with `[param]` files inside for nested dynamic paths.
*/
