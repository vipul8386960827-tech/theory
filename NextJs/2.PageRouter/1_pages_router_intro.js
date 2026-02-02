/* 1_pages_router_intro */
/*
Key Points (Interviewer Keywords + Explanation):
1. Pages Router – The traditional routing system in Next.js where
   files inside the `pages/` folder automatically map to routes.

2. Purpose – Simplifies routing by generating paths based on file
   structure without manual configuration.

3. Features –
   - File-based routing: Each file in `pages/` becomes a route.
   - Supports dynamic routes: e.g., `[id].js` for /product/1.
   - Supports nested folders for nested routes.
   - Can use getStaticProps, getServerSideProps, and getStaticPaths for data fetching.
   - Works with both SSR and SSG.

4. Benefits –
   - Quick setup with minimal configuration.
   - SEO-friendly routes.
   - Predictable routing structure based on folder hierarchy.
*/

/*
Definition (Using Specific Terms):
Pages Router is a file-based routing system in Next.js that automatically
maps files in the `pages/` folder to URLs, supporting dynamic and nested
routes with built-in data fetching methods.
*/

/*
Code Example (Basic Routing):

// pages/index.js
export default function HomePage() {
  return <h1>Home Page</h1>;
}

// pages/about.js
export default function AboutPage() {
  return <h1>About Page</h1>;
}

// pages/products/[id].js
export default function ProductPage({ params }) {
  return <h1>Product ID: {params.id}</h1>;
}

/*
Important Notes:
- Pages Router is recommended for simpler apps or when using
  traditional file-based routing.
- Dynamic routes use `[param].js` and catch-all routes use `[...param].js`.
- getStaticProps, getServerSideProps, and getStaticPaths are only available in Pages Router.
- Layouts can be shared via _app.js or _document.js.
*/

/*
Follow-up Questions + Answers:

Q1: What is Pages Router in Next.js?
A1: A file-based routing system where each file in `pages/` becomes a route.

Q2: Can Pages Router handle dynamic routes?
A2: Yes, using square brackets `[param].js` for variable routes.

Q3: How do nested routes work?
A3: Create nested folders in `pages/` and files inside them map to nested URLs.

Q4: What data fetching methods are supported in Pages Router?
A4: getStaticProps, getServerSideProps, and getStaticPaths.

Q5: Is Pages Router SEO-friendly?
A5: Yes, as routes are server-rendered or statically generated.
*/
