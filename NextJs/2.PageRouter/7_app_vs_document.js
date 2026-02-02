/* 7_app_vs_document */
/*
Key Points (Interviewer Keywords + Explanation):
1. _app.js vs _document.js – Two special Pages Router files in Next.js
   with different purposes and lifecycles.

2. Purpose –
   - _app.js: Wraps all page components; for layouts, global state, and CSS.
   - _document.js: Customizes HTML document structure; server-only.

3. Features –
   _app.js:
     - Receives Component (current page) and pageProps.
     - Runs on client and server during page navigation.
     - Import global CSS and wrap pages with providers or layouts.

   _document.js:
     - Runs only on the server.
     - Customize <html>, <head>, and <body> tags.
     - Add fonts, meta tags, and scripts globally.

4. Benefits –
   - _app.js: Persist layouts, share context/state, global styling.
   - _document.js: Control full HTML document structure, inject scripts or fonts.
*/

/*
Definition (Using Specific Terms):
_app.js wraps all pages for global logic, CSS, and state, while
_document.js modifies the server-rendered HTML document structure.
They complement each other in Pages Router.
*/

/*
Code Example (_app.js vs _document.js):

// pages/_app.js
import "../styles/globals.css";
import { UserProvider } from "../context/UserContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
*/

/*
Important Notes:
- _app.js runs on client and server, _document.js only on server.
- _app.js is for layout, state, and global CSS; _document.js for HTML structure.
- Only one of each file per project.
- Together, they provide full control over rendering and page setup.
*/

/*
Follow-up Questions + Answers:

Q1: Difference between _app.js and _document.js?
A1: _app.js wraps pages for layout/state, _document.js customizes HTML structure.

Q2: Can _document.js run client-side code?
A2: No, server-only.

Q3: Can _app.js access pageProps from getStaticProps?
A3: Yes, passed automatically to Component.

Q4: Can both files exist together?
A4: Yes, both are used for different purposes.

Q5: When to use _document.js?
A5: For fonts, meta tags, global scripts, or modifying <html>/<body>.
*/
