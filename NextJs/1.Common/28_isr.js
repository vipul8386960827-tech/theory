/* 28_isr */
/*
Key Points (Interviewer Keywords + Explanation):
1. ISR (Incremental Static Regeneration) – Next.js feature
   that allows static pages (SSG) to be updated **after build**.

2. Purpose – Combines benefits of SSG (performance, CDN caching)
   with the ability to refresh stale content without a full rebuild.

3. Revalidate – Set a `revalidate` interval (in seconds) to regenerate
   the page in the background.

4. Use Cases – Blogs, e-commerce product pages, news sites,
   or any mostly static content that updates occasionally.

5. Trade-offs – Initial load is static and fast; updated content
   may appear slightly delayed until regeneration occurs.
*/

/*
Definition (Using Specific Terms):
ISR in Next.js allows developers to **update static pages incrementally**
without rebuilding the entire site. Pages are served as static HTML,
and after the revalidate interval, Next.js regenerates the page in the background.
*/

/*
Code Example (Pages Router):

// pages/products.js
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();

  return {
    props: { products },
    revalidate: 60, // Regenerate page every 60 seconds
  };
}

export default function Products({ products }) {
  return (
    <div>
      {products.map((p) => (
        <h2 key={p.id}>{p.name}</h2>
      ))}
    </div>
  );
}
*/

/*
Important Notes:
- ISR works only for SSG pages.
- Allows stale pages to be updated incrementally without full rebuild.
- Improves performance and reduces server load compared to SSR.
- Can be combined with fallback pages for new dynamic routes.
*/

/*
Follow-up Questions + Answers:

Q1: What is ISR in Next.js?
A1: Incremental Static Regeneration allows SSG pages to update
    after build without rebuilding the entire site.

Q2: How do you enable ISR?
A2: Set the revalidate property in getStaticProps (Pages Router)
    or revalidate in server component fetch (App Router).

Q3: Why use ISR instead of SSR?
A3: ISR maintains performance of static pages while allowing
    periodic updates, reducing server load.

Q4: Can ISR work with dynamic routes?
A4: Yes, using fallback options for new paths.

Q5: Typical use cases for ISR?
A5: Blogs, news sites, product pages, or content that changes occasionally.
*/
