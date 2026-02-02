/* 160_render_hijacking_in_react.js */

/*
=====================================
Render Hijacking in React
=====================================

Definition:
**Render Hijacking** is a pattern where a higher-order component (HOC) or wrapper 
intercepts or modifies the rendering behavior of a wrapped component.  
It is often used for conditional rendering, injecting props, or adding functionality 
without modifying the original component.

-------------------------------------
Key Points:
-------------------------------------

1. **Purpose**
   - Enhance or control component rendering dynamically.
   - Add common functionality (e.g., logging, authentication, theming).

2. **Common Techniques**
   - **Higher-Order Components (HOC)**
     - Wrap a component and modify its render output.
   - **Render Props**
     - Pass a function as a prop to control what gets rendered.
   - **Conditional Rendering**
     - Intercept render based on state or props.

-------------------------------------
Example: HOC for Render Hijacking
-------------------------------------
import React from "react";

// HOC that adds a border to any component
function withBorder(WrappedComponent) {
  return function(props) {
    return (
      <div style={{ border: "2px solid red", padding: "10px" }}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// Original component
function Message({ text }) {
  return <p>{text}</p>;
}

// Wrapped component with render hijacking
const BorderedMessage = withBorder(Message);

// Usage
function App() {
  return <BorderedMessage text="Hello, World!" />;
}

-------------------------------------
Notes:
-------------------------------------
- Render hijacking should avoid side effects; it only changes rendering output.
- Useful for cross-cutting concerns like logging, theming, or permission checks.
- Can be implemented via HOCs, render props, or even hooks (e.g., useEffect for conditional UI).

-------------------------------------
Analogy:
-------------------------------------
- Render Hijacking = **interceptor in a factory assembly line**:
  - Component = product.
  - HOC/Wrapper = quality check or decoration added before final output.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can render hijacking modify the original component?  
A1: No, it wraps or intercepts rendering; original component remains unchanged.

Q2: When would you use render hijacking?  
A2: To add cross-cutting functionality like logging, permissions, or styling.

Q3: Is render hijacking limited to class components?  
A3: No, it works with functional components using HOCs or render props.

Q4: How is render hijacking different from conditional rendering?  
A4: Conditional rendering decides whether to render; hijacking modifies the rendering behavior itself.
*/
