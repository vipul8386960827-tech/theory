/* 218_hooks_cover_all_use_cases_for_classes.js */
/* 218_hooks_cover_all_use_cases_for_classes.js

=====================================
Hooks Cover All Use Cases for Class Components
=====================================

Definition:
React **Hooks** allow functional components to handle almost all functionalities 
previously achievable only with class components, including state management, 
side effects, refs, and context consumption.

-------------------------------------
Key Points:
-------------------------------------
1. **useState** replaces `this.state` and `this.setState` for local component state.  
2. **useEffect** replaces lifecycle methods: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`.  
3. **useContext** replaces `contextType` or `Consumer` for accessing context.  
4. **useReducer** replaces complex state logic often handled with class methods.  
5. **useRef** replaces `createRef` and instance variables in class components.  
6. **Custom Hooks** allow reusing stateful logic across components.  

-------------------------------------
Guidelines:
-------------------------------------
- Hooks allow **functional components** to be as powerful as class components.  
- Prefer functional components with hooks for **cleaner, simpler code**.  
- Some edge cases like **error boundaries** still require class components.  

-------------------------------------
Example:
-------------------------------------
// Class Component
import React, { Component } from "react";

class Timer extends Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <h1>Seconds: {this.state.seconds}</h1>;
  }
}

// Functional Component with Hooks
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <h1>Seconds: {seconds}</h1>;
}

-------------------------------------
Analogy:
-------------------------------------
- Class components = **manual tools** for every task, requiring setup and teardown.  
- Hooks = **all-in-one modern tool** that simplifies setup, state, and effects in one place.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can hooks replace all class component use cases?  
A1: Almost all, except error boundaries and some legacy patterns.

Q2: Why prefer hooks over class components?  
A2: Cleaner syntax, no `this` binding, easier to reuse logic with custom hooks.

Q3: Are there any performance differences between hooks and classes?  
A3: Hooks have minimal overhead; functional components are often more lightweight.

Q4: How do hooks handle component lifecycle compared to class methods?  
A4: `useEffect` with dependencies replicates mounting, updating, and unmounting behaviors.
*/
