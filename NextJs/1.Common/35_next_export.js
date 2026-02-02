/* 35_next_export */
/*
Key Points (Interviewer Keywords + Explanation):
1. next export – Next.js feature to export the app as a **fully static HTML site**.

2. Use Case – Ideal for sites that **do not require server-side rendering**,
   like blogs, portfolios, or documentation sites.

3. Command – Run `next export` after building the project with `next build`.

4. Output – Generates an `out` folder containing static HTML, CSS, JS,
   and assets ready for deployment on static hosts (Netlify, Vercel, GitHub Pages).

5. Limitations – SSR, API routes, getServerSideProps, and dynamic server-only 
   features do not work.
*/

/*
Definition (Using Specific Terms):
`next export` converts a Next.js app into a **static site** by pre-rendering
all pages at build time. The output can be deployed to any static hosting
service. Only SSG pages, static assets, and client-side interactivity remain functional.
*/

/*
Code Example (Usage):

// 1. Build the Next.js project
npm run build

// 2. Export as static HTML
npx next export

// 3. Deployment
// The 'out' folder contains static files ready for deployment
// e.g., copy 'out' contents to Netlify or GitHub Pages
*/

/*
Important Notes:
- Only works with static pages (SSG); SSR and API routes are not supported.
- Dynamic routes must have a list of paths via getStaticPaths.
- Ideal for simple static sites needing fast performance and easy deployment.
- All client-side JavaScript still works as usual.
*/

/*
Follow-up Questions + Answers:

Q1: What does `next export` do?
A1: Converts a Next.js app into fully static HTML for deployment on static hosts.

Q2: Can SSR pages be exported?
A2: No, only SSG and static pages can be exported.

Q3: Which folders are generated?
A3: The `out` folder containing HTML, CSS, JS, and assets.

Q4: Can dynamic routes work with next export?
A4: Yes, but they must have predefined paths via getStaticPaths.

Q5: When should you use next export?
A5: For blogs, portfolios, documentation sites, or any site not requiring server-side rendering.
*/
