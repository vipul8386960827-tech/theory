/* 69_pages_vs_components */
/*
Key Points (Interviewer Keywords + Explanation):
1. Pages – Files inside the `pages/` folder (Pages Router) or `app/` folder (App Router)
   that automatically create routes in Next.js.

2. Components – Reusable UI pieces that do not automatically map to routes;
   they are imported into pages or other components.

3. Purpose –
   - Pages: Define actual routes and render full screens.
   - Components: Modular, reusable pieces of UI used inside pages or layouts.

4. Features –
   - Pages can use getStaticProps/getServerSideProps (Pages Router) or fetch in App Router.
   - Components can accept props, manage state, and handle UI logic.
   - Pages render full views; components are partial views.

5. Benefits –
   - Pages: Automatic routing, SEO-friendly.
   - Components: Reusability, maintainability, cleaner code structure.
*/

/*
Definition (Using Specific Terms):
Pages are files that Next.js treats as routes, generating paths automatically.
Components are reusable React elements that encapsulate UI logic and presentation.
*/

/*
Code Example:

// pages/about.js (Page)
export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <TeamList /> {/* Component used inside page}
    </div>
  );
}

// components/TeamList.js (Component)
export default function TeamList() {
  return (
    <ul>
      <li>Alice</li>
      <li>Bob</li>
      <li>Charlie</li>
    </ul>
  );
}

/*
Important Notes:
- Pages automatically map to routes; components do not.
- Components can be nested inside pages or other components.
- Pages can include layouts and handle data fetching.
- Helps separate route-level logic from reusable UI.
*/

/*
Follow-up Questions + Answers:

Q1: What is the difference between a page and a component?
A1: Pages map to routes; components are reusable UI elements.

Q2: Can a component become a page automatically?
A2: No, it must be placed in `pages/` (Pages Router) or `app/` (App Router).

Q3: Can pages use components?
A3: Yes, pages usually compose multiple components.

Q4: Can components have state?
A4: Yes, components can manage local state and props.

Q5: Why separate pages and components?
A5: To keep routing logic separate from reusable UI and maintain clean structure.
*/
