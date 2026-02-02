/* 6_document_js */
/*
Key Points (Interviewer Keywords + Explanation):
1. _document.js – Special file in Pages Router located at `pages/_document.js`.

2. Purpose – Customize the HTML document structure, <html>, <head>, and <body> tags.
   Runs only on the server side; not for client-side logic.

3. Features –
   - Can add custom meta tags, fonts, or analytics scripts.
   - Useful for modifying <html> and <body> attributes.
   - Supports server-side rendering customization.
   - Only rendered once per page load (not re-rendered on client navigation).

4. Benefits –
   - Control over the entire HTML structure.
   - Inject scripts, fonts, or meta tags globally.
   - Can set lang attribute, theme classes, or custom attributes.
*/

/*
Definition (Using Specific Terms):
`_document.js` is a Next.js Pages Router file that allows developers
to customize the HTML document structure and server-rendered content
outside of React’s component tree.
*/

/*
Code Example (_document.js):

// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/*
Explanation:
- `<Html>` sets attributes like lang globally.
- `<Head>` allows adding meta tags, fonts, or analytics scripts.
- `<Main>` renders the page content.
- `<NextScript>` injects Next.js scripts for hydration and client-side JS.
*/

/*
Important Notes:
- Only rendered on the server; cannot use React hooks or client-side logic.
- Only one `_document.js` per project.
- Useful for fonts, global scripts, or modifying <html>/<body> attributes.
- Complementary to `_app.js`, which wraps pages for shared layout or state.
*/

/*
Follow-up Questions + Answers:

Q1: What is `_document.js` in Next.js?
A1: A Pages Router file to customize HTML structure and server-rendered content.

Q2: Can you use React hooks in `_document.js`?
A2: No, it runs only on the server.

Q3: How do you add global fonts or scripts?
A3: Use the `<Head>` tag inside `_document.js`.

Q4: Can `_document.js` be used for client-side logic?
A4: No, it is server-only.

Q5: How does `_document.js` differ from `_app.js`?
A5: `_document.js` modifies HTML structure; `_app.js` wraps pages for layouts and state.
*/
