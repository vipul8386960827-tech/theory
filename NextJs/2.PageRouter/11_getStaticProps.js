/* 11_getStaticProps */
/*
Key Points (Interviewer Keywords + Explanation):
1. getStaticProps – A Next.js Pages Router function used for Static Site Generation (SSG).

2. Purpose – Fetch data at build time and pre-render the page with that data.

3. Features –
   - Runs only at build time.
   - Returns an object with `props` to pass to the page component.
   - Supports `revalidate` for Incremental Static Regeneration (ISR).
   - Cannot access request-specific data like headers or cookies.

4. Benefits –
   - Improves performance with pre-rendered HTML.
   - SEO-friendly since content is available on page load.
   - Reduces server load as pages are generated during build.
*/

/*
Definition (Using Specific Terms):
`getStaticProps` is a function exported from a Pages Router page in Next.js
to fetch data at build time and pass it as props for static pre-rendering.
*/

/*
Code Example (getStaticProps):

// pages/products.js
export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: { products }, // passed to the page component
    revalidate: 60, // optional, ISR: regenerate page every 60 seconds
  };
}

export default function ProductsPage({ products }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Products List</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

/*
Important Notes:
- Runs at build time for SSG.
- Use `revalidate` for incremental static regeneration (ISR).
- Cannot access request-specific data (cookies, headers, query params).
- Ideal for pages where data changes infrequently.
*/

/*
Follow-up Questions + Answers:

Q1: What is getStaticProps?
A1: A function to fetch data at build time and pre-render pages (SSG).

Q2: When is getStaticProps executed?
A2: Only during build time, before deployment.

Q3: Can getStaticProps access request headers or cookies?
A3: No, it's run at build time, not per request.

Q4: How can you update static pages periodically?
A4: Use the `revalidate` property for Incremental Static Regeneration (ISR).

Q5: Can getStaticProps be used with dynamic routes?
A5: Yes, combined with getStaticPaths for dynamic SSG pages.
*/
