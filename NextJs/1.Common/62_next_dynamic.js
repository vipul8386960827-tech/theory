/* 62_next_dynamic */
/*
Key Points (Interviewer Keywords + Explanation):
1. next/dynamic – Next.js feature for **dynamic imports** of components,
   allowing code splitting and lazy loading.

2. Purpose – Improve performance by loading components only when needed,
   reducing initial bundle size.

3. Implementation – Use `dynamic(() => import(...), options)` to import components dynamically.

4. Options – 
   - ssr: true/false (Enable or disable server-side rendering)
   - loading: Fallback component while loading
   - suspense: Use React Suspense for lazy loading

5. Benefits – Faster initial page load, better user experience, 
   optimized performance for large apps.
*/

/*
Definition (Using Specific Terms):
`next/dynamic` is a function in Next.js that allows importing components
dynamically at runtime. Supports SSR control, loading fallback, and Suspense integration.
*/

/*
Code Example (Basic Dynamic Import):

import dynamic from "next/dynamic";

// Dynamically import component
const DynamicComponent = dynamic(() => import("../components/HeavyComponent"));

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <DynamicComponent />
    </div>
  );
}

/*
Code Example (With SSR disabled):

const ClientOnlyComponent = dynamic(
  () => import("../components/ClientOnlyComponent"),
  { ssr: false, loading: () => <p>Loading...</p> }
);

export default function Page() {
  return (
    <div>
      <h1>Client-only Component Example</h1>
      <ClientOnlyComponent />
    </div>
  );
}
*/

/*
Important Notes:
- Works in both Pages Router and App Router.
- Can be used for client-only components (ssr: false).
- Can provide a fallback loading component for better UX.
- Helps in performance optimization and code splitting.
- Supports React Suspense for advanced lazy loading.
*/

/*
Follow-up Questions + Answers:

Q1: What is next/dynamic in Next.js?
A1: Function for dynamic/lazy loading components to optimize performance.

Q2: How do you disable SSR for a dynamic component?
A2: Pass `{ ssr: false }` in the options.

Q3: Can you show a loading fallback while dynamic component loads?
A3: Yes, use `{ loading: () => <p>Loading...</p> }`.

Q4: Does it work with App Router?
A4: Yes, works the same as Pages Router.

Q5: Why use dynamic imports?
A5: Reduce initial bundle size, improve performance, load heavy or client-only components on demand.
*/
