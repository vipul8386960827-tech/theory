/* 43_static_optimization */
/*
Key Points (Interviewer Keywords + Explanation):
1. Static Optimization – Next.js automatically pre-renders pages
   at build time if they don’t require server-side data (no getServerSideProps).

2. Automatic Static Optimization – Pages without server-side
   logic are served as static HTML for better performance.

3. Benefits – Faster page loads, improved SEO, reduced server load.

4. Detection – Next.js determines at build time whether a page
   can be statically optimized based on the absence of SSR.

5. Use Cases – Blog posts, marketing pages, documentation, landing pages.
*/

/*
Definition (Using Specific Terms):
Static Optimization in Next.js is the process where pages that
do not require server-side rendering are automatically pre-rendered
as static HTML at build time. This improves performance, SEO,
and reduces server computation.
*/

/*
Code Example:

// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This page is statically optimized automatically.</p>
    </div>
  );
}

// No getServerSideProps or getInitialProps means Next.js serves it as static HTML
*/

/*
Important Notes:
- Automatic static optimization happens only if no server-side
  logic is used in the page.
- Pages with getStaticProps are also statically generated but explicitly.
- Reduces server load and speeds up response times.
- Works with both Pages Router and App Router (via static rendering defaults).
*/

/*
Follow-up Questions + Answers:

Q1: What is static optimization in Next.js?
A1: Automatic pre-rendering of pages as static HTML if no server-side logic is used.

Q2: How does Next.js detect if a page can be statically optimized?
A2: If the page doesn’t use getServerSideProps, getInitialProps, or other server-side data fetching.

Q3: What are the benefits?
A3: Faster page load, better SEO, reduced server load.

Q4: Can dynamic pages use static optimization?
A4: Only if paths are predefined with getStaticPaths and getStaticProps.

Q5: Which pages are ideal for static optimization?
A5: Blogs, documentation, landing pages, marketing pages.
*/
