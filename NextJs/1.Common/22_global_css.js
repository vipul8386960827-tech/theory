/* 22_global_css */
/*
Key Points (Interviewer Keywords + Explanation):
1. Global CSS – Styles that apply across the entire Next.js application.

2. File Location – Usually stored in styles/globals.css or styles/globals.scss.

3. Import Requirement – Must be imported only once in the root layout
   (_app.js or app/layout.js) to avoid duplicate styles.

4. No Scoped Isolation – Unlike CSS Modules, global CSS affects all components.

5. Supported Options – Next.js supports CSS, SCSS, and PostCSS for global styles.
*/

/*
Definition (Using Specific Terms):
Global CSS in Next.js refers to styles that are applied universally
throughout the app. These styles are not scoped to a specific component
and must be imported in the root layout to be effective.
*/

/*
Code Example (Usage):

// styles/globals.css
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

// pages/_app.js (Pages Router)
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// app/layout.js (App Router)
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}
*/

/*
Important Notes:
- Global CSS must be imported only once.
- Overrides CSS Modules if selectors match.
- Useful for resets, typography, and theme styles.
- Can combine with CSS Modules for component-specific styling.
*/

/*
Follow-up Questions + Answers:

Q1: How is global CSS different from component-level CSS?
A1: Global CSS applies to all components, while component CSS (CSS Modules) is scoped.

Q2: Where should global CSS be imported?
A2: In _app.js (Pages Router) or app/layout.js (App Router) only.

Q3: Can global CSS override CSS Modules?
A3: Yes, if selectors have higher specificity.

Q4: Can we use SCSS for global styles?
A4: Yes, import a *.scss file instead.

Q5: Why use global CSS?
A5: For universal styles like resets, typography, themes, and layout utilities.
*/
/*
Key Points (Interviewer Keywords + Explanation):
1. Global CSS – Styles that apply across the entire Next.js application.

2. File Location – Usually stored in styles/globals.css or styles/globals.scss.

3. Import Requirement – Must be imported only once in the root layout
   (_app.js or app/layout.js) to avoid duplicate styles.

4. No Scoped Isolation – Unlike CSS Modules, global CSS affects all components.

5. Supported Options – Next.js supports CSS, SCSS, and PostCSS for global styles.
*/

/*
Definition (Using Specific Terms):
Global CSS in Next.js refers to styles that are applied universally
throughout the app. These styles are not scoped to a specific component
and must be imported in the root layout to be effective.
*/

/*
Code Example (Usage):

// styles/globals.css
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

// pages/_app.js (Pages Router)
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

// app/layout.js (App Router)
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}
*/

/*
Important Notes:
- Global CSS must be imported only once.
- Overrides CSS Modules if selectors match.
- Useful for resets, typography, and theme styles.
- Can combine with CSS Modules for component-specific styling.
*/

/*
Follow-up Questions + Answers:

Q1: How is global CSS different from component-level CSS?
A1: Global CSS applies to all components, while component CSS (CSS Modules) is scoped.

Q2: Where should global CSS be imported?
A2: In _app.js (Pages Router) or app/layout.js (App Router) only.

Q3: Can global CSS override CSS Modules?
A3: Yes, if selectors have higher specificity.

Q4: Can we use SCSS for global styles?
A4: Yes, import a *.scss file instead.

Q5: Why use global CSS?
A5: For universal styles like resets, typography, themes, and layout utilities.
*/
