/* 14_getStaticPaths */
/*
Key Points (Interviewer Keywords + Explanation):
1. getStaticPaths – A Next.js Pages Router function used with dynamic routes for SSG.

2. Purpose – Pre-render dynamic pages at build time by specifying which paths to generate.

3. Features –
   - Only used with dynamic route pages like `[id].js`.
   - Returns an object with:
     - `paths`: Array of route parameters to pre-render.
     - `fallback`: Determines behavior for unmatched routes ("blocking", true, or false).
   - Works with `getStaticProps` for static generation of dynamic routes.

4. Benefits –
   - Enables static generation for pages with dynamic content.
   - Improves performance and SEO for dynamic pages.
   - Reduces server load by pre-rendering only necessary paths.
*/

/*
Definition (Using Specific Terms):
`getStaticPaths` is exported from a dynamic Pages Router page to specify
which paths Next.js should statically generate at build time. It works
together with `getStaticProps`.
*/

/*
Code Example (getStaticPaths):

// pages/products/[id].js

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const paths = products.map((p) => ({
    params: { id: p.id.toString() }, // must be string
  }));

  return { paths, fallback: false }; // fallback can be true or 'blocking'
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: { product },
  };
}

export default function ProductPage({ product }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}

/*
Important Notes:
- Only used for dynamic routes ([id].js) with SSG.
- `params` keys must match the dynamic route segments.
- `fallback: false` → 404 for unmatched paths.
- `fallback: true` or 'blocking' → Next.js generates page on first request.
- Always used together with getStaticProps for static data fetching.
*/

/*
Follow-up Questions + Answers:

Q1: What is getStaticPaths used for?
A1: To pre-render dynamic routes at build time with SSG.

Q2: Can you use getStaticPaths with static routes?
A2: No, it’s only for dynamic routes like [id].js.

Q3: What does the fallback property do?
A3: Controls behavior for unmatched paths:
   - false → 404
   - true → generate page on client-side first access
   - 'blocking' → server generates page before sending to client

Q4: How does getStaticPaths relate to getStaticProps?
A4: getStaticPaths provides paths, getStaticProps fetches data for each path.

Q5: Do paths in getStaticPaths need to be strings?
A5: Yes, dynamic route params must be strings.
*/
