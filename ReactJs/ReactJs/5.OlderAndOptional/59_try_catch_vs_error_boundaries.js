/* 59_try_catch_vs_error_boundaries.js

=====================================================
Try/Catch vs Error Boundaries in React
=====================================================

Definition:
In React, **try/catch** is a JavaScript mechanism to handle synchronous errors 
within a block of code, including event handlers or functions.  
**Error boundaries** are React components that catch errors during rendering, 
lifecycle methods, and constructors of their child components.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Try/Catch**
   - Handles errors **synchronously**.
   - Can be used inside functions, methods, or event handlers.
   - Does NOT catch errors in React render or lifecycle methods automatically.
   - Must wrap the exact code that might throw.

2. **Error Boundaries**
   - React-specific mechanism.
   - Catches errors **during rendering, lifecycle methods, constructors** of children.
   - Cannot catch errors inside event handlers, async callbacks, or setTimeouts.
   - Implemented via `componentDidCatch` lifecycle method or `static getDerivedStateFromError`.

3. **Differences**
   - Scope: Try/catch is local, error boundaries are component-level.
   - Use case: Try/catch for event handlers/async code, error boundaries for UI crashes.
   - Recovery: Error boundaries can render fallback UI; try/catch typically logs or handles errors inline.

-----------------------------------------------------
Example:
-----------------------------------------------------
// Using Try/Catch in Event Handler
import React, { Component } from "react";

class ClickComponent extends Component {
  handleClick = () => {
    try {
      throw new Error("Event handler error!");
    } catch (err) {
      console.error("Caught:", err);
    }
  };

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}

// Using Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}

export { ClickComponent, ErrorBoundary };

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Try/catch = **helmet for a specific task** (only protects that block).  
- Error boundary = **safety net for the whole stage** (protects all child components from crashing).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you catch async errors with error boundaries?  
A1: No, error boundaries do not catch asynchronous errors like fetch calls; use try/catch.

Q2: Can you use both together?  
A2: Yes, use try/catch for event handlers and async code, error boundaries for rendering issues.

Q3: What happens if an error boundary fails?  
A3: It bubbles up to the nearest parent error boundary. If none, React unmounts the component tree.

Q4: Can functional components be error boundaries?  
A4: No, currently only class components can be error boundaries.
*/
