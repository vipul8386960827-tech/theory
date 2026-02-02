/* 165_react_lazy_function.js

=====================================
React.lazy Function
=====================================

Definition:
`React.lazy` is a function that enables **code-splitting** by dynamically loading 
a React component only when it’s needed. It helps reduce the initial bundle size 
and improves application performance.

-------------------------------------
Key Points:
-------------------------------------

1. Purpose:
   - Used for **lazy loading components**.
   - Defers loading of non-critical components until they are rendered.

2. Syntax:
-------------------------------------
const Component = React.lazy(() => import("./Component"));
-------------------------------------

3. Requirements:
   - Must be wrapped in a `<React.Suspense>` component.
   - `<Suspense>` requires a `fallback` UI (e.g., loading spinner) 
     to show while the lazy component is being loaded.

4. Example:
-------------------------------------
import React, { Suspense } from "react";

const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <div>
      <h1>Main App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
-------------------------------------

5. When to Use:
   - Large components not needed immediately.
   - Route-based code-splitting in React apps.
   - Reducing initial load time of the app.

6. When NOT to Use:
   - For small, frequently used components (overhead may outweigh benefits).
   - For critical components required at app startup.

-------------------------------------
Analogy:
-------------------------------------
- React.lazy = **Just-in-time delivery**.
- Instead of loading all furniture when you move in, you only order 
  and deliver items when you actually need them.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What is the difference between React.lazy and dynamic imports?  
A1: React.lazy internally uses dynamic imports but integrates with React’s rendering 
    and Suspense system for seamless lazy loading.

Q2: Can you use React.lazy for named exports?  
A2: No, React.lazy only works with default exports.

Q3: Can you lazy load multiple components in one Suspense?  
A3: Yes, multiple lazy components can be wrapped inside one Suspense.

Q4: How does React.lazy differ from loadable-components library?  
A4: React.lazy is built into React and simpler; loadable-components provides 
    more advanced features like server-side rendering support.
*/
