/* 58_meta_tags */
/*
Key Points (Interviewer Keywords + Explanation):
1. Meta Tags – HTML elements in the <head> section used to provide
   metadata about a page.

2. Purpose – Improve SEO, control how content appears on social media,
   define viewport, charset, and other page-level settings.

3. Implementation – In Next.js, use `next/head` (Pages Router)
   or the `head` export/component (App Router).

4. Common Meta Tags –
   - title: Page title
   - description: Page description
   - viewport: Responsive settings
   - charset: Character encoding
   - Open Graph & Twitter: Social sharing info
   - robots: Indexing instructions

5. Benefits – Improves SEO, enhances social media previews,
   ensures correct page rendering across devices.
*/

/*
Definition (Using Specific Terms):
Meta tags in Next.js are added in the <head> to provide information
about the page. They help search engines, social platforms, and
browsers understand and render the content correctly.
*/

/*
Code Example (Pages Router: pages/about.js):

import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | My App</title>
        <meta name="description" content="Learn about our company" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta property="og:title" content="About Us | My App" />
        <meta property="og:description" content="Learn about our company" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <h1>About Page</h1>
    </>
  );
}

/*
Code Example (App Router: app/about/head.js):

export default function HeadComponent() {
  return (
    <>
      <title>About Us | My App</title>
      <meta name="description" content="Learn about our company" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta property="og:title" content="About Us | My App" />
      <meta property="og:description" content="Learn about our company" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
*/

/*
Important Notes:
- Pages Router: use next/head inside page components.
- App Router: use head.js per route or layout.
- Can be dynamic per page for SEO and social sharing.
- Supports Open Graph, Twitter Cards, and standard metadata.
- Helps improve search engine ranking and social media previews.
*/

/*
Follow-up Questions + Answers:

Q1: How do you add meta tags in Next.js?
A1: Pages Router: use next/head; App Router: use head.js or head export.

Q2: Why are meta tags important?
A2: Improve SEO, control social previews, ensure correct rendering on devices.

Q3: Can meta tags be dynamic?
A3: Yes, can change per page using props or route params.

Q4: Which social meta tags are commonly used?
A4: Open Graph (og:*) for Facebook, Twitter Cards (twitter:*) for Twitter.

Q5: Does App Router require a separate file for head?
A5: Yes, usually a head.js file per route or layout.
*/
