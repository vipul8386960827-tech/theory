/* 33_next_head */
/*
Key Points (Interviewer Keywords + Explanation):
1. next/head – Next.js module that provides the <Head> component
   for managing HTML <head> elements in Pages Router.

2. Pages Router Usage – Works only in Pages Router (_app.js or page components).

3. Dynamic Metadata – Allows setting dynamic titles, meta tags,
   favicons, and links for individual pages.

4. Multiple <Head> – Can use multiple <Head> components; Next.js merges them.

5. SEO & Social Sharing – Essential for improving SEO, Open Graph tags,
   and social media previews.
*/

/*
Definition (Using Specific Terms):
next/head is a Next.js module that exposes the <Head> component,
allowing developers to modify the <head> section of HTML pages
in the Pages Router. It is used to set page titles, meta tags,
links, and scripts dynamically.
*/

/*
Code Example (Pages Router):

import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - My Website</title>
        <meta name="description" content="Get in touch with us." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Contact Page</h1>
      </main>
    </>
  );
}
*/

/*
Important Notes:
- Only available in Pages Router (not App Router).
- Multiple <Head> components are merged automatically.
- Last instance of a tag (like title) overrides previous.
- Use for SEO, social sharing, and including external resources.
*/

/*
Follow-up Questions + Answers:

Q1: What is next/head used for?
A1: To manage HTML <head> elements dynamically in Pages Router.

Q2: Can you set page-specific titles and meta tags?
A2: Yes, by using <Head> inside the page component.

Q3: How does Next.js handle multiple <Head> components?
A3: It merges them; the last tag overrides duplicates.

Q4: Does next/head work in App Router?
A4: No, in App Router use the <Head> component in layout.js.

Q5: Why is next/head important for SEO?
A5: Proper titles, descriptions, and Open Graph tags improve
    search engine ranking and social sharing previews.
*/
