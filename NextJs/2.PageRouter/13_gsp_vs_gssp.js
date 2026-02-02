/* 13_gsp_vs_gssp */
/*
Key Points (Interviewer Keywords + Explanation):
1. getStaticProps (GSP) vs getServerSideProps (GSSP) – 
   Two data-fetching methods in Next.js Pages Router.

2. Purpose –
   - GSP: Fetch data **at build time** (Static Site Generation).
   - GSSP: Fetch data **on every request** (Server-Side Rendering).

3. Features –
   getStaticProps (GSP):
     - Runs once at build time.
     - Returns `props` for the page component.
     - Supports `revalidate` for Incremental Static Regeneration (ISR).
     - Cannot access request-specific info (headers, cookies).

   getServerSideProps (GSSP):
     - Runs on each request.
     - Returns `props` for the page component.
     - Can access headers, cookies, and query params.
     - Slower than GSP due to server computation per request.

4. Benefits –
   - GSP: Fast, SEO-friendly, reduced server load.
   - GSSP: Always up-to-date, can handle dynamic or authenticated data.
*/

/*
Definition (Using Specific Terms):
- getStaticProps: Pre-renders page at build time with static data.
- getServerSideProps: Pre-renders page on each request with dynamic data.
*/

/*
Code Example (GSP vs GSSP):

// GSP Example (SSG)
// pages/products.js
export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: { products },
    revalidate: 60, // optional ISR
  };
}

// GSSP Example (SSR)
// pages/orders.js
export async function getServerSideProps(context) {
  const { req } = context;
  const res = await fetch(`https://api.example.com/orders?user=${req.cookies.userId}`);
  const orders = await res.json();

  return {
    props: { orders },
  };
}

/*
Important Notes:
- Use GSP for pages with static or rarely changing content.
- Use GSSP for pages needing dynamic content per request.
- GSP with `revalidate` allows near-real-time updates without regenerating on every request.
- GSSP may increase server load for high-traffic pages.
*/

/*
Follow-up Questions + Answers:

Q1: When to use getStaticProps?
A1: For static content, SEO pages, or rarely changing data.

Q2: When to use getServerSideProps?
A2: For dynamic content, user-specific data, or authentication-required pages.

Q3: Can getStaticProps access headers or cookies?
A3: No, it runs at build time, not per request.

Q4: Can getServerSideProps be cached like GSP?
A4: Not automatically; it runs per request. You can use HTTP caching manually.

Q5: What is revalidate in getStaticProps?
A5: Time interval in seconds for Incremental Static Regeneration (ISR) to update static pages.
*/
