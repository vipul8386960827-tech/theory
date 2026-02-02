/* 69_limitations_with_hocs.js

=====================================================
Limitations of Higher-Order Components (HOCs) in React
=====================================================

Definition:
A **Higher-Order Component (HOC)** is a function that takes a component and returns a new component with enhanced behavior.
While HOCs are powerful for code reuse, they have several limitations.

-----------------------------------------------------
Key Limitations:
-----------------------------------------------------
1. Wrapper Hell / Nesting
   - Composing multiple HOCs can lead to deeply nested components.
   - Debugging and inspecting component hierarchy becomes harder.

2. Props Collision
   - HOCs may unintentionally override or conflict with the wrapped component's props.
   - Careful naming or prop filtering is required.

3. Ref Forwarding
   - Standard HOCs do not forward `ref` by default.
   - Accessing DOM nodes or component instances requires `React.forwardRef`.

4. Static Method Loss
   - HOCs do not automatically copy static methods from the original component.
   - Useful static methods may be lost unless explicitly hoisted.

5. Difficult Debugging
   - Component names in React DevTools may be obscured (e.g., `WithRouter(WithTheme(Component))`).
   - Harder to trace where a specific behavior is coming from.

6. Performance Overhead
   - Each HOC adds a new wrapper component in the React tree.
   - Excessive use can increase rendering depth and affect performance.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React from "react";

// Simple HOC that logs props
function withLogger(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log("Props:", this.props);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

class Button extends React.Component {
  static customMethod() {
    console.log("Button method");
  }
  render() {
    return <button>{this.props.label}</button>;
  }
}

export default withLogger(Button); // Note: Button.customMethod is lost unless hoisted

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- HOC = gift wrapper
- The gift (component) is still functional, but the wrapper can obscure original details, hide static methods, or make multiple layers hard to manage.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How can you avoid losing static methods in HOCs?  
A1: Use the `hoist-non-react-statics` library to copy static methods from the original component.

Q2: What is an alternative to HOCs for code reuse?  
A2: React hooks, render props, or component composition.

Q3: How do you forward refs through HOCs?  
A3: Use `React.forwardRef` in the HOC to pass refs to the wrapped component.

Q4: When should you prefer hooks over HOCs?  
A4: When you need cleaner syntax, avoid wrapper hell, and want easier access to state and lifecycle logic.

*/
