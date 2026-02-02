/* 5_app_js */
/*
Key Points (Interviewer Keywords + Explanation):
1. _app.js – Special file in Pages Router located at `pages/_app.js`.

2. Purpose – Wraps all pages to share layouts, global styles, or state.

3. Features –
   - Renders all page components.
   - Can include global CSS imports.
   - Useful for context providers, layouts, or global logic.
   - Receives `Component` (current page) and `pageProps` (props returned from data fetching).

4. Benefits –
   - Share layout or state across pages.
   - Apply global styles consistently.
   - Reduce duplication for wrappers or providers.
*/

/*
Definition (Using Specific Terms):
`_app.js` is a top-level component in Next.js Pages Router that wraps
all pages, enabling shared layouts, global CSS, and context/state.
*/

/*
Code Example (_app.js):

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

/*
Explanation:
- Import global CSS here once.
- Wrap pages with providers or layout components.
- `Component` renders the current page.
- `pageProps` comes from getStaticProps or getServerSideProps.
*/

/*
Important Notes:
- Only one `_app.js` per project.
- Cannot be dynamically imported.
- Persist layouts or state between page navigations.
- Can include global error handling or logging.
*/

/*
Follow-up Questions + Answers:

Q1: What is `_app.js` in Next.js?
A1: Top-level component wrapping all pages for global styles, layouts, or state.

Q2: Can CSS be imported in `_app.js`?
A2: Yes, global CSS must be imported here.

Q3: How to share state across pages?
A3: Use context providers or Redux/Zustand wrapped in `_app.js`.

Q4: What props does `_app.js` receive?
A4: `Component` (current page) and `pageProps`.

Q5: Can a project have multiple `_app.js` files?
A5: No, only one is allowed.
*/
