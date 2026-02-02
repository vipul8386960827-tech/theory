/* 200_route_based_code_splitting.js

=====================================
Route-Based Code Splitting in React
=====================================

Definition:
**Route-based code splitting** is a technique where React applications **load only the code necessary for the current route**.  
This reduces initial bundle size and improves performance, especially for large applications.

-------------------------------------
Key Points:
-------------------------------------
1. Uses **React.lazy** or **Loadable Components** to lazy-load route components.  
2. Each route can be split into its **own bundle**, loaded only when the route is accessed.  
3. Works with **React Router** to conditionally render components.  
4. Improves **first load performance** and **reduces unnecessary code** sent to the client.  

-------------------------------------
Guidelines:
-------------------------------------
- Wrap lazy-loaded route components with **Suspense** for fallback UI.  
- Ideal for routes that are **not frequently accessed**.  
- Combine with **chunk naming** in webpack for better bundle management.  

-------------------------------------
Example:
-------------------------------------
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load route components
const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Route-based code splitting is like **only opening the chapter you need from a textbook**:  
- You don’t carry or read the entire book upfront, just the current chapter (route).  
- Reduces unnecessary load and saves time.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How does route-based code splitting improve performance?  
A1: Reduces initial bundle size, loading only code needed for the current route.  

Q2: Can you combine route-based splitting with component-level splitting?  
A2: Yes, each route can lazy-load multiple components to further optimize loading.  

Q3: Why wrap routes with Suspense?  
A3: Suspense provides a fallback UI while the lazy-loaded route component is being fetched.  

Q4: Is route-based code splitting compatible with server-side rendering?  
A4: Yes, but requires libraries like **Loadable Components** that support SSR.  

*/
