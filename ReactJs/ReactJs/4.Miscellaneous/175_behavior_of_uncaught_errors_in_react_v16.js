/* 175_behavior_of_uncaught_errors_in_react_v16.js

=================================================
Behavior of Uncaught Errors in React v16
=================================================

Definition:
- In React versions **before v16**, uncaught errors were silently swallowed by React.
- React v16 introduced a **new error handling mechanism**:
  - If an error is not caught by an Error Boundary, React will **unmount the entire component tree** where the error occurred.
  - This prevents the app from continuing in an inconsistent or broken state.

-------------------------------------
Behavior Before React v16:
-------------------------------------
- Errors during rendering, lifecycle methods, or constructors of components:
  - Were **silently ignored**.
  - App might continue running but in a corrupted or unpredictable state.
- Developers had to rely on global error handling (`window.onerror`) or manual `try/catch`.

-------------------------------------
Behavior in React v16 and Later:
-------------------------------------
1. **Uncaught Render Errors**
   - If no Error Boundary is present, the error **bubbles up**.
   - React unmounts the component tree below the error.
   - The rest of the app continues running safely.

2. **Error Boundaries Can Catch Errors**
   - If an Error Boundary is present, it will catch the error and render fallback UI.
   - Prevents unmounting of the entire subtree.

3. **Better Developer Experience**
   - React now logs errors with clear messages in the console.
   - Helps developers debug issues faster.

-------------------------------------
Example:
-------------------------------------
class BuggyComponent extends React.Component {
  render() {
    throw new Error("Render failed!");
  }
}

function App() {
  return (
    <div>
      <BuggyComponent />  {/* Will crash without an Error Boundary 
    </div>
  );
}

// In React v16+:
// - Without ErrorBoundary → entire <BuggyComponent /> subtree unmounts.
// - With ErrorBoundary → fallback UI renders instead of crashing the app.

-------------------------------------
Key Points:
-------------------------------------
- React v16 **fails fast** rather than running in a corrupted state.
- Encourages developers to use **Error Boundaries** for resilience.
- Makes apps more predictable and debuggable.

-------------------------------------
Analogy:
-------------------------------------
- React < v16 = A car keeps driving even if the engine catches fire (silently ignores errors).
- React v16+ = Car automatically shuts down the affected system to prevent bigger damage (unmounts subtree).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What happens if there’s no Error Boundary in React v16+?  
A1: The component tree where the error occurred is unmounted to avoid corruption.

Q2: How did React v16 improve error handling compared to earlier versions?  
A2: It introduced Error Boundaries and a fail-fast mechanism for uncaught errors.

Q3: Can you catch errors in event handlers using Error Boundaries?  
A3: No, event handler errors need manual `try/catch`.

Q4: What should you always implement in large apps after React v16?  
A4: Error Boundaries, to gracefully handle UI crashes.
*/
