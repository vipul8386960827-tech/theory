/* 67_methods_invoked_during_error_handling.js

=====================================================
Methods Invoked During Error Handling in React
=====================================================

Definition:
React provides **Error Boundaries** to catch runtime errors in the component tree.
When an error occurs in a child component, specific lifecycle methods are invoked
to handle it gracefully without crashing the entire app.

-----------------------------------------------------
Error Handling Lifecycle Methods:
-----------------------------------------------------
1. static getDerivedStateFromError(error)
   - Called when a child component throws an error.
   - Allows updating state to display a fallback UI.
   - Pure function; does not have access to component instance.

2. componentDidCatch(error, info)
   - Called after an error is thrown.
   - Receives error and additional info like component stack.
   - Ideal for logging errors to services (Sentry, LogRocket, etc.).
   - Can also trigger side effects like analytics or alerts.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
- Only **class components** can be Error Boundaries.
- Error Boundaries do not catch:
  - Errors in event handlers
  - Errors in asynchronous code (setTimeout, promises)
  - Errors in server-side rendering
  - Errors in themselves (the boundary must be wrapped by another)

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError:", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("componentDidCatch:", error, info.componentStack);
    // Send error info to logging service
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
- Error Boundary = safety net for acrobats.
  - If one acrobat (child component) falls (throws an error),
    the net (Error Boundary) catches them so the show (app) continues safely.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can functional components act as Error Boundaries?  
A1: No, only class components can implement getDerivedStateFromError and componentDidCatch.

Q2: Will Error Boundaries catch errors in event handlers?  
A2: No, event handlers require manual try/catch blocks.

Q3: How can you log errors from Error Boundaries?  
A3: Use componentDidCatch to send error details to a logging service.

Q4: Can an Error Boundary catch errors in itself?  
A4: No, an Error Boundary cannot catch its own errors; wrap it inside another Error Boundary.

*/
