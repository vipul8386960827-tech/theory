/* 65_purpose_of_getderivedstatefromerror.js

=====================================================
Purpose of getDerivedStateFromError in React
=====================================================

Definition:
getDerivedStateFromError is a static lifecycle method in React
introduced in version 16. It is used in **error boundary components** 
to catch errors during rendering, in lifecycle methods, or in constructors
of the whole tree below them. It allows updating the component state 
so that a fallback UI can be rendered.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Error Boundaries
   - Components that catch JavaScript errors anywhere in their child component tree.
   - Prevent the entire app from crashing due to an uncaught error.

2. getDerivedStateFromError Usage
   - Static method, cannot access "this".
   - Receives the error object as a parameter.
   - Returns a state object to update the UI (like showing a fallback message).

3. Complementary Method
   - componentDidCatch(error, info) is used alongside getDerivedStateFromError
     for side effects like logging errors.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error to an external service
    console.log("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Error boundary = safety net in a circus.
- If a performer (child component) falls (throws error), the safety net catches them
  and prevents the audience (app) from seeing a crash.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can getDerivedStateFromError catch errors in event handlers?  
A1: No, it only catches errors during rendering, lifecycle methods, and constructors.

Q2: Can functional components use getDerivedStateFromError?  
A2: Not directly; they need to be wrapped in a class-based error boundary.

Q3: Why is it static?  
A3: To ensure it does not depend on component instance and can reliably update state.

Q4: What happens if you throw an error outside React tree?  
A4: Error boundaries will not catch it; you need try/catch or window.onerror.

*/
