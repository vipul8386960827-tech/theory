/* 177_component_stack_trace_from_error_boundary.js

=================================================
Component Stack Trace from Error Boundary
=================================================

📌 Definition:
When an Error Boundary catches an error using `componentDidCatch(error, info)`,
the second argument (`info`) includes a `componentStack` property.  
This shows the hierarchy of components where the error occurred, helping in debugging.

-------------------------------------
Method Signature:
-------------------------------------
componentDidCatch(error, info)
- error → The actual JavaScript error object.
- info → Contains `componentStack` (string describing the component hierarchy).

-------------------------------------
Example:
-------------------------------------
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.error("Error:", error);
    console.error("Component Stack Trace:", info.componentStack);
  }

  render() {
    return this.props.children;
  }
}

function Buggy() {
  throw new Error("I crashed!");
}

function App() {
  return (
    <ErrorBoundary>
      <Buggy />
    </ErrorBoundary>
  );
}

// Console Output Example:
// Error: I crashed!
// Component Stack Trace:
//     in Buggy (at App.js:18)
//     in ErrorBoundary (at App.js:17)

-------------------------------------
✅ Key Points:
-------------------------------------
- `error` → the JS error itself.  
- `info.componentStack` → path of components leading to the error.  
- Works for both class and function components.  
- Useful for logging errors to monitoring tools like Sentry, LogRocket, or Datadog.  

-------------------------------------
🔎 Follow-Up Interview Questions:
-------------------------------------
Q1: What’s the difference between `error` and `componentStack`?  
Q2: Can `componentStack` be shown to users?  
Q3: How would you integrate this with a logging service?  
Q4: Does React show file/line numbers in `componentStack`?  

*/
