/* 197_dynamic_import.js

=====================================
Dynamic Import in React
=====================================

Definition:
**Dynamic import** allows loading JavaScript modules **on demand** rather than at initial page load.  
In React, this is commonly used for **code splitting** to reduce bundle size and improve performance.

-------------------------------------
Key Points:
-------------------------------------
1. Syntax: `import('module_path').then(module => {...})`  
2. React supports dynamic imports with **React.lazy** for lazy loading components.  
3. Benefits:
   - Reduces initial bundle size.  
   - Improves page load speed.  
   - Loads components only when needed.  
4. Works with **Suspense** to show a fallback UI while loading.

-------------------------------------
Guidelines:
-------------------------------------
- Use dynamic imports for large components, routes, or rarely used modules.  
- Always wrap `React.lazy` components with `Suspense`.  
- Avoid overusing dynamic imports for very small components (can increase network requests unnecessarily).

-------------------------------------
Example:
-------------------------------------
import React, { Suspense } from "react";

// Lazy load a component
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Dynamic import is like **ordering food only when hungry**:  
- You don’t pay for or prepare all dishes upfront; you request only what’s needed.  
- React.lazy only loads the component when it’s about to be used.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What’s the difference between static and dynamic imports?  
A1: Static imports load modules at initial page load; dynamic imports load modules on demand.  

Q2: Why wrap lazy-loaded components with Suspense?  
A2: Suspense provides a fallback UI while the component is being fetched asynchronously.  

Q3: Can you use dynamic imports for non-component modules?  
A3: Yes, any JavaScript module can be dynamically imported.  

Q4: How does dynamic import help with performance?  
A4: It reduces initial bundle size, improving page load and perceived speed.  

*/
