/* 199_suspense_component.js

=====================================
Suspense Component in React
=====================================

Definition:
**Suspense** is a React component that allows you to **display a fallback UI** while waiting for asynchronous operations,  
commonly used with **lazy-loaded components** or **data fetching libraries** that support Suspense.

-------------------------------------
Key Points:
-------------------------------------
1. Wraps **lazy-loaded components** (React.lazy) or other async resources.  
2. `fallback` prop specifies what to render while waiting (loading spinner, placeholder, etc.).  
3. Improves user experience by showing something immediately instead of blank UI.  
4. Works with libraries like **React.lazy** and **Relay**, and upcoming concurrent features.

-------------------------------------
Guidelines:
-------------------------------------
- Always wrap **lazy-loaded components** with Suspense.  
- Keep fallback UI **simple and lightweight**.  
- Can nest multiple Suspense components for fine-grained loading states.  

-------------------------------------
Example:
-------------------------------------
import React, { Suspense } from "react";

// Lazy-loaded component
const LazyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading component...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Suspense is like **waiting for a delivery with a placeholder box**:  
- While your main item is being delivered (component loads),  
  you see a temporary placeholder (fallback UI) to indicate progress.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can Suspense be used for data fetching?  
A1: Yes, with libraries that support Suspense, like Relay or React experimental features.  

Q2: What happens if you don’t wrap a lazy component in Suspense?  
A2: React will throw an error because it cannot handle the async loading without a fallback.  

Q3: Can you nest multiple Suspense components?  
A3: Yes, to show different fallback UIs for different parts of the component tree.  

Q4: Does Suspense block the entire UI?  
A4: No, only the wrapped portion is suspended; the rest of the UI remains interactive.  

*/
