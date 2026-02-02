/* 244_functional_vs_class_components.js

=====================================
Functional vs Class Components in React
=====================================

Definition:
- **Functional Components**: React components defined as JavaScript functions.
  They receive props as arguments and return JSX. Can use hooks for state and lifecycle.
- **Class Components**: React components defined as ES6 classes extending React.Component.
  They have state via `this.state` and lifecycle methods like componentDidMount.

Key Points:
1. **Functional Components**
   - Simpler and more concise.
   - Can use hooks (`useState`, `useEffect`, etc.) for state and lifecycle.
   - Easier to test and reason about.
   - No `this` binding required.

2. **Class Components**
   - Traditional approach with lifecycle methods.
   - Requires `this` keyword to access props and state.
   - Slightly more boilerplate.
   - Can define state and methods directly in the class.

Example:
import React, { useState, useEffect } from 'react';

// Functional Component
function CounterFunc() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Functional Component Mounted");
  }, []);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// Class Component
class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log("Class Component Mounted");
  }

  render() {
    return <button onClick={() => this.setState({ count: this.state.count + 1 })}>
      Count: {this.state.count}
    </button>;
  }
}

Analogy:
- Functional Components = **simple calculator**; you input props, get JSX output.
- Class Components = **full-featured calculator** with memory (state) and built-in operations (lifecycle methods).

Follow-Up Interview Questions:
Q1: Why are functional components preferred in modern React?  
A1: Simpler syntax, easier testing, better performance with hooks, and no `this` binding issues.

Q2: Can class components use hooks?  
A2: No, hooks can only be used in functional components.

Q3: Are class components still supported in React?  
A3: Yes, fully supported, but functional components are recommended.

Q4: Can functional components have state without hooks?  
A4: No, prior to hooks, functional components were stateless; now use `useState` or other hooks.
*/
