/*
Key Points (Interviewer Keywords + Explanation):
1. Pre-Rendering – Next.js generates HTML for pages **before sending it to the client**.

2. Two Types – 
   a) SSG (Static Site Generation) – at build time.
   b) SSR (Server-Side Rendering) – at request time.

3. Benefits – Improves SEO, performance, and user experience
   because the browser receives ready-to-render HTML.

4. Data Fetching – Pre-rendered pages can include data fetched
   via getStaticProps (SSG) or getServerSideProps (SSR).

5. Client Hydration – After receiving HTML, React hydrates
   the page to make it interactive on the client.
*/

/*
Definition (Using Specific Terms):
Pre-rendering is a Next.js technique where pages are rendered
to HTML **ahead of time** rather than entirely on the client.
It ensures fast first contentful paint and SEO-friendly pages.
SSG pre-renders at build time; SSR pre-renders on each request.
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
Important Notes:
- Pre-rendered pages are faster and SEO-friendly.
- SSG is static, SSR is dynamic per request.
- After sending HTML, React hydrates components on the client.
- Can combine pre-rendering with client-side fetching for dynamic behavior.
*/

/*
Follow-up Questions + Answers:

Q1: What is pre-rendering in Next.js?
A1: Generating HTML ahead of time before it reaches the browser.

Q2: What are the two types of pre-rendering?
A2: SSG (build time) and SSR (request time).

Q3: Why is pre-rendering important?
A3: Improves performance, SEO, and user experience.

Q4: How does data get into pre-rendered pages?
A4: Using getStaticProps for SSG and getServerSideProps for SSR.

Q5: What happens after HTML is sent to the client?
A5: React hydrates the page to make it interactive.
*/
