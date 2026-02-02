/* 216_rewrite_class_components_with_hooks.js

=====================================
Rewrite Class Components with Hooks
=====================================

Definition:
React **Hooks** allow you to use state and lifecycle features in **functional components**, 
removing the need for class components in most cases.  
Common hooks: `useState`, `useEffect`, `useReducer`, `useContext`.

-------------------------------------
Key Points:
-------------------------------------
1. `useState` replaces `this.state` and `this.setState`.  
2. `useEffect` replaces lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`).  
3. Functional components are **simpler**, easier to read, and avoid `this` binding issues.  
4. Hooks encourage **reusable logic** through custom hooks.  

-------------------------------------
Guidelines:
-------------------------------------
- Use hooks in **functional components** only.  
- Keep state and effects localized unless global state is needed.  
- Avoid side effects directly in render; use `useEffect`.  

-------------------------------------
Example:
-------------------------------------
// Class Component
import React, { Component } from "react";

class Counter extends Component {
  state = { count: 0 };

  componentDidMount() {
    console.log("Mounted");
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// Functional Component with Hooks
import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mounted");
  }, []); // Empty dependency = runs once

  const increment = () => setCount(count + 1);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Class component = **old car with manual gears**: works but more steps to drive.  
- Functional component with hooks = **automatic car**: simpler, modern, and easier to maintain.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can all class components be rewritten with hooks?  
A1: Yes, almost all features can be replicated with hooks in functional components.

Q2: What hooks replace `componentDidMount` and `componentWillUnmount`?  
A2: `useEffect` with empty dependencies (mount) and cleanup function (unmount).

Q3: Are there any features hooks cannot replace?  
A3: Some edge cases like error boundaries still require class components.

Q4: Why prefer hooks over class components?  
A4: Simpler syntax, easier state management, reusable logic, and avoids `this` binding issues.
*/
