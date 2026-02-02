/* 32_head_component */
/*
Key Points (Interviewer Keywords + Explanation):
1. Head Component – Next.js provides a <Head> component
   to manage the HTML <head> section in pages and components.

2. Uses – Add title, meta tags, link tags, scripts, favicons, and SEO-related tags.

3. Scope – <Head> can be used per page or globally in _app.js / layout.js.

4. Dynamic Content – Titles and meta descriptions can be set dynamically
   based on page content.

5. Benefits – Improves SEO, social sharing previews, and metadata management.
*/

/*
Definition (Using Specific Terms):
The <Head> component in Next.js allows developers to modify
the HTML <head> for each page or component. This includes
setting the page title, meta tags, favicons, and linking external resources.
*/

/*
Code Example (Pages Router):

import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - My Website</title>
        <meta name="description" content="Learn more about our company." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>About Us</h1>
      </main>
    </>
  );
}

Code Example (App Router):

// app/about/page.js
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - My Website</title>
        <meta name="description" content="Learn more about our company." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>About Us</h1>
      </main>
    </>
  );
}
*/

/*
Important Notes:
- Multiple <Head> components on a page are merged automatically.
- Meta tags and title from the last <Head> take precedence.
- Useful for SEO, Open Graph, and social sharing optimization.
- Can also include scripts and external stylesheets if needed.
*/

/*
Follow-up Questions + Answers:

Q1: What is the purpose of <Head> in Next.js?
A1: To manage HTML head elements like title, meta tags, and favicons.

Q2: Can you use <Head> per page?
A2: Yes, it can be used individually in each page or component.

Q3: What happens if multiple <Head> components exist?
A3: They are merged; last occurrence of a tag overrides previous ones.

Q4: Can <Head> help with SEO?
A4: Yes, setting title, meta description, and Open Graph tags improves SEO.

Q5: Can scripts be added via <Head>?
A5: Yes, external scripts or inline scripts can be included if needed.
*/
