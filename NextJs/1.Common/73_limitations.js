/* 73_limitations */
/*
Key Points (Interviewer Keywords + Explanation):
1. Limitations – Drawbacks or constraints of using Next.js in projects.

2. Common Limitations –
   - Learning Curve: App Router, SSR, SSG, ISR, and middleware can be complex for beginners.
   - Build Size: Large apps may have bigger initial JS bundles if not optimized.
   - Server-Side Rendering Overhead: SSR can increase server load and response time.
   - Limited Control on Some Defaults: Next.js handles routing, bundling, and configuration automatically, which may limit fine-grained control.
   - Custom Server Limitations: Using a custom server can prevent some built-in Next.js optimizations.
   - App Router vs Pages Router Differences: Some features differ between routers, leading to inconsistencies.
   - Third-Party Library Compatibility: Some libraries may not fully support SSR or Next.js specifics.
   - Deployment Constraints: Certain hosting platforms may require special configuration for SSR/ISR.
   - AMP Support Limitations: Limited to Pages Router; App Router requires workarounds.
   - Hot Reload Limitations: Certain configurations or middleware changes may not trigger full refresh automatically.
*/

/*
Definition (Using Specific Terms):
Limitations in Next.js refer to inherent constraints in framework design,
such as SSR overhead, bundle size, learning complexity, and differences
between Pages and App Routers that may affect performance or developer flexibility.
*/

/*
Code Example (Illustrative – Handling Large SSR Pages):

// pages/large-data.js
import dynamic from "next/dynamic";

// Dynamically import heavy component to reduce SSR load
const LargeComponent = dynamic(() => import("../components/LargeComponent"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function LargeDataPage({ data }) {
  return (
    <div>
      <h1>Large Data Page</h1>
      <LargeComponent />
    </div>
  );
}
*/

/*
Important Notes:
- Be aware of SSR and SSG trade-offs when designing pages.
- Optimize bundle size using dynamic imports and code splitting.
- Know the differences between App Router and Pages Router to avoid pitfalls.
- Use caching, lazy loading, and image optimization to mitigate limitations.
- Some third-party libraries may not be fully compatible with SSR or App Router.
*/

/*
Follow-up Questions + Answers:

Q1: What are some limitations of Next.js?
A1: SSR overhead, large bundle size, learning curve, router differences, custom server constraints.

Q2: How can SSR overhead be mitigated?
A2: Use dynamic imports, lazy loading, and caching.

Q3: Are all third-party libraries compatible with Next.js?
A3: No, some may not support SSR or App Router features.

Q4: Does Next.js limit control over routing or bundling?
A4: Yes, Next.js handles routing and bundling automatically, limiting some fine-grained control.

Q5: What should developers be cautious about in large apps?
A5: Optimize bundle size, SSR/ISR load, image performance, and ensure third-party compatibility.
*/
