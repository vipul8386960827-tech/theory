/* 12_create_props_proxy_for_hoc.js

=====================================
Create Props Proxy for Higher-Order Component (HOC)
=====================================

Definition:
A **props proxy** is a technique used in Higher-Order Components (HOCs) where the HOC 
wraps a wrapped component and intercepts, modifies, or extends the props before passing 
them down to the wrapped component. It allows HOCs to add behavior without modifying the 
original component.

-------------------------------------
Key Points:
-------------------------------------
1. HOC is a function that takes a component and returns a new component.
2. Props proxy pattern is used to manipulate or enhance props.
3. Common use cases:
   - Logging props
   - Injecting additional props
   - Conditional props modifications

-------------------------------------
Example:
-------------------------------------
import React from "react";

// HOC using props proxy
function withExtraProps(WrappedComponent) {
  return function EnhancedComponent(props) {
    // Modify or add new props
    const newProps = { ...props, extra: "I am an extra prop" };

    // Pass all props to wrapped component
    return <WrappedComponent {...newProps} />;
  };
}

// Original component
function Display(props) {
  return (
    <div>
      <p>Original Prop: {props.name}</p>
      <p>Extra Prop: {props.extra}</p>
    </div>
  );
}

// Wrapped component
const EnhancedDisplay = withExtraProps(Display);

// Usage
// <EnhancedDisplay name="Kaizer" />

-------------------------------------
Analogy:
-------------------------------------
- Props proxy is like a personal assistant who adds extra notes or modifies instructions 
  before handing them to the employee (wrapped component).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you modify props directly inside the wrapped component?  
A1: No, props are read-only; HOCs use props proxy to inject or modify props externally.

Q2: What’s the difference between props proxy and inheritance inversion HOC patterns?  
A2: Props proxy wraps the component and manipulates props; inheritance inversion extends 
   the component class to override behavior.

Q3: Can multiple HOCs be chained?  
A3: Yes, HOCs can be composed to apply multiple enhancements.
*/
