/* 174_scenarios_error_boundaries_not_catch.js

=================================================
Scenarios Where Error Boundaries Do NOT Catch Errors
=================================================

Definition:
- Error Boundaries in React (using `componentDidCatch` or `getDerivedStateFromError`) 
  help prevent the app from crashing by catching **rendering errors** in child components.
- However, they do NOT catch every kind of error.

-------------------------------------
Scenarios Where Error Boundaries Do NOT Work:
-------------------------------------

1. **Event Handlers**
   - Example:
     <button onClick={() => { throw new Error("Click failed!") }}>Click</button>
   - Solution: Use `try/catch` inside the event handler.

2. **Asynchronous Code**
   - Errors thrown inside `setTimeout`, Promises, or async/await won't be caught.
   - Example:
     setTimeout(() => { throw new Error("Async fail!"); }, 1000);
   - Solution: Handle errors inside the async code with `.catch()` or `try/catch`.

3. **Server-Side Rendering (SSR)**
   - Error boundaries only work on the client side.
   - Errors during server-side rendering are not caught.

4. **Errors in Error Boundary Itself**
   - If the error boundary component itself throws an error while rendering, 
     it cannot catch that error.
   - Example: Incorrect fallback UI code inside Error Boundary.

5. **Errors in Non-React Code**
   - Errors outside React tree (e.g., manual DOM manipulation, global scripts) are not caught.

-------------------------------------
Example of Error Boundary NOT Catching:
-------------------------------------
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.error("Caught error:", error);
  }
  render() {
    return this.props.children;
  }
}

// This won't be caught:
function App() {
  function handleClick() {
    throw new Error("Event handler error");
  }
  return <button onClick={handleClick}>Click Me</button>;
}

-------------------------------------
Key Point:
-------------------------------------
- Error Boundaries = For **rendering lifecycle errors only**.
- They don’t replace **try/catch** or error handling in async code.

-------------------------------------
Analogy:
-------------------------------------
- Error Boundaries are like **safety nets in a circus**:
  - They catch performers (child components) if they fall during the act (rendering).
  - But if something happens backstage (async code, event handler), the net won’t help.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How do you handle errors in event handlers if Error Boundaries don’t catch them?  
A1: Use `try/catch` inside the event handler function.

Q2: Why don’t Error Boundaries work with async code?  
A2: Because async code runs outside React’s render lifecycle.

Q3: How should you handle SSR errors?  
A3: Use server-side error logging and try/catch at the server level.

Q4: Can one Error Boundary catch errors from another Error Boundary?  
A4: Yes, if the child boundary fails, its parent boundary can catch it.
*/
