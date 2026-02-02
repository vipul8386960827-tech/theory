/* 198_loadable_components.js

=====================================
Loadable Components in React
=====================================

Definition:
**Loadable Components** is a library for **code-splitting React components**.  
It allows loading components **on demand**, providing more control over loading behavior and 
server-side rendering (SSR) compatibility compared to `React.lazy`.

-------------------------------------
Key Points:
-------------------------------------
1. Allows dynamic import of components with **loading fallback**.  
2. Supports **server-side rendering**, unlike React.lazy.  
3. Provides features like **preloading** and **delaying display of loading indicators**.  
4. Helps improve performance by reducing **initial bundle size**.  

-------------------------------------
Guidelines:
-------------------------------------
- Use Loadable Components for **large, rarely used components or routes**.  
- Use when **SSR compatibility** is required.  
- Provide meaningful **loading fallback UI**.  

-------------------------------------
Example:
-------------------------------------
import React from "react";
import loadable from "@loadable/component";

// Dynamically load a component
const HeavyComponent = loadable(() => import("./HeavyComponent"), {
  fallback: <div>Loading...</div>,
});

function App() {
  return (
    <div>
      <h1>My App</h1>
      <HeavyComponent />
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Loadable Components is like **hiring a substitute chef only when a specific dish is ordered**:  
- The chef is only called when needed (component loads on demand).  
- You provide a placeholder (fallback) while the chef prepares the dish.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How is Loadable Components different from React.lazy?  
A1: Loadable Components supports SSR, preloading, and advanced loading strategies; React.lazy is client-only.  

Q2: Can you preload a component with Loadable Components?  
A2: Yes, you can call `.preload()` on the loadable component to fetch it ahead of time.  

Q3: Why provide a fallback UI?  
A3: To improve user experience while the component is being loaded asynchronously.  

Q4: When should you use Loadable Components over React.lazy?  
A4: When SSR or advanced preloading/loading features are needed.  

*/
