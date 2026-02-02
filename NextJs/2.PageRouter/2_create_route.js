/* 2_create_route */
/*
Key Points (Interviewer Keywords + Explanation):
1. Create Route – In Next.js Pages Router, creating a route is as simple
   as creating a new file inside the `pages/` folder.

2. Purpose – Automatically maps file structure to URLs without manual routing setup.

3. Features –
   - File-based routing: File name becomes route path.
   - Nested routes: Use folders inside `pages/`.
   - Dynamic routes: Use `[param].js` for variable routes.
   - Catch-all routes: Use `[...param].js` to match multiple segments.

4. Benefits –
   - Quick and easy route creation.
   - Predictable URLs based on folder structure.
   - Supports SSR, SSG, and dynamic routing out of the box.
*/

/*
Definition (Using Specific Terms):
In Pages Router, creating a route involves adding a file to the `pages/` directory.
The file name or folder structure automatically determines the route path.
*/

/*
Code Example (Creating Routes):

// pages/index.js
export default function HomePage() {
  return <h1>Home Page</h1>;
}

// pages/about.js
export default function AboutPage() {
  return <h1>About Page</h1>;
}

// pages/products/[id].js (Dynamic Route)
export default function ProductPage({ params }) {
  return <h1>Product ID: {params.id}</h1>;
}

// pages/blog/[...slug].js (Catch-all Route)
export default function BlogPage({ params }) {
  return <h1>Blog Path: {params.slug.join("/")}</h1>;
}

/*
Important Notes:
- File name determines the route path.
- Nested folders create nested routes.
- Dynamic segments use `[param]` syntax.
- Catch-all routes use `[...param]` for multiple path segments.
- Pages can also export data fetching functions like getStaticProps or getServerSideProps.
*/

/*
Follow-up Questions + Answers:

Q1: How do you create a new route in Pages Router?
A1: Add a new file in the `pages/` folder; the file name becomes the route path.

Q2: How are dynamic routes created?
A2: Use square brackets `[param].js` for variable routes.

Q3: What is a catch-all route?
A3: `[...param].js` matches multiple segments in the URL.

Q4: Can nested folders create nested routes?
A4: Yes, folder structure maps directly to URL paths.

Q5: Can pages have server-side or static data fetching?
A5: Yes, with getServerSideProps, getStaticProps, or getStaticPaths.
*/
