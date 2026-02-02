/* 15_fallback_getStaticPaths */
/*
Key Points (Interviewer Keywords + Explanation):
1. fallback in getStaticPaths – Determines behavior for dynamic routes not returned by getStaticPaths.

2. Purpose – Handle unmatched dynamic paths during SSG (Static Site Generation).

3. Options:
   - `fallback: false`
     - Only pre-rendered paths are available.
     - Other paths show 404.
   - `fallback: true`
     - Next.js serves a fallback page immediately.
     - Page is generated on the client-side and cached for future visits.
   - `fallback: 'blocking'`
     - Next.js waits for the page to be generated on the server.
     - The user only sees the page after it's fully rendered.

4. Benefits –
   - Provides flexibility for dynamic routes.
   - Avoids generating all possible paths at build time.
   - Allows on-demand generation of pages.
*/

/*
Definition (Using Specific Terms):
`fallback` in getStaticPaths controls how Next.js handles dynamic paths
that are not pre-rendered at build time.
*/

/*
Code Example (fallback in getStaticPaths):

// pages/products/[id].js

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const paths = products.map((p) => ({
    params: { id: p.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // false, true, or 'blocking'
  };
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
- `fallback: false` → unmatched routes return 404.
- `fallback: true` → unmatched routes rendered client-side.
- `fallback: 'blocking'` → unmatched routes rendered server-side before response.
- Often used with ISR for on-demand generation.
*/

/*
Follow-up Questions + Answers:

Q1: What is fallback in getStaticPaths?
A1: Controls how Next.js handles paths not returned in paths array.

Q2: Difference between fallback true and blocking?
A2: true → shows client-side fallback, then page loads; blocking → server waits, then returns full page.

Q3: Can fallback false be used with dynamic routes?
A3: Yes, but only pre-rendered paths are valid; others return 404.

Q4: When to use fallback blocking?
A4: When you want the user to always get fully rendered page on first request.

Q5: Does fallback work with ISR?
A5: Yes, fallback + revalidate allows on-demand static regeneration.
*/
