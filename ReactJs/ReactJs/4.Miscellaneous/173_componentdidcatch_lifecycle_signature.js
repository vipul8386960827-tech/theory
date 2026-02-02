/* 173_componentdidcatch_lifecycle_signature.js

=================================================
componentDidCatch Lifecycle Signature
=================================================

Definition:
- `componentDidCatch(error, info)` is a lifecycle method introduced in React 16.
- It allows **class components** to catch JavaScript errors in their child component tree.
- Prevents the entire app from crashing by showing a fallback UI.

-------------------------------------
Method Signature:
-------------------------------------
componentDidCatch(error, info)

Parameters:
1. **error** → The error thrown by a descendant component.
2. **info** → An object with details about where the error occurred.
   - Contains `componentStack` (a string of the component hierarchy).

-------------------------------------
Usage:
-------------------------------------
- Typically used inside an **Error Boundary** (a class component).
- Displays a fallback UI instead of crashing the entire app.

-------------------------------------
Example:
-------------------------------------
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Update state so next render shows fallback UI
    this.setState({ hasError: true });

    // Log error details for debugging
    console.error("Error caught:", error);
    console.error("Error info:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

-------------------------------------
Key Points:
-------------------------------------
- Only works in **class components** (not functional components).
- Catches errors in:
  - Lifecycle methods
  - Render methods
  - Constructors of child components
- Does NOT catch errors in:
  - Event handlers
  - Asynchronous code (e.g., `setTimeout`, Promises)
  - Server-side rendering

-------------------------------------
Analogy:
-------------------------------------
- `componentDidCatch` is like a **fire alarm system** in a building:
  - If a small fire starts (error in a child), the alarm goes off (logs error + fallback UI),
  - but the whole building (app) doesn’t collapse.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What is the difference between `componentDidCatch` and `try/catch`?  
A1: `try/catch` only works for synchronous code, while `componentDidCatch` works for React’s rendering lifecycle errors.

Q2: Can functional components use `componentDidCatch`?  
A2: No, but you can wrap them in an Error Boundary class component.

Q3: What is the modern alternative to `componentDidCatch` in functional components?  
A3: Use the `ErrorBoundary` component (class) or third-party hooks-based libraries.

Q4: Why doesn’t `componentDidCatch` catch event handler errors?  
A4: Because React assumes event handlers are user-initiated and should be handled manually with `try/catch`.
*/
