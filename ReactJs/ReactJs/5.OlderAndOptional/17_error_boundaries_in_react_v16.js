/* 17_error_boundaries_in_react_v16.js

=====================================
Error Boundaries in React v16
=====================================

Definition:
Error boundaries are **React components that catch JavaScript errors anywhere in their child
component tree, log those errors, and display a fallback UI** instead of crashing the entire app.  
Introduced in **React v16**.

-------------------------------------
Key Points:
-------------------------------------
1. Error boundaries catch errors in:
   - Render phase
   - Lifecycle methods
   - Constructors of child components
2. They **do NOT catch errors** in:
   - Event handlers
   - Asynchronous code (setTimeout, fetch)
   - Server-side rendering
   - Errors in the error boundary itself
3. Implemented using **class components** with either:
   - `static getDerivedStateFromError(error)`
   - `componentDidCatch(error, info)`

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error info to an external service
    console.log("Error:", error, "Info:", info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>; // Fallback UI
    }
    return this.props.children;
  }
}

// Usage
function BuggyComponent() {
  throw new Error("I crashed!");
  return <div>Buggy</div>;
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Error boundaries are like **seat belts in a car**.  
  - If a crash happens (error in child component), the car (app) doesn't totally crash.  
  - Instead, it stops safely and shows a fallback message.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can functional components be error boundaries?  
A1: No, only class components can currently be error boundaries.

Q2: Why are error boundaries important?  
A2: They prevent the entire React component tree from crashing, improving user experience.

Q3: Do error boundaries catch errors in event handlers?  
A3: No, you should handle those errors with try/catch inside the handler.

Q4: Can an error boundary catch errors in nested children?  
A4: Yes, as long as the error occurs during rendering, lifecycle methods, or constructors.
*/
