/* 9_404_page */
/*
Key Points (Interviewer Keywords + Explanation):
1. 404 Page – A custom page in Next.js to handle "Page Not Found" errors.

2. Purpose – Display a friendly message or redirect when a user visits a non-existent route.

3. Features –
   - Located at `pages/404.js`.
   - Automatically used by Next.js for 404 errors.
   - Can include custom design, navigation links, or redirection logic.
   - Works with both static and dynamic routes.

4. Benefits –
   - Improves user experience.
   - Keeps users on the site by providing navigation options.
   - Fully customizable without affecting other error pages.
*/

/*
Definition (Using Specific Terms):
`pages/404.js` is a special Pages Router file that renders a custom
"Page Not Found" message for routes that do not exist in the application.
*/

/*
Code Example (Custom 404 Page):

// pages/404.js
import Link from "next/link";

export default function Custom404() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}

/*
Important Notes:
- Only one 404.js file per project.
- Automatically rendered for unmatched routes.
- Can include links, buttons, or animations to improve UX.
- Can be combined with global layouts in _app.js.
*/

/*
Follow-up Questions + Answers:

Q1: What is pages/404.js in Next.js?
A1: A special Pages Router file for rendering custom 404 "Page Not Found" pages.

Q2: Does Next.js automatically use 404.js for unmatched routes?
A2: Yes, any unmatched route triggers this page.

Q3: Can you style 404.js?
A3: Yes, fully customizable with CSS or components.

Q4: Can 404 page redirect automatically?
A4: Yes, using useEffect or router.push inside the component.

Q5: Does 404.js affect other error pages like 500?
A5: No, 404.js only handles "Page Not Found" errors.
*/
