/* 53_next_seo */
/*
Key Points (Interviewer Keywords + Explanation):
1. Next SEO – Managing SEO metadata in Next.js for better search engine ranking
   and social media sharing.

2. Implementation – Use the `next-seo` library to easily set meta tags, open graph,
   and Twitter card data for pages.

3. Features – Set page title, description, canonical URL, meta tags, structured data,
   and social sharing info.

4. Benefits – Improves SEO, enhances social media previews,
   and provides a consistent way to manage SEO across the app.

5. Use Cases – Blogs, e-commerce, marketing pages, landing pages.
*/

/*
Definition (Using Specific Terms):
Next SEO is a library for Next.js that helps developers manage
SEO metadata efficiently. It integrates with Pages Router or App Router
and allows defining titles, descriptions, open graph, and Twitter
metadata per page or globally.
*/

/*
Code Example (Installation):

// Install package
npm install next-seo

// pages/_app.js (Global SEO defaults)
import { DefaultSeo } from "next-seo";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title="My Next.js App"
        description="This is a Next.js application with SEO"
        openGraph={{
          type: "website",
          url: "https://www.example.com",
          site_name: "Next SEO App",
        }}
        twitter={{
          handle: "@example",
          site: "@example",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

// pages/about.js (Page-level SEO)
import { NextSeo } from "next-seo";

export default function About() {
  return (
    <>
      <NextSeo
        title="About Us | Next SEO Example"
        description="Learn about our company and team."
      />
      <h1>About Page</h1>
    </>
  );
}
*/

/*
Important Notes:
- Use DefaultSeo for global metadata.
- Use NextSeo for page-specific metadata.
- Works with both Pages Router and App Router.
- Helps with Open Graph (Facebook), Twitter Cards, and structured data.
- Improves visibility on search engines and social media platforms.
*/

/*
Follow-up Questions + Answers:

Q1: What is Next SEO in Next.js?
A1: A library to manage SEO metadata (title, description, OG tags) efficiently.

Q2: How do you set global SEO defaults?
A2: Use the DefaultSeo component in _app.js.

Q3: How do you override metadata per page?
A3: Use NextSeo component inside the page component.

Q4: Does it work with App Router?
A4: Yes, can be used in app/ or pages/ routes.

Q5: What benefits does it provide?
A5: Better SEO, social media previews, structured data management, consistent metadata handling.
*/
