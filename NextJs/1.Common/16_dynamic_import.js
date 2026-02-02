/*
Key Points (Interviewer Keywords + Explanation):
1. Dynamic Import – Loading modules or components on-demand
   instead of at initial page load.

2. Performance Optimization – Reduces bundle size and
   improves page load times.

3. React Support – Next.js supports dynamic imports using
   next/dynamic.

4. SSR Control – Can choose to disable server-side rendering
   for a dynamically imported component.

5. Common Use Cases – Large components, charts, maps,
   third-party libraries, or rarely used features.
*/

/*
Definition (Using Specific Terms):
Dynamic import in Next.js allows components or modules to
be loaded asynchronously when they are needed.

It improves performance by splitting the code into smaller
chunks (code-splitting) and optionally disables SSR
for client-only components.
*/

/*
Code Example (Usage):

import dynamic from "next/dynamic";

// Dynamically import a component
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading...</p>, // Optional loading component
});

function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyComponent />
    </div>
  );
}
*/

/*
Important Notes:
- Use ssr: false for client-only components.
- Can provide a fallback/loading component.
- Helps reduce initial JavaScript bundle size.
- Supports dynamic import of libraries too.
*/

/*
Follow-up Questions + Answers:

Q1: What is dynamic import in Next.js?
A1: Loading components or modules asynchronously to reduce
    initial bundle size.

Q2: Why use dynamic import?
A2: To optimize performance and improve page load times.

Q3: How do you disable SSR for a dynamic component?
A3: Pass ssr: false in the dynamic() options.

Q4: Can we provide a loading indicator?
A4: Yes, using the loading option in dynamic().

Q5: Example use cases for dynamic import?
A5: Charts, maps, modals, heavy libraries, rarely used components.
*/
