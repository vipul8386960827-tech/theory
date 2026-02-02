/* 18_error_boundaries_handled_in_react_v15.js

=====================================
Error Handling in React v15
=====================================

Definition:
React v15 **did not have built-in error boundaries**. Any unhandled JavaScript errors in the
rendering phase would **crash the entire component tree**. Developers had to rely on:
- `try/catch` blocks manually in render methods
- Higher-order components for custom error handling
- Global error handlers like `window.onerror`

-------------------------------------
Key Points:
-------------------------------------
1. No lifecycle methods like `componentDidCatch` existed.
2. Error handling was **ad-hoc** and not standardized.
3. Errors in child components would **bubble up and unmount the entire app**.
4. External libraries or custom HOCs were required to simulate error boundaries.

-------------------------------------
Example (Manual Error Handling):
-------------------------------------
import React, { Component } from "react";

function BuggyComponent() {
  throw new Error("I crashed!");
  return <div>Buggy</div>;
}

class SafeWrapper extends Component {
  render() {
    try {
      return this.props.children;
    } catch (error) {
      console.log("Caught error:", error);
      return <h2>Something went wrong.</h2>;
    }
  }
}

// Usage
function App() {
  return (
    <SafeWrapper>
      <BuggyComponent />
    </SafeWrapper>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- React v15 error handling is like **having no seat belts in a car**.  
  - Any crash (error) leads to total system failure (component tree crash).  
  - You could only try to protect passengers manually (try/catch).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How did developers handle errors before React v16?  
A1: Using try/catch in render methods or custom HOCs and global error listeners.

Q2: What are the limitations of error handling in React v15?  
A2: No standard mechanism, unhandled errors crash the app, error logging is manual.

Q3: Why was React v16 a major improvement for error handling?  
A3: Introduced built-in error boundaries (`componentDidCatch`) for safer, predictable error handling.

Q4: Can you simulate error boundaries in React v15?  
A4: Yes, using HOCs or wrapper components with try/catch, but it’s less reliable.
*/
